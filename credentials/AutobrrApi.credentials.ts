import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class AutobrrApi implements ICredentialType {
	name = 'autobrrApi';

	displayName = 'Autobrr API';

	icon = 'file:autobrrApi.svg' as const;

	documentationUrl = 'https://autobrr.com/';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'http://autobrr:7474',
			required: true,
			description: 'Base URL of the autobrr instance (e.g. http://autobrr:7474). No trailing slash.',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'autobrr API key (Settings → API keys)',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Token': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/api/config',
		},
	};
}
