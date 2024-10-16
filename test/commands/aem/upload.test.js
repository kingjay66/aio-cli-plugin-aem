/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const UploadCommand = require('../../../src/commands/aem/upload')
const {stdout} = require('stdout-stderr')

beforeAll(() => stdout.start())
afterAll(() => stdout.stop())

test('exports', async () => {
  expect(typeof UploadCommand.upload).toEqual('function')
})

test('deep', async () => {
  expect(UploadCommand.upload.flags.deep.char).toEqual('d')
})
