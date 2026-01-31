const supabase = require("../config/supabase");

exports.createTrip = async (req, res)=>{
    const { customer_id, vehicle_id, passengers, distance_km} = req.body;
    const { data: vehicle } =  await supabase
        .from("vehicles")
        .select("*")
        .eq("id", vehicle_id)
        .single();
        if(!vehicle.isAvailable){
            return res.status(400).json({message: "vehicle not available "});
        }
        if(passengers > vehicle.allowed_passengers){
            return res.status(400).json({message: "Passenger limit exceeded"});

        }
        await supabase.from("vehicles")
            .update({isAvailable: false})
            .eq("id", vehicle_id)
        res.status(201).json({message: "Trip created succesfully"}); 
};
exports.endTrip = async (req, res)=>{
    const {data}=await supabase
        .from("trips")
        .select("distance_km, vehicle_id, vehicles(rate_per_km)")
        .eq("id", req.params.tripId)
        .single();
    const totalCost = data.distance_km*data.vehicles.rate_per_km;
    await supabase.from("trips")
        .update({isAvailable: true})
        .eq("id", data.vehicle_id);
    res.json({message: "Trip ended", tripCost: totalCost });
};