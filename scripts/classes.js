class Contact{
    constructor(id, name, phone, img, observation, rubro){
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.img = img || "https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_1280.png";
        this.observation = observation;
        this.rubro = rubro;
    }
}