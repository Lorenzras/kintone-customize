import {onEditOrCreate, onFieldChange, onIndexShow} from '../../kintone-api/api';
import onEditOrCreateHandler from './pages/onEditOrCreateHandler';
import onIndexShowHandler from './pages/onIndexShowHandler';
import fieldsWithVisibilitySideEffect from './helpers/visibilitySettings.json';
import {onFieldChangeHandler} from './pages/onFieldChangeHandler';


kintone.events.on(onIndexShow, onIndexShowHandler);


kintone.events.on(onEditOrCreate, onEditOrCreateHandler);
kintone.events.on(onFieldChange(Object.keys(fieldsWithVisibilitySideEffect)), onFieldChangeHandler);

