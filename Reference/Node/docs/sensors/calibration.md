# Calibration

All sensors show a degree of variation when compared to each other. This can be the result
or the manufacturing process, the way in which the sensors operate or a whole range of other
causes. Some expensive sensor units have built-in electronics that detect and compensate for
these variations, but that is not always possible. *Calibration* is the process of comparing
the output from a sensor with one or more known reference values so that any differences can
be taken into account.

When measuring the electrical conductivity (EC) of a nutrient solution, for example, your 
sensor will give you a value, but without a reference for comparison, you do not know how 
accurate that value is. However, if you compare the value from the sensor with one taken by
an electronic meter such as the one shown below, you can adjust your sensor reading so that 
it matches. For pH, the reference values would typically be provided by samples of known pH.

![Electrical conductivity meter](../img/ec_meter.png#centred)

## Linear adjustment

The simplest strategy is to assume that the relationship between the reference values and
the measured values is linear. That means that if you collect a series of measurements with
their matching reference (true) values, you can plot them on a graph and the pattern will be
roughly a straight line. Let's use the table of values shown below as an example.

| Measured value (mV) | Reference value (&mu;S/cm) |
|:-------------------:|:--------------------------:|
|          0          |             0              |
|         200         |            183             |
|         240         |            448             |
|         490         |            803             |
|         640         |            1080            |
|         860         |            1490            |
|        1080         |            1930            |

The measured values are shown in mV because that is the signal obtained from a typical analogue
sensor, and the true values are shown in microsiemens per centimetre (&mu;S/cm) which is a typical
unit of electrical conductivity.

A [scatterplot](https://www.mathsisfun.com/data/scatter-xy-plots.html) can be created from this 
data where the measured values lie on the x-axis and the reference values lie on the vertical axis.
The result is shown below. As well as the points themselves, the graph also includes a *trendline*,
or line of best fit. There are mathematical procedures to work out where the line needs to be,
but if you are using a spreadsheet application it will create the line for you. Once you know
the line of best fit, you can work out its equation in the form

$$
y = mx + c
$$

where *m* is the slope of the line, and *c* is the offset in the vertical dimension. The
equation for the line is also shown on the graph.

[![Scatterplot and linear trendline](../img/linear_regression.png#centred)](../img/linear_regression.png)

Once you know the slope and offset, you can take any measured value and work out the true value
my multiplying by *m* and adding *c*. Note that in this case, *c* is negative so *adding c* is 
the same as subtracting the *absolute value* of *c*.

An interesting thing to notice in the example data above is that although the measured value that
corresponds to a reference value of zero is also zero, the line of best fit does not pass through 
the origin of the graph. There are several options for what to do in such a case. The node uses
the simple solution of accepting that there might be a slight inaccuracy at measurements close to 
zero because that gives the best fit over the majority of cases.

If you are feeling adventurous, please consult this thorough
[guide to best practice](https://biosearch-cdn.azureedge.net/assetsv6/Calibration-curve-guide.pdf)
for producing calibration curves.

## Polynomial adjustment

Linear calibration is used by the node to adjust the output of the pH sensors. However, it was
found in testing that a second-order polynomial curve (quadratic) was a better fit with the
data from the EC sensors. This is where the line of best fit is defined by an equation such as

$$
y = C_2 x^2 + C_1 x + C_0
$$

The table below shows some actual data collected from the EC sensors during testing. The 
following graph shows a polynomial best fit line with the associated equation calculated by 
the spreadsheet.

| Measured value (mV) | Reference value (&mu;S/cm) |
|:-------------------:|:--------------------------:|
|          0          |             0              |
| 442 | 724.31 |
| 795 | 1068.11 |
| 846 | 1171.72 |
| 876 | 1151.56 |
| 1130 | 1352.71 |
| 1150 | 1469.64 |
| 1340 | 1380.10 |
| 1720 | 1574.65 |
| 1790 | 1427.64 |
| 2060 | 1597.22 |
| 2080 | 1446.17 |

[![Scatterplot and polynomial trendline](../img/polynomial_regression.png#centred)](../img/polynomial_regression.png)

