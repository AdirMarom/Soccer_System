const matchesAccessUtil = require("../server/data/matchesAccess.js");

// **************************************** Unit Tests *************************************************

test("bad fetch of non existing matches",async () =>{
    const bad_matches = await matchesAccessUtil.getAllMatchesByTeam("non_exsiting");
    expect (bad_matches.length).toBe(0) ;
},40000);

test("existing matches",async () =>{
    const matches = await matchesAccessUtil.getAllMatches();
    expect (matches.length).not.toBe(0) ;
},40000);


test("existing user info",async () =>{
    const bad_matches = await matchesAccessUtil.getMatchesById("12");
    expect (bad_matches.length).toBe(0) ;
},40000);
