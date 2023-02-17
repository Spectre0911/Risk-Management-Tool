-- Not all of this data is valid according to the schema
-- Should help with testing whether the database rejects invalid data

insert into users (userid, email, firstname, lastname, password, pfppath, githubtoken, bio) values
    (1, 'lpittet0@reddit.com', 'Louise', 'Pittet', '30d869f2a8459ceabd6828ff3ce89e522e338e53efba9ec210972d71aba72727', 'http://dummyimage.com/237x100.png/ff4444/ffffff', '0a8a5b47d799538e7dc62d57cce19298793f7777be82cdf2479f75c111b20ac0', 'Enterprise-wide non-volatile function'),
    (2, 'kpoile1@mozilla.org', 'Kriste', 'Poile', 'eb9ea74bda05c854451f9a498db1551f18b239e5f7783d13b0923d3238705739', 'http://dummyimage.com/113x100.png/ff4444/ffffff', '8d1dd31381f4052606cad529fd4d45b4e6c90916ef7df77196862cfe2934732f', 'Digitized optimal synergy'),
    (3, 'skilban2@rambler.ru', 'Shel', 'Kilban', 'a67ee6cdfc440ae7fe5bc120aed87c27fd6f361610b29ceb4c699411dbce8404', 'http://dummyimage.com/168x100.png/cc0000/ffffff', '6802ae8559b3a7cc04e5e3acccc56ed10c3c1cf07633fe1381eea2e34fadd465', 'Progressive asymmetric algorithm'),
    (4, 'wloddy3@sphinn.com', 'Walden', 'Loddy', '18d4ab999a4f89bd66a6192e0f822ef7e9854c68f2a3e965556bf9fd45e68550', 'http://dummyimage.com/158x100.png/cc0000/ffffff', '1ebbc146b16ddc0d55dd25ea0158cbb1fbbcb89228a663c05e876a950aeaf109', 'Progressive eco-centric toolset'),
    (5, 'henticott4@intel.com', 'Hanan', 'Enticott', '8386a7cde329af18add7fc2648c7c4102f3251b368d60bd7eef2abd92ffb0d13', 'http://dummyimage.com/210x100.png/5fa2dd/ffffff', '395a7700dac1f84285fb410a87accac5398e9767b54b78606b088220685deab1', 'Versatile tertiary initiative'),
    (6, 'sreasun5@stumbleupon.com', 'Slade', 'Reasun', 'da09a6a1468da734c1983f89eeeabe3e966fc93719313ac5fb3521e7b12e0b86', 'http://dummyimage.com/188x100.png/ff4444/ffffff', 'c699ddf02f2f19ec65b2aae79e234682455c958792103182d2314305aa625afd', 'Profound secondary policy'),
    (7, 'tdinnage6@google.pl', 'Tomaso', 'Dinnage', '84a0fd1bb0ec26e8aca1a063d300de75f356e5cf0515b0e9763869cf8101d30a', 'http://dummyimage.com/191x100.png/ff4444/ffffff', '8e52ff264fa3347ca8690486dddc9531fa1dbb7807ad8dca8f0b5bff7c6c14d5', 'Implemented neutral firmware'),
    (8, 'bharler7@guardian.co.uk', 'Baldwin', 'Harler', '5a4c3c23acf46e2d37ab74bed361e811df17ccd466b94937b44897edfab7350c', 'http://dummyimage.com/114x100.png/ff4444/ffffff', '8f00a061baf9a424af0f1444d252fec12ac8c2df23258a06f78355b8edac450f', 'Object-based tangible focus group'),
    (9, 'dmolineux8@cam.ac.uk', 'Dario', 'Molineux', '93e08289909afa7c46e102dc910b665cae20b1268cd90abd9c35a86c8184ce4a', 'http://dummyimage.com/108x100.png/dddddd/000000', '49a3c4457fa7a85dbd7ea5d9265d4574cb510ca124e07dfa1583788a9be756ed', 'Reactive client-driven firmware'),
    (10, 'dlangston9@biblegateway.com', 'Dom', 'Langston', '93efcd4f7d413b510a9a4f7f64e67c0d365c22a717927fd3d397d01371f2a939', 'http://dummyimage.com/105x100.png/dddddd/000000', '62f00308862e86fd5e61c8ea0de0e375da6d6f5ad7a80eb3ae059209341851a2', 'Open-source multimedia conglomeration');

