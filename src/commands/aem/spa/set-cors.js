/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2022 Adobe
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

require('dotenv').config();
const { flags } = require('@oclif/command');
const commonFlags = require('@adobe/aio-cli-plugin-cloudmanager/src/common-flags');
const commonArgs = require('@adobe/aio-cli-plugin-cloudmanager/src/common-args');
const execSync = require('child_process').execSync;

const BaseCommand = require("../../../base-command");

class SetCorsCommand extends BaseCommand {
    async doRun(args) {
        const { flags, argv } = args;
        const ENVIRONMENT_ID = argv[0];

        // Get application host, as required by CORS settings
        const host = `${process.env.AIO_runtime_namespace}.adobeio-static.net`;
        this.log(`Deployed application is located at ${host}.`);

        // Run cloudmanager command to apply variable. Cannot run the command in code, because then it lacks some configuration context.
        const flagString = Object.entries(flags).map(([key, value]) => `--${key} ${value}`).join(' ');
        execSync(`aio cloudmanager:environment:set-variables ${ENVIRONMENT_ID} ${flagString} -v AEM_SPA_REMOTE_HOSTNAME "${host}"`, { stdio: 'inherit' });

        this.log(`Successfully applied CORS settings for host "${host}" to the environment.`);
    }
}

SetCorsCommand.flags = Object.assign({}, BaseCommand.flags, {
    ...commonFlags.global,
    ...commonFlags.programId,
    strict: flags.boolean({ description: 'performs strict validation of internal variables. Can also be enabled by setting configuration property cloudmanager.environmentVariables.strictValidation to a truthy value.' }),
});

SetCorsCommand.args = [
    commonArgs.environmentId
]

SetCorsCommand.strict = false;

SetCorsCommand.description = `Updates the Cloudmanager configuration to apply
CORS settings to allow your SPA to be edited by AEM.

Please make sure to run the following commands beforehand:
aio auth:login
aio cloudmanager:org:select

This command will set the "AEM_SPA_REMOTE_HOSTNAME" variable in Cloudmanager
which can be used by the "com.adobe.granite.cors.impl.CORSPolicyImpl" OSGi 
configuration.`;

SetCorsCommand.examples = [
    '$ aio aem:spa:set-cors environmentId',
    '$ aio aem:spa:set-cors -p programId environmentId'
];

SetCorsCommand.aliases = [
    'aem:spa:set-cors'
];

module.exports = SetCorsCommand;