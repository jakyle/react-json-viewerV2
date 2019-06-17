import React from 'react'

interface ReactJsonViewProps {
  src: any;
  name: string;
  groupArraysAfterLength: number;
}

const reactJsonView: React.FC<ReactJsonViewProps> = (props) => {

  const { src, name, groupArraysAfterLength } = props;

  let ObjectComponent = JsonObject;
  if (groupArraysAfterLength && src.length > groupArraysAfterLength) {
      ObjectComponent = ArrayGroup;
  }

  return (
      <div className="pretty-json-container object-container" >
          <div className="object-content">
              <ObjectComponent
                  namespace={name}
                  depth={0}
                  jsvRoot={true}
                  {...props} />
          </div>
      </div>
  );
}

export const ReactJsonView = React.memo(reactJsonView);