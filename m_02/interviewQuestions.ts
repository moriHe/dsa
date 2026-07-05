/*
1)
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

class UnionFindExOne {
    private parents: number[];
    private sizes: number[];

    constructor(n: number) {
        this.parents = Array.from({ length: n }, (_, i) => i);
        this.sizes = Array(n).fill(1);
    }

    private getRoot(i: number): number {
        let rootIndex = i;
        while (rootIndex !== this.parents[rootIndex]) {
            rootIndex = this.parents[rootIndex];
        } 
        return rootIndex;        
    }

    public find(i: number): number {
        return this.getRoot(i);
    }

    public connected(p: number, q: number): boolean {
        return this.getRoot(p) === this.getRoot(q);
    }

    private union(p: number, q: number) {
        let rootAIndex = this.getRoot(p);
        let rootBIndex = this.getRoot(q);
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

    public earliestAllConnected(n: number, logs: LogEntry[]): number | null {
        let group = n;
        let UnionFindInstance = new UnionFindExOne(n);
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
}

/*
2)
Union-find mit spezifischem kanonischen Element. Fügen Sie eine Methode find() zum union-find Datentyp hinzu,
so dass find(i) das größte Element in der verbundenen Komponente zurückgibt, die i enthält. Die Operationen union(),
connected() und find() sollten alle logarithmische Zeit oder mehr benötigen.

Wenn zum Beispiel eine der verbundenen Komponenten {1, 2, 6, 9} ist, dann sollte die Methode find() für jedes der vier
Elemente in den verbundenen Komponenten 9 zurückgeben.
*/

class UnionFindExTwo  {
    private parents: number[];
    private sizes: number[];
    private maxValues: number[];

    constructor(n: number) {
        this.parents = Array.from({ length: n }, (_, i) => i);
        this.sizes = Array(n).fill(1);
        this.maxValues = Array.from({ length: n }, (_, i) => i);
    }

    private getRoot(i: number): number {
        let rootIndex = i;
        while (rootIndex !== this.parents[rootIndex]) {
            rootIndex = this.parents[rootIndex];
        } 
        return rootIndex;        
    }

    public find(i: number): number {
        let rootIndex = this.getRoot(i);

        return this.maxValues[rootIndex];
    }

    public connected(p: number, q: number): boolean {
        return this.getRoot(p) === this.getRoot(q);
    }
    private union(p: number, q: number) {
        let rootAIndex = this.getRoot(p);
        let rootBIndex = this.getRoot(q);
        let sizeA = this.sizes[rootAIndex];
        let sizeB = this.sizes[rootBIndex];
        let sizeSum = sizeA + sizeB;
        let max = Math.max(this.maxValues[rootAIndex], this.maxValues[rootBIndex])
        if (sizeA >= sizeB) {
            this.sizes[rootAIndex] = sizeSum;
            this.parents[rootBIndex] = rootAIndex;
            this.maxValues[rootAIndex] = max;
        } else {
            this.sizes[rootBIndex] = sizeSum;
            this.parents[rootAIndex] = rootBIndex;  
            this.maxValues[rootBIndex] = max;
        }
    }
}

/*
3)
Nachfolger mit Löschen. Gegeben eine Menge von n Ganzzahlen S = {0, 1, ..., n - 1} und eine Folge von Anfragen der folgenden Form:
- Entfernen Sie x aus S
- Finden Sie den Nachfolger von x: die kleinste y in S, so dass y >= x.
entwerfen Sie einen Datentyp, bei dem alle Operationen (außer Konstruktion) im schlimmsten Fall logarithmische Zeit
oder mehr benötigen
*/


class UnionFindExThree  {
    private parents: number[];

    constructor(n: number) {
        this.parents = Array.from({ length: n + 1 }, (_, i) => i);
    }

    private getRoot(i: number): number {
        let rootIndex = i;
        while (rootIndex !== this.parents[rootIndex]) {
            this.parents[rootIndex] = this.parents[this.parents[rootIndex]];
            rootIndex = this.parents[rootIndex];
        } 
        return rootIndex;        
    }

    public find(i: number): number {
        return this.getRoot(i);
    }

    public remove(i: number): void {
        this.union(i, i + 1);
    }

    public connected(p: number, q: number): boolean {
        return this.getRoot(p) === this.getRoot(q);
    }
    public union(p: number, q: number) {
        let rootAIndex = this.getRoot(p);
        let rootBIndex = this.getRoot(q);
        if (rootAIndex === rootBIndex) {
            return;
        }
        this.parents[rootAIndex] = rootBIndex;
    }
}
