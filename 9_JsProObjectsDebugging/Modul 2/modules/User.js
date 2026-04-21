class User {
    constructor(id, nume, email, varsa) {
        this.id = id;
        this.nume = nume;
        this.email = email;
        this.varsa = varsa;

    }
    mananca(claorii) {
        console.log(`Mananca ${claorii} pe zi.`);
    }
    doarme(ore) {
        console.log(`Doarme ${ore} pe zi`);
    }
}
export { User }
