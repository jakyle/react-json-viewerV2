import React, { useState, useEffect, useCallback } from 'react';
import { toType, isTheme } from './utils/utils';
import { Provider, useDispatch } from 'react-redux'
import store from './store/root';
import { globalSetAction, RJVPayload } from './store/actions';
import { ReactJsonView } from './components/React-Json-View';

interface ReactJsonViewProps {
  src: any, 
  name?: string,
  theme?: string,
  collapsed?: boolean,
  collapseStringsAfterLength?: boolean,
  shouldCollapse?: boolean,
  sortKeys?: boolean,
  groupArraysAfterLength?: number,
  indentWidth?: number,
  enableClipboard?: boolean,
  displayObjectSize?: boolean,
  displayDataTypes?: boolean,
  onEdit?: boolean,
  onDelete?: boolean,
  onAdd?: boolean,
  onSelect?: boolean,
  iconStyle?: 'circle' | 'triangle' | 'square',
  style?: object,
  validationMessage?: string,
  defaultValue?: null | number | boolean | [] | object,
}

const innerReactJsonView: React.FC<ReactJsonViewProps> = ({
  src = {},
  name ='root',
  theme = 'rjv-default',
  collapsed = false,
  collapseStringsAfterLength = false,
  shouldCollapse = false,
  sortKeys = false,
  groupArraysAfterLength = 100,
  indentWidth = 4, 
  enableClipboard = true,
  displayObjectSize = true,
  displayDataTypes = true,
  onEdit = false,
  onDelete = false,
  onAdd = false,
  onSelect = false,
  iconStyle = 'triangle',
  style = {},
  validationMessage = "Validation Error",
  defaultValue = null
}) => {

  
  
  const [addKeyRequest, setAddKeyRequest] = useState(false);
  const [editKeyRequest, setEditKeyRequest] = useState(false);
  const [validationFailure, setValidationFailure] = useState(false);

  const [srcState, setSrcState] = useState(src);
  const [nameState, setNameState] = useState(name);
  const [themeState, setThemeState] = useState(theme);
  const [validationMessageState, setValidationMessageState] = useState(validationMessage);

  const [rjvId] = useState(Date.now().toString())

  const dispatch = useDispatch()
  const globalSet = useCallback(
    (payload: RJVPayload) => dispatch(globalSetAction(payload)), [dispatch]
  );
  

  // #region useEffects

  // did Mount
  useEffect(() => {globalSet({rjvId: rjvId, data: srcState})}, []);

  // non-validated prop-state
  useEffect(() => setNameState(name), [name])
  useEffect(() => setValidationMessageState(validationMessage), [validationMessage])

  // src-obj-update
  useEffect(() => {
    if (toType(src) !== 'object'
        && toType(src) !== 'array') {
      console.error(
        'react-json-view error:',
        'src property must be a valid json object'
      );
      setNameState('ERROR');
      setSrcState({message: 'src property must be a valid json object'});
    }
    else setSrcState(src);

  }, [src]);

  // theme-state-update
  useEffect(() => {
      if (toType(theme) === 'object' && !isTheme(theme)) {
        console.error(
          'react-json-view error:',
          'theme prop must be a theme name or valid base-16 theme object.',
          'defaulting to "rjv-default" theme'
        );
        setThemeState('rjv-default');
      }
      else setThemeState(theme);
  }, [theme]);
  
  // #endregion


  const props = {
    src,
    name, 
    theme, 
    collapsed, 
    collapseStringsAfterLength, 
    shouldCollapse, 
    sortKeys, 
    groupArraysAfterLength, 
    indentWidth,
    enableClipboard,
    displayObjectSize,
    displayDataTypes,
    onEdit,
    onDelete,
    onAdd,
    onSelect,
    iconStyle,
    style,
    defaultValue
  }

  return (
    <Provider store={store}>
      <ReactJsonView 
        src={srcState}
        name={nameState}
        theme={themeState}
        type={toType(srcState)}
        rjvId={rjvId}
        {...props}
      />
    </Provider>
  )
} 

export const ReactJSONView = React.memo(innerReactJsonView);