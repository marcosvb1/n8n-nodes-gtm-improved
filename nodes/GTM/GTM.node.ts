import { 
  ApplicationError,
  INodeType, 
  INodeTypeDescription, 
  IExecuteFunctions, 
  NodeApiError,
  NodeConnectionType,
  NodeOperationError,
  JsonObject 
} from 'n8n-workflow';

export class Gtm implements INodeType {
  description:INodeTypeDescription = {
    displayName: 'Google Tag Manager',
    name: 'gtm',
    group: ['transform'],
    version: 1,
    description: 'Use the Google Tag Manager API',
    defaults:{ name: 'Google Tag Manager' },
    icon: 'file:gtm.svg',
    // @ts-ignore - node-class-description-inputs-wrong
    inputs: [{ type: NodeConnectionType.Main }],
    // @ts-ignore - node-class-description-outputs-wrong
    outputs: [{ type: NodeConnectionType.Main }],
		usableAsTool: true,
    credentials:[{ name: 'googleTagManagerOAuth2Api', required:true }],
    requestDefaults:{
      baseURL: 'https://www.googleapis.com/tagmanager/v2',
      headers:{ 'Content-Type': 'application/json' }
    },
    properties:[
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          { name: 'Account', value: 'account', description: 'Manage GTM Accounts' },
          { name: 'Built-In Variable', value: 'builtInVariable', description: 'Manage GTM Built-In Variables' },
          { name: 'Client', value: 'client', description: 'Manage GTM Clients' },
          { name: 'Container', value: 'container', description: 'Manage GTM Containers' },
          { name: 'Destination', value: 'destination', description: 'Manage GTM Destinations' },
          { name: 'Environment', value: 'environment', description: 'Manage GTM Environments' },
          { name: 'Folder', value: 'folder', description: 'Manage GTM Folders' },
          { name: 'Google Tag Configuration', value: 'googleTagConfiguration', description: 'Manage Google Tag Configuration' },
          { name: 'Tag', value: 'tag', description: 'Manage GTM Tags' },
          { name: 'Template', value: 'template', description: 'Manage GTM Templates' },
          { name: 'Transformation', value: 'transformation', description: 'Manage GTM Transformations' },
          { name: 'Trigger', value: 'trigger', description: 'Manage GTM Triggers' },
          { name: 'User Permission', value: 'userPermission', description: 'Manage GTM User Permissions' },
          { name: 'Variable', value: 'variable', description: 'Manage GTM Variables' },
          { name: 'Version', value: 'version', description: 'Manage GTM Versions' },
          { name: 'Version Header', value: 'versionHeader', description: 'Manage GTM Version Headers' },
          { name: 'Workspace', value: 'workspace', description: 'Manage GTM Workspaces' },
          { name: 'Zone', value: 'zone', description: 'Manage GTM Zones' }
        ],
        default: 'account',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['account'] } },
        options: [
          { name: 'Get Account', value: 'accountsGet', action:'Gets an account', description: 'Gets a GTM Account' },
          { name: 'List Accounts', value: 'accountsList', action:'Lists all accounts', description: 'Lists all GTM Accounts accessible to the user' },
          { name: 'Update Account', value: 'accountsUpdate', action:'Updates an account', description: 'Updates a GTM Account' }
        ],
        default: 'accountsList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['builtInVariable'] } },
        options: [
          { name: 'Create Built-In Variable', value: 'builtInVariablesCreate', action: 'Creates a built in variable', description: 'Creates a GTM Built-In Variable' },
          { name: 'Delete Built-In Variable', value: 'builtInVariablesDelete', action: 'Deletes a built in variable', description: 'Deletes a GTM Built-In Variable' },
          { name: 'List Built-In Variables', value: 'builtInVariablesList', action: 'Lists all the enabled built in variables', description: 'Lists all the enabled Built-In Variables of a GTM Container' },
          { name: 'Revert Built-In Variable', value: 'builtInVariablesRevert', action: 'Reverts changes to a built in variable', description: 'Reverts changes to a GTM Built-In Variable in a GTM Workspace' }
        ],
        default: 'builtInVariablesList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['client'] } },
        options: [
          { name: 'Create Client', value: 'clientsCreate', action: 'Creates a client', description: 'Creates a GTM Client' },
          { name: 'Delete Client', value: 'clientsDelete', action: 'Deletes a client', description: 'Deletes a GTM Client' },
          { name: 'Get Client', value: 'clientsGet', action: 'Gets a client', description: 'Gets a GTM Client' },
          { name: 'List Clients', value: 'clientsList', action: 'Lists all clients', description: 'Lists all GTM Clients of a GTM container workspace' },
          { name: 'Revert Client', value: 'clientsRevert', action: 'Reverts changes to a client', description: 'Reverts changes to a GTM Client in a GTM Workspace' },
          { name: 'Update Client', value: 'clientsUpdate', action: 'Updates a client', description: 'Updates a GTM Client' }
        ],
        default: 'clientsList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['container'] } },
        options: [
          { name: 'Combine Containers', value: 'containersCombine', action: 'Combines containers', description: 'Combines Containers' },
          { name: 'Create Container', value: 'containersCreate',  action: 'Creates a container', description: 'Creates a Container' },
          { name: 'Delete Container', value: 'containersDelete', action: 'Deletes a container', description: 'Deletes a Container' },
          { name: 'Get Container', value: 'containersGet', action: 'Gets a container', description: 'Gets a Container' },
          { name: 'List Containers', value: 'containersList',  action: 'Lists all containers', description: 'Lists all Containers that belongs to a GTM Account' },
          { name: 'Lookup Container', value: 'containersLookup', action: 'Looks up a container', description: 'Looks up a Container by destination ID or tag ID' },
          { name: 'Move Tag ID Container', value: 'containersMoveTagId', action: 'Move tag id out of a container', description: 'Move Tag ID out of a Container' },
          { name: 'Snippet Container', value: 'containersSnippet', action: 'Gets the tagging snippet for a container', description: 'Gets the tagging snippet for a Container' },
          { name: 'Update Container', value: 'containersUpdate', action: 'Updates a container', description: 'Updates a Container' }
        ],
        default: 'containersList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['destination'] } },
        options: [
          { name: 'Get Destination', value: 'destinationsGet', action: 'Gets a destination', description: 'Gets a Destination' },
          { name: 'Link Destination', value: 'destinationsLink', action: 'Adds a destination', description: 'Adds a Destination to this Container and removes it from the Container to which it is currently linked' },
          { name: 'List Destinations', value: 'destinationsList', action: 'Lists all destinations', description: 'Lists all Destinations linked to a GTM Container' }
        ],
        default: 'destinationsList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['environment'] } },
        options: [
          { name: 'Create Environment', value: 'environmentsCreate', action: 'Creates an environment', description: 'Creates a GTM Environment' },
          { name: 'Delete Environment', value: 'environmentsDelete', action: 'Deletes an environment', description: 'Deletes a GTM Environment' },
          { name: 'Get Environment', value: 'environmentsGet', action: 'Gets an environment', description: 'Gets a GTM Environment' },
          { name: 'List Environments', value: 'environmentsList', action: 'Lists all environments', description: 'Lists all GTM Environments of a GTM Container' },
          { name: 'Reauthorize Environment', value: 'environmentsReauthorize', action: 'Re generates the authorization code for an environment', description: 'Re-generates the authorization code for a GTM Environment' },
          { name: 'Update Environment', value: 'environmentsUpdate', action: 'Updates an environment', description: 'Updates a GTM Environment' }
        ],
        default: 'environmentsList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['folder'] } },
        options: [
          { name: 'Create Folder', value: 'foldersCreate', action: 'Creates a folder', description: 'Creates a GTM Folder' },
          { name: 'Delete Folder', value: 'foldersDelete', action: 'Deletes a folder', description: 'Deletes a GTM Folder' },
          { name: 'Entities in Folder', value: 'foldersEntitiesList', action: 'List all entities in a folder', description: 'List all entities in a GTM Folder' },
          { name: 'Get Folder', value: 'foldersGet', action: 'Gets a folder', description: 'Gets a GTM Folder' },
          { name: 'List Folders', value: 'foldersList', action: 'Lists all folders', description: 'Lists all GTM Folders of a Container' },
          { name: 'Move Entites to a Folder', value: 'foldersMoveEntities', action: 'Moves entities to a folder', description: 'Moves entities to a GTM Folder (if Folder ID in the request equals 0, this will instead move entities out of the folder they currently belong to)' },
          { name: 'Revert Folder', value: 'foldersRevert', action: 'Reverts changes to a folder', description: 'Reverts changes to a GTM Folder in a GTM Workspace' },
          { name: 'Update Folder', value: 'foldersUpdate', action: 'Updates a folder', description: 'Updates a GTM Folder' }
        ],
        default: 'foldersList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['googleTagConfiguration'] } },
        options: [
          { name: 'Create Google Tag Configuration', value: 'googleTagConfigurationsCreate', action: 'Creates a google tag config', description: 'Creates a Google tag config' },
          { name: 'Delete Google Tag Configuration', value: 'googleTagConfigurationsDelete', action: 'Deletes a google tag config', description: 'Deletes a Google tag config' },
          { name: 'Get Google Tag Configuration', value: 'googleTagConfigurationsGet', action: 'Gets a google tag config', description: 'Gets a Google tag config' },
          { name: 'List Google Tag Configurations', value: 'googleTagConfigurationsList', action: 'Lists all google tag configs', description: 'Lists all Google tag configs in a Container' },
          { name: 'Update Google Tag Configuration', value: 'googleTagConfigurationsUpdate', action: 'Updates a google tag config', description: 'Updates a Google tag config' }
        ],
        default: 'googleTagConfigurationsList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['tag'] } },
        options: [
          { name: 'Create Tags', value: 'tagsCreate', action: 'Creates a tag', description: 'Creates a GTM Tag' },
          { name: 'Delete Tag', value: 'tagsDelete', action: 'Deletes a tag', description: 'Deletes a GTM Tag' },
          { name: 'Get Tag', value: 'tagsGet', action: 'Gets a tag', description: 'Gets a GTM Tag' },
          { name: 'List Tags', value: 'tagsList', action: 'Lists all tags', description: 'Lists all GTM Tags of a Container' },
          { name: 'Revert Tags', value: 'tagsRevert', action: 'Reverts changes to a tag', description: 'Reverts changes to a GTM Tag in a GTM Workspace' },
          { name: 'Update Tags', value: 'tagsUpdate', action: 'Updates a tag', description: 'Updates a GTM Tag' }
        ],
        default: 'tagsList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['template'] } },
        options: [
          { name: 'Create Template', value: 'templatesCreate', action: 'Creates a custom template', description: 'Creates a GTM Custom Template' },
          { name: 'Delete Template', value: 'templatesDelete', action: 'Deletes a template', description: 'Deletes a GTM Template' },
          { name: 'Get Template', value: 'templatesGet', action: 'Gets a template', description: 'Gets a GTM Template' },
          { name: 'List Templates', value: 'templatesList', action: 'Lists all templates', description: 'Lists all GTM Templates of a GTM container workspace' },
          { name: 'Revert Template', value: 'templatesRevert', action: 'Reverts changes to a template', description: 'Reverts changes to a GTM Template in a GTM Workspace' },
          { name: 'Update Template', value: 'templatesUpdate', action: 'Updates a template', description: 'Updates a GTM Template' }
        ],
        default: 'templatesList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['transformation'] } },
        options: [
          { name: 'Create Transformation', value: 'transformationsCreate', action: 'Creates a transformation', description: 'Creates a GTM Transformation' },
          { name: 'Delete Transformation', value: 'transformationsDelete', action: 'Deletes a transformation', description: 'Deletes a GTM Transformation' },
          { name: 'Get Transformation', value: 'transformationsGet', action: 'Gets a transformation', description: 'Gets a GTM Transformation' },
          { name: 'List Transformations', value: 'transformationsList', action: 'Lists all transformations', description: 'Lists all GTM Transformations of a GTM container workspace' },
          { name: 'Revert Transformation', value: 'transformationsRevert', action: 'Reverts changes to a transformation', description: 'Reverts changes to a GTM Transformation in a GTM Workspace' },
          { name: 'Update Transformation', value: 'transformationsUpdate', action: 'Updates a transformation', description: 'Updates a GTM Transformation' }
        ],
        default: 'transformationsList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['trigger'] } },
        options: [
          { name: 'Create Trigger', value: 'triggersCreate', action: 'Creates a trigger', description: 'Creates a GTM Trigger' },
          { name: 'Delete Trigger', value: 'triggersDelete', action: 'Deletes a trigger', description: 'Deletes a GTM Trigger' },
          { name: 'Get Trigger', value: 'triggersGet', action: 'Gets a trigger', description: 'Gets a GTM Trigger' },
          { name: 'List Triggers', value: 'triggersList', action: 'Lists all triggers', description: 'Lists all GTM Triggers of a Container' },
          { name: 'Revert Trigger', value: 'triggersRevert', action: 'Reverts changes to a trigger', description: 'Reverts changes to a GTM Trigger in a GTM Workspace' },
          { name: 'Update Trigger', value: 'triggersUpdate', action: 'Updates a trigger', description: 'Updates a GTM Trigger' }
        ],
        default: 'triggersList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['userPermission'] } },
        options: [
          { name: 'Create User Permissions', value: 'userPermissionsCreate', action: 'Creates a user permissions', description: 'Creates a user\'s Account & Container access' },
          { name: 'Delete User Permissions', value: 'userPermissionsDelete', action: 'Removes a user permissions', description: 'Removes a user from the account, revoking access to it and all of its containers' },
          { name: 'Get User Permission', value: 'userPermissionsGet', action: 'Gets a user permissions', description: 'Gets a user\'s Account & Container access' },
          { name: 'List User Permissions', value: 'userPermissionsList', action: 'List all users that have access', description: 'List all users that have access to the account along with Account and Container user access granted to each of them' },
          { name: 'Update User Permissions', value: 'userPermissionsUpdate', action: 'Updates a user permissions', description: 'Updates a user\'s Account & Container access' }
        ],
        default: 'userPermissionsList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['variable'] } },
        options: [
          { name: 'Create Variable', value: 'variablesCreate', action: 'Creates a variable', description: 'Creates a GTM Variable' },
          { name: 'Delete Variable', value: 'variablesDelete', action: 'Deletes a variable', description: 'Deletes a GTM Variable' },
          { name: 'Get Variable', value: 'variablesGet', action: 'Gets a variable', description: 'Gets a GTM Variable' },
          { name: 'List Variables', value: 'variablesList', action: 'Lists all variables', description: 'Lists all GTM Variables of a Container' },
          { name: 'Revert Variable', value: 'variablesRevert', action: 'Reverts changes to a variable', description: 'Reverts changes to a GTM Variable in a GTM Workspace' },
          { name: 'Update Variable', value: 'variablesUpdate', action: 'Updates a variable', description: 'Updates a GTM Variable' }
        ],
        default: 'variablesList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['versionsHeader'] } },
        options: [
          { name: 'Latest Version Header', value: 'versionsHeadersLatest', action: 'Gets the latest container version header', description: 'Gets the latest Container Version Header' },
          { name: 'List Version Headers', value: 'versionsHeadersList', action: 'Lists all container versions', description: 'Lists all Container Versions of a GTM Container' }
        ],
        default: 'versionsHeadersList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['version'] } },
        options: [
          { name: 'Delete Version', value: 'versionsDelete', action: 'Deletes a version', description: 'Deletes a Container Version' },
          { name: 'Get Version', value: 'versionsGet', action: 'Gets a version', description: 'Gets a Container Version' },
          { name: 'Live Version', value: 'versionsLive', action: 'Gets the live version', description: 'Gets the live (published) container version' },
          { name: 'Publish Version', value: 'versionsPublish', action: 'Publishes a version', description: 'Publishes a Container Version' },
          { name: 'Set Latest Version', value: 'versionsSetLatest', action: 'Sets the latest version', description: 'Sets the latest version used for synchronization of workspaces when detecting conflicts and errors' },
          { name: 'Undelete Version', value: 'versionsUndelete', action: 'Undeletes a version', description: 'Undeletes a Container Version' },
          { name: 'Update Version', value: 'versionsUpdate', action: 'Updates a version', description: 'Updates a Container Version' }
        ],
        default: 'versionsLive',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['workspace'] } },
        options: [
          { name: 'Create Version Workspace', value: 'workspacesCreateVersion', action: 'Creates a container version from the entities present in the workspace', description: 'Creates a Container Version from the entities present in the workspace, deletes the workspace, and sets the base container version to the newly created version' },
          { name: 'Create Workspace', value: 'workspacesCreate', action: 'Creates a workspace', description: 'Creates a Workspace' },
          { name: 'Delete Workspace', value: 'workspacesDelete', action: 'Deletes a workspace', description: 'Deletes a Workspace' },
          { name: 'Get Status Workspace', value: 'workspacesGetStatus', action: 'Finds conflicting and modified entities in the workspace', description: 'Finds conflicting and modified entities in the workspace' },
          { name: 'Get Workspaces', value: 'workspacesGet', action: 'Gets a workspace', description: 'Gets a Workspace' },
          { name: 'List Workspaces', value: 'workspacesList', action: 'Lists all workspaces', description: 'Lists all Workspaces that belong to a GTM Container' },
          { name: 'Quick Preview Workspace', value: 'workspacesQuickPreview', action: 'Quick previews a workspace', description: 'Quick previews a workspace by creating a fake container version from all entities in the provided workspace' },
          { name: 'Resolve Conflict Workspace', value: 'workspacesResolveConflict', action: 'Resolves a merge conflict for a workspace entity', description: 'Resolves a merge conflict for a workspace entity by updating it to the resolved entity passed in the request' },
          { name: 'Sync Workspace', value: 'workspacesSync', action: 'Syncs a workspace to the latest container version', description: 'Syncs a workspace to the latest container version by updating all unmodified workspace entities and displaying conflicts for modified entities' },
          { name: 'Update Workspace', value: 'workspacesUpdate', action: 'Updates a workspace', description: 'Updates a Workspace' }
        ],
        default: 'workspacesList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['zone'] } },
        options: [
          { name: 'Create Zone', value: 'zonesCreate', action: 'Creates a zone', description: 'Creates a GTM Zone' },
          { name: 'Delete Zone', value: 'zonesDelete', action: 'Deletes a zone', description: 'Deletes a GTM Zone' },
          { name: 'Get Zone', value: 'zonesGet', action: 'Gets a zone', description: 'Gets a GTM Zone' },
          { name: 'List Zones', value: 'zonesList', action: 'Lists all zones', description: 'Lists all GTM Zones of a GTM container workspace' },
          { name: 'Revert Zone', value: 'zonesRevert', action: 'Reverts changes to a zone', description: 'Reverts changes to a GTM Zone in a GTM Workspace' },
          { name: 'Update Zone', value: 'zonesUpdate', action: 'Updates a zone', description: 'Updates a GTM Zone' }
        ],
        default: 'zonesList',
        required: true,
      },
      {
        displayName: 'Account ID',
        name: 'accountId',
        placeholder: 'Enter your GTM Account ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['accountsGet', 'accountsUpdate', 'builtInVariablesCreate', 'builtInVariablesDelete', 'builtInVariablesList', 'builtInVariablesRevert', 'clientsCreate', 'clientsDelete', 'clientsGet', 'clientsList', 'clientsRevert', 'clientsUpdate', 'containersCombine', 'containersCreate', 'containersDelete', 'containersGet', 'containersList', 'containersMoveTagId', 'containersSnippet', 'containersUpdate', 'destinationsGet', 'destinationsLink', 'destinationsList', 'environmentsCreate', 'environmentsDelete', 'environmentsGet', 'environmentsList', 'environmentsReauthorize', 'environmentsUpdate', 'foldersCreate', 'foldersDelete', 'foldersEntitiesList', 'foldersGet', 'foldersList', 'foldersMoveEntities', 'foldersRevert', 'foldersUpdate', 'googleTagConfigurationsCreate', 'googleTagConfigurationsDelete', 'googleTagConfigurationsGet', 'googleTagConfigurationsList', 'googleTagConfigurationsUpdate', 'tagsCreate', 'tagsDelete', 'tagsGet', 'tagsList', 'tagsRevert', 'tagsUpdate', 'templatesCreate', 'templatesDelete', 'templatesGet', 'templatesList', 'templatesRevert', 'templatesUpdate', 'transformationsCreate', 'transformationsDelete', 'transformationsGet', 'transformationsList', 'transformationsRevert', 'transformationsUpdate', 'triggersCreate', 'triggersDelete', 'triggersGet', 'triggersList', 'triggersRevert', 'triggersUpdate', 'userPermissionsCreate', 'userPermissionsDelete', 'userPermissionsGet', 'userPermissionsList', 'userPermissionsUpdate', 'variablesCreate', 'variablesDelete', 'variablesGet', 'variablesList', 'variablesRevert', 'variablesUpdate', 'versionsHeadersLatest', 'versionsHeadersList', 'versionsDelete', 'versionsGet', 'versionsLive', 'versionsPublish', 'versionsSetLatest', 'versionsUndelete', 'versionsUpdate', 'workspacesCreate', 'workspacesCreateVersion', 'workspacesDelete', 'workspacesGet', 'workspacesGetStatus', 'workspacesList', 'workspacesQuickPreview', 'workspacesResolveConflict', 'workspacesSync', 'workspacesUpdate', 'zonesCreate', 'zonesDelete', 'zonesGet', 'zonesList', 'zonesRevert', 'zonesUpdate'] } }
      },
      {
        displayName: 'Container ID',
        name: 'containerId',
        placeholder: 'Enter your GTM Container ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['builtInVariablesCreate', 'builtInVariablesDelete', 'builtInVariablesList', 'builtInVariablesRevert', 'clientsCreate', 'clientsDelete', 'clientsGet', 'clientsList', 'clientsRevert', 'clientsUpdate', 'containersCombine', 'containersDelete', 'containersGet', 'containersMoveTagId', 'containersSnippet', 'containersUpdate', 'destinationsGet', 'destinationsLink', 'destinationsList', 'environmentsCreate', 'environmentsDelete', 'environmentsGet', 'environmentsList', 'environmentsReauthorize', 'environmentsUpdate', 'foldersCreate', 'foldersDelete', 'foldersEntitiesList', 'foldersGet', 'foldersList', 'foldersMoveEntities', 'foldersRevert', 'foldersUpdate', 'googleTagConfigurationsCreate', 'googleTagConfigurationsDelete', 'googleTagConfigurationsGet', 'googleTagConfigurationsList', 'googleTagConfigurationsUpdate', 'tagsCreate', 'tagsDelete', 'tagsGet', 'tagsList', 'tagsRevert', 'tagsUpdate', 'templatesCreate', 'templatesDelete', 'templatesGet', 'templatesList', 'templatesRevert', 'templatesUpdate', 'transformationsCreate', 'transformationsDelete', 'transformationsGet', 'transformationsList', 'transformationsRevert', 'transformationsUpdate', 'triggersCreate', 'triggersDelete', 'triggersGet', 'triggersList', 'triggersRevert', 'triggersUpdate', 'variablesCreate', 'variablesDelete', 'variablesGet', 'variablesList', 'variablesRevert', 'variablesUpdate', 'versionsHeadersLatest', 'versionsHeadersList', 'versionsDelete', 'versionsGet', 'versionsLive', 'versionsPublish', 'versionsSetLatest', 'versionsUndelete', 'versionsUpdate', 'workspacesCreate', 'workspacesCreateVersion', 'workspacesDelete', 'workspacesGet', 'workspacesGetStatus', 'workspacesList', 'workspacesQuickPreview', 'workspacesResolveConflict', 'workspacesSync', 'workspacesUpdate', 'zonesCreate', 'zonesDelete', 'zonesGet', 'zonesList', 'zonesRevert', 'zonesUpdate'] } }
      }, 
      {
        displayName: 'Workspace ID',
        name: 'workspaceId',        
        placeholder: 'Enter your GTM Workspace ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['builtInVariablesCreate', 'builtInVariablesDelete', 'builtInVariablesList', 'builtInVariablesRevert', 'clientsCreate', 'clientsDelete', 'clientsGet', 'clientsList', 'clientsRevert', 'clientsUpdate', 'foldersCreate', 'foldersDelete', 'foldersEntitiesList', 'foldersGet', 'foldersList', 'foldersMoveEntities', 'foldersRevert', 'foldersUpdate', 'googleTagConfigurationsCreate', 'googleTagConfigurationsDelete', 'googleTagConfigurationsGet', 'googleTagConfigurationsList', 'googleTagConfigurationsUpdate', 'tagsCreate', 'tagsDelete', 'tagsGet', 'tagsList', 'tagsRevert', 'tagsUpdate', 'templatesCreate', 'templatesDelete', 'templatesGet', 'templatesList', 'templatesRevert', 'templatesUpdate', 'transformationsCreate', 'transformationsDelete', 'transformationsGet', 'transformationsList', 'transformationsRevert', 'transformationsUpdate', 'triggersCreate', 'triggersDelete', 'triggersGet', 'triggersList', 'triggersRevert', 'triggersUpdate', 'variablesCreate', 'variablesDelete', 'variablesGet', 'variablesList', 'variablesRevert', 'variablesUpdate', 'workspacesCreateVersion', 'workspacesDelete', 'workspacesGet', 'workspacesGetStatus', 'workspacesQuickPreview', 'workspacesResolveConflict', 'workspacesSync', 'workspacesUpdate', 'zonesCreate', 'zonesDelete', 'zonesGet', 'zonesList', 'zonesRevert', 'zonesUpdate'] } }
      },
      {
        displayName: 'Client ID',
        name: 'clientId',        
        placeholder: 'Enter your GTM Client ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['clientsDelete', 'clientsGet', 'clientsRevert', 'clientsUpdate'] } }
      },  
      {
        displayName: 'Destination Link ID',
        name: 'destinationLinkId',        
        placeholder: 'Enter your Google Tag Destination Link ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['destinationsGet'] } }
      },  
      {
        displayName: 'Environment ID',
        name: 'environmentId',        
        placeholder: 'Enter your GTM Environment ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['environmentsDelete', 'environmentsGet', 'environmentsReauthorize', 'environmentsUpdate'] } }
      },
      {
        displayName: 'Folder ID',
        name: 'folderId',        
        placeholder: 'Enter your GTM Folder ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['foldersDelete', 'foldersEntitiesList', 'foldersGet', 'foldersMoveEntities', 'foldersRevert', 'foldersUpdate'] } }
      }, 
      {
        displayName: 'Google Tag Configuration ID',
        name: 'googleTagConfigurationId',        
        placeholder: 'Enter your Google Tag Configuration ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['googleTagConfigurationsDelete', 'googleTagConfigurationsGet', 'googleTagConfigurationsUpdate'] } }
      }, 
      {
        displayName: 'Tag ID',
        name: 'tagId',        
        placeholder: 'Enter your GTM Tag ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['tagsDelete', 'tagsGet', 'tagsRevert', 'tagsUpdate'] } }
      },
      {
        displayName: 'Template ID',
        name: 'templateId',        
        placeholder: 'Enter your GTM Template ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['templatesDelete', 'templatesGet', 'templatesRevert', 'templatesUpdate'] } }
      },
      {
        displayName: 'Transformation ID',
        name: 'transformationId',        
        placeholder: 'Enter your GTM Transformation ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['transformationsDelete', 'transformationsGet', 'transformationsRevert', 'transformationsUpdate'] } }
      },
      {
        displayName: 'Trigger ID',
        name: 'triggerId',        
        placeholder: 'Enter your GTM Trigger ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['triggersDelete', 'triggersGet', 'triggersRevert', 'triggersUpdate'] } }
      },
      {
        displayName: 'User Permissions ID',
        name: 'userPermissionsId',        
        placeholder: 'Enter your GTM User Permissions ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['userPermissionsDelete', 'userPermissionsGet', 'userPermissionsUpdate'] } }
      }, 
      {
        displayName: 'Variable ID',
        name: 'variableId',        
        placeholder: 'Enter your GTM Variable ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['variablesDelete', 'variablesGet', 'variablesRevert', 'variablesUpdate'] } }
      },
      {
        displayName: 'Version ID',
        name: 'versionId',        
        placeholder: 'Enter your GTM Version ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['versionsDelete', 'versionsGet', 'versionsPublish', 'versionsSetLatest', 'versionsUndelete', 'versionsUpdate'] } }
      }, 
      {
        displayName: 'Zone ID',
        name: 'zoneId',        
        placeholder: 'Enter your GTM Zone ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['zonesDelete', 'zonesGet', 'zonesRevert', 'zonesUpdate'] } }
      }, 
      {
        displayName: 'Optional Query Parameters',
        name: 'optionalQueryParameters',
        type: 'collection',
        placeholder: 'Add Parameter',
        default:{},
        options:[
          {
            displayName: 'Allow User Permission Feature Update',
            name: 'allowUserPermissionFeatureUpdate',            
            description: 'Whether this operation causes an update or not, it must be set to true to allow features.user_permissions to change from false to true (if this bit is false, the operation will fail)',
            type: 'boolean',
            default: true,
          },
          {
            displayName: 'Built-In Variable Type',
            name: 'type',            
            description: 'The type of built-in variable',
            type: 'options',
            default: 'advertiserId',
            options: [
              { name: 'Advertiser ID', value: 'advertiserId' },
              { name: 'Advertiser Tracking Enabled', value: 'advertisingTrackingEnabled' },
              { name: 'AMP Browser Language', value: 'ampBrowserLanguage' },
              { name: 'AMP Canonical Host', value: 'ampCanonicalHost' },
              { name: 'AMP Canonical Path', value: 'ampCanonicalPath' },
              { name: 'AMP Canonical URL', value: 'ampCanonicalUrl' },
              { name: 'AMP Client ID', value: 'ampClientId' },
              { name: 'AMP Client Max Scroll X', value: 'ampClientMaxScrollX' },
              { name: 'AMP Client Max Scroll Y', value: 'ampClientMaxScrollY' },
              { name: 'AMP Client Screen Height', value: 'ampClientScreenHeight' },
              { name: 'AMP Client Screen Width', value: 'ampClientScreenWidth' },
              { name: 'AMP Client Scroll X', value: 'ampClientScrollX' },
              { name: 'AMP Client Scroll Y', value: 'ampClientScrollY' },
              { name: 'AMP Client Timestamp', value: 'ampClientTimestamp' },
              { name: 'AMP Client Timezone', value: 'ampClientTimezone' },
              { name: 'AMP GTM Event', value: 'ampGtmEvent' },
              { name: 'AMP Page Download Time', value: 'ampPageDownloadTime' },
              { name: 'AMP Page Load Time', value: 'ampPageLoadTime' },
              { name: 'AMP Page View ID', value: 'ampPageViewId' },
              { name: 'AMP Referrer', value: 'ampReferrer' },
              { name: 'AMP Title', value: 'ampTitle' },
              { name: 'AMP Total Engaged Time', value: 'ampTotalEngagedTime' },
              { name: 'App ID', value: 'appId' },
              { name: 'App Name', value: 'appName' },
              { name: 'App Version Code', value: 'appVersionCode' },
              { name: 'App Version Name', value: 'appVersionName' },
              { name: 'Built In Variable Type Unspecified', value: 'builtInVariableTypeUnspecified' },
              { name: 'Click Classes', value: 'clickClasses' },
              { name: 'Click Element', value: 'clickElement' },
              { name: 'Click ID', value: 'clickId' },
              { name: 'Click Target', value: 'clickTarget' },
              { name: 'Click Text', value: 'clickText' },
              { name: 'Click URL', value: 'clickUrl' },
              { name: 'Client Name', value: 'clientName' },
              { name: 'Container ID', value: 'containerId' },
              { name: 'Container Version', value: 'containerVersion' },
              { name: 'Debug Mode', value: 'debugMode' },
              { name: 'Device Name', value: 'deviceName' },
              { name: 'Element Visibility First Time', value: 'elementVisibilityFirstTime' },
              { name: 'Element Visibility Ratio', value: 'elementVisibilityRatio' },
              { name: 'Element Visibility Recent Time', value: 'elementVisibilityRecentTime' },
              { name: 'Element Visibility Time', value: 'elementVisibilityTime' },
              { name: 'Environment Name', value: 'environmentName' },
              { name: 'Error Line', value: 'errorLine' },
              { name: 'Error Message', value: 'errorMessage' },
              { name: 'Error URL', value: 'errorUrl' },
              { name: 'Event', value: 'event' },
              { name: 'Event Name', value: 'eventName' },
              { name: 'Firebase Event Parameter Campaign', value: 'firebaseEventParameterCampaign' },
              { name: 'Firebase Event Parameter Campaign Aclid', value: 'firebaseEventParameterCampaignAclid' },
              { name: 'Firebase Event Parameter Campaign Anid', value: 'firebaseEventParameterCampaignAnid' },
              { name: 'Firebase Event Parameter Campaign Click Timestamp', value: 'firebaseEventParameterCampaignClickTimestamp' },
              { name: 'Firebase Event Parameter Campaign Content', value: 'firebaseEventParameterCampaignContent' },
              { name: 'Firebase Event Parameter Campaign Cp1', value: 'firebaseEventParameterCampaignCp1' },
              { name: 'Firebase Event Parameter Campaign Gclid', value: 'firebaseEventParameterCampaignGclid' },
              { name: 'Firebase Event Parameter Campaign Source', value: 'firebaseEventParameterCampaignSource' },
              { name: 'Firebase Event Parameter Campaign Term', value: 'firebaseEventParameterCampaignTerm' },
              { name: 'Firebase Event Parameter Currency', value: 'firebaseEventParameterCurrency' },
              { name: 'Firebase Event Parameter Dynamic Link Accept Time', value: 'firebaseEventParameterDynamicLinkAcceptTime' },
              { name: 'Firebase Event Parameter Dynamic Link ID', value: 'firebaseEventParameterDynamicLinkLinkid' },
              { name: 'Firebase Event Parameter Notification Message Device Time', value: 'firebaseEventParameterNotificationMessageDeviceTime' },
              { name: 'Firebase Event Parameter Notification Message ID', value: 'firebaseEventParameterNotificationMessageId' },
              { name: 'Firebase Event Parameter Notification Message Name', value: 'firebaseEventParameterNotificationMessageName' },
              { name: 'Firebase Event Parameter Notification Message Time', value: 'firebaseEventParameterNotificationMessageTime' },
              { name: 'Firebase Event Parameter Notification Topic', value: 'firebaseEventParameterNotificationTopic' },
              { name: 'Firebase Event Parameter Previous App Version', value: 'firebaseEventParameterPreviousAppVersion' },
              { name: 'Firebase Event Parameter Previous OS Version', value: 'firebaseEventParameterPreviousOsVersion' },
              { name: 'Firebase Event Parameter Price', value: 'firebaseEventParameterPrice' },
              { name: 'Firebase Event Parameter Product ID', value: 'firebaseEventParameterProductId' },
              { name: 'Firebase Event Parameter Quantity', value: 'firebaseEventParameterQuantity' },
              { name: 'Firebase Event Parameter Value', value: 'firebaseEventParameterValue' },
              { name: 'First Party Serving URL', value: 'firstPartyServingUrl' },
              { name: 'Form Classes', value: 'formClasses' },
              { name: 'Form Element', value: 'formElement' },
              { name: 'Form ID', value: 'formId' },
              { name: 'Form Target', value: 'formTarget' },
              { name: 'Form Text', value: 'formText' },
              { name: 'Form URL', value: 'formUrl' },
              { name: 'History Source', value: 'historySource' },
              { name: 'HTML ID', value: 'htmlId' },
              { name: 'Language', value: 'language' },
              { name: 'New History Fragment', value: 'newHistoryFragment' },
              { name: 'New History State', value: 'newHistoryState' },
              { name: 'New History URL', value: 'newHistoryUrl' },
              { name: 'Old History Fragment', value: 'oldHistoryFragment' },
              { name: 'Old History State', value: 'oldHistoryState' },
              { name: 'Old History URL', value: 'oldHistoryUrl' },
              { name: 'OS Version', value: 'osVersion' },
              { name: 'Page Hostname', value: 'pageHostname' },
              { name: 'Page Path', value: 'pagePath' },
              { name: 'Page URL', value: 'pageUrl' },
              { name: 'Platform', value: 'platform' },
              { name: 'Query String', value: 'queryString' },
              { name: 'Random Number', value: 'randomNumber' },
              { name: 'Referrer', value: 'referrer' },
              { name: 'Request Method', value: 'requestMethod' },
              { name: 'Request Path', value: 'requestPath' },
              { name: 'Resolution', value: 'resolution' },
              { name: 'Scroll Depth Direction', value: 'scrollDepthDirection' },
              { name: 'Scroll Depth Threshold', value: 'scrollDepthThreshold' },
              { name: 'Scroll Depth Units', value: 'scrollDepthUnits' },
              { name: 'SDK Version', value: 'sdkVersion' },
              { name: 'Server Page Location Hostname', value: 'serverPageLocationHostname' },
              { name: 'Server Page Location Path', value: 'serverPageLocationPath' },
              { name: 'Server Page Location URL', value: 'serverPageLocationUrl' },
              { name: 'Video Current Time', value: 'videoCurrentTime' },
              { name: 'Video Duration', value: 'videoDuration' },
              { name: 'Video Percent', value: 'videoPercent' },
              { name: 'Video Provider', value: 'videoProvider' },
              { name: 'Video Status', value: 'videoStatus' },
              { name: 'Video Title', value: 'videoTitle' },
              { name: 'Video URL', value: 'videoUrl' },
              { name: 'Video Visible', value: 'videoVisible' },
              { name: 'Visitor Region', value: 'visitorRegion' }
            ]
          },          
          {
            displayName: 'Container ID',
            name: 'containerId',
            description: 'ID of container that will be merged into the current container',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Container Version ID',
            name: 'containerVersionId',
            description: 'The GTM ContainerVersion ID (Specify published to retrieve the currently published version)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Copy Settings',
            name: 'copySettings',            
            description: 'Whether or not to copy tag settings from this tag to the new tag',
            type: 'boolean',
            default: true,
          },
          {
            displayName: 'Copy Terms Of Service',
            name: 'copyTermsOfService',            
            description: 'Whether this bit is true or false, it must be set to true to accept all terms of service agreements copied from the current tag to the newly created tag (if this bit is false, the operation will fail)',
            type: 'boolean',
            default: true,
          }, 
          {
            displayName: 'Copy Users',
            name: 'copyUsers',            
            description: 'Whether or not to copy users from this tag to the new tag',
            type: 'boolean',
            default: true,
          },          
          {
            displayName: 'Destination ID',
            name: 'destinationId',
            description: 'Destination ID linked to a GTM Container (only one of destination_id or tag_id should be set)',
            type: 'string',
            default: ''
          },          
          {
            displayName: 'Fingerprint',
            name: 'fingerprint',
            description: 'When provided, this fingerprint must match the fingerprint of the account in storage',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Include Google Tags',
            name: 'includeGoogleTags',            
            description: 'Whether accounts are associated with Google Tag or not, it must be set to true to also retrieve accounts associated with Google Tag',
            type: 'boolean',
            default: true,
          },
          {
            displayName: 'Page Token',
            name: 'pageToken',           
            description: 'Continuation token for fetching the next page of results',
            type: 'string',
            default: '',
            typeOptions: {
              password: true
            }
          },
          {
            displayName: 'Setting Source',
            name: 'settingSource',            
            description: 'Specify the source of config setting after combine',
            type: 'options',
            default: 'current',
            options: [
              { name: 'Current', value: 'current' },
              { name: 'Other', value: 'other' },
              { name: 'Setting Source Unspecified', value: 'settingSourceUnspecified' }
            ]
          },          
          {
            displayName: 'Tag ID',
            name: 'tagId',
            description: 'Tag ID for a GTM Container (only one of destination_id or tag_id should be set)',
            type: 'string',
            default: ''
          },          
          {
            displayName: 'Tag Name',
            name: 'tagName',
            description: 'The name for the newly created tag',
            type: 'string',
            default: ''
          },          
          {
            displayName: 'Trigger ID',
            name: 'triggerId',
            description: 'The triggers to be moved to the folder',
            type: 'string',
            default: ''
          },          
          {
            displayName: 'Variable ID',
            name: 'variableId',
            description: 'The variables to be moved to the folder',
            type: 'string',
            default: ''
          }           
        ],
      },
      {
        displayName: 'Request Body',
        name: 'requestBody',
        type: 'json',
	      default: '',
        displayOptions:{ show:{ operation:['accountsUpdate', 'clientsCreate', 'clientsUpdate', 'containersCreate', 'containersUpdate', 'environmentsCreate', 'environmentsUpdate', 'foldersCreate', 'foldersUpdate', 'googleTagConfigurationsCreate', 'googleTagConfigurationsUpdate', 'tagsCreate', 'tagsUpdate', 'templatesCreate', 'templatesUpdate', 'transformationsCreate', 'transformationsUpdate', 'triggersCreate', 'triggersUpdate', 'userPermissionsCreate', 'userPermissionsUpdate', 'variablesCreate', 'variablesUpdate', 'versionsUpdate', 'workspacesCreate', 'workspacesCreateVersion', 'workspacesResolveConflict', 'workspacesUpdate', 'zonesCreate', 'zonesUpdate'] } }
      }
    ]
  };

  async execute(this:IExecuteFunctions) {
    const items = this.getInputData();
    const returnData = [];
    const credentials = await this.getCredentials('googleTagManagerOAuth2Api');
    if (!credentials) { throw new ApplicationError('Missing Google Tag Manager API Credentials'); }

    for (let i = 0; i < items.length; i++) {
      try {   
        const operation = this.getNodeParameter('operation', i) as string;
        const accountId = this.getNodeParameter('accountId', i, '') as string; 
        const containerId = this.getNodeParameter('containerId', i, '') as string; 
        const workspaceId = this.getNodeParameter('workspaceId', i, '') as string;
        const clientId = this.getNodeParameter('clientId', i, '') as string;   
        const destinationLinkId = this.getNodeParameter('destinationLinkId', i, '') as string;
        const environmentId = this.getNodeParameter('environmentId', i, '') as string;   
        const folderId = this.getNodeParameter('folderId', i, '') as string;     
        const googleTagConfigurationId = this.getNodeParameter('googleTagConfigurationId', i, '') as string;   
        const tagId = this.getNodeParameter('tagId', i, '') as string;    
        const templateId = this.getNodeParameter('templateId', i, '') as string;   
        const transformationId = this.getNodeParameter('transformationId', i, '') as string;  
        const triggerId = this.getNodeParameter('triggerId', i, '') as string;   
        const userPermissionsId = this.getNodeParameter('userPermissionsId', i, '') as string;  
        const variableId = this.getNodeParameter('variableId', i, '') as string;    
        const versionId = this.getNodeParameter('versionId', i, '') as string;    
        const zoneId = this.getNodeParameter('zoneId', i, '') as string;   
        const optionalQueryParameters = this.getNodeParameter('optionalQueryParameters', i, {}) as Record<string, any>;
        const requestBody = this.getNodeParameter('requestBody', i, {}) as JsonObject;

        let url = 'https://www.googleapis.com/tagmanager/v2';

        const queryParams = new URLSearchParams();
        Object.entries(optionalQueryParameters).forEach(([key, value]) => {
          if (value) queryParams.append(key, String(value));
        });
        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
        
        const httpMethod: 'GET' | 'POST' | 'PUT' | 'DELETE' = operation.includes('Combine') || operation.includes('Create') || operation.includes('Entities') || operation.includes('Link') || operation.includes('Move') || operation.includes('Publish') || operation.includes('QuickPreview') || operation.includes('Reauthorize') || operation.includes('ResolveConflict') || operation.includes('Revert') || operation.includes('SetLatest') || operation.includes('Sync') || operation.includes('Undelete') ? 'POST' :
                                                                operation.includes('Delete') ? 'DELETE' :
                                                                operation.includes('Update') ? 'PUT' : 'GET';

        switch (operation) {
          case 'accountsGet':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            url += `/accounts/${accountId}${queryString}`;
            break;
          case 'accountsList':
            url += `/accounts${queryString}`;
            break;
          case 'accountsUpdate':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            url += `/accounts/${accountId}${queryString}`;
            break;
          case 'builtInVariablesCreate':
          case 'builtInVariablesDelete': 
          case 'builtInVariablesList':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/built_in_variables${queryString}`; 
            break;               
          case 'builtInVariablesRevert':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/built_in_variables:revert${queryString}`; 
            break;
          case 'clientsCreate':
          case 'clientsList':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/clients${queryString}`; 
            break;
          case 'clientsDelete':
          case 'clientsGet':
          case 'clientsUpdate':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            if (!clientId) throw new NodeOperationError(this.getNode(),'GTM Client ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/clients/${clientId}${queryString}`; 
            break;
          case 'clientsRevert':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            if (!clientId) throw new NodeOperationError(this.getNode(),'GTM Client ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/clients/${clientId}:revert${queryString}`; 
            break;
          case 'containersCombine':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            url += `/accounts/${accountId}/containers/${containerId}:combine${queryString}`; 
            break;
          case 'containersCreate':
          case 'containersList':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            url += `/accounts/${accountId}/containers${queryString}`; 
            break;
          case 'containersDelete':
          case 'containersGet':
          case 'containersUpdate':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            url += `/accounts/${accountId}/containers/${containerId}${queryString}`; 
            break;
          case 'containersLookup':
              url += `/accounts/containers:lookup`; 
              break;
          case 'containersMoveTagId':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            url += `/accounts/${accountId}/containers/${containerId}:move_tag_id${queryString}`;
            break;
          case 'containersSnippet':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            url += `/accounts/${accountId}/containers/${containerId}:snippet${queryString}`;
            break;
          case 'destinationsGet':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!destinationLinkId) throw new NodeOperationError(this.getNode(),'Google Tag Destination\'s Link ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/destinations/${destinationLinkId}${queryString}`;
            break;
          case 'destinationsLink':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/destinations:link${queryString}`;
            break;
          case 'destinationsList':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/destinations${queryString}`;
            break;
          case 'environmentsCreate':
          case 'environmentsList':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/environments${queryString}`;
            break;
          case 'environmentsDelete':
          case 'environmentsGet':
          case 'environmentsUpdate':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!environmentId) throw new NodeOperationError(this.getNode(),'GTM Environment ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/environments/${environmentId}${queryString}`;
            break;
          case 'environmentsReauthorize':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!environmentId) throw new NodeOperationError(this.getNode(),'GTM Environment ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/environments/${environmentId}:reauthorize${queryString}`;
            break;
          case 'foldersCreate':
          case 'foldersList':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/folders${queryString}`;
            break;
          case 'foldersDelete':
          case 'foldersGet':
          case 'foldersUpdate':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            if (!folderId) throw new NodeOperationError(this.getNode(),'GTM Folder ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/folders/${folderId}${queryString}`;
            break;
          case 'foldersEntitiesList':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            if (!folderId) throw new NodeOperationError(this.getNode(),'GTM Folder ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/folders/${folderId}:entities${queryString}`;
            break;
          case 'foldersMoveEntities':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            if (!folderId) throw new NodeOperationError(this.getNode(),'GTM Folder ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/folders/${folderId}:move_entities_to_folder${queryString}`;
            break;
          case 'foldersRevert':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            if (!folderId) throw new NodeOperationError(this.getNode(),'GTM Folder ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/folders/${folderId}:revert${queryString}`;
            break;
          case 'googleTagConfigurationsCreate':
          case 'googleTagConfigurationsList':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/gtag_config${queryString}`;
            break;
          case 'googleTagConfigurationsDelete':
          case 'googleTagConfigurationsGet':
          case 'googleTagConfigurationsUpdate':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            if (!googleTagConfigurationId) throw new NodeOperationError(this.getNode(),'Google Tag Configuration ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/gtag_config/${googleTagConfigurationId}${queryString}`;
            break;
          case 'tagsCreate':
          case 'tagsList':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/tags${queryString}`;
            break;
          case 'tagsDelete':
          case 'tagsGet':
          case 'tagsUpdate':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            if (!tagId) throw new NodeOperationError(this.getNode(),'GTM Tag ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/tags/${tagId}${queryString}`;
            break;
          case 'tagsRevert':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            if (!tagId) throw new NodeOperationError(this.getNode(),'GTM Tag ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/tags/${tagId}:revert${queryString}`;
            break;
          case 'templatesCreate':
          case 'templatesList':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/templates${queryString}`;
            break;
          case 'templatesDelete':
          case 'templatesGet':
          case 'templatesUpdate':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            if (!templateId) throw new NodeOperationError(this.getNode(),'GTM Template ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/templates/${templateId}${queryString}`;
            break;
          case 'templatesRevert':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            if (!templateId) throw new NodeOperationError(this.getNode(),'GTM Template ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/templates/${templateId}:revert${queryString}`;
            break;
          case 'transformationsCreate':
          case 'transformationsList':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/transformations${queryString}`;
            break;
          case 'transformationsDelete':
          case 'transformationsGet':
          case 'transformationsUpdate':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            if (!transformationId) throw new NodeOperationError(this.getNode(),'GTM Transformation ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/transformations/${transformationId}${queryString}`;
            break;
          case 'transformationsRevert':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            if (!transformationId) throw new NodeOperationError(this.getNode(),'GTM Transformation ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/transformations/${transformationId}:revert${queryString}`;
            break;
          case 'triggersCreate':
          case 'triggersList':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/triggers${queryString}`;
            break;
          case 'triggersDelete':
          case 'triggersGet':
          case 'triggersUpdate':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            if (!triggerId) throw new NodeOperationError(this.getNode(),'GTM Trigger ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/triggers/${triggerId}${queryString}`;
            break;
          case 'triggersRevert':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            if (!triggerId) throw new NodeOperationError(this.getNode(),'GTM Trigger ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/triggers/${triggerId}:revert${queryString}`;
            break;
          case 'userPermissionsCreate':
          case 'userPermissionsList':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            url += `/accounts/${accountId}/user_permissions${queryString}`;
            break;
          case 'userPermissionsDelete':
          case 'userPermissionsGet':
          case 'userPermissionsUpdate':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!userPermissionsId) throw new NodeOperationError(this.getNode(),'GTM User Permissions ID is required');
            url += `/accounts/${accountId}/user_permissions/${userPermissionsId}${queryString}`;
            break;
          case 'variablesCreate':
          case 'variablesList':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/variables${queryString}`;
            break;
          case 'variablesDelete':
          case 'variablesGet':
          case 'variablesUpdate':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            if (!variableId) throw new NodeOperationError(this.getNode(),'GTM Variable ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/variables/${variableId}${queryString}`;
            break;
          case 'variablesRevert':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            if (!variableId) throw new NodeOperationError(this.getNode(),'GTM Variable ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/variables/${variableId}:revert${queryString}`;
            break;
          case 'versionsDelete':
          case 'versionsGet':
          case 'versionsUpdate':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!versionId) throw new NodeOperationError(this.getNode(),'GTM Version ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/versions/${versionId}${queryString}`;
            break;
          case 'versionsLive':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/versions:live${queryString}`;
            break;
          case 'versionsPublish':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!versionId) throw new NodeOperationError(this.getNode(),'GTM Version ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/versions/${versionId}:publish${queryString}`;
            break;
          case 'versionsSetLatest':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!versionId) throw new NodeOperationError(this.getNode(),'GTM Version ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/versions/${versionId}:set_latest${queryString}`;
            break;
          case 'versionsUndelete':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!versionId) throw new NodeOperationError(this.getNode(),'GTM Version ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/versions/${versionId}:undelete${queryString}`;
            break;
          case 'versionsHeadersLatest':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/version_headers:latest${queryString}`;
            break;
          case 'versionsHeadersList':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/version_headers${queryString}`;
            break;
          case 'workspacesCreate':
          case 'workspacesList':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces${queryString}`;
            break;
          case 'workspacesDelete':
          case 'workspacesGet':
          case 'workspacesUpdate':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}${queryString}`;
            break;
          case 'workspacesCreateVersion':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}:create_version${queryString}`;
            break;
          case 'workspacesGetStatus':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/status${queryString}`;
            break;
          case 'workspacesQuickPreview':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}:quick_preview${queryString}`;
            break;
          case 'workspacesResolveConflict':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}:resolve_conflict${queryString}`;
            break;
          case 'workspacesSync':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}:sync${queryString}`;
            break;
          case 'zonesCreate':
          case 'zonesList':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/zones${queryString}`;
            break;
          case 'zonesDelete':
          case 'zonesGet':
          case 'zonesUpdate':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            if (!zoneId) throw new NodeOperationError(this.getNode(),'GTM Zone ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/zones/${zoneId}${queryString}`;
            break;
          case 'zonesRevert':
            if (!accountId) throw new NodeOperationError(this.getNode(),'GTM Account ID is required');
            if (!containerId) throw new NodeOperationError(this.getNode(),'GTM Container ID is required');
            if (!workspaceId) throw new NodeOperationError(this.getNode(),'GTM Workspace ID is required');
            if (!zoneId) throw new NodeOperationError(this.getNode(),'GTM Zone ID is required');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/zones/${zoneId}:revert${queryString}`;
            break;
          default:
            throw new NodeOperationError(this.getNode(),`Unknown operation:${operation}`);
        }

        const requestConf = {
          method: httpMethod,
          url,
          headers: { 'Content-Type': 'application/json' },
          ...(httpMethod === 'PUT' || httpMethod === 'POST' ? { body: requestBody } : {})
        };

        const responseData = await this.helpers.requestOAuth2.call(this, 'googleTagManagerOAuth2Api', requestConf);
        
        const parsedResponse = JSON.parse(responseData);
        
        // Se a resposta contém um array dentro de uma propriedade (como 'account', 'container', etc.)
        // extrair os itens diretamente para evitar aninhamento
        if (parsedResponse && typeof parsedResponse === 'object') {
          // Procurar por propriedades que contêm arrays (padrão comum do GTM API)
          const arrayProperties = Object.keys(parsedResponse).filter(key => 
            Array.isArray(parsedResponse[key])
          );
          
          if (arrayProperties.length === 1) {
            // Se há apenas uma propriedade que é array, usar os itens diretamente
            const arrayProperty = arrayProperties[0];
            const items = parsedResponse[arrayProperty];
            returnData.push(...items);
          } else if (arrayProperties.length > 1) {
            // Se há múltiplas propriedades array, manter a estrutura original
            returnData.push(parsedResponse);
          } else {
            // Se não há arrays ou é um objeto único, adicionar como está
            returnData.push(parsedResponse);
          }
        } else {
          returnData.push(parsedResponse);
        }
      } catch (error) {
        throw new NodeApiError(this.getNode(), {
          message: `Error calling GTM API: ${error.message}`,
          description: error.stack || 'No stack trace available'
        });
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}