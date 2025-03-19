# n8n-nodes-gtm  

This is an n8n community node. It lets you interact with Google Tag Manager (GTM) in your n8n workflows.  

Google Tag Manager is a tag management system that allows users to quickly and easily update tags and code snippets on their websites or mobile apps.  

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.  

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  
[Version history](#version-history)  

## Installation  

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.  

Alternatively, you can manually install it:  

```sh  
git clone https://github.com/elevate-agency-data/n8n-nodes-gtm.git 
cd n8n-nodes-gtm 
npm install  
```  

Then, place the node file in the `~/.n8n/custom-nodes` directory (or follow instructions specific to your n8n installation).  

## Operations  

This node supports the following operations within Google Tag Manager:  

- Create, update, and delete GTM tags  
- Manage variables and triggers  
- Publish container versions  
- Retrieve information from the [GTM API](https://developers.google.com/tag-platform/tag-manager/api/v2?hl=fr)  

## Credentials  

To use this node, you need a Google Cloud API key with access to Google Tag Manager.  

### Steps to obtain API credentials:  

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)  
2. Create a new project or use an existing one  
3. Enable the **Google Tag Manager API**  
4. Create API credentials (API key or OAuth 2.0)  
5. Add your API key to the authentication settings in n8n  

## Compatibility  

- Tested with: 1.80.5 (Success)

## Usage  

Once installed and configured, this node can be used in n8n workflows to automate GTM operations such as managing containers, updating tags, and tracking real-time changes.  

## Resources  

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)  
- [Google Tag Manager API documentation](https://developers.google.com/tag-platform/tag-manager/api/v2)  

## Version history  

- **1.0.0** - Initial release with basic GTM operations  
