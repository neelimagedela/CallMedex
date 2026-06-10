const rolePrefixes = {
    patient: "PAT",
    phlebo: "PHL",
    doctor: "DOC",
    admin: "ADM",
    diagnostic: "DIA",
    consultancy: "CON",
    pharmacy: "PHM",
    organization: "ORG",
    staff: "STF"
};
const generatePublicUserId = (role, internalId) => {
    const prefix = rolePrefixes[role];

    if (!prefix) {
        throw new Error("Invalid role");
    }

    const year = new Date().getFullYear();
    const paddedId = String(internalId).padStart(6, "0");

    return `CMDX-${prefix}-${year}-${paddedId}`;
};

module.exports = {
    generatePublicUserId
};