# JSON examples

The files in this folder contain benchmark examples of JSON structures used to pass information between the front and back ends.

* **GET_data_options_skeleton**: Options for data selections for a particular experiment in skeleton format
* **GET_data_options_example**: Options for data selections for a particular experiment - concrete example
* **GET_experiment_full.json**: Full experiment details including conditions, untis, etc.
* **GET_experiment_summary_list.json**: Summary experiment details
* **POST_data_options_line_skeleton.json**: Options selected by the user that are used to create the datasetfor a line chart
* **POST_experiment_all_variables_exist.json**: Details of new experiment to be created where variables already exist
* **POST_experiment_with_new_variable.json**: Details of new experiment to be created including some new variables
* **POST_node_data.json**: Data received from a node
* **POST_project.json**: Details of a new project to be created
* **RESPONSE_conditions.json**: Condition details for a specific experiment
* **RESPONSE_experiment_data.json**: Experiment data for display as line or grouped bar chart
* **Validation.json**: Form validation details for specified object



## RESPONSE_experiment_data.json

**images** element is used to render image links for observations that have them
**milestones** are "once" variables that may be displayed on the chart. They correspond to particular conditions - e.g. "germination time"

## POST_data_options_line.json

**chart_type**: defines the type of chart requested - has constraints for the data selection
**schools**: list of school ids. If the list is empty, schools are collapsed and the data returned is an average value
**treatment_variables**: What to do with the treament variables. If the **levels** list is empty, the tv is collapsed
**response_variables**: Which response variables to show. Any not mentioned are omitted
**milestones**: Include milestones or not
**sensor_quantity**: Include one sensor value or not