insert into projects (projectid, projectname, closed, opened, deadline, brief, budget) values
    (1, 'Voyatouch', default, '2024-04-28 23:13:52', '2024-09-01 17:16:53', 'Face to face modular matrices', 943673),
    (2, 'Latlux', default, '2024-03-16 08:25:23', '2024-05-04 09:37:19', 'Centralized bifurcated productivity', 234844),
    (3, 'Stringtough', default, '2024-02-20 01:04:07', '2024-08-28 06:08:47', 'Cross-group didactic local area network', 84275),
    (4, 'Bitchip', default, '2024-06-30 05:24:41', '2024-07-13 13:14:26', 'Reverse-engineered radical implementation', 607954),
    (5, 'Veribet', default, '2024-02-20 11:08:39', '2024-03-11 08:23:35', 'Persistent multi-tasking protocol', 508067);

insert into userproject (userid, projectid, role, ismanager) values
    (8, 3, 'Quality-focused intermediate groupware', true),
    (3, 3, 'Exclusive zero administration concept', default),
    (6, 1, 'Inverse multimedia protocol', true),
    (1, 4, 'Ergonomic stable moratorium', true),
    (1, 1, 'Realigned holistic alliance', default),
    (8, 5, 'Down-sized encompassing knowledge user', true),
    (1, 5, 'Advanced national strategy', default),
    (7, 2, 'Reactive eco-centric function', true),
    (9, 1, 'Organic motivating leverage', default),
    (2, 2, 'Operative zero administration solution', default),
    (8, 1, 'Innovative fresh-thinking website', default),
    (8, 2, 'Distributed optimal paradigm', default),
    (10, 5, 'Reactive global moratorium', default),
    (9, 2, 'Visionary uniform intranet', default),
    (4, 2, 'Fully-configurable leading edge infrastructure', default),
    (5, 5, 'Reverse-engineered next generation hub', default),
    (9, 3, 'Operative exuding benchmark', default),
    (9, 5, 'Multi-layered asynchronous concept', default),
    (5, 5, 'Function-based mobile superstructure', default),
    (8, 4, 'Down-sized solution-oriented monitoring', default),
    (3, 5, 'Visionary interactive task-force', default),
    (5, 1, 'Devolved contextually-based concept', default),
    (9, 4, 'Fundamental motivating standardization', default),
    (4, 2, 'Optimized tertiary infrastructure', default);

