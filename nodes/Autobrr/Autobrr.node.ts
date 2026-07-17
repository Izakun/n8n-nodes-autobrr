import {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
	NodeApiError,
	NodeConnectionTypes,
	NodeOperationError,
} from 'n8n-workflow';

export class Autobrr implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Autobrr',
		name: 'autobrr',
		icon: { light: 'file:autobrr.svg', dark: 'file:autobrr.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Query your autobrr instance through its API',
		defaults: { name: 'autobrr' },
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'autobrrApi', required: true }],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Get Config', value: 'getConfig', action: 'Get the configuration' },
					{ name: 'Get Filters', value: 'getFilters', action: 'Get many filters' },
					{ name: 'Get Indexers', value: 'getIndexers', action: 'Get many indexers' },
					{ name: 'Get IRC Networks', value: 'getIrc', action: 'Get many IRC networks' },
					{ name: 'Get Releases', value: 'getReleases', action: 'Get many releases' },
				],
				default: 'getReleases',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: { minValue: 1 },
				default: 50,
				description: 'Max number of results to return',
				displayOptions: { show: { operation: ['getReleases'] } },
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const credentials = await this.getCredentials('autobrrApi', i);
				const baseURL = (credentials.baseUrl as string).replace(/\/+$/, '');
				const operation = this.getNodeParameter('operation', i) as string;
				const param = <T>(name: string, fallback?: T) =>
					this.getNodeParameter(name, i, fallback as T) as T;

				const request = (url: string, qs?: IDataObject) =>
					this.helpers.httpRequestWithAuthentication.call(this, 'autobrrApi', {
						method: 'GET' as IHttpRequestMethods,
						baseURL,
						url,
						qs,
						json: true,
					} as IHttpRequestOptions);

				const handlers: Record<string, () => Promise<unknown>> = {
					getConfig: () => request('/api/config'),
					getFilters: () => request('/api/filters'),
					getIndexers: () => request('/api/indexers'),
					getIrc: () => request('/api/irc'),
					getReleases: () => request('/api/release', { limit: param<number>('limit', 50) }),
				};

				const handler = handlers[operation];
				if (!handler) {
					throw new NodeOperationError(this.getNode(), `Unsupported operation: ${operation}`, {
						itemIndex: i,
					});
				}

				const response = await handler();
				if (Array.isArray(response)) {
					for (const element of response) {
						returnData.push({ json: element as IDataObject, pairedItem: { item: i } });
					}
				} else {
					returnData.push({ json: response as IDataObject, pairedItem: { item: i } });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message }, pairedItem: { item: i } });
					continue;
				}
				throw new NodeApiError(this.getNode(), error as JsonObject, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
