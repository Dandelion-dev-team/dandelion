# JSON Specification for experiment creation 

The React App requires multiple API routes created. 

# GET METHODS
## Experiment Summary
A summary of experiments used in the "/activities/create-experiment/predefined-experiments/" React page.
Owner name is used to show who created the original experiment, owner ID is used to generate the file path for the image.
```json
	"experiment_summary": [
		"id": 0,
		"title": "Thigmomorphogenesis",
		"owner_name": "Dandelion",
		"owner_id": 1,
	]
```

## Experiment
Experiment is the entire experiment that has been selected. It includes treatment variables, response variables, combinations, and details. This is passed to the next page for display.
```json

"experiment_full": [ 
{
	"id": 0, //ID OF THE EXPERIMENT
	"experimentDetails": { //DETAILS FROM THE EXPERIMENT TABLE
		"name": "Thigmomorphogenesis",
		"code": "Code",
		"description": "Description",
		"tutorial": "Tutorial",
		"start_date": "2022-03-03T15:55:05.933Z",
		"end_date": "2022-03-03T15:55:05.933Z",
	},
	"treatmentVariables": [ //VARIABLES RELATING TO EXPERIMENT, ARRAY OF MULTIPLE VARIABLES
	{
		"id": 0,
		"type": "Discrete",
		"name": "Touches",
		"levels": [ //LEVELS OF EXPERIMENT AND THEIR SEQUENCE IN THE VARIABLE (AND ID OF TABLE) 
			      //ARRAY OF LEVELS
			{
				"id": 0,
				"sequence": 1,
				"name": "Control"
			},
			{
				"id": 1,
				"sequence": 2,
				"name": "Light"
			},
			{
				"id": 3,
				"sequence": 3,
				"name": "Heavy"
			}
		]
	},
],
	"responseVariables": [ //ARRAY OF RESPONSE VARIABLES, CAN BE DISCRETE OR CONTINUOUS
	{
		//CONTINUOUS EXAMPLE
		"id": 0,
		"type": "Continuous",
		"name": "Length",
		"unit": "mm",
		"upper_limit": 100,
		"lower_limit": 0
	},
	{
		//DISCRETE EXAMPLE
		"id": 1,
		"type": "Discrete",
		"name": "Stalk Strength",
		"levels": [
			{
				"id": 0,
				"sequence": 1,
				"name": "Control"
			},
			{
				"id": 1,
				"sequence": 2,
				"name": "Light"
			},
			{
				"id": 3,
				"sequence": 3,
				"name": "Heavy"
			}
		]
	},
],
"combinations": [ //ARRAY OF ARRAY OF COMBINATION VARIABLES. REPONSE WOULD BE IN THE FORMAT 
//[[{TREATMENT}][{TREATMENT}]], [[{TREATMENT}][{TREATMENT}]], [[{TREATMENT}][{TREATMENT}]]]
[
	[
		{
			"treatment_name": "Touches",
			"sequence": 3,
			"name": "Heavy"
		}
	],
	[
		{
			"treatment_name": "Nutrition",
			"sequence": 1,
			"name": "Control"
		}
	]
],
```

# POST METHODS
We will upload the image as part of a separate call with the school id, project id and experiment id where relevant.

## Create Activity
```json
"activity": [
	"school_id": 1,
	"user_id": 1,
	"activity_details": [
		"code": "AC",
		"name": "Kohl Rabi",
		"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
		"project_text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
		"start_date": "2022-01-31T14:31:24.262Z",
		"end_date": "2022-01-31T14:31:24.262Z",
		"status": "active" 
	]
]
```
## CREATE EXPERIMENT
```json
"experiment": [ 
{
	"user_id": 0, //USER WHO CREATED
	"school_id": 0, //SCHOOL BELONGS TO 
	"experimentDetails": {
		"name": "Thigmomorphogenesis",
		"code": "Code",
		"description": "Description",
		"tutorial": "Tutorial",
		"start_date": "2022-03-03T15:55:05.933Z",
		"end_date": "2022-03-03T15:55:05.933Z",
	},
	"treatmentVariables": [ //VARIABLES RELATING TO EXPERIMENT, ARRAY OF MULTIPLE VARIABLES
	{
		"status": "copy", //IF "new" CREATE NEW ENTRY, IF "edited" COPY ENTRY WITH UPDATED DETAILS, 
						//IF "copy" JUST CREATE REFERENCE TO ENTRY 
		"id": 0,
		"type": "Discrete",
		"name": "Touches",
		"levels": [ //LEVELS OF EXPERIMENT AND THEIR SEQUENCE IN THE VARIABLE (AND ID OF TABLE) 
			      //ARRAY OF LEVELS
			{
				"id": 0,
				"sequence": 1,
				"name": "Control"
			},
			{
				"id": 1,
				"sequence": 2,
				"name": "Light"
			},
			{
				"id": 3,
				"sequence": 3,
				"name": "Heavy"
			}
		]
	},
],
	"responseVariables": [ //ARRAY OF RESPONSE VARIABLES, CAN BE DISCRETE OR CONTINUOUS
	{
		//CONTINUOUS EXAMPLE
		"status": "new", //IF "new" CREATE NEW ENTRY, IF "edited" COPY ENTRY WITH UPDATED DETAILS, 
						//IF "copy" JUST CREATE REFERENCE TO ENTRY 
		"id": 0,
		"type": "Continuous",
		"name": "Length",
		"unit": "mm",
		"upper_limit": 100,
		"lower_limit": 0
	},
	{
		//DISCRETE EXAMPLE
		"status": "copy", //IF "new" CREATE NEW ENTRY, IF "edited" COPY ENTRY WITH UPDATED DETAILS, 
						//IF "copy" JUST CREATE REFERENCE TO ENTRY 
		"id": 1,
		"type": "Discrete",
		"name": "Stalk Strength",
		"levels": [
			{
				"id": 0,
				"sequence": 1,
				"name": "Control"
			},
			{
				"id": 1,
				"sequence": 2,
				"name": "Light"
			},
			{
				"id": 3,
				"sequence": 3,
				"name": "Heavy"
			}
		]
	},
],
"combinations": [ //ARRAY OF ARRAY OF COMBINATION VARIABLES. POST WILL BE IN THE FORMAT 
//[[{TREATMENT}][{TREATMENT}]], [[{TREATMENT}][{TREATMENT}]], [[{TREATMENT}][{TREATMENT}]]]
[
	[
		{
			"treatment_name": "Touches",
			"sequence": 3,
			"name": "Heavy"
		}
	],
	[
		{
			"treatment_name": "Nutrition",
			"sequence": 1,
			"name": "Control"
		}
	]
```
