import React, { useState } from "react";
import Drawer from "@atlaskit/drawer";
import Button from "@atlaskit/button";

import Textfield from "@atlaskit/textfield";
import {
  fontSize as getFontSize,
  // eslint-disable-next-line @atlaskit/design-system/no-deprecated-imports
  gridSize as getGridSize,
} from "@atlaskit/theme/constants";
import { token } from "@atlaskit/tokens";

import InlineEdit from "@atlaskit/inline-edit";

interface Props {
  helloWorldData: HelloWorldData;
}
export const App = ({ helloWorldData }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Drawer onClose={() => setOpen(false)} isOpen={open}>
        <div>Test</div>
        <InlineEditDefaultExample />
      </Drawer>
      <Button appearance="primary" onClick={() => setOpen(true)}>
        Open Drawer
      </Button>
    </>
  );
};
const InlineEditDefaultExample = () => {
  const [editValue, setEditValue] = useState("");

  return (
    <div
      style={{
        padding: `${token("space.100", "8px")} ${token(
          "space.100",
          "8px"
        )} ${token("space.600", "48px")}`,
      }}
    >
      <InlineEdit
        defaultValue={editValue}
        label="Inline edit"
        editView={({ errorMessage, ...fieldProps }) => (
          <Textfield {...fieldProps} autoFocus />
        )}
        readView={() => (
          <div className="flex max-w-full" data-testid="read-view">
            {editValue || "Click to enter a value"}
          </div>
        )}
        onConfirm={(value) => {
          setEditValue(value);
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ value }),
          };
          fetch(
            "/jira/plugins/servlet/hello-world/config",
            requestOptions
          ).then((response) => response.json());
        }}
      />
    </div>
  );
};
