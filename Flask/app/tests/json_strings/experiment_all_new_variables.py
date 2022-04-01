def test_dict():
	return {
		"project_id": 1,
		"code": "THGX",
		"description": "Testing the effects of tickling on plant growth across different species",
		"end_date": "2022-03-29",
		"title": "Thigmomorphogenesis experiment",
		"parent_id": None,
		"start_date": "2022-04-27",
		"tutorial": None,
		"text": None,
		"hypotheses": [{
				"description": "Touching the leaves has no effect on growth",
				"hypothesis_no": 0,
				"id": 2,
				"status": "active",
				"text": None
			},
			{
				"description": "Growth rate is positively correlated with the degree of touching",
				"hypothesis_no": 1,
				"id": 3,
				"status": "active",
				"text": None
			}
		],
		"responseVariables": [{
				"name": "height",
				"is_sensor_quantity": False,
				"procedure": "Measure the plant height with a ruler",
				"quantity_id": None,
				"monday": True,
				"tuesday": False,
				"wednesday": False,
				"thursday": False,
				"friday": False,
				"saturday": False,
				"sunday": False,
				"once": False,
				"final": False
			},
			{
				"levels": [
					{
						"name": "pale yellow",
						"sequence": 1,
						"description": None,
						"procedure": None
					},
					{
						"name": "bright yellow",
						"sequence": 2,
						"description": None,
						"procedure": None
					},
					{
						"name": "light green",
						"sequence": 3,
						"description": None,
						"procedure": None
					},
					{
						"name": "mid green",
						"sequence": 4,
						"description": None,
						"procedure": None
					},
					{
						"name": "dark green",
						"sequence": 5,
						"description": None,
						"procedure": None
					}
				],
				"name": "leaf colour",
				"is_sensor_quantity": False,
				"procedure": "Compare leaf colour to the reference chart",
				"quantity_id": None,
				"monday": True,
				"tuesday": False,
				"wednesday": False,
				"thursday": False,
				"friday": False,
				"saturday": False,
				"sunday": False,
				"once": False,
				"final": False
			}
		],
		"treatmentVariables": [{
				"levels": [{
						"name": "Beetroot",
						"sequence": 1,
						"description": "a classic that grows well in both situs",
						"procedure": None
					},
					{
						"name": "Chives",
						"sequence": 2,
						"description": "standard variety (not garlic chive) - also a FFA plant",
						"procedure": None
					},
					{
						"name": "Kohl rabi",
						"sequence": 3,
						"description": "really interesting and underrated - looks quite spacey/alien-y so should be engaging for the kids",
						"procedure": None
					},
					{
						"name": "Lemon balm",
						"sequence": 4,
						"description": "highly fragrant as a microgreen and also perennial - this is a free for all (FFA) plant, so nice continuity with the wider Dandelion remit",
						"procedure": None
					},
					{
						"name": "Lettuce",
						"sequence": 5,
						"description": "cut and come again type but only 1 variety for accurate data collection - also a FFA plant",
						"procedure": None
					},
					{
						"name": "Sunflower",
						"sequence": 6,
						"description": "a super trendy microgreen now and would be great for the gardens too. The microgreens are very high in nutrients so great from a food security perspective",
						"procedure": None
					},
				],
				"name": "species",
				"is_sensor_quantity": False,
				"procedure": "Check the leaves to identify the plant",
				"quantity_id": None
			},
			{
				"levels": [{
						"name": "Control",
						"sequence": 1,
						"description": "The control level: no touching at all",
						"procedure": "Avoid touching the plants"
					},
					{
						"name": "Gentle",
						"sequence": 2,
						"description": "Gentle tickling",
						"procedure": "Brush each plant 5 times with a paintbrush"
					},
					{
						"name": "Moderate",
						"sequence": 3,
						"description": "Moderate tickling",
						"procedure": "Brush each plant 10 times with a paintbrush"
					}
				],
				"name": "tickling",
				"type": "discrete",
				"is_sensor_quantity": False,
				"procedure": "Brush the plants with a paintbrush a specified number of times",
				"quantity_id": None
			}
		],
		"conditions": [{
				"code": "TST_LB_C",
				"colour": None,
				"description": "Lemon balm and Control",
				"id": 3,
				"status": "active",
				"text": None,
				"condition_levels": [{
						"variable_name": "species",
						"level_name": "Lemon balm"
					},
					{
						"variable_name": "tickling",
						"level_name": "Control"
					}
				],
				"units": [{
						"code": "TST_LB_C_1",
						"column": 1,
						"cube_level": "top",
						"location": None,
						"id": 145,
						"replicate_no": 1,
						"row": "A"
					},
					{
						"code": "TST_LB_C_2",
						"column": 1,
						"cube_level": "top",
						"location": None,
						"id": 146,
						"replicate_no": 2,
						"row": "B"
					},
					{
						"code": "TST_LB_C_3",
						"column": 1,
						"cube_level": "top",
						"location": None,
						"id": 147,
						"replicate_no": 3,
						"row": "C"
					},
					{
						"code": "TST_LB_C_4",
						"column": 1,
						"cube_level": "top",
						"location": None,
						"id": 148,
						"replicate_no": 4,
						"row": "D"
					}
				]
			},
			{
				"code": "TST_LB_G",
				"colour": None,
				"description": "Lemon balm and Gentle",
				"id": 4,
				"status": "active",
				"text": None,
				"condition_levels": [{
						"variable_name": "species",
						"level_name": "Lemon balm"
					},
					{
						"variable_name": "tickling",
						"level_name": "Gentle"
					}
				],
				"units": [{
						"code": "TST_LB_G_1",
						"column": 5,
						"cube_level": "middle",
						"location": None,
						"id": 149,
						"replicate_no": 1,
						"row": "B"
					},
					{
						"code": "TST_LB_G_2",
						"column": 5,
						"cube_level": "middle",
						"location": None,
						"id": 150,
						"replicate_no": 2,
						"row": "C"
					},
					{
						"code": "TST_LB_G_3",
						"column": 5,
						"cube_level": "middle",
						"location": None,
						"id": 151,
						"replicate_no": 3,
						"row": "D"
					},
					{
						"code": "TST_LB_G_4",
						"column": 5,
						"cube_level": "middle",
						"location": None,
						"id": 152,
						"replicate_no": 4,
						"row": "E"
					}
				]
			},
			{
				"code": "TST_LB_M",
				"colour": None,
				"description": "Lemon balm and Moderate",
				"id": 5,
				"status": "active",
				"text": None,
				"condition_levels": [{
						"variable_name": "species",
						"level_name": "Lemon balm"
					},
					{
						"variable_name": "tickling",
						"level_name": "Moderate"
					}
				],
				"units": [{
						"code": "TST_LB_M_1",
						"column": 5,
						"cube_level": "bottom",
						"location": None,
						"id": 153,
						"replicate_no": 1,
						"row": "B"
					},
					{
						"code": "TST_LB_M_2",
						"column": 5,
						"cube_level": "bottom",
						"location": None,
						"id": 154,
						"replicate_no": 2,
						"row": "C"
					},
					{
						"code": "TST_LB_M_3",
						"column": 5,
						"cube_level": "bottom",
						"location": None,
						"id": 155,
						"replicate_no": 3,
						"row": "D"
					},
					{
						"code": "TST_LB_M_4",
						"column": 5,
						"cube_level": "bottom",
						"location": None,
						"id": 156,
						"replicate_no": 4,
						"row": "E"
					}
				]
			},
			{
				"code": "TST_L_C",
				"colour": None,
				"description": "Lettuce and Control",
				"id": 6,
				"status": "active",
				"text": None,
				"condition_levels": [{
						"variable_name": "species",
						"level_name": "Lettuce"
					},
					{
						"variable_name": "tickling",
						"level_name": "Control"
					}
				],
				"units": [{
						"code": "TST_L_C_1",
						"column": 1,
						"cube_level": "top",
						"location": None,
						"id": 157,
						"replicate_no": 1,
						"row": "E"
					},
					{
						"code": "TST_L_C_2",
						"column": 2,
						"cube_level": "top",
						"location": None,
						"id": 158,
						"replicate_no": 2,
						"row": "A"
					},
					{
						"code": "TST_L_C_3",
						"column": 2,
						"cube_level": "top",
						"location": None,
						"id": 159,
						"replicate_no": 3,
						"row": "B"
					},
					{
						"code": "TST_L_C_4",
						"column": 2,
						"cube_level": "top",
						"location": None,
						"id": 160,
						"replicate_no": 4,
						"row": "C"
					}
				]
			},
			{
				"code": "TST_L_G",
				"colour": None,
				"description": "Lettuce and Gentle",
				"id": 7,
				"status": "active",
				"text": None,
				"condition_levels": [{
						"variable_name": "species",
						"level_name": "Lettuce"
					},
					{
						"variable_name": "tickling",
						"level_name": "Gentle"
					}
				],
				"units": [{
						"code": "TST_L_G_1",
						"column": 4,
						"cube_level": "middle",
						"location": None,
						"id": 161,
						"replicate_no": 1,
						"row": "C"
					},
					{
						"code": "TST_L_G_2",
						"column": 4,
						"cube_level": "middle",
						"location": None,
						"id": 162,
						"replicate_no": 2,
						"row": "D"
					},
					{
						"code": "TST_L_G_3",
						"column": 4,
						"cube_level": "middle",
						"location": None,
						"id": 163,
						"replicate_no": 3,
						"row": "E"
					},
					{
						"code": "TST_L_G_4",
						"column": 5,
						"cube_level": "middle",
						"location": None,
						"id": 164,
						"replicate_no": 4,
						"row": "A"
					}
				]
			},
			{
				"code": "TST_L_M",
				"colour": None,
				"description": "Lettuce and Moderate",
				"id": 8,
				"status": "active",
				"text": None,
				"condition_levels": [{
						"variable_name": "species",
						"level_name": "Lettuce"
					},
					{
						"variable_name": "tickling",
						"level_name": "Moderate"
					}
				],
				"units": [{
						"code": "TST_L_M_1",
						"column": 3,
						"cube_level": "bottom",
						"location": None,
						"id": 165,
						"replicate_no": 1,
						"row": "C"
					},
					{
						"code": "TST_L_M_2",
						"column": 3,
						"cube_level": "bottom",
						"location": None,
						"id": 166,
						"replicate_no": 2,
						"row": "D"
					},
					{
						"code": "TST_L_M_3",
						"column": 3,
						"cube_level": "bottom",
						"location": None,
						"id": 167,
						"replicate_no": 3,
						"row": "E"
					},
					{
						"code": "TST_L_M_4",
						"column": 4,
						"cube_level": "bottom",
						"location": None,
						"id": 168,
						"replicate_no": 4,
						"row": "B"
					}
				]
			},
			{
				"code": "TST_C_C",
				"colour": None,
				"description": "Chives and Control",
				"id": 9,
				"status": "active",
				"text": None,
				"condition_levels": [{
						"variable_name": "species",
						"level_name": "Chives"
					},
					{
						"variable_name": "tickling",
						"level_name": "Control"
					}
				],
				"units": [{
						"code": "TST_C_C_1",
						"column": 2,
						"cube_level": "top",
						"location": None,
						"id": 169,
						"replicate_no": 1,
						"row": "E"
					},
					{
						"code": "TST_C_C_2",
						"column": 3,
						"cube_level": "top",
						"location": None,
						"id": 170,
						"replicate_no": 2,
						"row": "A"
					},
					{
						"code": "TST_C_C_3",
						"column": 3,
						"cube_level": "top",
						"location": None,
						"id": 171,
						"replicate_no": 3,
						"row": "B"
					},
					{
						"code": "TST_C_C_4",
						"column": 3,
						"cube_level": "top",
						"location": None,
						"id": 172,
						"replicate_no": 4,
						"row": "C"
					}
				]
			},
			{
				"code": "TST_C_G",
				"colour": None,
				"description": "Chives and Gentle",
				"id": 10,
				"status": "active",
				"text": None,
				"condition_levels": [{
						"variable_name": "species",
						"level_name": "Chives"
					},
					{
						"variable_name": "tickling",
						"level_name": "Gentle"
					}
				],
				"units": [{
						"code": "TST_C_G_1",
						"column": 3,
						"cube_level": "middle",
						"location": None,
						"id": 173,
						"replicate_no": 1,
						"row": "D"
					},
					{
						"code": "TST_C_G_2",
						"column": 3,
						"cube_level": "middle",
						"location": None,
						"id": 174,
						"replicate_no": 2,
						"row": "E"
					},
					{
						"code": "TST_C_G_3",
						"column": 4,
						"cube_level": "middle",
						"location": None,
						"id": 175,
						"replicate_no": 3,
						"row": "A"
					},
					{
						"code": "TST_C_G_4",
						"column": 4,
						"cube_level": "middle",
						"location": None,
						"id": 176,
						"replicate_no": 4,
						"row": "B"
					}
				]
			},
			{
				"code": "TST_C_M",
				"colour": None,
				"description": "Chives and Moderate",
				"id": 11,
				"status": "active",
				"text": None,
				"condition_levels": [{
						"variable_name": "species",
						"level_name": "Chives"
					},
					{
						"variable_name": "tickling",
						"level_name": "Moderate"
					}
				],
				"units": [{
						"code": "TST_C_M_1",
						"column": 4,
						"cube_level": "bottom",
						"location": None,
						"id": 177,
						"replicate_no": 1,
						"row": "C"
					},
					{
						"code": "TST_C_M_2",
						"column": 4,
						"cube_level": "bottom",
						"location": None,
						"id": 178,
						"replicate_no": 2,
						"row": "D"
					},
					{
						"code": "TST_C_M_3",
						"column": 4,
						"cube_level": "bottom",
						"location": None,
						"id": 179,
						"replicate_no": 3,
						"row": "E"
					},
					{
						"code": "TST_C_M_4",
						"column": 5,
						"cube_level": "bottom",
						"location": None,
						"id": 180,
						"replicate_no": 4,
						"row": "A"
					}
				]
			},
			{
				"code": "TST_KR_C",
				"colour": None,
				"description": "Kohl rabi and Control",
				"id": 12,
				"status": "active",
				"text": None,
				"condition_levels": [{
						"variable_name": "species",
						"level_name": "Kohl rabi"
					},
					{
						"variable_name": "tickling",
						"level_name": "Control"
					}
				],
				"units": [{
						"code": "TST_KR_C_1",
						"column": 3,
						"cube_level": "top",
						"location": None,
						"id": 181,
						"replicate_no": 1,
						"row": "D"
					},
					{
						"code": "TST_KR_C_2",
						"column": 3,
						"cube_level": "top",
						"location": None,
						"id": 182,
						"replicate_no": 2,
						"row": "E"
					},
					{
						"code": "TST_KR_C_3",
						"column": 4,
						"cube_level": "top",
						"location": None,
						"id": 183,
						"replicate_no": 3,
						"row": "A"
					},
					{
						"code": "TST_KR_C_4",
						"column": 4,
						"cube_level": "top",
						"location": None,
						"id": 184,
						"replicate_no": 4,
						"row": "B"
					}
				]
			},
			{
				"code": "TST_KR_G",
				"colour": None,
				"description": "Kohl rabi and Gentle",
				"id": 13,
				"status": "active",
				"text": None,
				"condition_levels": [{
						"variable_name": "species",
						"level_name": "Kohl rabi"
					},
					{
						"variable_name": "tickling",
						"level_name": "Gentle"
					}
				],
				"units": [{
						"code": "TST_KR_G_1",
						"column": 2,
						"cube_level": "middle",
						"location": None,
						"id": 185,
						"replicate_no": 1,
						"row": "D"
					},
					{
						"code": "TST_KR_G_2",
						"column": 2,
						"cube_level": "middle",
						"location": None,
						"id": 186,
						"replicate_no": 2,
						"row": "E"
					},
					{
						"code": "TST_KR_G_3",
						"column": 3,
						"cube_level": "middle",
						"location": None,
						"id": 187,
						"replicate_no": 3,
						"row": "B"
					},
					{
						"code": "TST_KR_G_4",
						"column": 3,
						"cube_level": "middle",
						"location": None,
						"id": 188,
						"replicate_no": 4,
						"row": "C"
					}
				]
			},
			{
				"code": "TST_KR_M",
				"colour": None,
				"description": "Kohl rabi and Moderate",
				"id": 14,
				"status": "active",
				"text": None,
				"condition_levels": [{
						"variable_name": "species",
						"level_name": "Kohl rabi"
					},
					{
						"variable_name": "tickling",
						"level_name": "Moderate"
					}
				],
				"units": [{
						"code": "TST_KR_M_1",
						"column": 1,
						"cube_level": "bottom",
						"location": None,
						"id": 189,
						"replicate_no": 1,
						"row": "A"
					},
					{
						"code": "TST_KR_M_2",
						"column": 1,
						"cube_level": "bottom",
						"location": None,
						"id": 190,
						"replicate_no": 2,
						"row": "B"
					},
					{
						"code": "TST_KR_M_3",
						"column": 1,
						"cube_level": "bottom",
						"location": None,
						"id": 191,
						"replicate_no": 3,
						"row": "C"
					},
					{
						"code": "TST_KR_M_4",
						"column": 1,
						"cube_level": "bottom",
						"location": None,
						"id": 192,
						"replicate_no": 4,
						"row": "D"
					}
				]
			},
			{
				"code": "TST_B_C",
				"colour": None,
				"description": "Beetroot and Control",
				"id": 15,
				"status": "active",
				"text": None,
				"condition_levels": [{
						"variable_name": "species",
						"level_name": "Beetroot"
					},
					{
						"variable_name": "tickling",
						"level_name": "Control"
					}
				],
				"units": [{
						"code": "TST_B_C_1",
						"column": 4,
						"cube_level": "top",
						"location": None,
						"id": 193,
						"replicate_no": 1,
						"row": "C"
					},
					{
						"code": "TST_B_C_2",
						"column": 4,
						"cube_level": "top",
						"location": None,
						"id": 194,
						"replicate_no": 2,
						"row": "D"
					},
					{
						"code": "TST_B_C_3",
						"column": 4,
						"cube_level": "top",
						"location": None,
						"id": 195,
						"replicate_no": 3,
						"row": "E"
					},
					{
						"code": "TST_B_C_4",
						"column": 5,
						"cube_level": "top",
						"location": None,
						"id": 196,
						"replicate_no": 4,
						"row": "A"
					}
				]
			},
			{
				"code": "TST_B_G",
				"colour": None,
				"description": "Beetroot and Gentle",
				"id": 16,
				"status": "active",
				"text": None,
				"condition_levels": [{
						"variable_name": "species",
						"level_name": "Beetroot"
					},
					{
						"variable_name": "tickling",
						"level_name": "Gentle"
					}
				],
				"units": [{
						"code": "TST_B_G_1",
						"column": 1,
						"cube_level": "middle",
						"location": None,
						"id": 197,
						"replicate_no": 1,
						"row": "E"
					},
					{
						"code": "TST_B_G_2",
						"column": 2,
						"cube_level": "middle",
						"location": None,
						"id": 198,
						"replicate_no": 2,
						"row": "A"
					},
					{
						"code": "TST_B_G_3",
						"column": 2,
						"cube_level": "middle",
						"location": None,
						"id": 199,
						"replicate_no": 3,
						"row": "B"
					},
					{
						"code": "TST_B_G_4",
						"column": 2,
						"cube_level": "middle",
						"location": None,
						"id": 200,
						"replicate_no": 4,
						"row": "C"
					}
				]
			},
			{
				"code": "TST_B_M",
				"colour": None,
				"description": "Beetroot and Moderate",
				"id": 17,
				"status": "active",
				"text": None,
				"condition_levels": [{
						"variable_name": "species",
						"level_name": "Beetroot"
					},
					{
						"variable_name": "tickling",
						"level_name": "Moderate"
					}
				],
				"units": [{
						"code": "TST_B_M_1",
						"column": 1,
						"cube_level": "bottom",
						"location": None,
						"id": 201,
						"replicate_no": 1,
						"row": "E"
					},
					{
						"code": "TST_B_M_2",
						"column": 2,
						"cube_level": "bottom",
						"location": None,
						"id": 202,
						"replicate_no": 2,
						"row": "A"
					},
					{
						"code": "TST_B_M_3",
						"column": 2,
						"cube_level": "bottom",
						"location": None,
						"id": 203,
						"replicate_no": 3,
						"row": "B"
					},
					{
						"code": "TST_B_M_4",
						"column": 2,
						"cube_level": "bottom",
						"location": None,
						"id": 204,
						"replicate_no": 4,
						"row": "C"
					}
				]
			},
			{
				"code": "TST_S_C",
				"colour": None,
				"description": "Sunflower and Control",
				"id": 18,
				"status": "active",
				"text": None,
				"condition_levels": [{
						"variable_name": "species",
						"level_name": "Sunflower"
					},
					{
						"variable_name": "tickling",
						"level_name": "Control"
					}
				],
				"units": [{
						"code": "TST_S_C_1",
						"column": 5,
						"cube_level": "top",
						"location": None,
						"id": 205,
						"replicate_no": 1,
						"row": "B"
					},
					{
						"code": "TST_S_C_2",
						"column": 5,
						"cube_level": "top",
						"location": None,
						"id": 206,
						"replicate_no": 2,
						"row": "C"
					},
					{
						"code": "TST_S_C_3",
						"column": 5,
						"cube_level": "top",
						"location": None,
						"id": 207,
						"replicate_no": 3,
						"row": "D"
					},
					{
						"code": "TST_S_C_4",
						"column": 5,
						"cube_level": "top",
						"location": None,
						"id": 208,
						"replicate_no": 4,
						"row": "E"
					}
				]
			},
			{
				"code": "TST_S_G",
				"colour": None,
				"description": "Sunflower and Gentle",
				"id": 19,
				"status": "active",
				"text": None,
				"condition_levels": [{
						"variable_name": "species",
						"level_name": "Sunflower"
					},
					{
						"variable_name": "tickling",
						"level_name": "Gentle"
					}
				],
				"units": [{
						"code": "TST_S_G_1",
						"column": 1,
						"cube_level": "middle",
						"location": None,
						"id": 209,
						"replicate_no": 1,
						"row": "A"
					},
					{
						"code": "TST_S_G_2",
						"column": 1,
						"cube_level": "middle",
						"location": None,
						"id": 210,
						"replicate_no": 2,
						"row": "B"
					},
					{
						"code": "TST_S_G_3",
						"column": 1,
						"cube_level": "middle",
						"location": None,
						"id": 211,
						"replicate_no": 3,
						"row": "C"
					},
					{
						"code": "TST_S_G_4",
						"column": 1,
						"cube_level": "middle",
						"location": None,
						"id": 212,
						"replicate_no": 4,
						"row": "D"
					}
				]
			},
			{
				"code": "TST_S_M",
				"colour": None,
				"description": "Sunflower and Moderate",
				"id": 20,
				"status": "active",
				"text": None,
				"condition_levels": [{
						"variable_name": "species",
						"level_name": "Sunflower"
					},
					{
						"variable_name": "tickling",
						"level_name": "Moderate"
					}
				],
				"units": [{
						"code": "TST_S_M_1",
						"column": 2,
						"cube_level": "bottom",
						"location": None,
						"id": 213,
						"replicate_no": 1,
						"row": "D"
					},
					{
						"code": "TST_S_M_2",
						"column": 2,
						"cube_level": "bottom",
						"location": None,
						"id": 214,
						"replicate_no": 2,
						"row": "E"
					},
					{
						"code": "TST_S_M_3",
						"column": 3,
						"cube_level": "bottom",
						"location": None,
						"id": 215,
						"replicate_no": 3,
						"row": "A"
					},
					{
						"code": "TST_S_M_4",
						"column": 3,
						"cube_level": "bottom",
						"location": None,
						"id": 216,
						"replicate_no": 4,
						"row": "B"
					}
				]
			}
		]
	}
