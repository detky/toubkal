# Toubkal

**High-Performances Reactive Web Application Framework**

[![Join the chat at https://gitter.im/ReactiveSets/toubkal](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ReactiveSets/toubkal?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

*606 automated tests*

[![Travis CI Build Status](https://travis-ci.org/ReactiveSets/toubkal.png?branch=master)](https://travis-ci.org/ReactiveSets/toubkal)

[![NPM version](https://badge.fury.io/js/toubkal.png)](http://badge.fury.io/js/toubkal)

*Liberating your Creativity, while fighting Climate Change*

## Teaser
Displaying a reactive ```<table>``` which DOM container is ```#sales_table```, ordered by date,
for the years 2013 & 2014, from a source ```sales``` dataflow coming from a ```socket.io``` server,
pulling the minimum amount of data from the server and updating the table as soon as some
data is available from the server
(complete working code including http server is available at
[examples/teaser](https://github.com/ReactiveSets/toubkal/tree/master/examples/teaser)):

See it live at [Toubkal Teaser](http://toubkal.rocks/teaser/index.html)

#### client.js

```javascript
rs.socket_io_server()
  .flow  ( 'sales' )
  .filter( [ { year: 2013 }, { year: 2014 } ] )
  .order ( [ { id: 'date' } ] )
  .table ( $( '#sales_table' ), sales_columns )
;
```

#### How does this work?

```sales_table``` is updated reactively in realtime whenever sales are updated on the server.

```rs.socket_io_server()``` connects the client to Toubkal socket.io server.

```flow( 'sales' )``` declares that the ```sales``` dataflow is needed from the server.

```[ { year: 2013 }, { year: 2014 } ]``` is a filter *query*, it controls how much sales data will be
pulled from the server therefore reducing both bandwidth usage and latency.

Latency is further reduced by displaying the table as soon as the first sales come
from the server, improving user experience.

This query can be a dataflow, updated by DOM controls and automatically pulling the
minimum amount of data from the server.

```[ { id: 'date' } ]``` is an *organizer*, it can also be a dataflow dynamically
updated by DOM controls, or any other application source.

The ```sales_columns``` dataflow controls table's columns. When updated, columns
are reactively added or removed in realtime without any addtitional programing required.
```sales_columns``` can be defined in the client or also come from the socket.io server
using the following declarative code:

```javascript
var sales_columns = rs
  .socket_io_server()
  .flow( 'sales_columns' )
;
```
The above code automatically shares the same socket.io connection with the previous code,
reducing resource usage on both clients and servers while only pulling from the server
the additional ```sales_columns``` dataflow.

Table updates are optimized to add and remove the minimum set of rows and columns,
improving client responsiveness, battery life and user experience.

#### What does this mean?

The Toubkal program above is expressed in one third the words required to express
the problem in plain english replacing thousands of lines of complex and error-prone code.

Toubkal programs have no *loops*, and no *ifs*, dramatically reducing the
likelyhood of bugs and hence improving productivity by orders of magnitude. Under the
hood, Toubkal provides all the optimized and comprehensively tested *loops* and
*ifs* you need.

These same declarative techniques are applied on the server side
delivering a full stack scallable and secure framework with highest performances
featuring reactive database and fine-grained authorization model.

The bottom line is that Toubkal allows you to write with less code higher performance
reactive applications, liberating your creativity.

## Introduction
Toubkal is a high-productivity, high-performances, scalable, reactive web application
framework aiming at improving productivity, reducing servers' environmental footprint,
and increasing mobile clients battery life by making an optimal use of server, network
and client resources.

### Development Stage
Toubkal is already very reliable thanks to its comprehensive test suite and is
currently used to deliver a production web application featuring reactive photo albums
for a 3D image modeling and rendering company.

Some features are still work in progress and some APIs are subject to changes meaning
that Toubkal should be considered Alpha at this time.

Toubkal should provide a functionally-rich framework by version 0.6 including reasonably
complete documentation extracted from the code where it currently stands, and reasonably
stable API.

### Our Team
Toubkal is developped by a team of experienced and passionate back-end and
front-end developpers.

We are well founded, not looking for additional founding, with enough resources to
complete this project.

If you are an experienced javascript programmer, understand the power of reactive
programming and would like to join our team, contact us.

### Why yet-another JavaScript Web Application Framework?
The short answer is because we are not satisfied with the productivity, performances,
and authorization models, of existing frameworks.

Internet servers are consuming an increasily significant share of worldwide exlectricity
production, contributing to climate change and threatening Internet growth as the
availability of cheap fosil fuels decreases due to population growth and per capita
consumption growth.

The power of Internet server is now mostly increasing through the addition of CPU cores,
meaning that the key to efficient usage of server resources must shift from
raw-single-thread performence to high concurency and parallelism performance. This in
turn requires new programming patterns to keep, or increase programmers' productivity.

Also, one must realize that the bulk of the vast majorty of today's web applications is
about controling the motion of data throughout the network. Such data is no-longer
limited to strictly public or strictly private informtation, requiring complex
authorization schemes. This calls for a framework that allows to greatly simplify the
management of user authorizations well beyond all-or-nothing authentication.

#### What do you mean by performances?
Our first priority is high-performances, because we believe that performance is the key
to better user experience, lowest operational costs, and a lower environemental
footprint.

We are fighting simultaneously against:
- **CPU cycles** that consume energy to run and cool-down servers, slow-down mobile
clients, and **drain mobile batteries** faster than anyone desires
- **Latency** decreasing the responsiveness of applications and user experiences
- **Bandwidth** usage that consume energy, and increase latency over lower-bandwidth
networks

We also want to keep **good performances at scale**. Most frameworks either do-not-scale
or scale with lower per-server performances further increasing the need for cash while
increasing environemental footprints.

Toubkal addresses all of these issues thanks to its unique **Subscribe / Push**
reactive dataflow model that works accross web browsers and nodejs servers, as well as
just-in-time code generators and other optimizations.

#### What's the big deal about authorizations?

Writing a complex application is hard-enough, add to this any significantly-complex
authorization scheme and the whole thing breaks appart, slows-down to a crawl, clutters
the code with plenty of unspotted security holes throughout every part of the
application, and every now and then exposes end-users' data to unauthorized users.

Most companies try to get away with it by sweeping each leak under the carpet and
promissing end-users that this will never happen again, or better yet, that this never
happened. Internally, this usually ends-up with more meetings and paperwork, less
things done for a system that although marginally improved, will at best remain unproven.

Because it is so hard, most frameworks take a this-is-not-our-problem approach to
authorizations by stating that you should use third-party libraries or plugins to deal
with it, all of which have shortcomming and usually will not fit the complexity of any
real-world application let alone provide acceptable performances at scale.

Toubkal provides a simple yet efficient dataflow authorization model and system
architecture that delivers **Reactive UI updates on authorization changes** at scale.

Now, you might consider that you don't need this, that end-users can refresh their page
on authorization changes. But the reality is that we can do this because we provide a
model that works in all cases, without requiring you to write a single additional line of
code, so that you can sleep at night knowing that end-user data cannot be exposed by some
piece of code that forgot to test a role in a corner-case.

#### How do you improve Productivity?

By allowing you to describe **what** you need in a declarative style, instead of
**how** this could ever be accomplished.

Figuring-out **how** this should a) work securely, b) scale and c) have best performances
as stated above, is hard, really hard. So hard that today the only way to achieve this is
throwing millions of dollars at the problem, and/or struggling with bugs, bottlenecks
and hard-to-work-around architecture limitations.

The only thing you need to know to understand Toubkal programs is about **Toubkal Pipelets**.

```javascript
rs.upstream_pipelet( parameter, ... )
  .a_pipelet( ... )
  .downstream_pipelet( ... )
;
```

A pipelet is a **factory function** which instances:
- Maintain a **dataset** state, in memory, mass storage, the DOM, or virtually (stateless)
- **Subscribe to** data change events from **upstream** pipelets
- **React** to upstream events to update their dataset
- **Emit** change events to **downstream** pipelets
- Have **no side effects** on other pipelets upstream or downstream
- Are **piped** to upstream and downstream pipelets using the **'.' operator**
- May be connected to additional upstream pipelets using parameters
- Can be composed with other pipelets to provide new pipelets

A Toubkal program is a JavaScript program where one can mix imperative-style programming
with Toubkal declarative-style programming.

The following provides an example of a non-trivial, high-performance, data server with
reactive updates on everything including authorization changes, in 60 lines of code,
comments included:
```javascript
var rs = require( 'toubkal' ); // Loads Toubkal core pipelets, returns rs head pipelet

require( 'toubkal/lib/server/file.js' ); // Loads file server pipelets
require( 'toubkal/lib/server/http.js' ); // Loads http server pipelets
require( 'toubkal/lib/socket_io/socket_io_clients.js' ); // Loads socket.io server pipelets

var database = rs.file_json_store( 'data_store.json' ); // * Input/Output dataflows to/from datastore, one-line, no external database required

var users = database.flow( 'users' ); // Dataflow of users' credentials:

var clients = rs
  // Define a set of web servers
  .set( [ 
    { ip_address: '0.0.0.0', port: 80 },                         // http://example.com/
    { ip_address: '0.0.0.0', port:443, key: '***', cert: '***' } // https://example.com/
  ] )
  
  .http_servers()              // Start http and https servers
  .socket_io_clients()         // Dataflow of socket.io client connections
  .authenticate_users( users ) // * Dataflow of authenticated users' connections providing user_id
;

var authorizations = database.flow( 'authorizations' ); // Dataflow of all users' authorizations

database
  .dispatch( clients, client )  // Serve 64k simultaneous user connexions over one core
  ._add_destination( database ) // Directs output of the dispatcher to the database pipelet
;

// Individual client composition
function client( source ) { // source refers to the output of the database here
  var user_id = this.user_id; // id of authenticated user
  
  var get_query = authorizations
    .filter( [ { user_id: user_id, get: true } ] )    // Get authorizations for this user
    .remove_attributes( [ 'user_id', 'get', 'set' ] ) // Strip unwanted query attributes
  ;
  
  var set_query = authorizations               
    .filter( [ { user_id: user_id, set: true } ] )    // Set authorizations for this user
    .remove_attributes( [ 'user_id', 'get', 'set' ] ) // Strip unwanted query attributes
  ;
  
  var socket = this.socket;     // Socket to exchange data with web browser
  
  source                        // Dataflows from the database through dispatch()
    .filter( get_query )        // delivers only what this user is authorized to get
    ._add_destination( socket ) // Send data to web browser
  ;
  
  return socket          // Receive data from web browser
  
    .filter( set_query ) // only collects from client unauthorized writes
  ;
}
```

Toubkal's **Subscribe / Push** reactive model allows to solve the **how** so that you
don't have to deal with it.

To make it easier, the API describes **what** you want in **plain JavaScript** without
requiring a graphical UI to glue hard-coded and hard-to-comprehend xml or json "nodes"
and "links" together as many other dataflow libraries require.

Toubkal reactive dataflow model provides higher level abstractions handling under the
hood both subscribe dataflows and information push dataflows that allow to move the
least amount of information possible between clients and servers reactively.

### Toubkal Subscribe / Push Dataflow Model

The following describes implementation details implemented at Toubkal's low level.
Application Architects do not need do program anything for this to happen as it is
entirely hidden by Toubkal pipelets. Understanding of the underlying model helps understand
why Toubkal is so efficient and how it scales.

Most dataflow libraries usually implement one of two models:
- push: all data is pushed downstream as it happens, allowing realtime updates
- pull: data is pulled upstream when needed, allowing lazy programming, pulling only what
is required, when required

For web applications' communications between servers and clients these two models are
usually not acceptable for these reasons:

- The pull method is not reactive, introducing average latency of the polling period.
Worse it and can consume large amounts of bandwidth if the polling period is too small.
It can nonetheless be used efficiently on the client side along with
requestAnimationFrame() to prevent over-updating the DOM between refreshes.
- The push method pushes all data regardless of what the downstream many need. This can
result in the transmission of large amounts of unused data, usually introducing
unacceptable latency and bandwidth charges.

Toubkal implements a **Subscribe / Push** model where downstream pipelets subscribe to
the subset of data they are interested in and subsequently receive all updates in a push
fashion only for that subset. This allows Toubkal to move less data between clients and
servers while remaining realtime with lower latency.

Toubkal stateless pipelets also use a lazy model where they will not subscribe to anything
from upstream unless initial data is fetched by a downstream stateful pipelet. This again
allows to transmit only what is really used by the application at any given time.

A subscription is done using a query dataflow that represents a kind of filter on the
upstream dataflow. Because the query is itself a dataflow, the subcription can change
over time.

When tens of thousands of downstream pipelets subscribe to a single pipelet using
different queries, Toubkal provides a query tree that routes data events very efficiently
in O( 1 ) time (i.e. that does not depend on the number of connected clients) therefore
providing a more scalable solution within a single server. Sending actual data to n
clients out of N connected clients is O( n ) so actual performances depends on the
application (i.e. whether n << N or not).

A network of Toubkal servers can be arranged in a tree-like fashion to provide
unlimited size query trees, e.g. to dispatch data to millions of simultaneous clients.
Each server subscribes to its upstream server the subset of data it dispatches to
downstream servers and clients. This allows efficient and low-latency routing thanks
in part to the high performances of each individual server query tree.

#### Data Events, Operations, Stateless Sets and Pipelets

Internally, Toubkal dataflows represent the evolution of data sets over time where
each event modifies a set. These dataflows are therefore reactive sets change flows.

Each event carries an opperation name such as *add* or *remove* and an array of values
to add to, or remove from, a set.

**Stateless** pipelets process values which are not materialized either in memory or
other storage, their state is vitual.

Stateless pipelets process data events independently of all other events and values in
the set allowing faster operations and lower memory footprints.

Stateless pipelets can therefore process events out of order, much like Internet Protocol
packets can be routed through various paths within the Internet and may arrive at their
destinations in any order.

#### Stateful Pipelets

A **Stateful** pipelet maintains the state of a set either in memory, in mass storage,
or any other API that provides a storage behavior.

User Interface pipelets are stateful as these present the state of a set through the DOM.

Much like the TCP protocol in the Internet which is responsible for end-to-end
communications consistency, Stateful pipelets may receive data events in any order and
are responsible for maintaining an application-consistent state.

Stateful pipelets are implemented thanks to the stateful set() pipelet that is typically
used as a base pipelet for all stateful pipelets.

Also, much like the TCP protocol, stateful pipelets are found at the edges of a
Toubkal network of stateless pipelets.

#### Horizontal Distribution

Allowing out-of-order data events is a key feature of Reactive Sets which greatly eases
horizontal distribution of workloads and charding, because no synchronization is needed
between chards that may be processed in parallel either over a number of threads,
processes, or servers in a true share-nothing architecture.

#### Incremental Processing

Incremental sets processing allows to split large sets into optimal chunks of data
rendering data to end-users' interface with low-latency, improving end-user experience.
Data events update sets in real-time, on both clients and servers.

Incremental aggregates allow to deliver realtime OLAP cubes suitable for realtime data
analysis and reporting over virtually unlimited size datasets.

#### Loops, Just-In-Time Code Generation

Toubkal data events contain arrays of values which are typically processed in loops. In a
traditional programming environement, one typically writes code that processes values in
loops. With Toubkal, architects do not write loops because these are absracted away as sets
processed by pipelets.

This greatly simplifies programming while removing the likelihood for common programming
errors.

Highest performances are provided thanks to Just-In-Time code generators delivering
performances only available to compiled languages such as C or C++. Unrolling nested
loops provide maximum performance while in turn allowing JavaScript JIT compilers to
generate code that may be executed optimally in microprocessors' pipelines.

#### Toubkal Low-Level Pipelet Programming

At the lower level, Toubkal **Pipelets** use a JavaScript functional programming model
eliminating the typical callback hell of assynchronous request-response programming
models.

Error and log dataflows originating on clients can easily be routed to servers to allow
proactive debugging of errors while in production, and effective service quality
monitoring.

Transactions allow to group related operations over time and allow synhronization
of concurrent dataflows. This synchronization becomes implicit at the architect
level removing the possibility of race condition errors that have been traditionaly
very hard to debug.

Developping stateless pipelets is straightforward, requiring to write a simple and
simple transform function very much akin pure function programming. Stateless Pipelets
API takes care of everything else, managing add, remove, fetch functions as well as
transactions.

Developping stateful pipelets remains complex and we are working to improve Toubkal's
low-level Stateful API to improve productivity. Managing state requires to implement
both add and remove functions, a fetch function to return initial state, and properly
handle transactions and out-of-order operations.

### Service Architecture

With Toubkal, services are typically composed of three different services:

- A stateful network of persistent database pipelets
- A stateless network of event dispatchers, acting as a marshalled multicasting network
for dataflows
- A stateful network of client widgets delivering applications to end-users

For small applications with few simultaneous users the first two typically reside in a
single server, while complex applications with large number of active users will be
running on different servers. Because pipelets share no state they can easily be
distributed.

A company could run multiple services through a single network of stateless event
dispatchers, acting as web service aggregator.

The different nodes of a Toubkal network communicate using the Toubkal protocol that
provides the Subscribe / Push service over a reliable transport (such as Sockets,
WebSockets, ...) but not necessarily guarantying the order of packets. So Toubkal could
also work over a protocol that would only guaranty the delivery of packets.

The Toubkal protocol therefore provides a higher level alternative to existing web
services protocols such as SOAP and REST, allowing to build efficiently complex real-time
applications with no additional code and less documentation since only application
dataflows need to be documented.

### Realtime Data Portability, Business Opportunities

A network of services sharing the same event dispatcher network enables to effectively
separate **Toubkal Data Providers** from **Toubkal Application Providers** increasing
business opportunities arising from the portability of reactive dataflows updated in
real-time and as authorized by end-users.

Within a Toubkal network, end-users no longer need to duplicate their personal data
endlessly and updates are propagated to all applications in realtime putting an end
to today's world of out-of-date data between services.

People will now expose their data, using a variety of services to view, edit, and publish
their data to other people.

Using only stateless pipelets, this architecture will reach internet-scale very
efficiently, delivering a Marshalled Subscribe / Push multicasting data exchange
for services to share data among many service providers, while representing a business
opportunity for **Toubkal Network Providers** much like today's CDNs but for marshalled
dynamic real-time content solving caching issues thanks to the immutability of data
events.

To participate in this network, service providers only need to publish dataflows and/or
subscribe to third-party dataflows.

End-users may use these services to backup their own data either on owned servers or
using third-party Toubkal Data Providers.

End-Users control access to their own data through Toubkal Authorization dataflows
providing additional business opportunities for **Toubkal Authorization Management Providers**
helping end-users manage authorizations for all their data accross all their Toubkal
Applications.

Monetization of dataflows and applications can be controlled through Toubkal reactive
authorizations by **Toubkal Monetization Providers**.

Disruptive new business opportunities arrising from **Toubkal Realtime Data Portability**
will prove stronger than the current closed, data-within-application model, resulting in
more data and more services available to more users and businesses.

### Ecosystem

Toubkal backend runs on **Node.js** providing a scalable database, web server, validation,
and authorizations.

On the frontend, Toubkal provides reactive controlers and views driven by reactive dataflows.

Toubkal can optionally be coupled with any other framework but we recommend using reactive
libraries such as **AngularJS**, **Ember**, **Bacon.js**, **React**, which model is
closer to RS.

For responsive layouts, we recommand **Bootstrap** that we use it for our reactive
Carousel and Photo Albums.

For DOM manipulation one can use any library, or none at all, as Toubkal core has no
dependencies.

Toubkal can either be used to gradually improve existing applications on the back-end or
front-end, or as a full-stack framework.

#### Integrated database and model

*Persistance will be implemented in version 0.4 and charding in version 0.7.

Toubkal features a chardable document database with joins, aggregates, filters and
transactions with eventual consistency allowing both normalized and denormalized
schemes.

### Demonstration Site
A [demonstration and beta test site is available here](http://www.castorcad.com/).

The source code for this demonstration site is in
[the GitHub repository ReactiveSets / demo](https://github.com/ReactiveSets/demo).

### Documentation

This readme provides an introduction to Toubkal.

The bulk of the documentation is currently embedded in the code of ```lib/pipelet.js```
and other sources for the core as well as individual pipelets' sources.

We plan on extracting and completing this documentation to provide the following
manuals:

- A Tutorial
- Toubkal Application Architect Manual
- Toubkal Pipelet Developper's Guide
- A Reference Manual for all available pipelets by module

### Automated Tests, Continuous Integration

We have curently developped 606 automated tests for the Toubkal core pipelets that run
after every commit on Travis CI under node version 0.10. We no longer test version
0.6 and 0.8 since Travis seems to have issues with these. Version 0.12 is not currently
tested for a problem with the zombie headless test framework.

Our continuous integration process also requires that before each commit the developper
runs these tests so travis usually passes all tests. In the event that a test does not
pass the top priority is to fix the test before anything else.

We also do manual testing on the following web browsers: Chrome (latest), Firefox
(latest), IE 9, 10, and 11.

We publish to npm regularily, typically when we want to update the demonstration site or
each time we increment the minor version. If you need more updates just let us know.

### Contributions

Contributions are welcome but difficult at this time because Toubkal is still in alpha,
APIs may still change, and low-level documentation is incomplete requiring a lot of
support on our part. We however welcome contributors disiring to join our team.

## Installation

From npm, latest release:
```bash
# npm install toubkal
```

Some image manipulation pipelets require ImageMagick that [you can download here](http://www.imagemagick.org/script/binary-releases.php.).

## Running tests
```bash
# npm install -g coffee-script
# npm install -g mocha
# npm install expect.js
# npm install mocha-unfunk-reporter
#
# git clone https://github.com/ReactiveSets/toubkal.git
#
# cd toubkal
# ./run_tests.sh
Full test results are in test.out
-> passed 606 of 606 tests (4196ms)
#
# less -R test.out # for tests detailed traces
```

## Example of complete client and server application

Application retrieving sales and employees from a server, aggregates these by year and displays the results
incrementally in an html table.

This example also shows how to produce in realtime minified `all.css` and `all-min.js`. All assets content
is prefetched in this example for maximum performance. The less css compiler is also used to compile in real
time .less files. The same could be done to compile coffee script or use any other code compiler.

#### index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    
    <title>Toubkal - Aggregate Sales by Year and Employee</title>
    
    <link rel="stylesheet" href="all.css" />
    
    <script src="all-min.js"></script>
    
    <script src="/socket.io/socket.io.js"></script>
  </head>
  
  <body>
    <div id="sales_table"></div>
    
    <script>client()</script>
  </body>
</html>
```

#### client.js

```javascript
"use strict";

function client() {
  var RS      = rs.RS                // RS references ReactiveSets' Classes and methods
    , extend  = RS.extend            // used to merge employees and sales
    , sales   = [ { id: 'sales' } ]  // Aggregate sales measures
    , by_year = [ { id: 'year'  } ]  // Aggregate dimensions
    
    // Table columns order by year and employee name
    , by_year_employee = [ { id: 'year' }, { id: 'employee_name' } ]
    
    // Define table displayed columns
    , columns = [
      { id: 'year'         , label: 'Year'          }, // First column
      { id: 'employee_name', label: 'Employee Name' },
      { id: 'sales'        , label: 'Sales $'       }
    ]
  ;
  
  var server = rs.socket_io_server(); // exchange dataflows with server using socket.io
  
  // Get employees from server
  var employees = server.flow( 'employees' ); // filter values which "flow" attribute equals 'employee'
  
  // Produce report after joining sales and employees
  server
    .flow( 'sales' )
    .join( employees, merge, { left: true } ) // this is a left join
    .aggregate( sales, by_year )
    .order( by_year_employee )
    .table( 'sales_table', columns )
  ;
  
  // Merge function for sales and employees
  // Returns sales with employee names coming from employee flow
  function merge( sale, employee ) {
    // Employee can be undefined because this is a left join
    if ( employee ) return extend( { employee_name: employee.name }, sale );
    
    return sale;
  }
} // client()
```

#### server.js

```javascript
var rs = require( 'toubkal' );

var servers = rs
  .set( [ // Define http servers
    { port:80, ip_address: '0.0.0.0' } // this application has only one server
    { port:443, ip_address: '0.0.0.0', key: 'key string', cert: 'cert string' }
    // See also "Setting up free SSL on your Node server" http://n8.io/setting-up-free-ssl-on-your-node-server/
  ] )
  .http_servers() // start http servers
;

// Get a dataflow for a minified lib/toubkal-min.js with source map and source files
var client_assets = require( 'toubkal/lib/server/client_assets' )
  , toubkal_min = client_assets.toubkal_min()
;

// Listen on server when toubkal-min.js is ready (when minification is complete)
servers.http_listen( toubkal_min );

// Other static assets
rs.set( [
    { path: 'html' },
    { path: 'css'  }
  ] )
  
  .watch_directories()     // Retrrieves files list with realtime updates (watching html and css directories)
  
  .union( rs.set( [
    { path: 'client.js' }
  ] )
  
  .watch()                 // Retrieves file content with realtime updates
  
  .union( [ toubkal_min ] ) // Add minified assets
  
  .serve( servers )        // Deliver up-to-date compiled and mimified assets to clients
;

// Start socket servers on all http servers using socket.io
var clients = servers.socket_io_clients(); // Provide a dataflow of socket.io client connections

rs.union( [
    rs.configuration( { filepath: 'sales.json'    , flow: 'sales'     } ), // The dataflow store of all sales
    rs.configuration( { filepath: 'employees.json', flow: 'employees' } )  // The dataflow store of all employees
  ] )
  
  // Serve realtime content to all socket.io clients
  .dispatch( clients, function( source, options ) {
    var socket = this.socket;
    
    // Insert socket dataflow to exchage data with this client
    source._add_destination( socket );
    
    return socket;
  } )
;
```

#### Start server

```bash
node server.js > server.out
```

## Roadmap / Releases

### Version 0.9.0 - Finalize API

#### Main Goals:

- Finalize API, in view of 1.0 release
- Implement all remaining ToDo
- Feature freeze
- Develop additional tests, goal is at least 1100 automated tests
- Improve documentation and tutorial

### Version 0.8.0 - P2P Dataflows

#### Main Goals:

- WebRTC pipelets
- Implement Peer-To-Peer dataflows using WebRTC
- Develop additional tests, goal is at least 1000 automated tests

### Version 0.7.0 - Charding

#### Main Goals:

- Horizontal distribution / Charding using websocket dispatcher
- Develop additional tests, goal is at least 900 automated tests
- Implement Phantom.js pipelet to deliver public content to search engines w/out JavaScript and improve SEO

### Version 0.6.0 - Packaging / First Beta

#### Main Goals:

- This is the first Beta version with a reasonably stable API:
  - Implement as many ToDo as possible
  - Develop additional tests, goal is at least 800 automated tests
- Extract documentation from code
- Build Website, featuring documentation and tutorial
- Session Strorage Dataflow

### Version 0.5.0 - Web Application Framework / Packaging

#### Main Goals:

- Navigation pipelets
- Internationalization
- Packaging:
  - Finalize module pattern
  - Split This repository into toubkal, rs_server, rs_client, rs_socket_io, rs_bootstrap, ... repositories
  - Implement rs package manager
  - Implement rs automatic pipelet patching
- Develop additional tests, goal is at least 650 automated tests

### Version 0.4.0 - Persistance

#### Main Goals:

- Persistance
  - Refactor fetch() to provide operations instead of adds, enables versionning
  - Dataflows Meta Data for key, and query indexes definition
  - Operations log
  - Query cache
  
- Develop additional tests, goal is at least 600 automated tests

- Implement websocket_clients() and websocket_server() pipelets as a faster alternative
  to socket_io equivalents.

- Query Tree else()
  - Emits data events not routed to any other destination input
  - Pipelet else() captures these events
  - May be used to detect clients attempts to submit un-authorize data

- Union upstream query routing:
  - Prevents useless duplication of fetch and query updates on all upstream union branches
  - Routes fetch and update queries based on downstream query

### Version 0.3.0 - Complex Queries, Authentication && Authorizations, API Refactoring

#### Remaining Goals:

- Dynamic Authorizations Query Dataflow from user id
- Multi-provider Sign-in Widget
- Refactor / stabilize pipelet API

##### Work in progress:

- Dropbox file sharing for photo albums (developped and tested in demo repository)

- Out-of-band fetchable global lazy log dataflow for: exceptions, errors, and debug information

- Intergrate Safe Complex Query expressions into Query and Query_Tree

- Concurrent Transactions Synchronization (fully developped, adding tests)

- Refactor Web Server API to allow use of other nodejs http server frameworks such as Connect, Express, Koa, ...
  - Bug with routing algorythm for / route
  - Fix updates

- Refactor modules, packaging:
  - use undefine() to load modules from any situation, node, browser, AMD loaders
  - split into meaningful subdirectories to eventually split the project into subprojects

- Database based on watch_directory() + dispatch() + configuration()
  - Without versioning because this is based on configuration()
  - File write, write to configuration file
  - Optimize output changes using an Array Object diff

- Refactor pipelet keys, where id will become mandatory to ease implementation of multi-dataflows
  - Allow easy caching using set() pipelet
  - define attribute _v for versions, allowing to manage complete anti-state and super-state
  - super-state will contain versions of an object added after a first version is already in the state
    - allow complete desorder between multiple adds and revmove on the same object defined by its id

- Facebook React integration
  - Client-side done
  - Server-side:
    - using html_parse() to insert elements into a DOM tree
    - using html_serialize() to rebuild modified html to server

##### Features already developped:

- Teaser example

- Authentication with Passport
  - Provider credentials from configuration
  - User Identities Management
  - Dynamic Routes Management
  - Integration with express

- Safe Complex Query expressions:
  - Sanitized for safe execution on server even when crafted by untrusted clients
  
  - For execution by upstream servers to reduce bandwidth, cpu usage and latency
  
  - JSON-friendly Objects and Arrays for any JSON transport such as socket.io or websocket
  
  - Side-effect free
  
  - Any depth Abstract Syntax Tree, can be limited to prevent Denial of Service attacks
  
  - Consistent and rich semantic, above that of SQL and MongoDB:
    - Nested Object and Array expressions
    
    - Regular expressions
    
    - All progressive operators, e.g.:
      ```18 <= age <= 25```
      ```sales / ( 0 != count ) > 1000```
  
  - Operators:
    - Control flow       : ```&& || ! failed```
    - Literals           : ```$ _ __ .```
    - Grouping           : ```[]```
    - Comparison         : ```== != > >= < <=```
    - Arithmetic         : ```+ - * / %```
    - Regular expressions: ```RegExp match match_index group split```
    - Search in Array    : ```in```
    - Array / String     : ```length```
    - Date               : ```Date value year month day hours minutes seconds milliseconds time```
    - Custom operators   : defined using JavaScript functions but used as JSON-friendly Strings and Arrays to prevent code-injection
  
  - Example: Expression to get active users whom last logged-in before 2013:

```javascript
    {
        flow   : 'user'
      , active : [ '==', true ]
      , profile: {
            last_logged_in: [ 'year', '<', 2013 ]
        }
    }
```

- Refactor pipelet class model:
  - Ease the definition of multiple, semantically distinct, inputs and outputs without definining pipelets
  - Define Plug base class for:
    - Inputs (Pipelet.Input)
    - Outputs (Pipelet.Output)
  - Pipelet.Input class:
    - Receives data events from upstream to be processed by pipelet
    - Provides upstream transactions management
    - Provides methods for connectivity to source outputs
    - Fetches upstream data as requested by pipelet
    - Determines lazyness
    - Emits upstream query updates
  - Pipelet.Output class:
    - Provides methods for connectivity to destination inputs
    - Fetches 
    - Fetches and filters pipelet's state
    - Emits data events to downstream inputs using query trees
    - Emits transaction events
    - Manages output transactions
    - Updates query tree from downstream query updates
    - Propagates query updates to pipelet
    
  - Pipelet modified class:
    - Manages state
    - Defaults remains stateless (i.e. uses altered upstream state)
  
  - RS.Options object defined methods for manipulating operations' options:
    - forward(): returns an options Objects with options that must be forwarded
    - has_more(): returns truly if there is an incomplete transaction

- 606 automated tests

Pipelet                   | Short Description
--------------------------|------------------------------------------------
operations_optimizer()    | On complete, remove unnecessary adds, removes, updates
html_serialize()          | Serialize DOM tree generated by html_parse()
html_parse()              | Parse html content to htmlparser2 DOM tree
react_table()             | Reactive table rows and columns implemented using react()
react()                   | Transform a full set to a DOM widget using a Facebook React render function
http_listen()             | Listen to http servers, allows to get the 'listening' event (used by socket.io 0.9 for its garbage collector)
virtual_http_servers()    | Allows to run many frameworks and socket.io servers virtual hosts
serve_http_servers()      | Bind http event handlers to HTTP_Router()
passport()                | Passport authentication
passport_strategies()     | Manage Passport strategies
greedy()                  | A non-lazy stateless pipelet
make_base_directories()   | Create base directories for a dataset of file paths

Other Classes && methods  | Short Description
--------------------------|------------------------------------------------
undefine()                | Universal module loader for node and the browser, exported as own npm module
Lap_Timer                 | Helps calulate time difference between events, used by loggers
Console_Logger            | Logger to console.log() with timestamps and lap lines 
Client assets             | Sets to ease assembly of minified files for clients
HTTP_Router               | Efficiently route HTTP requests using base URLs
Lazy_Logger               | Logger controlled by queries using '<=' operator
Query_Error               | Custom Error class for Queries
Query.Evaluation_Context  | Evaluation context for complex query expressions
Query.evaluate()          | Query class method to evaluate complex query expressions
Query.Operator()          | Adds a Query expression operator
Query.fail                | Failure value for Query expressions
Plug                      | Base class for Input and Output plugs
Pipelet.Input             | Pipelet default Input plug
Pipelet.Output            | Base Output plug
Controllet.Input          | Input plug for controllets
Controllet.Output         | Output plug for controllets
Union.Input               | Input plug for Union (allows many sources)
Union.Output              | Output plug for Union
Set.Output                | Output plug for Set
IO_Transactions           | Base class for Input_Transactions and Output_Transactions
Input_Transactions        | Concurrent Transactions Synchronization at Inputs
Output_Transactions       | Concurrent Transactions Synchronization at Outputs
IO_Transaction            | Base class for Input_Transaction and Output_Transaction
Input_Transaction         | Manage an input transaction
Output_Transaction        | Manage an output transaction

### Version 0.2.0 - Subscribe / Push Dataflow Model - March 31 2014:

- Finalize Subscribe / Push reactive dataflow model using optimized Query Tree Router and lazy connection of stateless pipelets
- Filter support for static and dynamic queries
- Transactions
- Automate UI tests on Travis
- 309 automated tests
- Controllets which control upstream query trees using downstream queries
- Improve Pipelet API and naming conventions
- Virtual Hosts w/ optimized routing
- Touch Events on bootstrap pipelets

Pipelet                   | Short Description
--------------------------|------------------------------------------------
watch_directories()       | Updated when entries in directories are updated
url_events()              | Browser url changes
animation_frames()        | Request Animation Frame events
encapsulate()             | Hide a graph of pipelets behind one pipelet
require_resolve()         | Resolve node module files absolute path
timestamp()               | Add timestamp attribute
events_metadata()         | Add events metadata attributes
auto_increment()          | Add auto-increment attribute
set_flow()                | Add flow attribute
to_uri()                  | Transforms a relative file name into a DOM uri
thumbnails()              | Image thumbnails using ImageMagick
load_images()             | Load images in the DOM one at a time
bootstrap_carousel()      | Bootstrap responsive images carousel 
bootstrap_photos_matrix() | Bootstrap responsive photo matrix
bootstrap_photo_album()   | Bootstrap responsive photo album
json_stringify()          | JSON Stringifies content attribute
json_parse()              | JSON parse content attribute
attribute_to_value()      | Replace value with the value of an attribute
value_to_attribute()      | Sets value as an attribute and add other default attributes

### Version 0.1.0 - April 8th 2013:

#### Features:

- Push reactive dataflow model with lazy evaluation of stateless pipelets
- Core Database engine with order / aggregates / join / union, and more
- Automated tests
- Dataflows between clients and server using socket.io
- DOM Tables w/ realtime updates
- DOM Controls as dataflows: Drop-Down / Radio / Checkboxes
- DOM Forms with client-side and server-side validation
- Realtime Minification using Uglify w/ source maps
- HTTP(s) servers
- File watch w/ realtime updates
- JSON Configuration Files w/ realtime updates

Core Pipelets             | Short Description
--------------------------|------------------------------------------------
set()                     | Base stateful pipelet
filter()                  | Filters a dataflow
order()                   | Order a set
ordered()                 | Follow an ordered set (typically derived)
aggregate()               | Aggregates measures along dimensions (GROUP BY)
join()                    | Joins two dataflows
watch()                   | Dataflow updated on file content changes
dispatch()                | Dispatches dataflows to a dataflow of branches
parse_JSON()              | JSON dataflow to parsed JSON dataflow

Server Pipelets           | Short Description
--------------------------|------------------------------------------------
uglify()                  | Minifies a dataflow of files into a bundle, using [Uglify JS 2](https://github.com/mishoo/UglifyJS2)
http_servers()            | A dataflow of http servers
serve()                   | Serve a dataflow of resources contents to http (or other) servers
socket_io_clients()       | A dataflow server for socket.io clients
socket_io_server()        | A dataflow client for socket.io server
send_mail()               | Send emails from email dataflow
configuration()           | Dataflow of application configuration parameters

DOM Pipelets              | Short Description
--------------------------|------------------------------------------------
table()                   | DOM table bound to incoming dataflows
form()                    | DOM Form using fields dataflow, emiting submited forms
form_validate()           | Client and server form validation
checkbox()                | DOM input checkbox
checkbox_group()          | DOM input chexbox group
radio()                   | DOM radio button
drop_down()               | DOM drop-down menu

EC2 Pipelets              | Short Description
--------------------------|------------------------------------------------
ec2_regions()             | Set of AWS EC2 regions, starts ec2 clients

## Licence

    Copyright (C) 2013-2015, Reactive Sets

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
