class Carte {
    constructor(titlu) {
        this.titlu = titlu;
        console.log('Constructorul  MyCarte a fost apelat');
    }
    deschidCartea() {
        console.log('Am deschis cartea la pagina 43');
    }
}
export { Carte as MyCarte }; 