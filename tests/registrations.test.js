describe("My Registration Number factory funcion", () => {
    describe("testing for valid registration number formats", () => {
        it("should be able to set the registration number to \"CA 537-232\"", () => {
            const registrations = RegistrationNumber()
            registrations.setRegNumber("CA 537-232")
            assert.equal("CA 537-232", registrations.getRegNumber())
        })
    
        it("should be able to set the registration number to \"CJ 537 232\"", () => {
            const registrations = RegistrationNumber()
            registrations.setRegNumber("CJ 537 232")
            assert.equal("CJ 537 232", registrations.getRegNumber())
        })
    
        it("should be able to set the registration number to \"CK 537232\"", () => {
            const registrations = RegistrationNumber()
            registrations.setRegNumber("CK 537232")
            assert.equal("CK 537232", registrations.getRegNumber())
        })
    })

    describe("testing for invalid registration number formats", () => {
        it("should return \"Invalid registration number\" for \"CA 5327-232\"", () => {
            const registrations = RegistrationNumber()
            registrations.setRegNumber("CA 5327-232")
            assert.equal("Invalid registration number", registrations.getErrorMessage())
        })
    
        it("should return \"Invalid registration number\" for \"ZZ 537-232\"", () => {
            const registrations = RegistrationNumber()
            registrations.setRegNumber("ZZ 537-232")
            assert.equal("Invalid registration number", registrations.getErrorMessage())
        })
    
        it("should return \"Invalid registration number\" for \"CA 537FHJ232\"", () => {
            const registrations = RegistrationNumber()
            registrations.setRegNumber("CA 537FHJ232")
            assert.equal("Invalid registration number", registrations.getErrorMessage())
        })
    })

    describe("testing for storing valid registration numbers", () => {
        it("should return empty list since there are no valid registration numbers", () => {
            const registrations = RegistrationNumber()
            registrations.setRegNumber("ZZ 883-335")
            registrations.addRegNumber(registrations.getRegNumber())
            registrations.setRegNumber("CZ 883335")
            registrations.addRegNumber(registrations.getRegNumber())
            assert.deepEqual([], registrations.getRegNumbers())
        })

        it("should return a list with two registration numbers since two valid registration numbers were added", () => {
            const registrations = RegistrationNumber()
            registrations.setRegNumber("CA 883-335")
            registrations.addRegNumber(registrations.getRegNumber())
            registrations.setRegNumber("CK 883335")
            registrations.addRegNumber(registrations.getRegNumber())
            assert.deepEqual(["CA 883-335", "CK 883335"], registrations.getRegNumbers())
        })

        it("should return a list with one registration number since it was duplicate", () => {
            const registrations = RegistrationNumber()
            registrations.setRegNumber("CJ 213-335")
            registrations.addRegNumber(registrations.getRegNumber())
            registrations.setRegNumber("CJ 213-335")
            registrations.addRegNumber(registrations.getRegNumber())
            assert.deepEqual(["CJ 213-335"], registrations.getRegNumbers())
        })
    })

    describe("testing for the filter method by the town registration code", () => {
        it("should return a list of registrations number from \"Cape Town\"", () => {
            const registrations = RegistrationNumber()
            registrations.setRegNumber("CA 537-232")
            registrations.addRegNumber(registrations.getRegNumber())
            registrations.setRegNumber("CJ 537 232")
            registrations.addRegNumber(registrations.getRegNumber())
            registrations.setRegNumber("CK 537232")
            registrations.addRegNumber(registrations.getRegNumber())
            registrations.setRegNumber("CA 883-335")
            registrations.addRegNumber(registrations.getRegNumber())
            registrations.setRegNumber("CJ 213-335")
            registrations.addRegNumber(registrations.getRegNumber())
            assert.deepEqual(["CA 537-232", "CA 883-335"], registrations.filterByTownCode("CA"))
        })

        it("should return an empty list since there are no registrations number from \"Bellville\"", () => {
            const registrations = RegistrationNumber()
            registrations.setRegNumber("CA 537-232")
            registrations.addRegNumber(registrations.getRegNumber())
            registrations.setRegNumber("CJ 537 232")
            registrations.addRegNumber(registrations.getRegNumber())
            registrations.setRegNumber("CK 537232")
            registrations.addRegNumber(registrations.getRegNumber())
            registrations.setRegNumber("CA 883-335")
            registrations.addRegNumber(registrations.getRegNumber())
            registrations.setRegNumber("CJ 213-335")
            registrations.addRegNumber(registrations.getRegNumber())
            assert.deepEqual([], registrations.filterByTownCode("CY"))
        })

        it("should return a list of registrations number from \"Malmesbury\"", () => {
            const registrations = RegistrationNumber()
            registrations.setRegNumber("CA 537-232")
            registrations.addRegNumber(registrations.getRegNumber())
            registrations.setRegNumber("CJ 537 232")
            registrations.addRegNumber(registrations.getRegNumber())
            registrations.setRegNumber("CK 537232")
            registrations.addRegNumber(registrations.getRegNumber())
            registrations.setRegNumber("CA 883-335")
            registrations.addRegNumber(registrations.getRegNumber())
            registrations.setRegNumber("CJ 213-335")
            registrations.addRegNumber(registrations.getRegNumber())
            assert.deepEqual(["CK 537232"], registrations.filterByTownCode("CK"))
        })
        
    })
})