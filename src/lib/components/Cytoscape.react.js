import PropTypes from 'prop-types';
import React, { Component, Suspense } from 'react';

// eslint-disable-next-line no-inline-comments
import RealCytoscape from '../fragments/Cytoscape.react';

/**
A Component Library for Dash aimed at facilitating network visualization in
Python, wrapped around [Cytoscape.js](http://js.cytoscape.org/).
 */
export default class Cytoscape extends Component {
    render() {
        return (
            <Suspense fallback={null}>
                <RealCytoscape {...this.props} />
            </Suspense>
        );
    }
}

Cytoscape.propTypes = {
    // HTML attribute props

    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * Sets the class name of the element (the value of an element's html
     * class attribute).
     */
    className: PropTypes.string,

    /**
     * Add inline styles to the root element.
     */
    style: PropTypes.object,

    // Dash specific props

    /**
     * Dash-assigned callback that should be called whenever any of the
     * properties change.
     */
    setProps: PropTypes.func,

    // Common props

    /**
     * A list of dictionaries representing the elements of the networks.
     *     1. Each dictionary describes an element, and specifies its purpose.
     *         - `group` (string): Either 'nodes' or 'edges'. If not given, it's automatically inferred.
     *         - `data` (dictionary): Element specific data.
     *              - `id` (string): Reference to the element, useful for selectors and edges. Randomly assigned if not given.
     *              - `label` (string): Optional name for the element, useful when `data(label)` is given to a style's `content` or `label`. It is only a convention.
     *              - `parent` (string): Only for nodes. Optional reference to another node. Needed to create compound nodes.
     *              - `source` (string): Only for edges. The id of the source node, which is where the edge starts.
     *              - `target` (string): Only for edges. The id of the target node, where the edge ends.
     *         - `position` (dictionary): Only for nodes. The position of the node.
     *              - `x` (number): The x-coordinate of the node.
     *              - `y` (number): The y-coordinate of the node.
     *         - `selected` (boolean): If the element is selected upon initialisation.
     *         - `selectable` (boolean): If the element can be selected.
     *         - `locked` (boolean): Only for nodes. If the position is immutable.
     *         - `grabbable` (boolean): Only for nodes. If the node can be grabbed and moved by the user.
     *         - `classes` (string): Space separated string of class names of the element. Those classes can be selected by a style selector.
     *
     *     2. The [official Cytoscape.js documentation](http://js.cytoscape.org/#notation/elements-json) offers an extensive overview and examples of element declaration.
     */
    elements: PropTypes.arrayOf(PropTypes.object),

    /**
     * A list of dictionaries representing the styles of the elements.
     *     1. Each dictionary requires the following keys:
     *         - `selector` (string): Which elements you are styling. Generally, you select a group of elements (node, edges, both), a class (that you declare in the element dictionary), or an element by ID.
     *         - `style` (dictionary): What aspects of the elements you want to modify. This could be the size or color of a node, the shape of an edge arrow, or many more.
     *
     *     2. Both [the selector string](http://js.cytoscape.org/#selectors) and
     *     [the style dictionary](http://js.cytoscape.org/#style/node-body) are
     *     exhaustively documented in the Cytoscape.js docs. Although methods such
     *     as `cy.elements(...)` and `cy.filter(...)` are not available, the selector
     *     string syntax stays the same.
     */
    stylesheet: PropTypes.arrayOf(PropTypes.object),

    /**
     * A dictionary specifying how to set the position of the elements in your
     * graph. The `'name'` key is required, and indicates which layout (algorithm) to
     * use.
     *     1. The layouts available by default are:
     *         - `random`: Randomly assigns positions
     *         - `preset`: Assigns position based on the `position` key in element dictionaries
     *         - `circle`: Single-level circle, with optional radius
     *         - `concentric`: Multi-level circle, with optional radius
     *         - `grid`: Square grid, optionally with numbers of `rows` and `cols`
     *         - `breadthfirst`: Tree structure built using BFS, with optional `roots`
     *         - `cose`: Force-directed physics simulation
     *
     *     2. Some external layouts are also included. To use them, run
     *     `dash_cytoscape.load_extra_layouts()` before creating your Dash app. Be careful about
     *     using the extra layouts when not necessary, since they require supplementary bandwidth
     *     for loading, which impacts the startup time of the app.
     *         - `cose-bilkent`: https://github.com/cytoscape/cytoscape.js-cose-bilkent
     *         - `cola`: https://github.com/cytoscape/cytoscape.js-cola
     *         - `euler`: https://github.com/cytoscape/cytoscape.js-dagre
     *         - `spread`: https://github.com/cytoscape/cytoscape.js-spread
     *         - `dagre`: https://github.com/cytoscape/cytoscape.js-dagre
     *         - `klay`: https://github.com/cytoscape/cytoscape.js-klay
     *
     *     3. The keys accepted by `layout` vary depending on the algorithm, but some
     *     keys are accepted by all layouts:
     *         - `fit` (boolean): Whether to render the nodes in order to fit the canvas.
     *         - `padding` (number): Padding around the sides of the canvas, if fit is enabled.
     *         - `animate` (boolean): Whether to animate change in position when the layout changes.
     *         - `animationDuration` (number): Duration of animation in milliseconds, if enabled.
     *         - `boundingBox` (dictionary): How to constrain the layout in a specific area. Keys accepted are either `x1, y1, x2, y2` or `x1, y1, w, h`, all of which receive a pixel value.
     *
     *     4. The complete list of layouts and their accepted options are available
     *     on the [Cytoscape.js docs](http://js.cytoscape.org/#layouts). For the
     *     external layouts, the options are listed in the "API" section of the
     *     README.
     *     Note that certain keys are not supported in Dash since the value is a
     *     JavaScript function or a callback. Please visit [this issue](https://github.com/plotly/dash-cytoscape/issues/25)
     *     for more information.
     */
    layout: PropTypes.object,

    // Viewport Manipulation

    /**
     * Dictionary indicating the initial panning position of the graph. The
     * following keys are accepted:
     *     - `x` (number): The x-coordinate of the position.
     *     - `y` (number): The y-coordinate of the position.
     */
    pan: PropTypes.object,

    /**
     * The initial zoom level of the graph. You can set `minZoom` and
     * `maxZoom` to set restrictions on the zoom level.
     */
    zoom: PropTypes.number,

    // Viewport Mutability and gesture Toggling
    /**
     * Whether panning the graph is enabled (i.e., the position of the graph is
     * mutable overall).
     */
    panningEnabled: PropTypes.bool,

    /**
     * Whether user events (e.g. dragging the graph background) are allowed to
     * pan the graph.
     */
    userPanningEnabled: PropTypes.bool,

    /**
     * A minimum bound on the zoom level of the graph. The viewport can not be
     * scaled smaller than this zoom level.
     */
    minZoom: PropTypes.number,

    /**
     * A maximum bound on the zoom level of the graph. The viewport can not be
     * scaled larger than this zoom level.
     */
    maxZoom: PropTypes.number,

    /**
     * Whether zooming the graph is enabled (i.e., the zoom level of the graph
     * is mutable overall).
     */
    zoomingEnabled: PropTypes.bool,

    /**
     * Whether user events (e.g. dragging the graph background) are allowed
     * to pan the graph.
     */
    userZoomingEnabled: PropTypes.bool,

    /**
     * Whether box selection (i.e. drag a box overlay around, and release it
     * to select) is enabled. If enabled, the user must taphold to pan the graph.
     */
    boxSelectionEnabled: PropTypes.bool,

    /**
     * Whether nodes should be ungrabified (not grabbable by user) by
     * default (if true, overrides individual node state).
     */
    autoungrabify: PropTypes.bool,

    /**
     * Whether nodes should be locked (not draggable at all) by default
     * (if true, overrides individual node state).
     */
    autolock: PropTypes.bool,

    /**
     * Whether nodes should be unselectified (immutable selection state) by
     * default (if true, overrides individual element state).
     */
    autounselectify: PropTypes.bool,

    /**
     * Whether the layout should be refreshed when elements are added or removed.
     */
    autoRefreshLayout: PropTypes.bool,

    // User Events Props

    /**
     * The complete node dictionary returned when you tap or click it. Read-only.
     *
     *     1. Node-specific items:
     *         - `edgesData` (dictionary)
     *         - `renderedPosition` (dictionary)
     *         - `timeStamp` (number)
     *
     *     2. General items (for all elements):
     *         - `classes` (string)
     *         - `data` (dictionary)
     *         - `grabbable` (boolean)
     *         - `group` (string)
     *         - `locked` (boolean)
     *         - `position` (dictionary)
     *         - `selectable` (boolean)
     *         - `selected` (boolean)
     *         - `style` (dictionary)
     *
     *     3. Items for compound nodes:
     *         - `ancestorsData` (dictionary)
     *         - `childrenData` (dictionary)
     *         - `descendantsData` (dictionary)
     *         - `parentData` (dictionary)
     *         - `siblingsData` (dictionary)
     *         - `isParent` (boolean)
     *         - `isChildless` (boolean)
     *         - `isChild` (boolean)
     *         - `isOrphan` (boolean)
     *         - `relativePosition` (dictionary)
     */
    tapNode: PropTypes.object,

    /**
     * The data dictionary of a node returned when you tap or click it. Read-only.
     */
    tapNodeData: PropTypes.object,

    /**
     * The complete edge dictionary returned when you tap or click it. Read-only.
     *
     *     1. Edge-specific items:
     *         - `isLoop` (boolean)
     *         - `isSimple` (boolean)
     *         - `midpoint` (dictionary)
     *         - `sourceData` (dictionary)
     *         - `sourceEndpoint` (dictionary)
     *         - `targetData` (dictionary)
     *         - `targetEndpoint` (dictionary)
     *         - `timeStamp` (number)
     *
     *     2. General items (for all elements):
     *         - `classes` (string)
     *         - `data` (dictionary)
     *         - `grabbable` (boolean)
     *         - `group` (string)
     *         - `locked` (boolean)
     *         - `selectable` (boolean)
     *         - `selected` (boolean)
     *         - `style` (dictionary)
     */
    tapEdge: PropTypes.object,

    /**
     * The data dictionary of an edge returned when you tap or click it. Read-only.
     */
    tapEdgeData: PropTypes.object,

    /**
     * The data dictionary of a node returned when you hover over it. Read-only.
     */
    mouseoverNodeData: PropTypes.object,

    /**
     * The data dictionary of an edge returned when you hover over it. Read-only.
     */
    mouseoverEdgeData: PropTypes.object,

    /**
     * The list of data dictionaries of all selected nodes (e.g. using
     * Shift+Click to select multiple nodes, or Shift+Drag to use box selection). Read-only.
     */
    selectedNodeData: PropTypes.array,

    /**
     * The list of data dictionaries of all selected edges (e.g. using
     * Shift+Click to select multiple nodes, or Shift+Drag to use box selection). Read-only.
     */
    selectedEdgeData: PropTypes.array
};

Cytoscape.defaultProps = {
    style: { width: '600px', height: '600px' },
    layout: { name: 'grid' },
    pan: { x: 0, y: 0 },
    zoom: 1,
    minZoom: 1e-50,
    maxZoom: 1e50,
    zoomingEnabled: true,
    userZoomingEnabled: true,
    panningEnabled: true,
    userPanningEnabled: true,
    boxSelectionEnabled: false,
    autolock: false,
    autoungrabify: false,
    autounselectify: false,
    autoRefreshLayout: true
};

export const propTypes = Cytoscape.propTypes;
export const defaultProps = Cytoscape.defaultProps;
