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

interface UnionDataType {
    union(p: number, q: number): void
    connected(p: number, q: number): boolean;
    find(i: number): number;
}

class UnionFind implements UnionDataType  {
    private parents: number[];
    private sizes: number[];

    constructor(n: number) {
        this.parents = Array.from({ length: n }, (_, i) => i);
        this.sizes = Array(n).fill(1);
    }

    public find(i: number): number {
        let rootIndex = i;
        while (rootIndex !== this.parents[rootIndex]) {
            rootIndex = this.parents[rootIndex];
        } 

        return rootIndex;
    }

    public connected(p: number, q: number): boolean {
        return this.find(p) === this.find(q);
    }

    public union(p: number, q: number) {
        let rootAIndex = this.find(p);
        let rootBIndex = this.find(q);
        let sizeA = this.sizes[rootAIndex];
        let sizeB = this.sizes[rootBIndex];
        let sizeSum = sizeA + sizeB;
        if (sizeA >= sizeB) {
            this.sizes[rootAIndex] = sizeSum;
            this.parents[rootBIndex] = rootAIndex;
        } else {
            this.sizes[rootBIndex] = sizeSum;
            this.parents[rootAIndex] = rootBIndex;            
        }
    }
}




function earliestTimestampAllConnected(n: number, logs: LogEntry[]): number | null {
    let group = n;
    let UnionFindInstance = new UnionFind(n);
    for (let i = 0; i < logs.length; i++) {

        const currAIndex = logs[i].iA;
        const currBIndex = logs[i].iB;

        if (UnionFindInstance.connected(currAIndex, currBIndex)) 
            continue;
        
        UnionFindInstance.union(currAIndex, currBIndex);
        group--;
        if (group === 1) {
            return logs[i].timestamp;
        }

    }
    return null;
}

/*
Union-find mit spezifischem kanonischen Element. Fügen Sie eine Methode find() zum union-find Datentyp hinzu,
so dass find(i) das größte Element in der verbundenen Komponente zurückgibt, die i enthält. Die Operationen union(),
connected() und find() sollten alle logarithmische Zeit oder mehr benötigen.

Wenn zum Beispiel eine der verbundenen Komponenten {1, 2, 6, 9} ist, dann sollte die Methode find() für jedes der vier
Elemente in den verbundenen Komponenten 9 zurückgeben.
*/