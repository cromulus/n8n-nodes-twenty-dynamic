import 'n8n-workflow';

declare module 'n8n-workflow' {
	interface INodeTypeBaseDescription {
		usableAsTool?: unknown;
	}
}

