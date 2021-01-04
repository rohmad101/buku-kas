import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { BackupTypes } from '../Redux/BackupRedux'
import { RegisterTypes } from '../Redux/RegisterRedux'

/* ------------- Sagas ------------- */

import { getBackup } from './BackupSagas'
import { getRegister } from './RegisterSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    // takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(RegisterTypes.REGISTER_REQUEST, getRegister, api),
    takeLatest(BackupTypes.BACKUP_REQUEST, getBackup, api)
  ])
}
