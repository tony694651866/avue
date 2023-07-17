import {getStore, setStore} from '@/util/store'

import {getValue} from '@/api/system/param'

const param = {
  state: {
    uploadHttpPath: getStore({name: 'uploadHttpPath'}) || {},
  },
  actions: {
    UploadHttpPath({commit}) {
      return new Promise((resolve, reject) => {
        getValue('upload_http_path').then(res => {
          commit('SET_UPLOAD_HTTP_PATH', res.data.data);
          resolve();
        }).catch(error => {
          reject(error)
        })
      })
    },
  },
  mutations: {
    SET_UPLOAD_HTTP_PATH: (state, data) => {
      state.uploadHttpPath = data;
      setStore({
        name: 'uploadHttpPath',
        content: state.uploadHttpPath,
      })
    },
  }

};

export default param;
