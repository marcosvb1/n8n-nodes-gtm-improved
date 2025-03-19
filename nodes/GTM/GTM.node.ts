import { 
  INodeType, 
  INodeTypeDescription, 
  IExecuteFunctions, 
  NodeConnectionType, 
  JsonObject 
} from 'n8n-workflow';

export class GTM implements INodeType {
  description:INodeTypeDescription = {
    displayName: 'Google Tag Manager',
    name: 'gtm',
    group:['Google'],
    version:1,
    description: 'The Google Tag Manager API provides access to Tag Manager configuration data for an authorized user. Use the API to manage accounts, containers and container versions, tags, rules, triggers, variables, and user permissions.',
    defaults:{ name: 'Google Tag Manager' },
    icon: 'file:gtm.png',
    inputs:[NodeConnectionType.Main],
    outputs:[NodeConnectionType.Main],
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
        options: [
          { name: 'Accounts', value: 'accounts', description: 'Manage GTM Accounts' },
          { name: 'Built-In Variables', value: 'builtInVariables', description: 'Manage GTM Built-In Variables' },
          { name: 'Clients', value: 'clients', description: 'Manage GTM Clients' },
          { name: 'Containers', value: 'containers', description: 'Manage GTM Containers' },
          { name: 'Destinations', value: 'destinations', description: 'Manage GTM Destinations' },
          { name: 'Environments', value: 'environments', description: 'Manage GTM Environments' },
          { name: 'Folders', value: 'folders', description: 'Manage GTM Folders' },
          { name: 'Google Tag Configuration', value: 'googleTagConfigurations', description: 'Manage Google Tag Configuration' },
          { name: 'Tags', value: 'tags', description: 'Manage GTM Tags' },
          { name: 'Templates', value: 'templates', description: 'Manage GTM Templates' },
          { name: 'Transformations', value: 'transformations', description: 'Manage GTM Transformations' },
          { name: 'Triggers', value: 'triggers', description: 'Manage GTM Triggers' },
          { name: 'User Permissions', value: 'userPermissions', description: 'Manage GTM User Permissions' },
          { name: 'Variables', value: 'variables', description: 'Manage GTM Variables' },
          { name: 'Version Headers', value: 'versionHeaders', description: 'Manage GTM Version Headers' },
          { name: 'Versions', value: 'versions', description: 'Manage GTM Versions' },
          { name: 'Workspaces', value: 'workspaces', description: 'Manage GTM Workspaces' },
          { name: 'Zones', value: 'zones', description: 'Manage GTM Zones' }
        ],
        default: 'accounts',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: { show: { resource: ['accounts'] } },
        options: [
          { name: 'Get Account', value: 'accountsGet', action:'Gets an Account', description: 'Gets a GTM Account.' },
          { name: 'List Accounts', value: 'accountsList', action:'Lists all Accounts', description: 'Lists all GTM Accounts accessible to the user.' },
          { name: 'Update Account', value: 'accountsUpdate', action:'Updates an Account', description: 'Updates a GTM Account.' }
        ],
        default: 'accountsList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: { show: { resource: ['builtInVariables'] } },
        options: [
          { name: 'Create Built-In Variable', value: 'builtInVariablesCreate', action: 'Creates a Built-In Variable', description: 'Creates a GTM Built-In Variable.' },
          { name: 'Delete Built-In Variable', value: 'builtInVariablesDelete', action: 'Deletes a Built-In Variable', description: 'Deletes a GTM Built-In Variable.' },
          { name: 'List Built-In Variables', value: 'builtInVariablesList', action: 'Lists all the enabled Built-In Variables', description: 'Lists all the enabled Built-In Variables of a GTM Container.' },
          { name: 'Revert Built-In Variable', value: 'builtInVariablesRevert', action: 'Reverts changes to a Built-In Variable', description: 'Reverts changes to a GTM Built-In Variable in a GTM Workspace.' }
        ],
        default: 'builtInVariablesList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: { show: { resource: ['clients'] } },
        options: [
          { name: 'Create Client', value: 'clientsCreate', action: 'Creates a Client', description: 'Creates a GTM Client.' },
          { name: 'Delete Client', value: 'clientsDelete', action: 'Deletes a Client', description: 'Deletes a GTM Client.' },
          { name: 'Get Client', value: 'clientsGet', action: 'Gets a Client', description: 'Gets a GTM Client.' },
          { name: 'List Clients', value: 'clientsList', action: 'Lists all Clients', description: 'Lists all GTM Clients of a GTM container workspace.' },
          { name: 'Revert Client', value: 'clientsRevert', action: 'Reverts changes to a Client', description: 'Reverts changes to a GTM Client in a GTM Workspace.' },
          { name: 'Update Client', value: 'clientsUpdate', action: 'Updates a Client', description: 'Updates a GTM Client.' }
        ],
        default: 'clientsList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: { show: { resource: ['containers'] } },
        options: [
          { name: 'Combine Containers', value: 'containersCombine', action: 'Combines Containers', description: 'Combines Containers.' },
          { name: 'Create Container', value: 'containersCreate',  action: 'Creates a Container', description: 'Creates a Container.' },
          { name: 'Delete Container', value: 'containersDelete', action: 'Deletes a Container', description: 'Deletes a Container.' },
          { name: 'Get Container', value: 'containersGet', action: 'Gets a Container', description: 'Gets a Container.' },
          { name: 'List Containers', value: 'containersList',  action: 'Lists all Containers', description: 'Lists all Containers that belongs to a GTM Account.' },
          { name: 'Lookup Container', value: 'containersLookup', action: 'Looks up a Container', description: 'Looks up a Container by destination ID or tag ID.' },
          { name: 'Move Tag ID Container', value: 'containersMoveTagId', action: 'Move Tag ID out of a Container', description: 'Move Tag ID out of a Container.' },
          { name: 'Snippet Container', value: 'containersSnippet', action: 'Gets the tagging snippet for a Container', description: 'Gets the tagging snippet for a Container.' },
          { name: 'Update Container', value: 'containersUpdate', action: 'Updates a Container', description: 'Updates a Container.' }
        ],
        default: 'containersList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: { show: { resource: ['destinations'] } },
        options: [
          { name: 'Get Destination', value: 'destinationsGet', action: 'Gets a Destination', description: 'Gets a Destination.' },
          { name: 'Link Destination', value: 'destinationsLink', action: 'Adds a Destination', description: 'Adds a Destination to this Container and removes it from the Container to which it is currently linked.' },
          { name: 'List Destinations', value: 'destinationsList', action: 'Lists all Destinations', description: 'Lists all Destinations linked to a GTM Container.' }
        ],
        default: 'destinationsList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: { show: { resource: ['environments'] } },
        options: [
          { name: 'Create Environment', value: 'environmentsCreate', action: 'Creates an Environment', description: 'Creates a GTM Environment.' },
          { name: 'Delete Environment', value: 'environmentsDelete', action: 'Deletes an Environment', description: 'Deletes a GTM Environment.' },
          { name: 'Get Environment', value: 'environmentsGet', action: 'Gets an Environment', description: 'Gets a GTM Environment.' },
          { name: 'List Environments', value: 'environmentsList', action: 'Lists all Environments', description: 'Lists all GTM Environments of a GTM Container.' },
          { name: 'Reauthorize Environment', value: 'environmentsReauthorize', action: 'Re-generates the authorization code for an Environment', description: 'Re-generates the authorization code for a GTM Environment.' },
          { name: 'Update Environment', value: 'environmentsUpdate', action: 'Updates an Environment', description: 'Updates a GTM Environment.' }
        ],
        default: 'environmentsList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: { show: { resource: ['folders'] } },
        options: [
          { name: 'Create Folder', value: 'foldersCreate', action: 'Creates a Folder', description: 'Creates a GTM Folder.' },
          { name: 'Delete Folder', value: 'foldersDelete', action: 'Deletes a Folder', description: 'Deletes a GTM Folder.' },
          { name: 'Entities in Folder', value: 'foldersEntitiesList', action: 'List all entities in a Folder', description: 'List all entities in a GTM Folder.' },
          { name: 'Get Folder', value: 'foldersGet', action: 'Gets a Folder', description: 'Gets a GTM Folder.' },
          { name: 'List Folders', value: 'foldersList', action: 'Lists all  Folders', description: 'Lists all GTM Folders of a Container.' },
          { name: 'Move entities to a Folder', value: 'foldersMoveEntities', action: 'Moves entities to a Folder', description: 'Moves entities to a GTM Folder. If Folder ID in the request equals 0, this will instead move entities out of the folder they currently belong to.' },
          { name: 'Revert Folder', value: 'foldersRevert', action: 'Reverts changes to a Folder', description: 'Reverts changes to a GTM Folder in a GTM Workspace.' },
          { name: 'Update Folder', value: 'foldersUpdate', action: 'Updates a Folder', description: 'Updates a GTM Folder.' }
        ],
        default: 'foldersList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: { show: { resource: ['googleTagConfigurations'] } },
        options: [
          { name: 'Create Google Tag Configuration', value: 'googleTagConfigurationsCreate', action: 'Creates a Google tag config', description: 'Creates a Google tag config.' },
          { name: 'Delete Google Tag Configuration', value: 'googleTagConfigurationsDelete', action: 'Deletes a Google tag config', description: 'Deletes a Google tag config.' },
          { name: 'Get Google Tag Configuration', value: 'googleTagConfigurationsGet', action: 'Gets a Google tag config', description: 'Gets a Google tag config.' },
          { name: 'List Google Tag Configurations', value: 'googleTagConfigurationsList', action: 'Lists all Google tag configs', description: 'Lists all Google tag configs in a Container.' },
          { name: 'Update Google Tag Configuration', value: 'googleTagConfigurationsUpdate', action: 'Updates a Google tag config', description: 'Updates a Google tag config.' }
        ],
        default: 'googleTagConfigurationsList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: { show: { resource: ['tags'] } },
        options: [
          { name: 'Create Tags', value: 'tagsCreate', action: 'Creates a Tag', description: 'Creates a GTM Tag.' },
          { name: 'Delete Tag', value: 'tagsDelete', action: 'Deletes a Tag', description: 'Deletes a GTM Tag.' },
          { name: 'Get Tag', value: 'tagsGet', action: 'Gets a Tag', description: 'Gets a GTM Tag.' },
          { name: 'List Tags', value: 'tagsList', action: 'Lists all Tags', description: 'Lists all GTM Tags of a Container.' },
          { name: 'Revert Tags', value: 'tagsRevert', action: 'Reverts changes to a Tag', description: 'Reverts changes to a GTM Tag in a GTM Workspace.' },
          { name: 'Update Tags', value: 'tagsUpdate', action: 'Updates a Tag', description: 'Updates a GTM Tag.' }
        ],
        default: 'tagsList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: { show: { resource: ['templates'] } },
        options: [
          { name: 'Create Template', value: 'templatesCreate', action: 'Creates a Custom Template', description: 'Creates a GTM Custom Template.' },
          { name: 'Delete Template', value: 'templatesDelete', action: 'Deletes a Template', description: 'Deletes a GTM Template.' },
          { name: 'Get Template', value: 'templatesGet', action: 'Gets a  Template', description: 'Gets a GTM Template.' },
          { name: 'List Templates', value: 'templatesList', action: 'Lists all Templates', description: 'Lists all GTM Templates of a GTM container workspace.' },
          { name: 'Revert Template', value: 'templatesRevert', action: 'Reverts changes to a Template', description: 'Reverts changes to a GTM Template in a GTM Workspace.' },
          { name: 'Update Template', value: 'templatesUpdate', action: 'Updates a Template', description: 'Updates a GTM Template.' }
        ],
        default: 'templatesList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: { show: { resource: ['transformations'] } },
        options: [
          { name: 'Create Transformation', value: 'transformationsCreate', action: 'Creates a Transformation', description: 'Creates a GTM Transformation.' },
          { name: 'Delete Transformation', value: 'transformationsDelete', action: 'Deletes a Transformation', description: 'Deletes a GTM Transformation.' },
          { name: 'Get Transformation', value: 'transformationsGet', action: 'Gets a Transformation', description: 'Gets a GTM Transformation.' },
          { name: 'List Transformations', value: 'transformationsList', action: 'Lists all Transformations', description: 'Lists all GTM Transformations of a GTM container workspace.' },
          { name: 'Revert Transformation', value: 'transformationsRevert', action: 'Reverts changes to a Transformation', description: 'Reverts changes to a GTM Transformation in a GTM Workspace.' },
          { name: 'Update Transformation', value: 'transformationsUpdate', action: 'Updates a Transformation', description: 'Updates a GTM Transformation.' }
        ],
        default: 'transformationsList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: { show: { resource: ['triggers'] } },
        options: [
          { name: 'Create Trigger', value: 'triggersCreate', action: 'Creates a Trigger', description: 'Creates a GTM Trigger.' },
          { name: 'Delete Trigger', value: 'triggersDelete', action: 'Deletes a Trigger', description: 'Deletes a GTM Trigger.' },
          { name: 'Get Trigger', value: 'triggersGet', action: 'Gets a Trigger', description: 'Gets a GTM Trigger.' },
          { name: 'List Triggers', value: 'triggersList', action: 'Lists all Triggers', description: 'Lists all GTM Triggers of a Container.' },
          { name: 'Revert Trigger', value: 'triggersRevert', action: 'Reverts changes to a Trigger', description: 'Reverts changes to a GTM Trigger in a GTM Workspace.' },
          { name: 'Update Trigger', value: 'triggersUpdate', action: 'Updates a Trigger', description: 'Updates a GTM Trigger.' }
        ],
        default: 'triggersList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: { show: { resource: ['userPermissions'] } },
        options: [
          { name: 'Create User Permissions', value: 'userPermissionsCreate', action: 'Creates a User\'s Permissions', description: 'Creates a user\'s Account & Container access.' },
          { name: 'Delete User Permissions', value: 'userPermissionsDelete', action: 'Removes a User\'s Permissions', description: 'Removes a user from the account, revoking access to it and all of its containers.' },
          { name: 'Get User Permission', value: 'userPermissionsGet', action: 'Gets a User\'s Permissions', description: 'Gets a user\'s Account & Container access.' },
          { name: 'List User Permissions', value: 'userPermissionsList', action: 'List all users that have access', description: 'List all users that have access to the account along with Account and Container user access granted to each of them.' },
          { name: 'Update User Permissions', value: 'userPermissionsUpdate', action: 'Updates a User\'s Permissions', description: 'Updates a user\'s Account & Container access.' }
        ],
        default: 'userPermissionsList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: { show: { resource: ['variables'] } },
        options: [
          { name: 'Create Variable', value: 'variablesCreate', action: 'Creates a Variable', description: 'Creates a GTM Variable.' },
          { name: 'Delete Variable', value: 'variablesDelete', action: 'Deletes a Variable', description: 'Deletes a GTM Variable.' },
          { name: 'Get Variable', value: 'variablesGet', action: 'Gets a Variable', description: 'Gets a GTM Variable.' },
          { name: 'List Variables', value: 'variablesList', action: 'Lists all Variables', description: 'Lists all GTM Variables of a Container.' },
          { name: 'Revert Variable', value: 'variablesRevert', action: 'Reverts changes to a Variable', description: 'Reverts changes to a GTM Variable in a GTM Workspace.' },
          { name: 'Update Variable', value: 'variablesUpdate', action: 'Updates a Variable', description: 'Updates a GTM Variable.' }
        ],
        default: 'variablesList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: { show: { resource: ['versionsHeaders'] } },
        options: [
          { name: 'Latest Version Header', value: 'versionsHeadersLatest', action: 'Gets the latest container Version Header', description: 'Gets the latest Container Version Header' },
          { name: 'List Version Headers', value: 'versionsHeadersList', action: 'Lists all Container Versions', description: 'Lists all Container Versions of a GTM Container.' }
        ],
        default: 'versionsHeadersList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: { show: { resource: ['versions'] } },
        options: [
          { name: 'Delete Version', value: 'versionsDelete', action: 'Deletes a Version', description: 'Deletes a Container Version.' },
          { name: 'Get Version', value: 'versionsGet', action: 'Gets a Version', description: 'Gets a Container Version.' },
          { name: 'Live Version', value: 'versionsLive', action: 'Gets the live Version', description: 'Gets the live (i.e. published) container version.' },
          { name: 'Publish Version', value: 'versionsPublish', action: 'Publishes a Version', description: 'Publishes a Container Version.' },
          { name: 'Set Latest Version', value: 'versionsSetLatest', action: 'Sets the latest Version', description: 'Sets the latest version used for synchronization of workspaces when detecting conflicts and errors.' },
          { name: 'Undelete Version', value: 'versionsUndelete', action: 'Undeletes a Version', description: 'Undeletes a Container Version.' },
          { name: 'Update Version', value: 'versionsUpdate', action: 'Updates a Version', description: 'Updates a Container Version.' }
        ],
        default: 'versionsLive',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: { show: { resource: ['workspaces'] } },
        options: [
          { name: 'Crate Workspace', value: 'workspacesCreate', action: 'Creates a Workspace', description: 'Creates a Workspace.' },
          { name: 'Create Version Workspace', value: 'workspacesCreateVersion', action: 'Creates a Container Version from the entities present in the Workspace', description: 'Creates a Container Version from the entities present in the workspace, deletes the workspace, and sets the base container version to the newly created version.' },
          { name: 'Delete Workspace', value: 'workspacesDelete', action: 'Deletes a Workspace.', description: 'Deletes a Workspace.' },
          { name: 'Get Workspaces', value: 'workspacesGet', action: 'Gets a Workspace', description: 'Gets a Workspace.' },
          { name: 'Get Status Workspace', value: 'workspacesGetStatus', action: 'Finds conflicting and modified entities in the Workspace.', description: 'Finds conflicting and modified entities in the workspace.' },
          { name: 'List Workspaces', value: 'workspacesList', action: 'Lists all Workspaces', description: 'Lists all Workspaces that belong to a GTM Container.' },
          { name: 'Quick Preview Workspace', value: 'workspacesQuickPreview', action: 'Quick previews a Workspace', description: 'Quick previews a workspace by creating a fake container version from all entities in the provided workspace.' },
          { name: 'Resolve Conflict Workspace', value: 'workspacesResolveConflict', action: 'Resolves a merge conflict for a Workspace entity', description: 'Resolves a merge conflict for a workspace entity by updating it to the resolved entity passed in the request.' },
          { name: 'Sync Workspace', value: 'workspacesSync', action: 'Syncs a Workspace to the latest container version', description: 'Syncs a workspace to the latest container version by updating all unmodified workspace entities and displaying conflicts for modified entities.' },
          { name: 'Update Workspace', value: 'workspacesUpdate', action: 'Updates a Workspace', description: 'Updates a Workspace.' }
        ],
        default: 'workspacesList',
        required: true,
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: { show: { resource: ['zones'] } },
        options: [
          { name: 'Create Zone', value: 'zonesCreate', action: 'Creates a Zone', description: 'Creates a GTM Zone.' },
          { name: 'Delete Zone', value: 'zonesDelete', action: 'Deletes a Zone', description: 'Deletes a GTM Zone.' },
          { name: 'Get Zone', value: 'zonesGet', action: 'Gets a Zone', description: 'Gets a GTM Zone.' },
          { name: 'List Zones', value: 'zonesList', action: 'Lists all Zones', description: 'Lists all GTM Zones of a GTM container workspace.' },
          { name: 'Revert Zone', value: 'zonesRevert', action: 'Reverts changes to a Zone', description: 'Reverts changes to a GTM Zone in a GTM Workspace.' },
          { name: 'Update Zone', value: 'zonesUpdate', action: 'Updates a Zone', description: 'Updates a GTM Zone.' }
        ],
        default: 'zonesList',
        required: true,
      },
      {
        displayName: 'Account ID',
        name: 'accountId',
        description: 'GTM Account ID',
        placeholder: 'Enter your GTM Account ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['accountsGet', 'accountsUpdate', 'builtInVariablesCreate', 'builtInVariablesDelete', 'builtInVariablesList', 'builtInVariablesRevert', 'clientsCreate', 'clientsDelete', 'clientsGet', 'clientsList', 'clientsRevert', 'clientsUpdate', 'containersCombine', 'containersCreate', 'containersDelete', 'containersGet', 'containersList', 'containersMoveTagId', 'containersSnippet', 'containersUpdate', 'destinationsGet', 'destinationsLink', 'destinationsList', 'environmentsCreate', 'environmentsDelete', 'environmentsGet', 'environmentsList', 'environmentsReauthorize', 'environmentsUpdate', 'foldersCreate', 'foldersDelete', 'foldersEntitiesList', 'foldersGet', 'foldersList', 'foldersMoveEntities', 'foldersRevert', 'foldersUpdate', 'googleTagConfigurationsCreate', 'googleTagConfigurationsDelete', 'googleTagConfigurationsGet', 'googleTagConfigurationsList', 'googleTagConfigurationsUpdate', 'tagsCreate', 'tagsDelete', 'tagsGet', 'tagsList', 'tagsRevert', 'tagsUpdate', 'templatesCreate', 'templatesDelete', 'templatesGet', 'templatesList', 'templatesRevert', 'templatesUpdate', 'transformationsCreate', 'transformationsDelete', 'transformationsGet', 'transformationsList', 'transformationsRevert', 'transformationsUpdate', 'triggersCreate', 'triggersDelete', 'triggersGet', 'triggersList', 'triggersRevert', 'triggersUpdate', 'userPermissionsCreate', 'userPermissionsDelete', 'userPermissionsGet', 'userPermissionsList', 'userPermissionsUpdate', 'variablesCreate', 'variablesDelete', 'variablesGet', 'variablesList', 'variablesRevert', 'variablesUpdate', 'versionsHeadersLatest', 'versionsHeadersList', 'versionsDelete', 'versionsGet', 'versionsLive', 'versionsPublish', 'versionsSetLatest', 'versionsUndelete', 'versionsUpdate', 'workspacesCreate', 'workspacesCreateVersion', 'workspacesDelete', 'workspacesGet', 'workspacesGetStatus', 'workspacesList', 'workspacesQuickPreview', 'workspacesResolveConflict', 'workspacesSync', 'workspacesUpdate', 'zonesCreate', 'zonesDelete', 'zonesGet', 'zonesList', 'zonesRevert', 'zonesUpdate'] } }
      },
      {
        displayName: 'Container ID',
        name: 'containerId',
        description: 'GTM Container ID',
        placeholder: 'Enter your GTM Container ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['builtInVariablesCreate', 'builtInVariablesDelete', 'builtInVariablesList', 'builtInVariablesRevert', 'clientsCreate', 'clientsDelete', 'clientsGet', 'clientsList', 'clientsRevert', 'clientsUpdate', 'containersCombine', 'containersDelete', 'containersGet', 'containersMoveTagId', 'containersSnippet', 'containersUpdate', 'destinationsGet', 'destinationsLink', 'destinationsList', 'environmentsCreate', 'environmentsDelete', 'environmentsGet', 'environmentsList', 'environmentsReauthorize', 'environmentsUpdate', 'foldersCreate', 'foldersDelete', 'foldersEntitiesList', 'foldersGet', 'foldersList', 'foldersMoveEntities', 'foldersRevert', 'foldersUpdate', 'googleTagConfigurationsCreate', 'googleTagConfigurationsDelete', 'googleTagConfigurationsGet', 'googleTagConfigurationsList', 'googleTagConfigurationsUpdate', 'tagsCreate', 'tagsDelete', 'tagsGet', 'tagsList', 'tagsRevert', 'tagsUpdate', 'templatesCreate', 'templatesDelete', 'templatesGet', 'templatesList', 'templatesRevert', 'templatesUpdate', 'transformationsCreate', 'transformationsDelete', 'transformationsGet', 'transformationsList', 'transformationsRevert', 'transformationsUpdate', 'triggersCreate', 'triggersDelete', 'triggersGet', 'triggersList', 'triggersRevert', 'triggersUpdate', 'variablesCreate', 'variablesDelete', 'variablesGet', 'variablesList', 'variablesRevert', 'variablesUpdate', 'versionsHeadersLatest', 'versionsHeadersList', 'versionsDelete', 'versionsGet', 'versionsLive', 'versionsPublish', 'versionsSetLatest', 'versionsUndelete', 'versionsUpdate', 'workspacesCreate', 'workspacesCreateVersion', 'workspacesDelete', 'workspacesGet', 'workspacesGetStatus', 'workspacesList', 'workspacesQuickPreview', 'workspacesResolveConflict', 'workspacesSync', 'workspacesUpdate', 'zonesCreate', 'zonesDelete', 'zonesGet', 'zonesList', 'zonesRevert', 'zonesUpdate'] } }
      }, 
      {
        displayName: 'Workspace ID',
        name: 'workspaceId',        
        description: 'GTM Workspace ID',
        placeholder: 'Enter your GTM Workspace ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['builtInVariablesCreate', 'builtInVariablesDelete', 'builtInVariablesList', 'builtInVariablesRevert', 'clientsCreate', 'clientsDelete', 'clientsGet', 'clientsList', 'clientsRevert', 'clientsUpdate', 'foldersCreate', 'foldersDelete', 'foldersEntitiesList', 'foldersGet', 'foldersList', 'foldersMoveEntities', 'foldersRevert', 'foldersUpdate', 'googleTagConfigurationsCreate', 'googleTagConfigurationsDelete', 'googleTagConfigurationsGet', 'googleTagConfigurationsList', 'googleTagConfigurationsUpdate', 'tagsCreate', 'tagsDelete', 'tagsGet', 'tagsList', 'tagsRevert', 'tagsUpdate', 'templatesCreate', 'templatesDelete', 'templatesGet', 'templatesList', 'templatesRevert', 'templatesUpdate', 'transformationsCreate', 'transformationsDelete', 'transformationsGet', 'transformationsList', 'transformationsRevert', 'transformationsUpdate', 'triggersCreate', 'triggersDelete', 'triggersGet', 'triggersList', 'triggersRevert', 'triggersUpdate', 'variablesCreate', 'variablesDelete', 'variablesGet', 'variablesList', 'variablesRevert', 'variablesUpdate', 'workspacesCreateVersion', 'workspacesDelete', 'workspacesGet', 'workspacesGetStatus', 'workspacesQuickPreview', 'workspacesResolveConflict', 'workspacesSync', 'workspacesUpdate', 'zonesCreate', 'zonesDelete', 'zonesGet', 'zonesList', 'zonesRevert', 'zonesUpdate'] } }
      },
      {
        displayName: 'Client ID',
        name: 'clientId',        
        description: 'GTM Client ID',
        placeholder: 'Enter your GTM Client ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['clientsDelete', 'clientsGet', 'clientsRevert', 'clientsUpdate'] } }
      },  
      {
        displayName: 'Destination Link ID',
        name: 'destinationLinkId',        
        description: 'Google Tag Destination Link ID',
        placeholder: 'Enter your Google Tag Destination Link ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['destinationsGet'] } }
      },  
      {
        displayName: 'Environment ID',
        name: 'environmentId',        
        description: 'GTM Environment ID',
        placeholder: 'Enter your GTM Environment ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['environmentsDelete', 'environmentsGet', 'environmentsReauthorize', 'environmentsUpdate'] } }
      },
      {
        displayName: 'Folder ID',
        name: 'folderId',        
        description: 'GTM Folder ID',
        placeholder: 'Enter your GTM Folder ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['foldersDelete', 'foldersEntitiesList', 'foldersGet', 'foldersMoveEntities', 'foldersRevert', 'foldersUpdate'] } }
      }, 
      {
        displayName: 'Google Tag Configuration ID',
        name: 'googleTagConfigurationId',        
        description: 'Google Tag Configuration ID',
        placeholder: 'Enter your Google Tag Configuration ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['googleTagConfigurationsDelete', 'googleTagConfigurationsGet', 'googleTagConfigurationsUpdate'] } }
      }, 
      {
        displayName: 'Tag ID',
        name: 'tagId',        
        description: 'GTM Tag ID',
        placeholder: 'Enter your GTM Tag ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['tagsDelete', 'tagsGet', 'tagsRevert', 'tagsUpdate'] } }
      },
      {
        displayName: 'Template ID',
        name: 'templateId',        
        description: 'GTM Template ID',
        placeholder: 'Enter your GTM Template ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['templatesDelete', 'templatesGet', 'templatesRevert', 'templatesUpdate'] } }
      },
      {
        displayName: 'Transformation ID',
        name: 'transformationId',        
        description: 'GTM Transformation ID',
        placeholder: 'Enter your GTM Transformation ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['transformationsDelete', 'transformationsGet', 'transformationsRevert', 'transformationsUpdate'] } }
      },
      {
        displayName: 'Trigger ID',
        name: 'triggerId',        
        description: 'GTM Trigger ID',
        placeholder: 'Enter your GTM Trigger ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['triggersDelete', 'triggersGet', 'triggersRevert', 'triggersUpdate'] } }
      },
      {
        displayName: 'User Permissions ID',
        name: 'userPermissionsId',        
        description: 'GTM User Permissions ID',
        placeholder: 'Enter your GTM User Permissions ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['userPermissionsDelete', 'userPermissionsGet', 'userPermissionsUpdate'] } }
      }, 
      {
        displayName: 'Variable ID',
        name: 'variableId',        
        description: 'GTM Variable ID',
        placeholder: 'Enter your GTM Variable ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['variablesDelete', 'variablesGet', 'variablesRevert', 'variablesUpdate'] } }
      },
      {
        displayName: 'Version ID',
        name: 'versionId',        
        description: 'GTM Version ID',
        placeholder: 'Enter your GTM Version ID',
        type: 'string',            
        default: '',
        displayOptions: { show: { operation: ['versionsDelete', 'versionsGet', 'versionsPublish', 'versionsSetLatest', 'versionsUndelete', 'versionsUpdate'] } }
      }, 
      {
        displayName: 'Zone ID',
        name: 'zoneId',        
        description: 'GTM Zone ID',
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
            description: 'Must be set to true to allow features.user_permissions to change from false to true. If this operation causes an update but this bit is false, the operation will fail.',
            type: 'boolean',
            default: true,
          },
          {
            displayName: 'Built-In Variable Type',
            name: 'type',            
            description: 'The type of built-in variable.',
            type: 'options',
            default: 'advertiserId',
            options: [
              { name: 'advertiserId', value: 'advertiserId' },
              { name: 'advertisingTrackingEnabled', value: 'advertisingTrackingEnabled' },
              { name: 'ampBrowserLanguage', value: 'ampBrowserLanguage' },
              { name: 'ampCanonicalHost', value: 'ampCanonicalHost' },
              { name: 'ampCanonicalPath', value: 'ampCanonicalPath' },
              { name: 'ampCanonicalUrl', value: 'ampCanonicalUrl' },
              { name: 'ampClientId', value: 'ampClientId' },
              { name: 'ampClientMaxScrollX', value: 'ampClientMaxScrollX' },
              { name: 'ampClientMaxScrollY', value: 'ampClientMaxScrollY' },
              { name: 'ampClientScreenHeight', value: 'ampClientScreenHeight' },
              { name: 'ampClientScreenWidth', value: 'ampClientScreenWidth' },
              { name: 'ampClientScrollX', value: 'ampClientScrollX' },
              { name: 'ampClientScrollY', value: 'ampClientScrollY' },
              { name: 'ampClientTimestamp', value: 'ampClientTimestamp' },
              { name: 'ampClientTimezone', value: 'ampClientTimezone' },
              { name: 'ampGtmEvent', value: 'ampGtmEvent' },
              { name: 'ampPageDownloadTime', value: 'ampPageDownloadTime' },
              { name: 'ampPageLoadTime', value: 'ampPageLoadTime' },
              { name: 'ampPageViewId', value: 'ampPageViewId' },
              { name: 'ampReferrer', value: 'ampReferrer' },
              { name: 'ampTitle', value: 'ampTitle' },
              { name: 'ampTotalEngagedTime', value: 'ampTotalEngagedTime' },
              { name: 'appId', value: 'appId' },
              { name: 'appName', value: 'appName' },
              { name: 'appVersionCode', value: 'appVersionCode' },
              { name: 'appVersionName', value: 'appVersionName' },
              { name: 'builtInVariableTypeUnspecified', value: 'builtInVariableTypeUnspecified' },
              { name: 'clickClasses', value: 'clickClasses' },
              { name: 'clickElement', value: 'clickElement' },
              { name: 'clickId', value: 'clickId' },
              { name: 'clickTarget', value: 'clickTarget' },
              { name: 'clickText', value: 'clickText' },
              { name: 'clickUrl', value: 'clickUrl' },
              { name: 'clientName', value: 'clientName' },
              { name: 'containerId', value: 'containerId' },
              { name: 'containerVersion', value: 'containerVersion' },
              { name: 'debugMode', value: 'debugMode' },
              { name: 'deviceName', value: 'deviceName' },
              { name: 'elementVisibilityFirstTime', value: 'elementVisibilityFirstTime' },
              { name: 'elementVisibilityRatio', value: 'elementVisibilityRatio' },
              { name: 'elementVisibilityRecentTime', value: 'elementVisibilityRecentTime' },
              { name: 'elementVisibilityTime', value: 'elementVisibilityTime' },
              { name: 'environmentName', value: 'environmentName' },
              { name: 'errorLine', value: 'errorLine' },
              { name: 'errorMessage', value: 'errorMessage' },
              { name: 'errorUrl', value: 'errorUrl' },
              { name: 'event', value: 'event' },
              { name: 'eventName', value: 'eventName' },
              { name: 'firebaseEventParameterCampaign', value: 'firebaseEventParameterCampaign' },
              { name: 'firebaseEventParameterCampaignAclid', value: 'firebaseEventParameterCampaignAclid' },
              { name: 'firebaseEventParameterCampaignAnid', value: 'firebaseEventParameterCampaignAnid' },
              { name: 'firebaseEventParameterCampaignClickTimestamp', value: 'firebaseEventParameterCampaignClickTimestamp' },
              { name: 'firebaseEventParameterCampaignContent', value: 'firebaseEventParameterCampaignContent' },
              { name: 'firebaseEventParameterCampaignCp1', value: 'firebaseEventParameterCampaignCp1' },
              { name: 'firebaseEventParameterCampaignGclid', value: 'firebaseEventParameterCampaignGclid' },
              { name: 'firebaseEventParameterCampaignSource', value: 'firebaseEventParameterCampaignSource' },
              { name: 'firebaseEventParameterCampaignTerm', value: 'firebaseEventParameterCampaignTerm' },
              { name: 'firebaseEventParameterCurrency', value: 'firebaseEventParameterCurrency' },
              { name: 'firebaseEventParameterDynamicLinkAcceptTime', value: 'firebaseEventParameterDynamicLinkAcceptTime' },
              { name: 'firebaseEventParameterDynamicLinkLinkid', value: 'firebaseEventParameterDynamicLinkLinkid' },
              { name: 'firebaseEventParameterNotificationMessageDeviceTime', value: 'firebaseEventParameterNotificationMessageDeviceTime' },
              { name: 'firebaseEventParameterNotificationMessageId', value: 'firebaseEventParameterNotificationMessageId' },
              { name: 'firebaseEventParameterNotificationMessageName', value: 'firebaseEventParameterNotificationMessageName' },
              { name: 'firebaseEventParameterNotificationMessageTime', value: 'firebaseEventParameterNotificationMessageTime' },
              { name: 'firebaseEventParameterNotificationTopic', value: 'firebaseEventParameterNotificationTopic' },
              { name: 'firebaseEventParameterPreviousAppVersion', value: 'firebaseEventParameterPreviousAppVersion' },
              { name: 'firebaseEventParameterPreviousOsVersion', value: 'firebaseEventParameterPreviousOsVersion' },
              { name: 'firebaseEventParameterPrice', value: 'firebaseEventParameterPrice' },
              { name: 'firebaseEventParameterProductId', value: 'firebaseEventParameterProductId' },
              { name: 'firebaseEventParameterQuantity', value: 'firebaseEventParameterQuantity' },
              { name: 'firebaseEventParameterValue', value: 'firebaseEventParameterValue' },
              { name: 'firstPartyServingUrl', value: 'firstPartyServingUrl' },
              { name: 'formClasses', value: 'formClasses' },
              { name: 'formElement', value: 'formElement' },
              { name: 'formId', value: 'formId' },
              { name: 'formTarget', value: 'formTarget' },
              { name: 'formText', value: 'formText' },
              { name: 'formUrl', value: 'formUrl' },
              { name: 'historySource', value: 'historySource' },
              { name: 'htmlId', value: 'htmlId' },
              { name: 'language', value: 'language' },
              { name: 'newHistoryFragment', value: 'newHistoryFragment' },
              { name: 'newHistoryState', value: 'newHistoryState' },
              { name: 'newHistoryUrl', value: 'newHistoryUrl' },
              { name: 'oldHistoryFragment', value: 'oldHistoryFragment' },
              { name: 'oldHistoryState', value: 'oldHistoryState' },
              { name: 'oldHistoryUrl', value: 'oldHistoryUrl' },
              { name: 'osVersion', value: 'osVersion' },
              { name: 'pageHostname', value: 'pageHostname' },
              { name: 'pagePath', value: 'pagePath' },
              { name: 'pageUrl', value: 'pageUrl' },
              { name: 'platform', value: 'platform' },
              { name: 'queryString', value: 'queryString' },
              { name: 'randomNumber', value: 'randomNumber' },
              { name: 'referrer', value: 'referrer' },
              { name: 'requestMethod', value: 'requestMethod' },
              { name: 'requestPath', value: 'requestPath' },
              { name: 'resolution', value: 'resolution' },
              { name: 'scrollDepthDirection', value: 'scrollDepthDirection' },
              { name: 'scrollDepthThreshold', value: 'scrollDepthThreshold' },
              { name: 'scrollDepthUnits', value: 'scrollDepthUnits' },
              { name: 'sdkVersion', value: 'sdkVersion' },
              { name: 'serverPageLocationHostname', value: 'serverPageLocationHostname' },
              { name: 'serverPageLocationPath', value: 'serverPageLocationPath' },
              { name: 'serverPageLocationUrl', value: 'serverPageLocationUrl' },
              { name: 'videoCurrentTime', value: 'videoCurrentTime' },
              { name: 'videoDuration', value: 'videoDuration' },
              { name: 'videoPercent', value: 'videoPercent' },
              { name: 'videoProvider', value: 'videoProvider' },
              { name: 'videoStatus', value: 'videoStatus' },
              { name: 'videoTitle', value: 'videoTitle' },
              { name: 'videoUrl', value: 'videoUrl' },
              { name: 'videoVisible', value: 'videoVisible' },
              { name: 'visitorRegion', value: 'visitorRegion' }
            ]
          },          
          {
            displayName: 'Container ID',
            name: 'containerId',
            description: 'ID of container that will be merged into the current container.',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Container Version ID',
            name: 'containerVersionId',
            description: 'The GTM ContainerVersion ID. Specify published to retrieve the currently published version.',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Copy Settings',
            name: 'copySettings',            
            description: 'Whether or not to copy tag settings from this tag to the new tag.',
            type: 'boolean',
            default: true,
          },
          {
            displayName: 'Copy Terms Of Service',
            name: 'copyTermsOfService',            
            description: 'Must be set to true to accept all terms of service agreements copied from the current tag to the newly created tag. If this bit is false, the operation will fail.',
            type: 'boolean',
            default: true,
          }, 
          {
            displayName: 'Copy Users',
            name: 'copyUsers',            
            description: 'Whether or not to copy users from this tag to the new tag.',
            type: 'boolean',
            default: true,
          },          
          {
            displayName: 'Destination ID',
            name: 'destinationId',
            description: 'Destination ID linked to a GTM Container, e.g. AW-123456789. Only one of destination_id or tag_id should be set.',
            type: 'string',
            default: ''
          },          
          {
            displayName: 'Fingerprint',
            name: 'fingerprint',
            description: 'When provided, this fingerprint must match the fingerprint of the account in storage.',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Include Google Tags',
            name: 'includeGoogleTags',            
            description: 'Also retrieve accounts associated with Google Tag when true.',
            type: 'boolean',
            default: true,
          },
          {
            displayName: 'Page Token',
            name: 'pageToken',           
            description: 'Continuation token for fetching the next page of results.',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Setting Source',
            name: 'settingSource',            
            description: 'Specify the source of config setting after combine',
            type: 'options',
            default: 'current',
            options: [
              { name: 'current', value: 'current' },
              { name: 'other', value: 'other' },
              { name: 'settingSourceUnspecified', value: 'settingSourceUnspecified' }
            ]
          },          
          {
            displayName: 'Tag ID',
            name: 'tagId',
            description: 'Tag ID for a GTM Container, e.g. GTM-123456789. Only one of destination_id or tag_id should be set.',
            type: 'string',
            default: ''
          },          
          {
            displayName: 'Tag Name',
            name: 'tagName',
            description: 'The name for the newly created tag.',
            type: 'string',
            default: ''
          },          
          {
            displayName: 'Trigger ID',
            name: 'triggerId',
            description: 'The triggers to be moved to the folder.',
            type: 'string',
            default: ''
          },          
          {
            displayName: 'Variable ID',
            name: 'variableId',
            description: 'The variables to be moved to the folder.',
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
    if (!credentials) { throw new Error('Missing Google Tag Manager API credentials.'); }

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
            if (!accountId) throw new Error('GTM Account ID is required.');
            url += `/accounts/${accountId}${queryString}`;
            break;
          case 'accountsList':
            url += `/accounts${queryString}`;
            break;
          case 'accountsUpdate':
            if (!accountId) throw new Error('GTM Account ID is required.');
            url += `/accounts/${accountId}${queryString}`;
            break;
          case 'builtInVariablesCreate':
          case 'builtInVariablesDelete': 
          case 'builtInVariablesList':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/built_in_variables${queryString}`; 
            break;               
          case 'builtInVariablesRevert':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/built_in_variables:revert${queryString}`; 
            break;
          case 'clientsCreate':
          case 'clientsList':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/clients${queryString}`; 
            break;
          case 'clientsDelete':
          case 'clientsGet':
          case 'clientsUpdate':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            if (!clientId) throw new Error('GTM Client ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/clients/${clientId}${queryString}`; 
            break;
          case 'clientsRevert':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            if (!clientId) throw new Error('GTM Client ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/clients/${clientId}:revert${queryString}`; 
            break;
          case 'containersCombine':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}:combine${queryString}`; 
            break;
          case 'containersCreate':
          case 'containersList':
            if (!accountId) throw new Error('GTM Account ID is required.');
            url += `/accounts/${accountId}/containers${queryString}`; 
            break;
          case 'containersDelete':
          case 'containersGet':
          case 'containersUpdate':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}${queryString}`; 
            break;
          case 'containersLookup':
              url += `/accounts/containers:lookup`; 
              break;
          case 'containersMoveTagId':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}:move_tag_id${queryString}`;
            break;
          case 'containersSnippet':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}:snippet${queryString}`;
            break;
          case 'destinationsGet':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!destinationLinkId) throw new Error('Google Tag Destination\'s Link ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/destinations/${destinationLinkId}${queryString}`;
            break;
          case 'destinationsLink':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/destinations:link${queryString}`;
            break;
          case 'destinationsList':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/destinations${queryString}`;
            break;
          case 'environmentsCreate':
          case 'environmentsList':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/environments${queryString}`;
            break;
          case 'environmentsDelete':
          case 'environmentsGet':
          case 'environmentsUpdate':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!environmentId) throw new Error('GTM Environment ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/environments/${environmentId}${queryString}`;
            break;
          case 'environmentsReauthorize':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!environmentId) throw new Error('GTM Environment ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/environments/${environmentId}:reauthorize${queryString}`;
            break;
          case 'foldersCreate':
          case 'foldersList':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/folders${queryString}`;
            break;
          case 'foldersDelete':
          case 'foldersGet':
          case 'foldersUpdate':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            if (!folderId) throw new Error('GTM Folder ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/folders/${folderId}${queryString}`;
            break;
          case 'foldersEntitiesList':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            if (!folderId) throw new Error('GTM Folder ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/folders/${folderId}:entities${queryString}`;
            break;
          case 'foldersMoveEntities':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            if (!folderId) throw new Error('GTM Folder ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/folders/${folderId}:move_entities_to_folder${queryString}`;
            break;
          case 'foldersRevert':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            if (!folderId) throw new Error('GTM Folder ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/folders/${folderId}:revert${queryString}`;
            break;
          case 'googleTagConfigurationsCreate':
          case 'googleTagConfigurationsList':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/gtag_config${queryString}`;
            break;
          case 'googleTagConfigurationsDelete':
          case 'googleTagConfigurationsGet':
          case 'googleTagConfigurationsUpdate':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            if (!googleTagConfigurationId) throw new Error('Google Tag Configuration ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/gtag_config/${googleTagConfigurationId}${queryString}`;
            break;
          case 'tagsCreate':
          case 'tagsList':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/tags${queryString}`;
            break;
          case 'tagsDelete':
          case 'tagsGet':
          case 'tagsUpdate':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            if (!tagId) throw new Error('GTM Tag ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/tags/${tagId}${queryString}`;
            break;
          case 'tagsRevert':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            if (!tagId) throw new Error('GTM Tag ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/tags/${tagId}:revert${queryString}`;
            break;
          case 'templatesCreate':
          case 'templatesList':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/templates${queryString}`;
            break;
          case 'templatesDelete':
          case 'templatesGet':
          case 'templatesUpdate':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            if (!templateId) throw new Error('GTM Template ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/templates/${templateId}${queryString}`;
            break;
          case 'templatesRevert':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            if (!templateId) throw new Error('GTM Template ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/templates/${templateId}:revert${queryString}`;
            break;
          case 'transformationsCreate':
          case 'transformationsList':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/transformations${queryString}`;
            break;
          case 'transformationsDelete':
          case 'transformationsGet':
          case 'transformationsUpdate':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            if (!transformationId) throw new Error('GTM Transformation ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/transformations/${transformationId}${queryString}`;
            break;
          case 'transformationsRevert':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            if (!transformationId) throw new Error('GTM Transformation ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/transformations/${transformationId}:revert${queryString}`;
            break;
          case 'triggersCreate':
          case 'triggersList':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/triggers${queryString}`;
            break;
          case 'triggersDelete':
          case 'triggersGet':
          case 'triggersUpdate':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            if (!triggerId) throw new Error('GTM Trigger ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/triggers/${triggerId}${queryString}`;
            break;
          case 'triggersRevert':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            if (!triggerId) throw new Error('GTM Trigger ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/triggers/${triggerId}:revert${queryString}`;
            break;
          case 'userPermissionsCreate':
          case 'userPermissionsList':
            if (!accountId) throw new Error('GTM Account ID is required.');
            url += `/accounts/${accountId}/user_permissions${queryString}`;
            break;
          case 'userPermissionsDelete':
          case 'userPermissionsGet':
          case 'userPermissionsUpdate':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!userPermissionsId) throw new Error('GTM User Permissions ID is required.');
            url += `/accounts/${accountId}/user_permissions/${userPermissionsId}${queryString}`;
            break;
          case 'variablesCreate':
          case 'variablesList':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/variables${queryString}`;
            break;
          case 'variablesDelete':
          case 'variablesGet':
          case 'variablesUpdate':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            if (!variableId) throw new Error('GTM Variable ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/variables/${variableId}${queryString}`;
            break;
          case 'variablesRevert':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            if (!variableId) throw new Error('GTM Variable ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/variables/${variableId}:revert${queryString}`;
            break;
          case 'versionsHeadersLatest':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/version_headers:latest${queryString}`;
            break;
          case 'versionsHeadersList':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/version_headers${queryString}`;
            break;
          case 'versionsDelete':
          case 'versionsGet':
          case 'versionsUpdate':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!versionId) throw new Error('GTM Version ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/versions/${versionId}${queryString}`;
            break;
          case 'versionsLive':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/versions:live${queryString}`;
            break;
          case 'versionsPublish':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!versionId) throw new Error('GTM Version ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/versions/${versionId}:publish${queryString}`;
            break;
          case 'versionsSetLatest':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!versionId) throw new Error('GTM Version ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/versions/${versionId}:set_latest${queryString}`;
            break;
          case 'versionsUndelete':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!versionId) throw new Error('GTM Version ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/versions/${versionId}:undelete${queryString}`;
            break;
          case 'workspacesCreate':
          case 'workspacesList':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces${queryString}`;
            break;
          case 'workspacesDelete':
          case 'workspacesGet':
          case 'workspacesUpdate':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}${queryString}`;
            break;
          case 'workspacesCreateVersion':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}:create_version${queryString}`;
            break;
          case 'workspacesGetStatus':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/status${queryString}`;
            break;
          case 'workspacesQuickPreview':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}:quick_preview${queryString}`;
            break;
          case 'workspacesResolveConflict':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}:resolve_conflict${queryString}`;
            break;
          case 'workspacesSync':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}:sync${queryString}`;
            break;
          case 'zonesCreate':
          case 'zonesList':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/zones${queryString}`;
            break;
          case 'zonesDelete':
          case 'zonesGet':
          case 'zonesUpdate':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            if (!zoneId) throw new Error('GTM Zone ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/zones/${zoneId}${queryString}`;
            break;
          case 'zonesRevert':
            if (!accountId) throw new Error('GTM Account ID is required.');
            if (!containerId) throw new Error('GTM Container ID is required.');
            if (!workspaceId) throw new Error('GTM Workspace ID is required.');
            if (!zoneId) throw new Error('GTM Zone ID is required.');
            url += `/accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}/zones/${zoneId}:revert${queryString}`;
            break;
          default:
            throw new Error(`Unknown operation:${operation}`);
        }

        const requestConf = {
          method: httpMethod,
          url,
          headers: { 'Content-Type': 'application/json' },
          ...(httpMethod === 'PUT' || httpMethod === 'POST' ? { body: requestBody } : {})
        };

        const responseData = await this.helpers.requestOAuth2.call(this, 'googleTagManagerOAuth2Api', requestConf);

        returnData.push(JSON.parse(responseData));
      } catch (error) {
        throw new Error(`Error calling GTM API:${error.message}`);
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}