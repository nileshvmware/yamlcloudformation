// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { CloudformationYaml } from './CloudformationYaml';

export const cloudformationYaml: CloudformationYaml = new CloudformationYaml();

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  cloudformationYaml.reset();
  cloudformationYaml.activate(context);
  cloudformationYaml.checkActiveFile(false, true);

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable1 = vscode.commands.registerCommand('extension.cloudFormationYamlValidator', () => {
    cloudformationYaml.checkActiveFile(false, true);
  });
  context.subscriptions.push(disposable1);
  const disposable2 = vscode.commands.registerCommand('extension.cloudFormationYamlValidatorRecursive', () => {
    cloudformationYaml.checkActiveFile(true, true);
  });
  context.subscriptions.push(disposable2);
}

// this method is called when your extension is deactivated
export function deactivate() {
  if (cloudformationYaml) {
    cloudformationYaml.dispose();
  }
}
