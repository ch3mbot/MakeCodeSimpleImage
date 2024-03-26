namespace imageProcessing {
    
    function hex2(n: number) {
        return ("0" + hexString(n)).slice(-2);
    }

    function hexString(v: number): string {
        let out = "";
        const hexChars = "0123456789abcdef";
        
        if (v == 0)
            return "0"

        while (v > 0) {
            const remainder = v % 16;
            out = hexChars[remainder] + out;
            v = Math.floor(v / 16);
        }
        return out;
    }

    export function f4EncodeImg(w: number, h: number, bpp: number, getPix: (x: number, y: number) => number) {
        let r = hex2(0xe0 | bpp) + hex2(w) + hex2(h) + "00"
        let ptr = 4
        let curr = 0
        let shift = 0
    
        let pushBits = (n: number) => {
            curr |= n << shift
            if (shift == 8 - bpp) {
                r += hex2(curr)
                ptr++
                curr = 0
                shift = 0
            } else {
                shift += bpp
            }
        }
    
        for (let i = 0; i < w; ++i) {
            for (let j = 0; j < h; ++j)
                pushBits(getPix(i, j))
            while (shift != 0)
                pushBits(0)
            if (bpp > 1) {
                while (ptr & 3) 
                    pushBits(0)
            }
        }
    
        return r
    }
}