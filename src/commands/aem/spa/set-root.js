/**
 * For 1.5 
 * ./remoteSPAUrl
 * spa-project-core/components/remotepagenext
 * 
 * For 2.0
 * ./remoteURL: "https://cezcz.github.io/spa-sample-app/"
 * spa-project-core/components/page
 */

const { flags } = require('@oclif/command');
const GetUrlCommand = require('@adobe/aio-cli-plugin-app/src/commands/app/get-url');
const axios = require('axios').default;

const BaseCommand = require("../../../base-command");

class SetRootCommand extends BaseCommand {
    async doRun(args) {
        const { flags, argv } = args;

        const { host, user, imsToken, pass, spaVersion } = flags;
        const ROOT_PATH = argv[0];

        // Get application url
        const actions = await GetUrlCommand.run([]);
        const url = actions.runtime.pages;
        this.log(`Deployed application is located at ${url}.`);

        // Define form payload based on SPA editor version
        const params = new URLSearchParams();
        if (spaVersion === '2.0') {
            params.append('./remoteURL', url);
        } else {
            params.append('./remoteSPAUrl', url);
        }

        const axiosOptions = {
            method: 'POST',
            url: `${host}${ROOT_PATH}/_jcr_content`,
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: params.toString(),
        };

        // Apply AEM authentication
        if (imsToken) {
            this.log('Login via IMS');
            axiosOptions.url = axiosOptions.url + '?configid=ims';
            axiosOptions.headers['authorization'] = `Bearer ${imsToken}`;
        } else {
            this.log(`Login as local user ${user}.`);
            axiosOptions.auth = {
                username: user,
                password: pass
            }
        }

        // Update property on AEM root page
        const response = await axios(axiosOptions);

        if (response.status !== 200) {
            this.error('There was an error when updating the AEM page.');
        }

        this.log(`AEM root page "${ROOT_PATH}" was updated with the deployed application URL.`);
    }
}

SetRootCommand.flags = Object.assign({}, BaseCommand.flags, {
    host: flags.string({
        char: 'h',
        description: 'AEM hostname',
        default: 'http://localhost:4502'
    }),
    user: flags.string({
        char: 'u',
        description: 'AEM username. Please provide either username and password or an IMS token.',
        default: 'admin'
    }),
    pass: flags.string({
        char: 'p',
        description: 'AEM password',
        default: 'admin'
    }),
    imsToken: flags.string({
        char: 'i',
        description: 'IMS Token. Please provide either username and password or an IMS token.',
        env: 'IMS_TOKEN'
    }),
    spaVersion: flags.string({
        char: 's',
        description: 'Version of the SPA editor. Supported values are: 1.5 and 2.0',
        default: '1.5',
    })
});

SetRootCommand.args = [{
    name: 'root_page',
    required: true,
    description: `Path to the root page of your AEM project.`
}];

SetRootCommand.strict = false;

SetRootCommand.description = `Configuration for AEM SPA Projects

Updates the remote SPA configuration property of your AEM project to the 
location your SPA is deployed to. This will only work if you used aio to 
bootstrap and deploy your SPA.

Authentication to AEM can be done either via IMS or username and password. Either
provide the values as flags or use the IMS_TOKEN environment variable.

Please also specify the version of the SPA / Universal Editor your project is using.
The version can be derived from the main page component you are using.

spa-project-core/components/remotepagenext -> Version 1.5
spa-project-core/components/page -> Version 2.0`;

SetRootCommand.examples = [
    '$ aio aem:spa-set-root -s 1.5 /content/wknd/us/en',
    '$ aio aem:spa-set-root -u admin -p admin -h http://localhost:4502 -s 2.0 /content/wknd/us/en',
    '$ aio aem:spa-set-root -i IMS_TOKEN -h https://author.adobeaemcloud.com/ /content/wknd/us/en'
];

SetRootCommand.aliases = [
    'aem:spa:set-root'
];

module.exports = SetRootCommand;
