/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

App.KerberosWizardStep6Controller = App.KerberosProgressPageController.extend({
  name: 'kerberosWizardStep6Controller',
  clusterDeployState: 'KERBEROS_DEPLOY',
  isSingleRequestPage: true,
  request: {},
  commands: [],
  contextForPollingRequest: Em.I18n.t('requestInfo.kerberizeCluster'),

  setRequest: function () {
    this.set('request', {
      name: 'KERBERIZE_CLUSTER',
      ajaxName: 'admin.kerberize.cluster',
      ajaxData: {
        data: {
          Clusters: {
            security_type: "KERBEROS"
          }
        }
      }
    });
  },

  postKerberosDescriptor: function (kerberosDescriptor) {
    return App.ajax.send({
      name: 'admin.kerberos.cluster.artifact.create',
      sender: this,
      data: {
        artifactName: 'kerberos_descriptor',
        data: {
          artifact_data: kerberosDescriptor
        }
      }
    });
  },

  retry: function () {
    this.set('showRetry', false);
    this.get('tasks').setEach('status', 'PENDING');
    App.router.send('retry');
  }
});