/*
1)
Frage 1
Soziale Netzwerkkonnektivität. Geben Sie ein soziales Netzwerk mit 
n Mitgliedern und eine Protokolldatei mit m Zeitstempeln an, zu denen Paare von 
Mitgliedern Freundschaften geschlossen haben. Entwickeln Sie einen Algorithmus, 
um den frühesten Zeitpunkt zu bestimmen, zu dem alle Mitglieder verbunden sind 
(d.h. jedes Mitglied ist ein Freund eines Freundes eines Freundes ... eines Freundes). 
Gehen Sie davon aus, dass die Protokolldatei nach Zeitstempel sortiert ist und dass 
Freundschaft eine Äquivalenzbeziehung ist. Die Laufzeit Ihres Algorithmus sollte m 
log n oder besser sein und zusätzlichen Speicherplatz proportional zu n verbrauchen.
*/

function earliestTimestampAllConnected(n: number, m: number): number | null {
    let group = n;
    let parents = [Array(n).keys()];

    for (let i = 0; i < m; i++) {

    }
    return null;

}

/*
ok hab ich das also richtig erfasst: ich halte fest wer chef ist und wie gross die menge in dem baum ist. 
dafür nutze ich die zwei arrays und den find algo um den baum hochzuwandern. danach zähle ich groups n um 
1 runter und wenn ich bei 1

und wie sieht der find algo aus? speichere ich im array quasi den parent von d
er node und springe dann da rüber und dann schau ich ob das selbst einen parent 
hat und wenn ja mach ich weiter damit wenn nein bin ich beim chef angelangt? 
*/