insert into features (featureid, projectid, featurename, starttime, earlytime, latetime, completed, priority, currentrisk) values
    (1, 3, 'Devolved zero administration standardization', '2024-05-28 12:32:44', '2024-11-22 00:00:02', '2024-12-10 19:19:10', default, 1, 51),
    (2, 3, 'Cross-platform dynamic frame', '2024-04-22 02:03:54', '2024-07-05 18:01:10', '2025-02-07 15:30:31', default, 3, 84),
    (3, 1, 'Assimilated web-enabled framework', '2024-09-15 21:21:36', '2024-12-23 00:00:46', '2024-12-31 15:05:21', default, 2, 22),
    (4, 5, 'Proactive solution-oriented success', '2024-02-24 06:12:38', '2024-09-24 10:50:38', '2024-12-08 05:53:48', default, 3, 58),
    (5, 5, 'Persistent composite throughput', '2024-07-22 17:00:52', '2024-09-26 08:48:03', '2024-10-13 18:59:59', default, 1, 93),
    (6, 1, 'Versatile eco-centric productivity', '2024-09-08 02:31:38', '2024-12-01 02:50:17', '2025-01-07 04:19:16', default, 1, 11),
    (7, 1, 'Exclusive zero defect core', '2024-04-30 15:15:01', '2024-07-23 02:41:44', '2024-11-23 15:06:34', default, 1, 66),
    (8, 3, 'Reverse-engineered encompassing contingency', '2024-02-26 09:50:25', '2024-06-16 02:51:09', '2024-10-26 17:35:05', default, 2, 36),
    (9, 1, 'De-engineered composite function', '2024-10-27 00:55:53', '2024-12-06 01:05:29', '2025-01-09 20:45:07', default, 3, 96),
    (10, 5, 'Grass-roots empowering success', '2024-07-11 00:18:39', '2024-08-24 18:18:10', '2024-10-30 17:44:14', default, 1, 48),
    (11, 1, 'Re-contextualized eco-centric application', '2024-02-21 08:39:55', '2024-10-10 03:58:41', '2025-01-15 21:11:48', default, 1, 10),
    (12, 1, 'Operative upward-trending functionalities', '2024-07-31 08:32:24', '2024-08-02 02:43:58', '2024-08-06 18:04:53', default, 2, 69),
    (13, 2, 'Assimilated encompassing utilisation', '2024-10-13 05:15:03', '2024-11-09 04:13:28', '2024-12-24 16:59:02', default, 2, 16),
    (14, 5, 'Persevering attitude-oriented array', '2024-05-14 16:46:17', '2024-07-23 09:33:32', '2024-08-04 10:37:16', default, 2, 15),
    (15, 2, 'Implemented tertiary attitude', '2024-05-24 03:52:56', '2024-08-02 14:08:52', '2024-09-07 23:32:21', default, 1, 0),
    (16, 4, 'Universal modular knowledge user', '2024-02-20 08:46:31', '2024-08-01 21:47:04', '2025-01-30 00:21:03', default, 2, 98),
    (17, 2, 'Diverse client-driven portal', '2024-04-01 16:29:32', '2024-05-16 07:37:50', '2024-05-30 15:52:40', default, 3, 60),
    (18, 4, 'Balanced client-server knowledge base', '2024-04-28 20:32:17', '2024-08-13 11:22:15', '2024-08-17 14:13:48', default, 2, 28),
    (19, 5, 'Re-engineered reciprocal extranet', '2024-02-27 13:25:33', '2024-09-10 09:03:45', '2024-10-13 12:38:20', default, 1, 59),
    (20, 4, 'Realigned object-oriented hierarchy', '2024-07-13 03:59:44', '2024-09-30 01:38:00', '2025-01-07 19:09:06', default, 2, 96),

