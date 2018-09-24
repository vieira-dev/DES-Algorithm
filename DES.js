// classe DES
class DES {
    
    constructor() {
        // ORDEM DAS PERMUTAÇÕES
        // IP - initial permutation turns 64 into 58 bits
        this.IP = [58, 50, 42, 34, 26, 18, 10, 2, 60,
            52, 44, 36, 28, 20, 12, 4, 62, 54, 
            46, 38, 30, 22, 14, 6, 64, 56, 48,
            40, 32, 24, 16, 8, 57, 49, 41, 33, 
            25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 
            11, 3, 61, 53, 45, 37, 29, 21, 13, 5,
            63, 55, 47, 39, 31, 23, 15, 7];
        // IP inverso - aplicado ao final da encriptação
        this.IPi = [40, 8, 48, 16, 56, 24, 64, 32,
        39, 7, 47, 15, 55, 23, 63, 31,
        38, 6, 46, 14, 54, 22, 62, 30,
        37, 5, 45, 13, 53, 21, 61, 29,
        36, 4, 44, 12, 52, 20, 60, 28,
        35, 3, 43, 11, 51, 19, 59, 27,
        34, 2, 42, 10, 50, 18, 58, 26,
        33, 1, 41, 9, 49, 17, 57, 25 ];
        // E Bit-SELECTION TABLE turns 32 into 48 bits EXPAND
        this.E = [32 ,1 ,2 ,3 ,4 ,5,
        4 ,5 ,6 ,7 ,8, 9,
        8 ,9 ,10 ,11 ,12 ,13,
        12 ,13 ,14 ,15 ,16 ,17,
        16 ,17 ,18 ,19 ,20 ,21,
        20 ,21 ,22 ,23 ,24 ,25,
        24 ,25 ,26 ,27 ,28 ,29,
        28, 29, 30, 31, 32, 1 ];

        // P primitive for fCalculation
        this.P = [16, 7, 20, 21,
        29, 12, 28, 17,
        1, 15, 23, 26,
        5, 18, 31, 10,
        2, 8, 24, 14,
        32, 27, 3, 9,
        19, 13, 30, 6,
        22, 11, 4, 25 ];


        // TABELA DE CONTEÚDO
        // TABLE for 6 and 4 bits 4x16 - TABLE DATA resulta em 32 bits
        this.S1 = [[14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
                [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
                [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
                [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13 ]];

        this.S2 = [[15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10, ],
            [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
            [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15 ],
            [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]];

        this.S3 = [[10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8, ],
        [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1, ],
        [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2 ,12, 5, 10, 14, 7],
        [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12, ]];

        this.S4 = [[7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15 ],
            [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9 ],
            [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8 ,4 ],
            [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14 ]];

        this.S5 = [[2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9 ],
        [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6 ],
        [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14 ],
        [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3 ]];

        this.S6 = [[12, 1, 10, 15, 9, 2 ,6, 8, 0, 13, 3, 4, 14, 7, 5, 11 ],
            [10, 15, 4, 2 ,7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8 ],
            [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6 ],
            [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13 ]];

        this.S7 = [[4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1 ],
            [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6 ],
            [1 ,4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2 ],
            [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12 ]];

        this.S8 = [[13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7 ],
            [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2 ],
            [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
            [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11 ]];

        // ORDENS PERMUTACOES DE CHAVE
        // P CHOICE 1 - 56 bits permutation for first division L e R of key
        this.PC1L = [57, 49, 41, 33, 25, 17, 9,
            1, 58, 50, 42, 34, 26, 18,
            10, 2, 59, 51, 43, 35, 27,
            19, 11, 3, 60, 52, 44, 36]
        this.PC1R = [63, 55, 47, 39, 31, 23, 15,
            7, 62, 54, 46, 38, 30, 22,
            14, 6, 61, 53, 45, 37, 29,
            21, 13, 5, 28, 20, 12, 4 ];

        //P CHOUCE 2 - 56 bits permutation for second subkey
        this.PC2 = [14, 17, 11, 24, 1, 5,
        3, 28, 15, 6, 21, 10,
        23, 19, 12, 4, 26, 8,
        16, 7, 27, 20, 13, 2,
        41, 52, 31, 37, 47, 55,
        30, 40, 51, 45, 33, 48,
        44, 49, 39, 56, 34, 53,
        46, 42, 50, 36, 29, 32 ];
        // LEFT SHIFTS PER ROUND
        this.LSRounds = {
        1: 1,
        2: 1,
        3: 2,
        4: 2,
        5: 2,
        6: 2,
        7: 2,
        8: 2,
        9: 1,
        10: 2,
        11: 2,
        12: 2,
        13: 2,
        14: 2,
        15: 2,
        16: 1 
        }

    }

    /*
    *
    * TRATAMENTO DOS BLOCOS
    *
    */

    mod(x, n) { return (x % n + n) % n }; // funcao modulo

    // FUNC CONVERSOR DE STRING PARA BINNARY -> recebe um string -> retorna um bloco de bits 01s
    toBinnary(str) {
        // str - > Unicode - > binnary
        let bin = [];
        let bytes = [];
        str.split("").map((char)=>{
        return bin.push(Number(char.charCodeAt()).toString(2)); // funçao conversora texto para bin
        });
        bin.map((binSeq)=>{
            binSeq = binSeq.split('');
            while (binSeq.length < 8) {
                binSeq.unshift('0');
            }
            binSeq = binSeq.join('');
            bytes.push(binSeq);
        });
        bytes = bytes.join("");
        return {
            bin: bytes
        }
    }
    hexToBin(hexSeq) {
        let hexArr = hexSeq.split(' ');
        // parseInt(x,16) vai pra numero Number(x).toString(2) para binario
        let bin = hexArr.map((elem)=>{
            return Number(parseInt(elem,16)).toString(2);
        });
        bin = bin.map((elem)=>{
            elem = elem.split('');
            while(elem.length < 8) {
                elem.unshift('0');
            }
            return elem = elem.join('');
        });
        return {
           bin: bin.join('')
        }
    }
    // FUNC DIVISOR EM BLOCOS DE 64 BITS -> recebe uma bloco de binários e divide-os em varios blocos de 64 bits -> retorna um array de blocos
    _64bitBlocksCreator(full_block) {
        full_block = full_block.split('');
        let _64Blocks = [];
        let dRounds = Math.floor(full_block.length / 64);
        let remRound = 0;
        if(this.mod(full_block.length,64) > 0) {
            remRound = 1;
        }
        let fullBlockLength = full_block.length;

        for( let i = 1; i <= dRounds; i++){
            let _64Stream = "";
            for( let j = 1; j <= 64; j++){
                _64Stream += full_block.shift();
            }
            _64Blocks.push(_64Stream);
        }
        if (full_block.length > 0) {
            let _64RemStream = ""
            while(this.mod(full_block.length, 64) !== 0){
                full_block.unshift('0');
            }
            _64RemStream += full_block.join("");
            _64Blocks.push(_64RemStream);
            full_block = [];
        }

        return {

            fullBlockLength: fullBlockLength,
            roundsInteiros: dRounds,
            roundSobra: remRound,
            blocksLength: _64Blocks.length,
            blocks: _64Blocks

        }
        
    }
    /*
    *
    * GERADOR DE SUBKEYS
    *
    */
    // FUNC LEFTSHIFT -> recebe metade de uma chave de 56 bits e aplica uma left shift
    leftShift(bits) {
        let shiftedBits;
        shiftedBits = bits.split('');
        shiftedBits.push(shiftedBits.shift());
        shiftedBits = shiftedBits.join('');

        return shiftedBits;
    }
    // FUNC CRIADOR DE SUBKEYS -> aplica leftshift -> aplica PC2 -> retorna uma subkey
    subkeyGen(key_partL,key_partR,round) {
        let umpermutedKey = "";
        let permutedKey = [];

        // Se rounds forem 1 , 2 , 9 , 16 aplica 1 left shift, junta , permuta com pc2 retorna
        if(round === 1 || round === 2 || round === 9 || round === 16){
            key_partL = this.leftShift(key_partL);
            key_partR = this.leftShift(key_partR);
            umpermutedKey += key_partL;
            umpermutedKey += key_partR;
        } else {
            // se nao aplica 2 left shifts, junta, permuta com pc2 retorna
            for(let i = 1; i < 3; i++){
                key_partL = this.leftShift(key_partL);
                key_partR = this.leftShift(key_partR);
            }
            umpermutedKey += key_partL;
            umpermutedKey += key_partR;
        }
        // Aplica PC2 e gera a subchave permutada de 48bits
        for(let i = 0; i < 48; i++){
            permutedKey.push(umpermutedKey[this.PC2[i]-1]); // logica de permutação 
        }
        permutedKey = permutedKey.join("");
    

        return {
            KL: key_partL,
            KR: key_partR,
            Subkey: permutedKey,
            SubKeyLength: permutedKey.length
        }
    }
    // FUNC GERAL DE SUBCHAVES BASEADOS NA CHAVE K - recebe chave K de 64 bits -> usa a PC1 56 bits -> algoritmo de criação de subchaves x 16 -> retorna um array de subkeys
    _48bitkeysGen(key) {
        let _64bitKey = this.toBinnary(key).bin;
        let _16Subkeys = [];
        let _56keyLeft = [];
        let _56keyRight = [];

        if (_64bitKey.length < 64) {
            _64bitKey = _64bitKey.split('');
            while(this.mod(_64bitKey.length, 64) !== 0){
                _64bitKey.unshift('0');
            }
            _64bitKey = _64bitKey.join('');
        } else if (_64bitKey.length > 64) {
            return false;
        }

        // dividir em duas partes de 28bits e permutar com PC1L e PC1R
        for( let i = 0; i < 28; i++) {
            _56keyLeft.push(_64bitKey[this.PC1L[i]-1]);
            _56keyRight.push(_64bitKey[this.PC1R[i]-1]);
        }
        _56keyLeft = _56keyLeft.join("");
        _56keyRight = _56keyRight.join("");

        // 16 rounds de criação das subkeys
        for( let r = 1; r <= 16; r++){
            let subKeyObj = this.subkeyGen(_56keyLeft, _56keyRight, r);
            _56keyLeft = subKeyObj.KL;
            _56keyRight = subKeyObj.KR;
            _16Subkeys.push(subKeyObj.Subkey);
        }

        return {
            _64bitKey:  _64bitKey,
            subkeys: _16Subkeys,
            subkeyLength: _16Subkeys.length
        }

    }
    /*
*
* AUXILIARES DE ENCRIPTAÇÃO
*
*/


// FUNC fCalculation -> recebe o resultaado de expanded faz XOR subkey-i 48bits -> divide em 8 sequencias de 6 bits -> usa as tabelas S1 a S8 para cada sequencia de bits , permut P -> retorna 32 bits
    fCalculation(subkeyi, ebits) {
        // variaveis
        let ebitSeq = [];
        let subkeySeq = [];
        let positionsArr = [];
        let fCalcResult = [];

        // Transformar ebits e subkeyi numa sequencia 6 x 8 bits

        ebits = ebits.split('');
        subkeyi = subkeyi.split('');
        for( let i = 1; i <= 8; i++ ){
            let _8bitE = [];
            let _8bitK = [];
            for(let j = 1; j <= 6; j++){ 
                _8bitE.push(ebits.shift());
                _8bitK.push(subkeyi.shift());  
            }  
            ebitSeq.push(_8bitE.join(''));
            subkeySeq.push(_8bitK.join(''));
        }
        let xorBits = [];
        for(let i = 0; i < 8; i++){
            let xorEbSk = Number(parseInt(ebitSeq[i],2) ^ parseInt(subkeySeq[i],2)).toString(2);
            while(this.mod(xorEbSk.length, 6) !== 0){
                xorEbSk = xorEbSk.split('');
                xorEbSk.unshift('0');
                xorEbSk = xorEbSk.join('');
            } 
            xorBits.push(xorEbSk);
        }
        
        // achar sequencias de linhas e colunas, 2 e 4 bits
        xorBits.forEach((_6bit)=>{
            let row = "";
            let col = "";
            _6bit = _6bit.split('');
            //first and last bit
                row += _6bit.shift();
                row += _6bit.pop();
            // 4 bits left 
            col = _6bit.join('');
            // insert positions base 2
            positionsArr.push([parseInt(row,2),parseInt(col,2)]);
        });


        // Achar as posições na tabela s1 a s8 - gerar 32 bits => 8 sequencias de 4 bits
        // variavel S dinamica = eval(`S${i}`)
        let _32bitSeq = []
        for(let i = 0; i < 8; i++){
            let _4bit = Number(eval(`this.S${i+1}`)[positionsArr[i][0]][positionsArr[i][1]]).toString(2);
            while(this.mod(_4bit.length,4) !== 0 ){
                _4bit = _4bit.split('');
                _4bit.unshift('0');
                _4bit = _4bit.join('');
            }
            _32bitSeq.push(_4bit);
        }
        _32bitSeq = _32bitSeq.join('');

        // Aplicar Primitive Function P 
        for(let i = 0; i < 32; i++){
            fCalcResult.push(_32bitSeq[this.P[i]-1]); // logica de permutação 
        }
        fCalcResult = fCalcResult.join('');

        return {
            _32bitRes: fCalcResult,
            _32bitLength: fCalcResult.length
        }
    }
    // FUNC RIGHT PROCESSING -> recebe subkey-i, 32Bits de Ri -> Usa permut E para gerar 48bits, func fCalculation -> retorna 32 bits
    rightProcess(subkey, _32bitRight) {
        let expandedBits = [];

        for(let i = 0; i < 48; i++){
            expandedBits.push(_32bitRight[this.E[i]-1]); // logica de permutação 
        }
        expandedBits = expandedBits.join('');
        let _32bitProcessed = this.fCalculation(subkey, expandedBits)._32bitRes;

        return {
            _32bit: _32bitProcessed
            
        }
    }
    /*
    *
    * PRINCIPAIS CONTROLADORES DE ENCRIPTAÇãO
    *
    */

    // FUNC ROUND DE ENCRIPTAÇÃO - recebe bloco-i de 64 bits e subkey-i
    DESEncryptionRound(_leftPart,_rightPart, subkey) {
        let _newLeft = "";
        let _newRight = "";
        // uma copia da direita vai para rightProcess, a parte direita se torna a parte esquerda
        let fResult = this.rightProcess(subkey,_rightPart)._32bit;
        
        // a parte esquerda opera XOR com o resultado de fCalculation e se torna parte direita nova
        let fResultSeq = [];
        let leftSeq = [];

        fResult = fResult.split('')
        let leftPart = _leftPart.split('')

        for( let i = 1; i <= 8; i++ ){
            let _4bitF = [];
            let _4bitL = [];
            for(let j = 1; j <= 4; j++){ 
                _4bitF.push(fResult.shift());
                _4bitL.push(leftPart.shift());  
            }  
            fResultSeq.push(_4bitF.join(''));
            leftSeq.push(_4bitL.join(''));
        }
        let xorBits = [];
        for(let i = 0; i < 8; i++){
            let xorEbSk = Number(parseInt(leftSeq[i],2) ^ parseInt(fResultSeq[i],2)).toString(2);
            while(this.mod(xorEbSk.length, 4) !== 0){
                xorEbSk = xorEbSk.split('');
                xorEbSk.unshift('0');
                xorEbSk = xorEbSk.join('');
            } 
            xorBits.push(xorEbSk);
        }
        
        _newRight = xorBits.join('');

        // parte direita original se torna parte esquerda
        _newLeft = _rightPart;
        // retorna parte esquerda e direita 
        
        return {
            _newRight: _newRight,
            _newLeft: _newLeft
        }
    }
    // FUNC DES (FUNC PRINCIPAL) - recebe o string de plaintext e o string da chave -> faz as conversoes -> manipula os blocos-n subkeys-n -> aplica IP aos blocos -> alimenta os rounds de encriptação -> retorna o texto cifrado em hexadecimal
    DESEncrypt(plaintext, _8byteKey) {
        const full_block = this.toBinnary(plaintext).bin;
        const blocksArr = this._64bitBlocksCreator(full_block).blocks;
        const subkeysArr = this._48bitkeysGen(_8byteKey).subkeys;
        let bitsOutput = [];
        let Output = [];

        
        blocksArr.forEach((_64block)=>{
            let rightPart = "";
            let leftPart = "";
            let finalLeft = "";
            let finalRight = "";
            let preOutput = "";
            // Passar o bloco pela Initial Permutation IP
            let initialPermuted = []
            for(let i = 0; i < 64; i++) {
                initialPermuted.push(_64block[this.IP[i]-1]); // logica de permutação 
            }
            initialPermuted = initialPermuted.join('');
            // dividir o bloco em parte direita e esquerda
            for(let i = 0; i < initialPermuted.length; i++) {
                
                if ( i > 31 ) {
                    rightPart += initialPermuted[i];
                } else {
                    leftPart += initialPermuted[i];
                }
            }
         

            // 16 rounds de encriptação
            subkeysArr.forEach((subkey_i)=>{
                let result = this.DESEncryptionRound(leftPart, rightPart,  subkey_i);
                rightPart= result._newRight;
                leftPart = result._newLeft;
            });

        
            // apos round 16 left e right tem que inverter de lado
            finalLeft = rightPart;
            finalRight = leftPart;

            // //o novo left e right tem que virar um pre output e passar pela inversa da ip
            preOutput = finalLeft + finalRight; // pre Output tem que ter 64 bits
           
            // PASSAR OS BITS PELO IPi 
            let permutedPreOutput = [];
            for(let i = 0; i < 64; i++) {
                permutedPreOutput.push(preOutput[this.IPi[i]-1]); // logica de permutação 
            }
        
            // o resultado é o output - entao dever ser empurrado para bitsOutput
            bitsOutput.push(permutedPreOutput.join(''));
        });
       
        // o conteudo dos blocos devem ser divididos em sequencias de 8 bits para serem convertidos a base 10
        let intOutput = [];
        bitsOutput.forEach((_64block)=>{
            _64block = _64block.split('');
            for(let i = 0; i < 8; i++){
                let byteSeq = "";
                for(let i = 1; i <= 8; i++){
                    byteSeq += _64block.shift();
                }
                intOutput.push(parseInt(byteSeq,2));
            }
        });
      
        // entao os bitsOutput devem ser convertidos para HEX para completar a cifra
        Output = intOutput.map((elem)=>{
            return Number(elem).toString(16);
        });
       

        return {
            key: _8byteKey,
            plaintext: plaintext,
            output: Output.join(' ')
        }
    }
    // FUNC DECRIPTAÇÃO
    DESDecrypt(cipherhex, _8byteKey) {
        const full_block = this.hexToBin(cipherhex).bin;
        const blocksArr = this._64bitBlocksCreator(full_block).blocks;
        const subkeysArr = this._48bitkeysGen(_8byteKey).subkeys;
        subkeysArr.reverse(); // usado para começar a decriptação pelo pela chave 16

        let bitsOutput = [];
        let Output = [];

        blocksArr.forEach((_64block)=>{
            let rightPart = "";
            let leftPart = "";
            let finalLeft = "";
            let finalRight = "";
            let preOutput = "";
            // Passar o bloco pela Initial Permutation IP
            let initialPermuted = []
            for(let i = 0; i < 64; i++) {
                initialPermuted.push(_64block[this.IP[i]-1]); // logica de permutação 
            }
            initialPermuted = initialPermuted.join('');
            // dividir o bloco em parte direita e esquerda
            for(let i = 0; i < initialPermuted.length; i++) {
                
                if ( i > 31 ) {
                    rightPart += initialPermuted[i];
                } else {
                    leftPart += initialPermuted[i];
                }
            }
            // 16 rounds de encriptação
            subkeysArr.forEach((subkey_i)=>{
                let result = this.DESEncryptionRound(leftPart, rightPart,  subkey_i);
                rightPart= result._newRight;
                leftPart = result._newLeft;
            });

        
            // apos round 16 left e right tem que inverter de lado
            finalLeft = rightPart;
            finalRight = leftPart;
            // //o novo left e right tem que virar um pre output e passar pela inversa da ip
            preOutput = finalLeft + finalRight; // pre Output tem que ter 64 bits

            // PASSAR OS BITS PELO IPi 
            let permutedPreOutput = [];
            for(let i = 0; i < 64; i++) {
                permutedPreOutput.push(preOutput[this.IPi[i]-1]); // logica de permutação 
            }
        
            // o resultado é o output - entao dever ser empurrado para bitsOutput
            bitsOutput.push(permutedPreOutput.join(''));
        });
        // o conteudo dos blocos devem ser divididos em sequencias de 8 bits para serem convertidos a base 10
        let intOutput = [];
        bitsOutput.forEach((_64block)=>{
            _64block = _64block.split('');
            for(let i = 0; i < 8; i++){
                let byteSeq = "";
                for(let i = 1; i <= 8; i++){
                    byteSeq += _64block.shift();
                }
                intOutput.push(parseInt(byteSeq,2));
            }
        });
        Output = intOutput.map((elem)=>{
            if (elem === 0) {
                return '';
            } else {
                return String.fromCharCode(elem);
            }
            
        });

        return {
            key: _8byteKey,
            cipherhex: cipherhex,
            output: Output.join('')
        }
    }

}