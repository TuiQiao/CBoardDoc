# Background
Data visualization is one of the most important step of Business Intelligence life cycle. Nowadays there are several kinds of common data visualization solutions as follows:

## Commercial Software
- **Commercial BI suite** can provide a full range of solutions in BI life cycle. The Nowadays there are quite some well-known suites such as **Congons** of IBM, **BO** of SAP, **BIEE** of Oracle, and newcomer **Tableau**, **QlikView** and so on. Most of these products usually have powerful and complicate front-end user interface and beautiful data visualization feature, besides, also the function like report design, dashboard design, report email, on-line analytical processing (OLAP) analysis are all in box.
- For sure, **good service come with expensive prices**. Not surprisingly, we can see about hundreds or thousands of millions cost per year.
- Big data/NoSQL/NewSQL products are multifarious and evolve rapidly. Even for these expensive BI suites, it’s hard to provide support for all data sources.
- **The third party data analysis platform**. Take Google Analytics as example. User should send data to google by call the SDK provided by GA. After that user can login Google Analytics web site do some regular data analysis.
- For this solution, if your data is sensitive or your company has extract individually requirement, you can skip to check next one.
- There are also some good venture company aimed to packaged BI software and services, their solution is suitable for company or organization that has no research and development ability and don't want to spend too much energy on the software.


## Several patterns of open source software
- **Chart Library**: excellent open source visualization development kit, provided in the form of JS Library, such as: ECharts of baidu, HighChart, D3, ChartJS and so on. Powerful to create single chart, however, data analysts can not leverage them.
- **Simple Web Reproter**: Simple Web data query and data visualization, such as Art. Data format of the SQL query have strict requirements and query can’t be reused, graphics are very simple and crude.
- Reporting Tool, appendix: [12 the best open source Reporting tools](http://www.iteye.com/news/11361), interested friends can go to their experience.
- In scope of **open source OLAP software**, based on Mondrian, [Saiku]((http://www.meteorite.bi/products/saiku) and [Pivot4J](http://www.pivot4j.org) are the most successfully apps, both open source platform for OLAP analysis the biggest advantage is self-service analysis, users to explore complex data sources, using a familiar drag and drop interface and easy to understand business terminology, all within a browser. From 2013, we begin to research Saiku2 in our work. Now Saiku has evolve to version 3.x New features are only in their enterprise edition. It’s no compliant about their commercial strategy. Also we should thank for their community edition work. For take advantage of multidimensional analysis, version 2.6 is enough.
- **The Open Source BI Suit**: Pentaho and Spago BI are the most well-known and powerful, but the system architecture is very heavy, the component is complex, difficult to secondary development and maintenance.

## About Dashboard
We have do a lot market research and data digging, Free Dashboard designer, such as DashBuilder, RazorFlow, are both lack of good visual control, razorflow Dashboard design also need developers intervention. Caravel is a python based dashboard product, in my personal view, JVM language development product are more compatible and the adaptability is better.
Another common industry Dashboard development approach is to build up a full customization, product, including operation and maintenance. User needs to be specialize on a document about the layout and what kind of data and what kind of graphical display, then front-end engineers to design the page and user interactive, back-end developer to handle service end data and api interface. With no doubt the development life cycle is long, chart, data model and query are hard to be reused. This solution is more suitable for cooperations business and analysis requirements are fixed. Otherwise once requirement is changed or added, the cost is very large.

## About CBoard
In this context, CBoard's starting point is to create a:
- Timely data interaction. You do not need a "multidimensional" data diagram of the model (Mondrian Schema, BO Universe) to design the Dashboard, and do the "Type SQL, Get Chart" like the AD of some product declares.
- Drag and drop dimensions interact. Drawing on the Databrick Cloud Platform and Zeppelin's visual inspiration, SQL or any other query structure returns a 2D datasheet that allows users to explore complex data sources, using a familiar drag and drop interface and easy to understand business terminology, all within a browser.
- Not only JDBC data connection interface. At present, CBoard supports JDBC data source and Saiku2.x data source (later known as DataProvider), but users can extends the DataProvider class without changing the front-end interface, return to a two-dimensional array, the corresponding front-end UI can be automatically generate based on the attributes of your DataProvider.
