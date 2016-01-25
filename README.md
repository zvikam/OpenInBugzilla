# OpenInBugzilla
Chrome extension that searches configured Bugzilla instances for selected bug number(s)

# Build
(1) Create a private key for signing the extension

(2) Build the extension

    make

# Install
(1) Install extension using the chrome extension manager, 
    or by simply dragging the [.crx] file onto your browser window.

(2) Configure your Bugzilla URL in the extension's "Options" page.
    Multiple bugzilla servers, whether on-premise or internet hosted, are supported.

(3) Whenever a number is "selected" on a page, right-click and follow the menu to open the bug with the corresponding #.
    Multiple selection is supported - will open as a "search results" page.
    
# Examples

The following "selection" formats are all supported:

    single number: 1000

    multiple numbers with comma/space separator: 1000,1001

    "bug" prefix, case-insensitive, with/without '#': bug#1000 BUG1001

    any combination of the above: 1000 bug1001,bug#1002
