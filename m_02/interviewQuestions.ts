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

interface LogEntry {
    timestamp: number;
    iA: number;
    iB: number;
}

function earliestTimestampAllConnected(n: number, logs: LogEntry[]): number | null {
    let group = n;
    const parents = Array.from({ length: n }, (_, i) => i);
    const sizes = Array(n).fill(1);

    for (let i = 0; i < logs.length; i++) {

        const currAIndex = logs[i].iA;
        const currBIndex = logs[i].iB;

        let rootAIndex = currAIndex;
        while (rootAIndex !== parents[rootAIndex]) {
            rootAIndex = parents[rootAIndex];
        }

        let rootBIndex = currBIndex;
        while (rootBIndex !== parents[rootBIndex]) {
            rootBIndex = parents[rootBIndex];
        }

        if (rootBIndex === rootAIndex) {
            continue;
        }

        let sizeA = sizes[rootAIndex];
        let sizeB = sizes[rootBIndex];
        let sizeSum = sizeA + sizeB;
        if (sizeA >= sizeB) {
            sizes[rootAIndex] = sizeSum;
            parents[rootBIndex] = rootAIndex;
        } else {
            sizes[rootBIndex] = sizeSum;
            parents[rootAIndex] = rootBIndex;            
        }

        group--;
        if (group === 1) {
            return logs[i].timestamp;
        }
    }
    return null;
}