import storage from 'redux-persist/lib/storage'

const PERSIST = {
  active: true,
  storeConfig: {
    key: 'root',
    storage,
  },
}

export default PERSIST
