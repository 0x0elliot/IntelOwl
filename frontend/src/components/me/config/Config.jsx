import PropTypes from "prop-types";
import React from "react";
import { PluginData } from "../../misc/PluginData";
import {
  createCustomConfig,
  PLUGIN_CONFIG_URI,
  deleteCustomConfig,
  updateCustomConfig,
} from "./api";

export default function Config({
  configFilter,
  additionalConfigData,
  dataName,
  editable,
}) {
  return (
    <PluginData
      createPluginData={createCustomConfig}
      updatePluginData={updateCustomConfig}
      deletePluginData={deleteCustomConfig}
      dataName={dataName}
      valueType="json"
      dataUri={PLUGIN_CONFIG_URI}
      entryFilter={configFilter}
      additionalEntryData={additionalConfigData}
      editable={editable}
    />
  );
}

Config.propTypes = {
  additionalConfigData: PropTypes.object,
  configFilter: PropTypes.func.isRequired,
  dataName: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
};

Config.defaultProps = {
  additionalConfigData: {},
};
