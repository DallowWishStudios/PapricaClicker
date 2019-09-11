//--------------------------------------- !! lvl tag musi byc taki sam dla itemu i jego ulepszen
var items = [
	new Item(1, 'Rękawice robocze', 2, 'Chronią przed obrażeniami.', 'rekawice.png', 1.14, "rekawice", 1),
	new Item(2, 'Nożyczki', 4, 'Pomocne podczas zbiorów. Umożliwiają odcinanie łodyg. ', 'nozyczki.png', 1.16, "nozyczki", 1),
	new Item(3, 'Scyzoryk', 8, 'Wielofunkcyjne narzędzie ułatwiające zbieranie papryki. ', 'scyzoryk.png', 1.2, "scyzoryk", 1, 2),
	new Item(4, 'Sierp', 25, 'Ostre narzędzie rolnicze. Był używany przez Panoramixa. ', 'sierp.png', 1.25, "sierp", 1, 3),
	new Item(5, 'Nóż do masła', 5, 'Praktyczny w życiu codziennym. ', 'noz_do_masla.png', 1.03, "noz", 1, 6),
	new Item(6, 'Piłka do metalu', 90, 'Przydatna do cięcia niewielkich metalowych przedmiotów ale nie tak praktyczna w zbieraniu papryki. ', 'pilka_do_metalu.png', 1.07, "pila", 1, 8),
	new Item(7, 'Szabla', 880, 'Była używana przez szlachtę do samoobrony i przekazywana z pokolenia na pokolenie. ', 'szabla.png', 1.12, "miecz", 1, 12),
	new Item(8, 'Bokken', 220, 'Drewniana katana do ćwiczeń. Niezbyt przydatna na polu papryki. ', 'bokken.png', 1.01, "katana", 1, 14),
	new Item(9, 'Toporek awaryjny', 260, 'Przydatny do rozbijania szyb i innych materiałów w razie pożaru. Aby użyć rozbij szybkę.', 'toporek.png', 1.04, "topor", 1, 17),
];
var item_upgrades = [
	items[0],
	new Item(1, 'Rękawice wyścigowe', 10, 'Rękawice wzmocnione gumą. ', 'rekawice_wyscigowe.png', 1.25, "rekawice", 2),
	new Item(1, 'Rękawice spawalnicze', 18, 'Wysoki poziom ochrony rąk. ', 'rekawice_spawalnicze.png', 1.3, "rekawice", 3),
	items[1],
	new Item(2, 'Podstawowe sekatory', 8, 'Łatwo dostępne na bazarach czy też targach. ', 'podstawowe_sekatory.png', 1.30, "nozyczki", 2),
	new Item(2, 'Ulepszone sekatory', 14, 'Można je kupić w sklepach ogrodniczych. ', 'ulepszone_sekatory.png', 1.35, "nozyczki", 3),
	new Item(2, 'Zaawansowane sekatory', 20, 'High-endowe narzędzie ogrodnicze. ', 'zaawansowane_sekatory.png', 1.40, "nozyczki", 4),
	items[2],
	new Item(3, 'Zaawansowany scyzoryk', 40, 'Umożliwia między innymi łatwą nawigację na polu papryki dzięki wbudowanemu kompasowi, obcinanie paznokci czy też otwieranie szampana. ', 'zaawansowany_scyzoryk.png', 1.25, "scyzoryk", 2),
	new Item(3, 'Ultrascyzoryk', 500, 'Scyzoryk ten zawiera wszystkie możliwe opcje podcinania, stylizacji, wykrawania, modyfikacji, korekty czy komponowania papryki. ', 'ultrascyzoryk.png', 1.3, "scyzoryk", 3),
	items[3],
	new Item(4, 'Kosa', 45, 'Jeszcze ostrzejsze narzędzie rolnicze. ', 'kosa.png', 1.3, "sierp", 2),
	new Item(4, 'Kosa bitewna', 140, 'Najostrzejsze narzędzie... nie do końca rolnicze. ', 'kosa_bitewna.png', 1.35, "sierp", 3),
	new Item(4, 'Kosa dwustronna', 620, 'Epicka dwustronna kosa wojenna. ', 'kosa_dwustronna.png', 1.2, "sierp", 4),
	items[4],
	new Item(5, 'Nożyk do obierania', 18, 'Stosowany od wielu pokoleń w tej branży. Nieodłączny atrybut każdego paprykowego bossa. ', 'nozyk_do_obierania.png', 1.1, "noz", 2),
	new Item(5, 'Nożyk do styropianu', 40, 'Wielofunkcyjny, kompaktowy nożyk używany głównie w budowlance, ale znakomicie sprawuje się pod folią. ', 'nozyk_do_styropianu.png', 1.12, "noz", 3),
	new Item(5, 'Nóż kuchenny', 90, 'Spotykany w każdej kuchni polskiej gospodyni. ', 'noz_kuchenny.png', 1.2, "noz", 4),
	new Item(5, 'Nóż militarny', 340, 'Wzmocniony wojskowy nóż przydatny na polu... papryki. ', 'noz_wojskowy.png', 1.3, "noz", 5),
	new Item(5, 'Obieraczka', 666, 'Standardowa obieraczka znaleziona na bazarze. ', 'obieraczka.png', 1.66, "noz", 6),
	items[5],
	new Item(6, 'Piła', 300, 'Piła do drewna, ale bywa pomocna przy zbieraniu papryki. ', 'pila.png', 1.15, "pila", 2),
	new Item(6, 'Piła spalinowa', 2400, 'Niezbyt poręczna podczas zbierania papryki, ale może się przydać w przypadku natrafienia na drzewo. ', 'pila_spalinowa.png', 1.32, "pila", 3),
	items[6],
	new Item(7, 'Miecz', 3700, 'Pradawne narzędzie zbrodni. ', 'miecz.png', 1.18, "miecz", 2),
	new Item(7, 'Kordelas', 7400, 'Piracka szabla. Zaskakująco poręczna, dzięki czemu dobrze nadaje się do odcinania łodyg. ', 'kordelas.png', 1.3, "miecz", 3),
	new Item(7, 'Excalibur', 72000, 'Legendarny miecz światła. Król Artur otrzymał go od Pani Jeziora i po jego śmierci miał trafić z powrotem do jego rąk. Chyba nie pykło. ', 'excalibur.png', 1.5, "miecz", 4),
	new Item(7, 'Miecz świetlny', 150000, 'Używany przez Jedi, dzięki postępowi teraz dostępny również dla rąk zwykłego paroba. ', 'miecz_swietlny.png', 2, "miecz", 5),
	items[7],
	new Item(8, 'Katana', 8000, 'Prawdziwa broń ninja. W rękach doświadczonego paroba może czynić cuda. ', 'katana.png', 1.2, "katana", 2, 14),
	new Item(8, 'Tęczowa katana', 90000, 'Niezwykle rzadka wariacja katany. Posiada niespotykane właściwości. ', 'teczowa_katana.png', 1.3, "katana", 3, 14),
	items[8],
	new Item(9, 'Siekiera', 790, 'Zostań prawdziwym paprykowym drwalem.', 'siekiera.png', 1.18, "topor", 2),
	new Item(9, 'Profesjonalna siekiera', 1200, 'Mokry sen każdego drwala.', 'profesjonalna_siekiera.png', 1.22, "topor", 3),
	new Item(9, 'Topór bitewny', 8600, 'Poręczny wojenny topór. Przydatny w razie egzekucji.', 'topor_bitewny.png', 1.34, "topor", 4),
	new Item(9, 'Topór nordycki', 59700, 'Starożytny topór wojenny. ', 'topor_nordycki.png', 1.42, "topor", 5),
	new Item(9, 'Stormbreaker', 600000, 'Legendarna broń Thora. Nieprzygotowany parob może mieć trudności z zapanowaniem nad jego mocą.', 'stormbreaker.png', 1.8, "topor", 6),
];
