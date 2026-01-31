const supabase = require("../config/supabase");
exports.getAnalytics = async (req, res)=>{
    const users = await supabase.from("users").select("*", { count: "exact" });
    const vehicles = await supabase.from("vehicles").select("*", { count: "exact" });
    const trips=await supabase.from("trips").select("*", { count: "exact" });
    res.json({
        total_users: users.count,
        total_vehicles: vehicles.count,
        total_trips: trips.count
    });
};