insert into tasks (taskid, featureid, devid, taskname, description, earlytime, latetime, completed) values
    (1, 8, default, 'Devolved global structure', 'Progressive zero tolerance definition', '2024-07-21 15:23:19', '2024-11-23 21:22:56', default),
    (2, 7, 9, 'Business-focused didactic secured line', 'Re-engineered regional process improvement', '2024-07-19 22:01:14', '2025-02-05 08:39:15', default),
    (3, 3, default, 'Diverse zero defect moderator', 'Multi-layered secondary initiative', '2024-09-16 00:35:26', '2025-01-29 19:22:00', default),
    (4, 12, 5, 'Future-proofed regional customer loyalty', 'Versatile local website', '2024-05-20 16:11:34', '2024-10-16 23:56:24', default),
    (5, 14, default, 'Right-sized mission-critical interface', 'Organic regional complexity', '2024-04-19 23:33:35', '2024-10-22 19:57:54', default),
    (6, 18, 1, 'Right-sized 24 hour project', 'Integrated reciprocal knowledge base', '2024-08-15 06:25:52', '2024-09-02 07:32:05', default),
    (7, 4, 10, 'Optional hybrid projection', 'Organized foreground core', '2024-08-20 20:21:33', '2024-08-30 10:34:15', default),
    (8, 7, default, 'Progressive heuristic software', 'User-centric secondary leverage', '2024-04-22 08:56:14', '2024-11-02 20:17:16', default),
    (9, 16, 3, 'Distributed local support', 'Future-proofed cohesive framework', '2024-08-31 02:33:51', '2024-09-27 10:32:40', default),
    (10, 15, 5, 'Compatible next generation infrastructure', 'Persistent client-driven encoding', '2024-04-16 12:55:22', '2024-06-21 08:57:58', default),
    (11, 13, 5, 'Fully-configurable uniform matrices', 'Re-contextualized zero administration synergy', '2024-05-04 10:57:57', '2024-11-15 05:12:39', default),
    (12, 15, default, 'Networked cohesive Graphical User Interface', 'Balanced even-keeled structure', '2024-06-01 05:40:49', '2024-06-12 01:43:32', default),
    (13, 15, 3, 'Decentralized bifurcated toolset', 'Seamless radical artificial intelligence', '2024-07-06 07:36:19', '2024-10-25 13:38:19', default),
    (14, 8, 8, 'Down-sized real-time contingency', 'Triple-buffered executive Graphic Interface', '2024-04-26 10:12:40', '2024-05-05 02:41:31', default),
    (15, 14, 3, 'Future-proofed optimizing artificial intelligence', 'User-friendly uniform encoding', '2024-08-09 21:06:29', '2025-02-12 23:27:57', default),
    (16, 8, 5, 'Distributed logistical instruction set', 'Integrated solution-oriented methodology', '2024-08-26 04:17:16', '2025-01-11 17:59:40', default),
    (17, 8, 8, 'Cross-platform fault-tolerant encryption', 'Configurable motivating methodology', '2024-04-08 04:38:13', '2024-10-02 14:09:02', default),
    (18, 19, default, 'Configurable discrete structure', 'Managed heuristic contingency', '2024-06-28 06:46:00', '2024-10-09 08:20:33', default),
    (19, 1, 5, 'Organic demand-driven alliance', 'Visionary scalable contingency', '2024-09-15 11:11:14', '2024-12-20 07:25:26', default),
    (20, 11, 7, 'Expanded bandwidth-monitored access', 'Networked methodical algorithm', '2024-08-14 17:01:47', '2024-12-26 05:28:40', default),
    (21, 4, 6, 'Grass-roots scalable benchmark', 'Multi-channelled hybrid core', '2024-07-13 10:16:14', '2024-11-09 09:01:33', default),
    (22, 1, 4, 'Sharable modular throughput', 'Team-oriented non-volatile success', '2024-05-02 03:16:08', '2024-12-29 08:40:01', default),
    (23, 12, 1, 'Optimized zero tolerance contingency', 'Organic transitional flexibility', '2024-06-28 00:04:32', '2024-09-20 03:09:45', default),
    (24, 18, 4, 'Automated explicit paradigm', 'Universal reciprocal system engine', '2024-06-22 00:33:48', '2024-07-25 04:14:48', default),
    (25, 15, 6, 'Mandatory optimal hardware', 'Enhanced responsive hub', '2024-08-27 18:30:00', '2024-10-05 17:27:19', default),
    (26, 5, 7, 'Optimized discrete system engine', 'Reverse-engineered methodical adapter', '2024-03-24 11:17:18', '2024-07-11 17:37:19', default),
    (27, 20, default, 'Profit-focused user-facing focus group', 'Triple-buffered systemic product', '2024-04-15 11:16:09', '2025-02-11 11:11:35', default),
    (28, 16, 5, 'Synergized upward-trending capacity', 'Cross-group encompassing array', '2024-03-31 19:10:21', '2024-12-26 05:04:22', default),
    (29, 8, 9, 'Realigned 4th generation analyzer', 'Horizontal responsive Graphic Interface', '2024-04-08 10:54:58', '2024-05-20 17:10:04', default),
    (30, 14, 7, 'Implemented modular extranet', 'Team-oriented demand-driven portal', '2024-04-17 03:54:04', '2024-10-01 11:30:08', default);

insert into featuredep (featureid, depid) values
    (10, 16),
    (2, 14),
    (5, 18),
    (3, 11),
    (17, 14),
    (20, 9),
    (11, 20),
    (4, 7),
    (13, 4),
    (16, 9),
    (8, 2),
    (18, 12),
    (17, 16),
    (5, 11),
    (9, 17),
    (7, 19),
    (2, 1),
    (3, 11),
    (18, 2),
    (14, 6);

insert into bugs (bugid, featureid, devid, bugname, bugdesc) values
    (1, 6, default, 'Distributed', 'Enhanced coherent pricing structure');
    (2, 18, 5, 'Stand-alone', 'Re-contextualized bandwidth-monitored definition');
    (3, 13, default, 'real-time', 'Fundamental secondary methodology');
    (4, 13, 10, 'Phased', 'Inverse systematic protocol');
    (5, 6, 4, 'Progressive', 'Centralized web-enabled workforce');
    (6, 2, default, 'optimal', 'Reverse-engineered intermediate methodology');
    (7, 12, 7, 'mobile', 'Seamless multi-tasking database');
    (8, 8, 2, 'capacity', 'Networked needs-based infrastructure');
    (9, 14, 4, 'Decentralized', 'Decentralized homogeneous orchestration');
    (10, 12, default, 'upward-trending', 'Re-contextualized 24/7 installation');
