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

## Gatsby defaults

Gatsby stores site-wide style in `/components/layout.css`. These will be applied by
default and will take precedence over local styles.

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

The `dandelion` DIV uses[flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) 
to arrange its contents in the `column` direction. It uses the `space-between` 
property to space its contents evenly.

### General page layout

The `page-container` DIV also uses flexbox, but arranges its contents in the `row` 
direction. The `SideNav` component provides a menu for superuser and sysadmin tasks.
The purpose of the `main-content` and `content-area` DIVs is to ensure that all pages
have the same spacing around the actual content.

<pre>

    DIV: page-container
     ├── COMPONENT: SideNav
     └── DIV: main-content
          └── DIV: content-area

</pre>

Within the `content-area`, content is arranged into *panels*. Different pages have
one, two or three panels each of which has a standard set of layout DIVs. The various
panels are children of the `content-area` and have the classes `one-panel`, `left-panel`,
`middle-panel` and `right-panel`.

### Panel structure

Panels may be divided into `panel-header`, `panel-body` and `panel-footer` areas. The 
header and footer are optional. By using the flexbox `flex-grow` property, the body area
is forced to take up the full height of the `content-area`.

<pre>

    DIV: content-area
     ├── DIV: panel-header
     ├── DIV: panel-body
     └── DIV: panel-footer

</pre>


### Scrollable areas

The site style requires that all content fits within a single viewport window. This 
means that it is necessary to provide scrolling areas in many different contexts. The
following structure is used. In the example, the scrolling area is contained within
a panel.

<pre>

    DIV: one-panel
     └── DIV: scrollable-container
          ├── DIV: scrollable-header
          ├── DIV: scrollable-content
          └── DIV: scrollable-footer

</pre>

The header area can be used for titles, for example, while the footer is a useful place
to put buttons.



