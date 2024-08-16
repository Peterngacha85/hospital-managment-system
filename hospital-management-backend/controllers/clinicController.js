const Clinic = require('../models/clinicModel');

exports.getAllClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find();
    res.json(clinics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createClinic = async (req, res) => {
  try {
    const clinic = new Clinic(req.body);
    await clinic.save();
    res.status(201).json(clinic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.getClinic = async (req, res) => {
    try {
        const clinic = await Clinic.findById(req.params.id);
        res.json(clinic);
    } catch (err) {
        res.status(404).json({ error: 'Clinic not found' });
    }
    }; 
    exports.updateClinic = async (req, res) => {
        try {
            const clinic = await Clinic.findByIdAndUpdate(req.params.id , req.body  , {new : true});    
            res.json(clinic);
        }
        catch (err) {
            res.status(404).json({ error: 'Clinic not found' });
        }
        }
        exports.deleteClinic = async (req, res) => {
            try {
                await Clinic.findByIdAndDelete(req.params.id);
                res.json({ message: 'Clinic deleted' });
            } catch (err) {
                res.status(404).json({ error: 'Clinic not found' });
            }
            };
            exports.getClinicDoctors = async (req, res) => {
                try {
                    const clinic = await Clinic.findById(req.params.id).populate('doctors');
                    res.json(clinic.doctors);
                } catch (err) {
                    res.status(404).json({ error: 'Clinic not found' });
                }
                };
                exports.addDoctorToClinic = async (req, res) => {
                    try {
                        const clinic = await Clinic.findById(req.params.id);
                        clinic.doctors.push(req.body.doctorId);
                        await clinic.save();
                        res.json(clinic);
                    } catch (err) {
                        res.status(404).json({ error: 'Clinic not found' });
                    }
                    };
                    exports.removeDoctorFromClinic = async (req, res) => {
                        try {
                            const clinic = await Clinic.findById(req.params.id);
                            clinic.doctors.pull(req.body.doctorId);
                            await clinic.save();
                            res.json(clinic);
                        } catch (err) {
                            res.status(404).json({ error: 'Clinic not found' });
                        }
                        };  

                        