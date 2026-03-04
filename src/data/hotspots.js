// Hotspot data for ISS module interactions
export const HOTSPOTS = [
    {
        id: 'ariss',
        icon: '📡',
        label: 'ARISS',
        title: 'Antennes ARISS',
        subtitle: 'Le Relais Radio',
        freq: '145.800 MHz',
        description: `🎙️ **À quoi ça sert ?**
Ces antennes permettent à la station de communiquer directement avec la Terre. C'est le "téléphone" des astronautes !

📡 **L'exploit technique**
La station file à 28 000 km/h au-dessus de nos têtes. Pour pouvoir discuter avec Sophie Adenot, l'IUT devra pointer de grosses antennes extrêmement précises vers le ciel pendant les 10 petites minutes de son passage au-dessus de l'Europe !

👩‍🚀 **Le projet S.O.P.H.I.E**
Au moment crucial, la voix de l'astronaute française descendra à travers l'atmosphère à la fréquence de 145,800 MHz pour être captée en direct.`,
        stats: [
            { label: 'Signal', value: 'Faible', unit: '(-140 dBm)' },
            { label: 'Durée contact', value: '10', unit: 'min' },
        ],
        position: [0.02, 2.89, -4.04],
    },
    {
        id: 'panneausolaire',
        icon: '☀️',
        label: 'Solaire',
        title: 'Panneaux Solaires',
        subtitle: 'L\'énergie spatiale',
        freq: null,
        description: `🌞 **Leur rôle vital**
De grandes "ailes" qui transforment la puissante lumière du soleil en électricité. Sans elles, la station serait morte au milieu du froid spatial !

⚡ **Une immense centrale**
Ajoutés au fur et à mesure depuis l'an 2000, ces panneaux sont gigantesques. Ils fournissent l'énergie pour allumer les ordinateurs, chauffer l'air, et surtout alimenter tous les équipements scientifiques à bord.

🔋 **Et la nuit ?**
La station faisant le tour de la Terre en 90 minutes, elle sombre souvent dans la nuit. Elle survit alors grâce à d'énormes batteries rechargées le jour.`,
        stats: [
            { label: 'Puissance', value: '120', unit: 'kW' },
        ],
        position: [4.32, 2.99, 4.06],
    },
    {
        id: 'coupole',
        icon: '🌍',
        label: 'Coupole',
        title: 'La Coupole',
        subtitle: 'Fenêtre sur le Monde',
        freq: null,
        description: `🔭 **Le lieu préféré des astronautes**
Une fantastique cabine d'observation en forme de dôme. Avec ses 7 fenêtres blindées, elle offre une vue imprenable à 360° sur notre belle planète bleue.

📸 **Prendre un peu de recul**
Les astronautes adorent venir y flotter pendant leur temps libre pour prendre la Terre en photo. 

🕹️ **Poste de pilotage**
C'est également depuis cette pièce avec vue plongeante qu'ils coordonnent l'amarrage des cargos de ravitaillement et qu'ils dirigent le grand bras de la station !`,
        stats: [
            { label: 'Fenêtres', value: '7', unit: '' },
        ],
        position: [-0.83, 2.59, -0.44],
    },
    {
        id: 'brasrobotique',
        icon: '🦾',
        label: 'Canadarm',
        title: 'Bras Robotique',
        subtitle: 'La grue de l\'espace',
        freq: null,
        description: `🏗️ **17 mètres de force**
Appelé le "Canadarm 2", c'est une immense grue mécanique capable de soulever d'énormes charges de plus de 100 tonnes en apesanteur !

👐 **Un robot agile**
Ce bras possède deux grandes "mains" mécaniques. Quand l'une lâche prise, l'autre s'accroche, lui permettant de se déplacer le long de la station tel une chenille géante !

🎯 **Une aide précieuse**
Il est crucial pour réceptionner les vaisseaux spatiaux venus de la Terre et sert parfois de "nacelle" pour amener les astronautes sur une zone de réparation.`,
        stats: [
            { label: 'Longueur', value: '17.6', unit: 'm' },
            { label: 'Force', value: '116', unit: 'Tonnes' },
        ],
        position: [-0.42, 1.98, 2.18],
    },
    {
        id: 'radiateur',
        icon: '❄️',
        label: 'Radiateur',
        title: 'Panneaux de Fraîcheur',
        subtitle: 'Climatiseur spatial',
        freq: null,
        description: `🌡️ **Rester au frais**
Ne vous laissez pas tromper par leur ressemblance avec les panneaux solaires : ces grands rectangles blancs sont en réalité dédiés au refroidissement !

🔥 **Le problème : La chaleur**
Le soleil cogne fort dans l'espace (+120°C !) et les dizaines d'ordinateurs à bord chauffent beaucoup. Sans un moyen de dissiper cette température, l'équipage suffoquerait.

🧊 **Fluides magiques**
Ces immenses panneaux en aluminium font circuler de l'ammoniac froid pour évacuer "jeter" la chaleur incandescente directement dans le vide noir de l'espace par rayonnement.`,
        stats: [
            { label: 'Dissipation', value: '70', unit: 'kW' },
            { label: 'Climatisation', value: '22', unit: '°C' },
        ],
        position: [3.93, 1.09, 0.28],
    },
    {
        id: 'columbus',
        icon: '🔬',
        label: 'Columbus',
        title: 'Labo Européen Columbus',
        subtitle: 'Fierté Européenne',
        freq: null,
        description: `🇪🇺 **Une salle de technologie**
Ce gros cylindre est le module scientifique principal de l'Europe dans l'espace. Les murs y sont couverts de vastes armoires (les "Racks") remplies de machines.

🧪 **La science sans gravité**
C'est souvent ici que l'on mène les incroyables expériences médicales ou biologiques demandées par les chercheurs sur Terre. La micro-gravité permet de découvrir des phénomènes invisibles sur notre planète.

👩🏻‍🚀 **Le bureau de Sophie**
Lors de sa mission spatiale au-dessus de vos têtes, c'est très probablement dans ce module que Sophie s'activera la majeure partie de la journée !`,
        stats: [
            { label: 'Volume', value: '75', unit: 'm³' },
        ],
        position: [-0.84, 2.57, 1.87],
    },
    {
        id: 'kibo',
        icon: '🇯🇵',
        label: 'Kibo',
        title: 'Labo Japonais Kibo',
        subtitle: 'La plus grande pièce',
        freq: null,
        description: `🌸 **Un monstre de science**
"Kibo" (qui signifie *Espoir*) est le module scientifique du JAXA (Japon). C'est la plus grande et de loin la plus complexe des cabines de recherches de la station.

🚪 **Une porte magique**
En plus du laboratoire classique, ce module possède une sorte de petit balcon extérieur exposé au vide, ainsi qu'une petite porte appelée un "sas". 

🛰️ **Lanceur de satellites**
Grâce à un sas, Kibo peut transférer des mini-robots à l'extérieur. Un petit bras articulé s'occupe de les saisir, et sert parfois même de lancepierre pour larguer de minuscules satellites étudiants sur orbite !`,
        stats: [
            { label: 'Armoires', value: '23', unit: 'Racks' },
        ],
        position: [1.01, 2.34, 1.83],
    },
    {
        id: 'habitation',
        icon: '🏠',
        label: 'Habitation',
        title: "Module de Vie",
        subtitle: 'Un foyer spatial',
        freq: null,
        description: `🏠 **Une maison dans les étoiles**
Ces cylindres (notamment les nœuds centraux et le module Zvezda) font office de base de vie pour nos aventuriers de l'extrême.

🌙 **Le quotidien à bord**
Ici, on ne marche pas, on flotte ! C'est dans cette zone que l'équipage mange ensemble des plats stockés en sacs, ou se lave avec des lingettes humides pour que l'eau ne vole pas partout.

💤 **La nuit tombe**
Pour dormir, ils s'attachent simplement aux murs pour éviter de dériver doucement pendant leur sommeil en heurtant les boutons !`,
        stats: [],
        position: [0.22, 3.15, -0.27],
    }
]
