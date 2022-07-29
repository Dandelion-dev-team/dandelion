# General page structure and styling

In the early phases of development, separate scss files were created for each 
element - e.g. component, page, etc. This led to a certain degree of inconsistency.
The solution is to migrate to a consolidated set of styles where the general rules
for a particular page element (e.g. paragraph, button, etc.) are contained in the
`dandelion.scss` file, and any exceptions or extensions for a specific context are
contained in the scss file related to the relevant component. For example, the 
default rule for styling a level 1 heading will be located in `dandelion.scss`. If 
the component `imafakecomponent.js` requires a level 1 heading with a slightly 
larger bottom margin, a rule for overriding the default bottom margin value will
be added to `imafakecomponent.scss`. That way, the majority of page elements will
follow a consistent style, and it will be clear where the default rule has been
overridden.

As a transitional measure, the styles defined in `dandelion.scss` are applied to
elements contained within a DIV with the class name of `dandelion`. Once all 
pages and components have been modified to conform to the new approach, the 
reference to the class name `dandelion` can be removed.

## Conventions

In the structures that follow, the following conventions are observed: 

* The items following a colon after a DIV element are the class names associated with
the DIV
* The item following the colon after a `COMPONENT` is the component name
* Square brackets represent a list
* Angle brackets indicate a placeholder
* Curly brackets represent options


## Pages

The structure below represents a consolidated page structure that will eventually
be applied to all parts of the app. Note that the `Footer` and `ToastContainer` 
components may not be present on all pages. 

<pre>

    Page
      └── DIV: [dandelion]
           ├── COMPONENT: ToastContainer
           ├── COMPONENT: Header
           ├── DIV: [&lt;page name&gt;, page-container]
           └── COMPONENT: Footer

</pre>

Where the page content is delivered by a custom component, it is the component that 
provides the `page-container` DIV.

The `dandelion` DIV uses the
[flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) `space-between` 
property to space its contents evenly. This works for a single column of content or two.

## Content panels

A content panel is an area of a page that provides a white background for the page
content. The panel has rounded corners and black text and is divided into a title
section and a content section.

<pre>

    DIV: [panel, &lt;panel name&gt;]
      ├── DIV: [panel-title]
      └── DIV: [panel-content]
           └── DIV: [inner]

</pre>

The purpose of the `inner` DIV is to allow the `panel-content` DIV to take up constant
space on the page while the content can be scrolled.

