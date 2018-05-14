function buildGUI(){
    var gui = new dat.GUI({autoPlace: false});
    
    var objectsMenu = gui.addFolder('Objects: ');
    var object = objectsMenu.addFolder('Torus');
    //dodanie checkboxa
    object.add(mesh, 'visible').name('Visible:').onChange(function(value){
        visibility = true;
    });
    //dodanie pelaty koloru
    var Config = function(){
        this.color = "#ffffff";
    }
    var conf = new Config();
    object.addColor(conf, 'color').name('Color').onChange(function(value){
        value = value.replace('#', '0x');
        mesh.material.color.setHex(value);
    });
    objectsMenu.open();
    
    var customContainer = document.getElementById('my-gui-container');
    customContainer.appendChild(gui.domElement);
}