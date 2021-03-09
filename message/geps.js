/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable no-irregular-whitespace */

/**
 * This source code below is free, please DO NOT sell this in any form!
 * Source code ini gratis, jadi tolong JANGAN jual dalam bentuk apapun!
 *
 * If you copying one of our source code, please give us CREDITS. Because this is one of our hardwork.
 * Apabila kamu menjiplak salah satu source code ini, tolong berikan kami CREDIT. Karena ini adalah salah satu kerja keras kami.
 *
 * If you want to contributing to this source code, pull requests are always open.
 * Apabila kamu ingin berkontribusi ke source code ini, pull request selalu kami buka.
 *
 * Thanks for the contributions.
 * Terima kasih atas kontribusinya.
 */

/********** MODULES **********/
require('dotenv').config()
const { decryptMedia, Client } = require('@open-wa/wa-automate')
const fs = require('fs-extra')
const config = require('../config.json')
const Nekos = require('nekos.life')
const neko = new Nekos()
const os = require('os')
const nhentai = require('nhentai-js')
const { API } = require('nhentai-api')
const api = new API()
const sagiri = require('sagiri')
const NanaAPI = require('nana-api')
const nana = new NanaAPI()
const fetch = require('node-fetch')
const get = require('got')
const isPorn = require('is-porn')
const exec = require('await-exec')
const webp = require('webp-converter')
const sharp = require('sharp')
const saus = sagiri(config.nao, { results: 5 })
const axios = require('axios')
const tts = require('node-gtts')
const nekobocc = require('nekobocc')
const ffmpeg = require('fluent-ffmpeg')
const google = require('google-it')
const bent = require('bent')
const path = require('path')
const ms = require('parse-ms')
const toMs = require('ms')
const canvas = require('canvacord')
const mathjs = require('mathjs')
const emojiUnicode = require('emoji-unicode')
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
/********** END OF MODULES **********/

/********** UTILS **********/
const { msgFilter, color, processTime, isUrl, createSerial } = require('../tools')
const { nsfw2, nsfw, weeaboo, downloader, fun, misc, toxic } = require('../lib')
const { sleep, calender, uploadImages, toBuffer } = require('../tools/fetcher')
const { ind, eng } = require('./text/lang')
const { getStickerMaker } = require('../function/getStickerMaker')
const { balance, level, card, register, afk, reminder, premium } = require('../function')
const Exif = require('../tools/exif')
const exif = new Exif()
const cd = 4.32e+7
const errorImg = 'https://www.linkpicture.com/q/emror1.webp'
const tanggal = moment.tz('Asia/Jakarta').format('DD-MM-YYYY')
/********** END OF UTILS **********/

/********** DATABASES **********/
const _nsfw = JSON.parse(fs.readFileSync('./database/group/nsfw.json'))
const _antilink = JSON.parse(fs.readFileSync('./database/group/antilink.json'))
const _antinsfw = JSON.parse(fs.readFileSync('./database/group/antinsfw.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/group/leveling.json'))
const _welcome = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
const _autosticker = JSON.parse(fs.readFileSync('./database/group/autosticker.json'))
const _ban = JSON.parse(fs.readFileSync('./database/bot/banned.json'))
const _premium = JSON.parse(fs.readFileSync('./database/bot/premium.json'))
const _registered = JSON.parse(fs.readFileSync('./database/bot/registered.json'))
const _level = JSON.parse(fs.readFileSync('./database/user/level.json'))
const limit = JSON.parse(fs.readFileSync('./database/user/limit.json'))
const limitmining = JSON.parse(fs.readFileSync('./database/user/mining.json'))
const _afk = JSON.parse(fs.readFileSync('./database/user/afk.json'))
const _reminder = JSON.parse(fs.readFileSync('./database/user/reminder.json'))
const __auto = JSON.parse(fs.readFileSync('./database/group/auto.json'))
const _bg = JSON.parse(fs.readFileSync('./database/user/card/background.json'))
const _setting = JSON.parse(fs.readFileSync('./database/bot/setting.json'))
const _balance = JSON.parse(fs.readFileSync('./database/group/balance.json')) // THIS FOR ON/OFF
const banned = JSON.parse(fs.readFileSync('./database/bot/banned.json'))
const userbalance = JSON.parse(fs.readFileSync('./database/user/userbalance.json')) // THIS BALANCE USER
const msgLimit = JSON.parse(fs.readFileSync('./database/user/msgLimit.json'))
const simi_ = JSON.parse(fs.readFileSync('./database/group/simih.json'))
const imagelist = JSON.parse(fs.readFileSync('./database/bot/image.json'))
const vnlist = JSON.parse(fs.readFileSync('./database/bot/vn.json'))
const say = JSON.parse(fs.readFileSync('./database/bot/say.json'))
let { limitMining, banChats, limitCount, prefix, memberLimit, groupLimit } = _setting
 const mess = {
            wait: '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar',
            magernulissatu: 'Harap Tunggu, BOT Sedang Menulis Di Buku 1!',
            error: {
                St: '[❗] Kirim gambar dengan caption *#sticker* atau tag gambar yang sudah dikirim',
                Ti: '[❗] Replay sticker dengan caption *#stickertoimg* atau tag sticker yang sudah dikirim',
                Qm: '[❗] Terjadi kesalahan, mungkin themenya tidak tersedia!',
                Yt3: '[❗] Terjadi kesalahan, tidak dapat meng konversi ke mp3!',
                Yt4: '[❗] Terjadi kesalahan, mungkin error di sebabkan oleh sistem.',
                Ig: '[❗] Terjadi kesalahan, mungkin karena akunnya private',
                Ki: '[❗] Bot tidak bisa mengeluarkan Admin group!',
                Sp: '[❗] Bot tidak bisa mengeluarkan Admin',
                Ow: '[❗] Bot tidak bisa mengeluarkan Owner',
                Bk: '[❗] Bot tidak bisa memblockir Owner',
                Ad: '[❗] Tidak dapat menambahkan target, mungkin karena di private',
                Iv: '[❗] Link yang anda kirim tidak valid!'
            }
        }
/********** END OF DATABASES **********/

/********** MESSAGE HANDLER **********/
// eslint-disable-next-line no-undef
module.exports = msgHandler = async (geps = new Client(), message) => {
    try {
        const { type, id, from, t, to, sender, author, isGroupMsg, chat, caption, chatId, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat
        //let { pushname, verifiedName, formattedName } = sender
        //pushname = pushname || verifiedName || formattedName
        const self = sender && sender.isMe ? to : from
        let { pushname, verifiedName } = sender
        pushname = pushname || verifiedName
        const botNumber = await geps.getHostNumber() + '@c.us'
        const blockNumber = await geps.getBlockedIds()
        const ownerNumber = config.ownerBot
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await geps.getGroupAdmins(groupId) : ''
        const time = moment(t * 1000).format('DD/MM/YY HH:mm:ss')

        const chats = (type === 'chat') ? body : ((type === 'image' || type === 'video')) ? caption : ''

        //const prefix  = config.prefix
        //body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        //const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const commands = caption || body || ''
        const command = commands.toLowerCase().split(' ')[0] || ''
        const args = body.trim().split(/ +/).slice(1)
        const uaOverride = config.uaOverride
        const q = args.join(' ')
        const ar = args.map((v) => v.toLowerCase())
        const url = args.length !== 0 ? args[0] : ''
        const SN = GenerateSerialNumber("0000000000")
        const serial = sender.id
        const timeStart = Date.now() / 1000
        const tms = (Date.now() / 1000) - (timeStart);

        /********** VALIDATOR **********/
        const isCmd = body.startsWith(prefix)
        const isBlocked = blockNumber.includes(sender.id)
        const isOwner = sender.id === ownerNumber
        const isGroupAdmins = groupAdmins.includes(sender.id) || false
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const isBanned = _ban.includes(sender.id)
        const isPremium = premium.checkPremiumUser(sender.id, _premium)
        const isRegistered = register.checkRegisteredUser(sender.id, _registered)
        const isNsfw = isGroupMsg ? _nsfw.includes(groupId) : false
        const isWelcomeOn = isGroupMsg ? _welcome.includes(groupId) : false
        const isDetectorOn = isGroupMsg ? _antilink.includes(groupId) : false
        const isLevelingOn = isGroupMsg ? _leveling.includes(groupId) : false
        const isBalanceOn = isGroupMsg ? _balance.includes(groupId) : false
        const isAutoStickerOn = isGroupMsg ? _autosticker.includes(groupId) : false
        const isAntiNsfw = isGroupMsg ? _antinsfw.includes(groupId) : false
        const isSimi = isGroupMsg ? simi_.includes(groupId) : false
        const isAfkOn = afk.checkAfkUser(sender.id, _afk)
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedSticker = quotedMsg && quotedMsg.type === 'sticker'
        const isQuotedGif = quotedMsg && quotedMsg.mimetype === 'image/gif'
        const isQuotedAudio = quotedMsg && (quotedMsg.type === 'audio' || quotedMsg.type === 'ptt' || quotedMsg.type === 'ppt')
        const isImage = type === 'image'
        const isVideo = type === 'video'
        /********** END OF VALIDATOR **********/

        // Automate
        premium.expiredCheck(_premium)

        // Serial Number Generator
        function GenerateRandomNumber(min,max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        // Generates a random alphanumberic character
        function GenerateRandomChar() {
            var chars = "1234567890ABCDEFGIJKLMNOPQRSTUVWXYZ";
            var randomNumber = GenerateRandomNumber(0,chars.length - 1);
            return chars[randomNumber];
        }
        // Generates a Serial Number, based on a certain mask
        function GenerateSerialNumber(mask){
            var serialNumber = "";
            if(mask != null){
            for(var i=0; i < mask.length; i++){
                var maskChar = mask[i];
                serialNumber += maskChar == "0" ? GenerateRandomChar() : maskChar;
                    }
                }
            return serialNumber;
        }

        const getLevelingBalanceId = (userId) => {
            let position = null
            Object.keys(userbalance).forEach((i) => {
                if (userbalance[i].id === userId) {
                    position = i
                }
            })
            if (position !== null) {
                return userbalance[position].id
            }
        }

        const getLevelingBalance = (userId) => {
            let position = null
            Object.keys(userbalance).forEach((i) => {
                if (userbalance[i].id === userId) {
                    position = i
                }
            })
            if (position !== null) {
                return userbalance[position].level
            }
        }

        const getLevelingXpBC = (userId) => {
            let position = null
            Object.keys(userbalance).forEach((i) => {
                if (userbalance[i].id === userId) {
                    position = i
                }
            })
            if (position !== null) {
                return userbalance[position].xp
            }
        }

        const addLevelingIdBC = (userId) => {
            const obj = { id: userId, xp: 0, level: 1 }
            userbalance.push(obj)
            fs.writeFileSync('./database/user/userbalance.json', JSON.stringify(userbalance))
        }

        const addLevelingBalance = (userId, amount) => {
            let position = null
            Object.keys(userbalance).forEach((i) => {
                if (userbalance[i].id === userId) {
                    position = i
                }
            })
            if (position !== null) {
                userbalance[position].level += amount
                fs.writeFileSync('./database/user/userbalance.json', JSON.stringify(userbalance))
            }
        }

        const addLevelingXpBalance = (userId, amount) => {
            let position = null
            Object.keys(userbalance).forEach((i) => {
                if (userbalance[i].id === userId) {
                    position = i
                }
            })
            if (position !== null) {
                userbalance[position].xp += amount
                fs.writeFileSync('./database/user/userbalance.json', JSON.stringify(userbalance))
            }
        }

        const lessLevelingXpBalance = (userId, amount, userbalance) => {
            let position = null
            Object.keys(userbalance).forEach((i) => {
                if (userbalance[i].id === userId) {
                    position = i
                }
            })
            if (position !== null) {
                userbalance[position].xp -= amount
                fs.writeFileSync('./database/user/userbalance.json', JSON.stringify(userbalance))
            }
        }

        function waktu(seconds) { // TOBZ
            seconds = Number(seconds);
            var d = Math.floor(seconds / (3600 * 24));
            var h = Math.floor(seconds % (3600 * 24) / 3600);
            var m = Math.floor(seconds % 3600 / 60);
            var s = Math.floor(seconds % 60);
            var dDisplay = d > 0 ? d + (d == 1 ? " Hari," : " Hari,") : "";
            var hDisplay = h > 0 ? h + (h == 1 ? " Jam," : " Jam,") : "";
            var mDisplay = m > 0 ? m + (m == 1 ? " Menit," : " Menit,") : "";
            var sDisplay = s > 0 ? s + (s == 1 ? " Detik," : " Detik") : "";
            return dDisplay + hDisplay + mDisplay + sDisplay;
        }

        const kelebihan = [
            'Soleh dan Soleha',
            'Pintar',
            'Rajin',
            'Teladan'
        ]
        const tipe = [
            'cool',
            'idaman',
            'Alami',
            'Keren',
            'Ideal',
            'Dia Bamget',
            'normal',
            'elite',
            'epic',
            'Legend'
        ]
        const ratenyaasu = [
            '100%',
            '95%',
            '90%',
            '85%',
            '80%',
            '75%',
            '70%',
            '65%',
            '60%',
            '55%',
            '50%',
            '45%',
            '40%',
            '35%',
            '30%',
            '25%',
            '20%',
            '15%',
            '10%',
            '5%'
        ]
        const sifat = [
            'Penolong',
            'Suka Membantu',
            'Saling Menolong',
            'Perhatian',
            'Ngak Cuek',
            'Romantis',
            'Dermawan',
            'Cool',
            'Peduli Kepada Sesama',
            'Suka Berkata Kasar'
        ]
        const hobby = [
            'Memasak',
            'Membantu Atok',
            'Mabar',
            'Nobar',
            'Sosmedtan',
            'Membantu Orang lain',
            'Nonton Anime',
            'Nonton Drakor',
            'Naik Motor',
            'Nyanyi',
            'Menari',
            'Bertumbuk',
            'Menggambar',
            'Foto fotoan Ga jelas',
            'Maen Game',
            'Berbicara Sendiri'
        ]
        const watak = [
            'top deh pokoknya',
            'penyayang',
            'pemurah',
            'Pemarah',
            'Pemaaf',
            'Penurut',
            'Baik',
            'baperan',
            'Baik-Hati',
            'penyabar',
            'UwU',
            'Suka Membantu'
        ]

        /* BUAT PR AJA
        const checkATMuser = (sender) => {
            let position = false
            Object.keys(userbalance).forEach((i) => {
                if (userbalance[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return userbalance[position].userbalance
            }
        }

        const bayarLimit = (sender, amount) => {
            let position = false
            Object.keys(limit).forEach((i) => {
                if (limit[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                limit[position].limit -= amount
                fs.writeFileSync('./database/user/limit.json', JSON.stringify(limit))
            }
        }

        const confirmATM = (sender, amount) => {
            let position = false
            Object.keys(userbalance).forEach((i) => {
                if (userbalance[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                userbalance[position].userbalance -= amount
                fs.writeFileSync('./database/user/userbalance.json', JSON.stringify(userbalance))
            }
        }*/

        const cts = waktu(tms)
        function isMsgLimit(id) {
            //if (isPremium) { return false; }
            let found = false;
            for (let i of msgLimit) {
                if (i.id === id) {
                    if (i.msg >= 12) {
                        found === true
                        geps.reply(self, `*[ANTI-SPAM]*\nMaaf, akun anda kami blok karena SPAM, dan tidak bisa di UNBLOK!`, id)
                        geps.contactBlock(id)
                        banned.push(id)
                        fs.writeFileSync('./database/user/banned.json', JSON.stringify(banned))
                        return true;
                    } else if (i.msg >= 7) {
                        found === true
                        geps.reply(self, `*[ANTI-SPAM]*\nNomor anda terdeteksi spam!\nMohon tidak spam 5 pesan lagi atau nomor anda AUTO BLOK!`, id)
                        return true
                    } else {
                        found === true
                        return false;
                    }
                }
            }
            if (found === false) {
                let obj = { id: `${id}`, msg: 1 };
                msgLimit.push(obj);
                fs.writeFileSync('./database/user/msgLimit.json', JSON.stringify(msgLimit));
                return false;
            }
        }

        function addMsgLimit(id) {
            //if (isPremium) { return; }
            var found = false
            Object.keys(msgLimit).forEach((i) => {
                if (msgLimit[i].id == id) {
                    found = i
                }
            })
            if (found !== false) {
                msgLimit[found].msg += 1;
                fs.writeFileSync('./database/user/msgLimit.json', JSON.stringify(msgLimit));
            }
        }

        function isLimit(userId) {
            //if (isAdmin) {return false;}
            let found = false;
            for (let i of limit) {
                if (i.id === userId) {
                    let limits = i.limit;
                    if (limits >= limitCount) {
                        found = true;
                        geps.reply(self, `Opps Perintah BOT anda sudah mencapai batas, coba esok hari :)`, id)
                        return true;
                    } else {
                        limit
                        found = true;
                        return false;
                    }
                }
            }
            if (found === false) {
                let obj = { id: `${userId}`, limit: 1 };
                limit.push(obj);
                fs.writeFileSync('./database/user/limit.json', JSON.stringify(limit));
                return false;
            }
        }

        function limitAdd(id) {
            var found = false;
            Object.keys(limit).forEach((i) => {
                if (limit[i].id == id){
                    found = i
                }
            })
            if (found !== false) {
                limit[found].limit += 1;
                fs.writeFileSync('./database/user/limit.json',JSON.stringify(limit));
            }
        }

        function isLimitMining(userId) {
            //if (isAdmin) {return false;}
            let found = false;
            for (let i of limitmining) {
                if (i.id === userId) {
                    let limits = i.limit;
                    if (limits >= limitMining) {
                        found = true;
                        geps.reply(self, `Opps Perintah BOT anda sudah mencapai batas, coba esok hari :)`, id)
                        return true;
                    } else {
                        limitmining
                        found = true;
                        return false;
                    }
                }
            }
            if (found === false) {
                let obj = { id: `${userId}`, limit: 1 };
                limitmining.push(obj);
                fs.writeFileSync('./database/user/mining.json', JSON.stringify(limitmining));
                return false;
            }
        }

        function limitAddMining(id) {
            var found = false;
            Object.keys(limitmining).forEach((i) => {
                if (limitmining[i].id == id) {
                    found = i
                }
            })
            if (found !== false) {
                limitmining[found].limit += 1;
                fs.writeFileSync('./database/user/mining.json', JSON.stringify(limitmining));
            }
        }

        function convertBalanceToString(angka)
        {
            var balancenyeini = '';
            var angkarev = angka.toString().split('').reverse().join('');
            for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) balancenyeini += angkarev.substr(i,3)+'.';
            return '$ '+balancenyeini.split('',balancenyeini.length-1).reverse().join('');
        }

        function clamp(value, min, max) {
            return Math.min(Math.max(min, value), max)
        }

            const isMuted = (chatId) => {
                if(muted.includes(chatId)){
                  return false
              }else{
                  return true
                  }
              }

              function banChat () {
                  if(banChats == true) {
                  return false
              }else{
                  return true
                  }
              }

        const sleeps = async (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        // ROLE (Change to what you want, or add) and you can change the role sort based on XP.
        const levelRole = level.getLevelingLevel(sender.id, _level)
        var role = 'Warrior III'
        if (levelRole <= 5) {
            role = 'Warrior II'
        } else if (levelRole <= 10) {
            role = 'Warrior I'
        } else if (levelRole <= 15) {
            role = 'Elite V'
        } else if (levelRole <= 20) {
            role = 'Elite IV'
        } else if (levelRole <= 30) {
            role = 'Elite III'
        } else if (levelRole <= 40) {
            role = 'Elite II'
        } else if (levelRole <= 50) {
            role = 'Elite I'
        } else if (levelRole <= 60) {
            role = 'Master V'
        } else if (levelRole <= 80) {
            role = 'Master IV'
        } else if (levelRole <= 100) {
            role = 'Master III'
        } else if (levelRole <= 120) {
            role = 'Master II'
        } else if (levelRole <= 140) {
            role = 'Master I'
        } else if (levelRole <= 160) {
            role = 'Epic V'
        } else if (levelRole <= 180) {
            role = 'Epic Iv'
        } else if (levelRole <= 200) {
            role = 'Epic iii'
        } else if (levelRole <= 220) {
            role = 'Epic Ii'
        } else if (levelRole <= 240) {
            role = 'Epic I'
        } else if (levelRole <= 260) {
            role = 'Legend V'
        } else if (levelRole <= 300) {
            role = 'Legend IV'
        } else if (levelRole <= 340) {
            role = 'Legend III'
        } else if (levelRole <= 380) {
            role = 'Legend II'
        } else if (levelRole <= 420) {
            role = 'Legend I'
        } else if (levelRole <= 460) {
            role = 'Mythic V'
        } else if (levelRole <= 500) {
            role = 'Mythic IV'
        } else if (levelRole <= 600) {
            role = 'Mythic III'
        } else if (levelRole <= 700) {
            role = 'Mythic II'
        } else if (levelRole <= 800) {
            role = 'Mythic I'
        } else if (levelRole <= 900) {
            role = 'Mythic Glory'
        }

        // Leveling [BETA] by Slavyan
        if (isGroupMsg && isRegistered && !isBanned && isLevelingOn) {
            const currentLevel = level.getLevelingLevel(sender.id, _level)
            const checkId = level.getLevelingId(sender.id, _level)
            const checkBg = card.getBg(sender.id, _bg)
            try {
                if (currentLevel === undefined && checkId === undefined) level.addLevelingId(sender.id, _level)
                if (checkBg === undefined) card.addBg(sender.id, _bg)
                const amountXp = Math.floor(Math.random() * 10) + 15
                const requiredXp = 200 * (Math.pow(2, currentLevel) - 1)
                const getLevel = level.getLevelingLevel(sender.id, _level)
                level.addLevelingXp(sender.id, amountXp, _level)
                if (requiredXp <= level.getLevelingXp(sender.id, _level)) {
                    level.addLevelingLevel(sender.id, 1, _level)
                    const fetchXp = 200 * (Math.pow(2, level.getLevelingLevel(sender.id, _level)) - 1)
                    await geps.reply(self, `*「 LEVEL UP 」*\n\n➸ *Name*: ${pushname}\n➸ *XP*: ${level.getLevelingXp(sender.id, _level)} / ${fetchXp}\n➸ *Level*: ${getLevel} -> ${level.getLevelingLevel(sender.id, _level)} 🆙 \n➸ *Role*: *${role}*\n\nCongrats!! 🎉🎉`, id)
                }
            } catch (err) {
                console.error(err)
            }
        }

        if (isGroupMsg && !isBanned && isBalanceOn) {
            const CurrentBalance = getLevelingBalance(sender.id, userbalance)
            const checkIdBc = getLevelingBalanceId(sender.id, userbalance)
            const checkBgBc = card.getBg(sender.id, _bg)
            try {
                if (CurrentBalance === undefined && checkIdBc === undefined) addLevelingIdBC(sender.id, userbalance)
                if (checkBgBc === undefined) card.addBg(sender.id, _bg)
                const amountXpBC = Math.floor(Math.random() * 10) + 15
                const requiredXpBC = 200 * (Math.pow(2, CurrentBalance) - 1)
                const getLevelBC = getLevelingBalance(sender.id, userbalance)
                addLevelingXpBalance(sender.id, amountXpBC, userbalance)
                if (requiredXpBC <= getLevelingXpBC(sender.id, userbalance)) {
                    addLevelingBalance(sender.id, 1, userbalance)
                    const fetchXpBC = 200 * (Math.pow(2, getLevelingBalance(sender.id, userbalance)) - 1)
                    console.log(`Something Get Balance\nName : ${pushname}\nXp : ${getLevelBC}\nLevel : ${getLevelBC}`)
                }
            } catch (err) {
                console.error(err)
            }
        }

        // Anti-group link detector
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isDetectorOn) {
            if (chats.match(new RegExp(/(https:\/\/chat.whatsapp.com)/gi))) {
                const valid = await geps.inviteInfo(chats)
                if (valid) {
                    console.log(color('[KICK]', 'red'), color(`「 *ANTI LINK* 」\n\nMaaf ${pushname} kamu mengirimkan link disaat antilink menyala, kamu akan dikick`, 'yellow'))
                    //await geps.reply(self, ind.linkDetected(), id)
                    //await geps.removeParticipant(groupId, sender.id)
                    return geps.reply(self, ind.linkDetected(), id)
                    .then(() => geps.removeParticipant(groupId, sender.id))
                    .then(() => {
                    geps.sendText(self, `Sudah tau antilink menyala:(`, id)
                  }).catch(() => geps.sendText(self, `Untung ICHI X AISHA Bukan Admin, Kalo Jadi Admin Udah Aku Kick Tuh! 😑`))
                } else {
                    console.log(color('[WARN]', 'yellow'), color('「 *ANTI LINK* 」\n\nSaya mengetahui link tersebut tpi selamat kamu tidak dikick karena link tersebut tidak valid', 'yellow'))
                }
            }
        }

        // Anti-fake-group link detector
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isDetectorOn && !isOwner) {
            if (chats.match(new RegExp(/(https:\/\/chat.(?!whatsapp.com))/gi))) {
                console.log(color('[KICK]', 'red'), color(`「 *ANTI FAKE-LINK* 」\n\nMaaf ${pushname} kamu mengirimkan link disaat anti fake-link menyala, kamu akan dikick`, 'yellow'))
                await geps.reply(self, 'Fake group link detected!', id)
                await geps.removeParticipant(groupId, sender.id)
            }
        }

        // Anti NSFW links but kinda uneffective
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isAntiNsfw && !isOwner) {
            if (isUrl(chats)) {
                const classify = new URL(isUrl(chats))
                console.log(color('[FILTER]', 'yellow'), 'Checking link:', classify.hostname)
                isPorn(classify.hostname, async (err, status) => {
                    if (err) return console.error(err)
                    if (status) {
                        console.log(color('[NSFW]', 'red'), color('The link is classified as NSFW!', 'yellow'))
                        await geps.reply(self, ind.linkNsfw(), id)
                        await geps.removeParticipant(groupId, sender.id)
                    } else {
                        console.log(('[NEUTRAL]'), color('The link is safe!'))
                    }
                })
            }
        }

        // Auto-sticker
        if (isGroupMsg && isAutoStickerOn && isMedia && isImage && !isCmd) {
            const mediaData = await decryptMedia(message, uaOverride)
            const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
            await geps.sendImageAsSticker(self, imageBase64, id)
            console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
        }

        // AFK by Slavyan
        if (isGroupMsg) {
            for (let ment of mentionedJidList) {
                if (afk.checkAfkUser(ment, _afk)) {
                    const getId = afk.getAfkId(ment, _afk)
                    const getReason = afk.getAfkReason(getId, _afk)
                    const getTime = afk.getAfkTime(getId, _afk)
                    await geps.reply(self, ind.afkMentioned(getReason, getTime), id)
                }
            }
            if (afk.checkAfkUser(sender.id, _afk) && !isCmd) {
                _afk.splice(afk.getAfkPosition(sender.id, _afk), 1)
                fs.writeFileSync('./database/user/afk.json', JSON.stringify(_afk))
                await geps.sendText(self, ind.afkDone(pushname))
            }
        }

        // AUTO REPLY by Piyo >_<
        /*
        if (chats == 'p') {
            if (!isGroupMsg) await geps.reply(self, `Halo Kak, Untuk Memulai bot silahkan ketik ${prefix}menu`, id)
        }

        if (chats == 'P') {
            if (!isGroupMsg) await geps.reply(self, `Halo Kak, Untuk Memulai bot silahkan ketik ${prefix}menu`, id)
        }

        if (chats == 'bot') {
            if (!isGroupMsg) await geps.reply(self, `Halo Kak, Untuk Memulai bot silahkan ketik ${prefix}menu`, id)
        }

        if (chats == 'Bot') {
            if (!isGroupMsg) await geps.reply(self, `Halo Kak, Untuk Memulai bot silahkan ketik ${prefix}menu`, id)
        }

        if (chats == 'assalamualaikum') {
            if (!isGroupMsg) await geps.reply(self, `Waalaikumsalam , Halo Kak, Untuk Memulai bot silahkan ketik ${prefix}menu`, id)
        }

        if (chats == 'Assalamualaikum') {
            if (!isGroupMsg) await geps.reply(self, `Waalaikumsalam , Halo Kak, Untuk Memulai bot silahkan ketik ${prefix}menu`, id)
        }
        */

        // Ignore banned and blocked users
        if (isCmd && (isBanned || isBlocked) && !isGroupMsg) return console.log(color('[BAN]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && (isBanned || isBlocked) && isGroupMsg) return console.log(color('[BAN]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))

        // Anti-spam
        //if (isCmd && msgFilter.isFiltered(self) && !isGroupMsg) return console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        //if (isCmd && msgFilter.isFiltered(self) && isGroupMsg) return console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))

        // Log
        if (isCmd && !isGroupMsg) console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && isGroupMsg) console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))

        // Anti-spam
        //if (isCmd && !isOwner) msgFilter.addFilter(self)
        if (banChat() && !isBlocked && !isBanned || isOwner ) {
        switch (command) {
            /*case prefix+'banchat':
                if (config.banChats === true) return
                if (!isOwner) return geps.reply(self, 'Perintah ini hanya bisa di gunakan oleh Owner-Sama!', id)
                config.banChats = true
                banChats = true
                fs.writeFileSync('./database/bot/setting.json', JSON.stringify(config, null, 2))
                geps.reply(self, 'Global chat has been enable!', id)
                break
            case prefix+'unbanchat':
                if (!isOwner) return geps.reply(self, 'Maaf, perintah ini hanya dapat dilakukan oleh Owner-Sama!', id)
                if(config.banChats === false) return
                config.banChats = false
                banChats = false
                fs.writeFileSync('./database/bot/setting.json', JSON.stringify(config, null, 2))
                geps.reply(self, 'Global chat has been disable!', id)
                break*/
            case prefix+'self':
                  if (config.banChats === true) return
                  if (!isOwner) return geps.reply(self, 'Perintah ini hanya bisa di gunakan oleh Owner-Sama!', id)
                  config.banChats = true
                  banChats = true
                  fs.writeFileSync('./lib/database/bot/setting.json', JSON.stringify(config, null, 2))
                  geps.reply(self, '  _*MODE SELF!*_ ', id)
                  break
              case prefix+'public':
                      if (!isOwner) return geps.reply(self, 'Maaf, perintah ini hanya dapat dilakukan oleh Owner-Sama!', id)
                      if(config.banChats === false) return
                      config.banChats = false
                      banChats = false
                      fs.writeFileSync('./database/bot/setting.json', JSON.stringify(config, null, 2))
                      geps.reply(self, ' _*MODE PUBLIC*_ ', id)
                      break
            case prefix+'verify':
                const nonye = sender.id
                const pporang = await geps.getProfilePicFromServer(sender.id)
                if (pporang === undefined) {
                var pepe = errorImg
                } else {
                var pepe = pporang
                }
                var ceknya = nonye
                var obj = _registered.some((val) => {
                return val.id === ceknya
                })
                if (obj === true){
                return geps.reply(self, 'Kamu sudah melakukan verifikasi', id) // BAKAL RESPON JIKA NO UDAH ADA
                } else {
                const mentah = await geps.checkNumberStatus(nonye) // PENDAFTARAN
                const msg = (`┌─「 VERIFY-SUCCES 」
│
├ NAMA : ${pushname}
├ SERIAL : ${SN}
├ NOMOR : [@${nonye.replace(/[@c.us]/g, '')}]
├ API : wa.me/${nonye.replace('@c.us', '')}
├ WAKTU : ${moment().format('DD/MM/YY HH:mm:ss')}
│
├ Untuk menggunakan bot kirim ${prefix}menu
│ Total User yang telah terdaftar ${_registered.length}
│
└─「 ICHI X AISHA 」`)
                const hasil = mentah.canReceiveMessage ? msg : false
                if (!hasil) return geps.reply(self, 'Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ]', id)
                {
                const register = ({
                    id: mentah.id._serialized
                })
                const givebalance = ({
                    id: mentah.id._serialized,
                    xp: 5,
                    level: 1
                })
                const givexplepel = ({
                    id: mentah.id._serialized,
                    xp: 5,
                    level: 1
                })
                _registered.push(register)
                fs.writeFileSync('./database/bot/registered.json', JSON.stringify(_registered)) // DATABASE
                userbalance.push(givebalance)
                fs.writeFileSync('./database/user/userbalance.json', JSON.stringify(userbalance))
                _level.push(givexplepel)
                fs.writeFileSync('./database/user/level.json', JSON.stringify(_level))
                geps.sendFileFromUrl(self, pepe, 'ppnya.jpg', hasil)
                }
                }
                break
            // Level [BETA] by Slavyan
            case prefix+'level':
            case prefix+'ceklevel':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const userLevel = level.getLevelingLevel(sender.id, _level)
                const userXp = level.getLevelingXp(sender.id, _level)
                if (userLevel === undefined && userXp === undefined) return await geps.reply(self, ind.levelNull(), id)
                const ppLink = await geps.getProfilePicFromServer(sender.id)
                if (ppLink === undefined) {
                    var pepe = errorImg
                } else {
                    pepe = ppLink
                }
                const bege = card.getBg(sender.id, _bg)
                const requiredXp = 200 * (Math.pow(2, userLevel) - 1)
                const randomHexs = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`
                const randomHex = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`
                const namelevelnye = Math.floor(Math.random() * 10) + 20
                const rank = new canvas.Rank()
                    .setAvatar(pepe)
                    .setLevel(userLevel)
                    .setRank(1, `${role}`, true) // Set value to true if you want to display user's roles
                    .setCurrentXP(userXp)
                    .setRequiredXP(requiredXp)
                    .setProgressBar([randomHexs, randomHex], 'GRADIENT')
                    .setBackground('IMAGE', bege)
                    .setUsername(pushname)
                    .setDiscriminator(sender.id.substring(6, 10))
                rank.build()
                    .then(async (buffer) => {
                        canvas.write(buffer, `${namelevelnye}_card.png`)
                        await geps.sendFile(self, `${namelevelnye}_card.png`, `${namelevelnye}_card.png`, `-----[ *LEVEL INFO* ]-----\n\n- *Username* : ${pushname}\n- *Level* : ${userLevel}\n- *Rank* : ${role}\n- *Xp Info* : ${userXp}`, id)
                        fs.unlinkSync(`${namelevelnye}_card.png`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'cekbalance':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const userBalancenye = getLevelingXpBC(sender.id, userbalance)
                const cvbalance = convertBalanceToString(userBalancenye)
                if (cvbalance  === undefined) return await geps.reply(self, "Kamu belum memiki balance:(", id)
                const ppLinkss = await geps.getProfilePicFromServer(sender.id)
                if (ppLinkss === undefined) {
                    var pepe = errorImg
                } else {
                    var pepe = ppLinkss
                }
                geps.reply(self, `Kamu memiliki Balance ${cvbalance}`, id)
                break
                case prefix+'hilih':
                    const hiliw = quotedMsg.type == 'chat' ? quotedMsg.body : ''
                    const hili = hiliw.replace(/a|u|e|o/g, "i")
                    await geps.reply(self, hili, id)
                    break
                case prefix+'halah':
                    const halah = quotedMsg.type == 'chat' ? quotedMsg.body : ''
                    const hala = halah.replace(/i|u|e|o/g, "a")
                    await geps.reply(self, hala, id)
                    break
                case prefix+'heleh':
                    const heleh = quotedMsg.type == 'chat' ? quotedMsg.body : ''
                    const hele = heleh.replace(/i|u|a|o/g, "e")
                    await geps.reply(self, hele, id)
                    break
                case prefix+'holoh':
                    const holoh = quotedMsg.type == 'chat' ? quotedMsg.body : ''
                    const holo = holoh.replace(/i|u|e|a/g, "o")
                    await geps.reply(self, holo, id)
                    break
                case prefix+'huluh':
                    const huluh = quotedMsg.type == 'chat' ? quotedMsg.body : ''
                    const hulu = huluh.replace(/i|o|e|a/g, "u")
                    await geps.reply(self, hulu, id)
                    break
            case prefix+'leaderboard':
            case prefix+'toplevel':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                _level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
                let leaderboard = '-----[ *LEADERBOARD* ]----\n\n'
                let nom = 0
                try {
                    for (let i = 0; i < 10; i++) {
                        nom++
                        leaderboard += `[ ${nom} ] \nUSER : @${_level[i].id.replace('@c.us', '')}\nXP : ${_level[i].xp}\nLEVEL : ${_level[i].level}\n\n`
                    }
                    await geps.reply(self, leaderboard, id)
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, ind.minimalDb(), id)
                }
            break
            case prefix+'topbalance':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                userbalance.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
                //const cvtopbalance = convertBalanceToString(userbalance)
                let leaderboards = '-----[ *TOP BALANCE* ]----\n\n'
                let nomBC = 0
                try {
                    for (let i = 0; i < 10; i++) {
                        nomBC++
                        leaderboards += `[ ${nomBC} ] \nUSER : @${userbalance[i].id.replace('@c.us', '')}\nBALANCE : ${userbalance[i].xp} $\n\n`
                    }
                    await geps.sendTextWithMentions(self, leaderboards)
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, ind.minimalDb(), id)
                }
            break
            case prefix+'setbackground':
            case prefix+'setbg':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                    if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(self, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const linkImg = await uploadImages(mediaData, `${sender.id}_img`)
                    const levels = level.getLevelingLevel(sender.id, _level)
                    const xps = level.getLevelingXp(sender.id, _level)
                    //const setbegelah = body.slice(7)
                    if (levels === undefined && xps === undefined) return await geps.reply(self, `Maaf ${pushname} kamu belum memiliki level:(`, id)
                    card.replaceBg(sender.id, linkImg, _bg)
                    await geps.reply(self, 'Success set new background!', id)
                } else {
                    await geps.reply(self, `Salah!, Silahkan reply/kirim image dengan caption ${prefix}setbg`, id)
                }
                break
            // Downloader
            case prefix+'smule':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                try {
                const resp = await axios.get(`https://api.vhtear.com/getsmule?link=${q}&apikey=${config.vhtear}`)
                const { Type, title, url, image } = resp.data.result
                const sml3 = `*Music Ditemukan!*

➸ *Judul:* ${title}
➸ *Type:* ${Type}`

                geps.sendImage(self, image, `${title}.jpg`, sml3)
                geps.sendFileFromUrl(self, url, `${title}.mp3`, sml3, id)
                } catch (err) {
                 console.error(err.message)
                 await geps.sendFileFromUrl(self, errorImg, 'error.png', '💔️ Maaf, Music tidak ditemukan')
                 geps.sendText(ownerNumber, 'Smule Error : ' + err)
               }
              break
            case prefix+'igdl': // by: VideFrelan
            case prefix+'instadl':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                downloader.insta(q)
                    .then(async ({ result }) => {
                        for (let i = 0; i < result.post.length; i++) {
                            if (result.post[i].type === 'image') {
                                await geps.sendFileFromUrl(self, result.post[i].url, 'igpostdl.jpg', `*...:* *Instagram Downloader* *:...*\n\nUsername: ${result.owner}\nCaption: ${result.caption}`, id)
                            } else if (result.post[i].type === 'video') {
                                await geps.sendFileFromUrl(self, result.post[i].ur, 'igpostdl.mp4', `*...:* *Instagram Downloader* *:...*\n\nUsername: ${result.owner}\nCaption: ${result.caption}`, id)
                            }
                        }
                        console.log('Success sending Instagram media!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'facebook':
            case prefix+'fb':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                downloader.fb(q)
                .then(async ({ result }) => {
                            await geps.sendFileFromUrl(self, result.VideoUrl, 'videofb.mp4', '', id)
                            console.log(self, 'Success sending Facebook video!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'ytmp3': {
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                geps.reply(self, ind.wait(), id)
                const puppeteer = require('puppeteer')
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://ytmp3.cc/en13/", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#input", q);
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 5000));
                                const element = await page.$(
                                    'div[id="buttons"] > a'
                                );
                                const text = await (await element.getProperty("href")).jsonValue();
                                const ytmp3resp = await fetch(text);
                                const ytmp3buffer = await ytmp3resp.buffer();
                                const namefileytmp3 = Math.floor(Math.random() * 10) + 20
                                await fs.writeFile(`./temp/${namefileytmp3}_youtube.mp3`, ytmp3buffer)
                                await geps.sendPtt(self, `./temp/${namefileytmp3}_youtube.mp3`)
                                console.log('Success sending Ytmp3!')
                                fs.unlinkSync(`./temp/${namefileytmp3}_youtube.mp3`)
                                //geps.sendFileFromUrl(self, text, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(self, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(self, 'error', id)
                }
            }
                break
            case prefix+'indoxxi':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                try {
                    const dataplai = await axios.get(`https://api.vhtear.com/downloadfilm?judul=${q}&apikey=${config.vhtear}`)
                    const dataplay = dataplai.data.result
                    let indofx = `*Hasil Pencarian Film : ${indocx}*\n`
                    for (let i = 0; i < dataplay.data.length; i++) {
                        indofx += `\n═════════════════\n\n*Resolusi* : ${dataplay.data[i].resolusi}\n*Link* : ${dataplay.data[i].urlDownload}\nJudul akhir : ${dataplay.judul}`
                    }
                    await geps.reply(self, indofx, id)
                } catch (err) {
                    console.log(err)
                }
                break
            case prefix+'cineplex':
            case prefix +'cineplexlast':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                geps.reply(self, ind.wait(), id)
                try {
                    const dataplai = await axios.get(`https://docs-jojo.herokuapp.com/api/cineplex`)
                    const dataplay = dataplai.data
                    let cinexi = `*Coming Soon on Cineplex*\n`
                    for (let i = 0; i < dataplay.result.length; i++) {
                        cinexi += `\n═════════════════\n\n*Movie* : ${dataplay.result[i].title}\n*Pemeran* : ${dataplay.result[i].casts}\n*Sinopsis* : ${dataplay.result[i].sinopsis}\n*Rating* : ${dataplay.result[i].rating}\n*Genre* : ${dataplay.result[i].genre}\n`
                    }
                    await geps.sendFileFromUrl(self, dataplay.result[0].poster, `cine.jpg`, cinexi, id)
                } catch (err) {
                    console.log(err)
                }
                break
            case prefix+'togel':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                geps.reply(self, ind.wait(), id)
                try {
                    const dataplai = await axios.get(`https://api.vhtear.com/togel&apikey=${config.vhtear}`)
                    const dataplay = dataplai.data.result
                    let tomgel = `*Huzzzzz*\n`
                    for (let i = 0; i < dataplay.hasil.length; i++) {
                        tomgel += `\n═════════════════\n\n*Negara* : ${dataplay.hasil[i].Negara}\n*Result* : ${dataplay.hasil[i].Senin}\n*Result* : ${dataplay.hasil[i].Selasa}\n*Result* : ${dataplay.hasil[i].Rabu}\n*Result* : ${dataplay.hasil[i].Kamis}\n*Result* : ${dataplay.hasil[i].Jumat}\n*Result* : ${dataplay.hasil[i].Sabtu}\n*Result* : ${dataplay.hasil[i].Minggu}\n`
                    }
                    await geps.reply(self, tomgel, id)
                } catch (err) {
                    console.log(err)
                }
                break
            case prefix+'threats':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                geps.reply(self, ind.wait(), id)
                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    const getUrleee = await uploadImages(mediaData, false)
                    geps.sendFileFromUrl(self, `https://nekobot.xyz/api/imagegen?type=threats&url=${getUrleee}&raw=1`, `Nekonime.jpg`, 'Nehh...', id)
                    await limitAdd(serial)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const getUrleee = await uploadImages(mediaData, false)
                    geps.sendFileFromUrl(self, `https://nekobot.xyz/api/imagegen?type=threats&url=${getUrleee}&raw=1`, `Nekonime.jpg`, 'Nehh...', id)
                } else {
                    await geps.reply(self, 'Wrong Format!', id)
                }
                break
            case prefix+'snobg':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                geps.reply(self, ind.wait(), id)
                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    const getUrlno = await uploadImages(mediaData, false)
                    const nobgf = await axios.get(`https://api.vhtear.com/removebgwithurl?link=${getUrlno}&apikey=${config.vhtear}`)
                    const nobgff = nobgf.data.result.image
                    geps.sendStickerfromUrl(self, nobgff)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const getUrlno = await uploadImages(mediaData, false)
                    const nobgf = await axios.get(`https://api.vhtear.com/removebgwithurl?link=${getUrlno}&apikey=${config.vhtear}`)
                    const nobgff = nobgf.data.result.image
                    geps.sendStickerfromUrl(self, nobgff)
                } else {
                    await geps.reply(self, 'Wrong Format!', id)
                }
                break
            case prefix+'blurpify':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                geps.reply(self, ind.wait(), id)
                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    const getUrlb = await uploadImages(mediaData, false)
                    geps.sendFileFromUrl(self, `https://nekobot.xyz/api/imagegen?type=blurpify&image=${getUrlb}&raw=1`, `Nekonime.jpg`, 'Nehhhh', id)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const getUrlb = await uploadImages(mediaData, false)
                    geps.sendFileFromUrl(self, `https://nekobot.xyz/api/imagegen?type=blurpify&image=${getUrlb}&raw=1`, `Nekonime.jpg`, 'Nehhhh', id)
                } else {
                    await geps.reply(self, 'Wrong Format!', id)
                }
                break
            case prefix+'gay':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.wait(), id)

                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    canvas.Canvas.rainbow(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(self, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                    await limitAdd(serial)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    canvas.Canvas.rainbow(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(self, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                } else {
                    await geps.reply(self, 'Wrong Format!', id)
                }
                break
            case prefix+'deletedd':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.wait(), id)

                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    canvas.Canvas.delete(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(self, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                    await limitAdd(serial)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    canvas.Canvas.delete(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(self, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                } else {
                    await geps.reply(self, 'Wrong Format!', id)
                }
                break
            case prefix+'memeindo': //Chika chantexxzz
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                const memejoke = await axios.get(`https://api-zeks.harispoppy.com/api/memeindo?apikey=apivinz`)
                const memejokes = memejoke.data
                await limitAdd(serial)
                geps.sendImage(self, memejokes.result, 'thndr.jpg', '....', id)
                break
            case prefix+'cute':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.wait(), id)

                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    canvas.Canvas.beautiful(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(self, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                    await limitAdd(serial)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    canvas.Canvas.beautiful(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(self, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                } else {
                    await geps.reply(self, 'Wrong Format!', id)
                }
                break
            case prefix+'affect':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.wait(), id)

                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    canvas.Canvas.affect(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(self, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                    await limitAdd(serial)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    canvas.Canvas.affect(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(self, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                } else {
                    await geps.reply(self, 'Wrong Format!', id)
                }
                break
            case prefix+'jail':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.wait(), id)

                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    canvas.Canvas.jail(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(self, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                        })
                    await limitAdd(serial)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    canvas.Canvas.jail(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(self, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                        })
                } else {
                    await geps.reply(self, 'Wrong Format!', id)
                }
                break
            case prefix+'trash':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.wait(), id)

                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    canvas.Canvas.trash(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(self, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                    await limitAdd(serial)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    canvas.Canvas.trash(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(self, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                } else {
                    await geps.reply(self, 'Wrong Format!', id)
                }
                break
            case prefix+'captcha':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.wait(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    const getUrliee = await uploadImages(mediaData, false)
                    geps.sendFileFromUrl(self, `https://nekobot.xyz/api/imagegen?type=captcha&url=${getUrliee}&username=${q}&raw=1`, `Nekonime.jpg`, 'Noh mhank', id)
                    await limitAdd(serial)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const getUrliee = await uploadImages(mediaData, false)
                    geps.sendFileFromUrl(self, `https://nekobot.xyz/api/imagegen?type=captcha&url=${getUrliee}&username=${q}&raw=1`, `Nekonime.jpg`, 'Noh mhank', id)
                    await limitAdd(serial)
                } else {
                    await geps.reply(self, `Wrong Format!\nReply image dengan caption ${prefix}captcha [teks]\nContoh : ${prefix}captcha anjay`, id)
                }
                break
            case prefix+'deepfry':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.wait(), id)
                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    const getUrla = await uploadImages(mediaData, false)
                    geps.sendFileFromUrl(self, `https://nekobot.xyz/api/imagegen?type=deepfry&image=${getUrla}&raw=1`, `Nekonime.jpg`, 'Nehhhh', id)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const getUrla = await uploadImages(mediaData, false)
                    geps.sendFileFromUrl(self, `https://nekobot.xyz/api/imagegen?type=deepfry&image=${getUrla}&raw=1`, `Nekonime.jpg`, 'Nehhhh', id)
                } else {
                    await geps.reply(self, 'Wrong Format!', id)
                }
                break
            case prefix+'ytmp4':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                try {
                    const ytvh = await fetch(`http://api.vhtear.com/ytdl?link=${q}&apikey=${config.vhtear}`)
                    if (!ytvh.ok) throw new Error(`Error YTMP4 : ${ytvh.statusText}`)
                    const ytvh2 = await ytvh.json()
                    if (ytvh2.status == false) {
                        geps.reply(self, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                    } else {
                        if (Number(ytvh2.result.size.split(' MB')[0]) > 30.00) return geps.sendFileFromUrl(self, ytvh2.result.imgUrl, 'thumb.jpg', `*「 YOUTUBE MP4 」*\n\n• *Judul* : ${ytvh2.result.title}\n• *Filesize* : ${ytvh2.result.size}\n\n__Maaf, Durasi video melebihi 30 MB. Silahkan download video melalui link dibawah_.\n${ytvh2.result.UrlVideo}`, id)
                        const { title, UrlVideo, imgUrl, size, status, ext } = await ytvh2.result
                        console.log(`VHTEAR : ${ext}\n${size}\n${status}`)
                        geps.sendFileFromUrl(self, imgUrl, 'thumb.jpg', `*「 YOUTUBE MP4 」*\n\n• *Judul* : ${title}\n• *Filesize* : ${size}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`, id)
                        const namafilemp4 = Math.floor(Math.random() * 10) + 20
                        const ytmp4resp = await fetch(UrlVideo);
                        const ytmp4buffer = await ytmp4resp.buffer();
                        await fs.writeFile(`./temp/${namafilemp4}_youtube.mp4`, ytmp4buffer)
                        await geps.sendFile(self, `./temp/${namafilemp4}_youtube.mp4`)
                        console.log('Success sending Ytmp4!')
                        fs.unlinkSync(`./temp/${namafilemp4}_youtube.mp4`)
                        //await geps.sendFileFromUrl(self, UrlVideo, `${title}.mp4`, '', id)
                    }
                } catch (err) {
                    geps.sendText(ownerNumber, 'Error ytmp4 : ' + err)
                    geps.reply(self, 'Jangan download video yang sama dengan sebelumnya!', id)
                }
                break
            case prefix+'tiktokpic':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                try {
                    console.log(`Get profile pic for ${q}`)
                    const tkt = await axios.get(`https://docs-jojo.herokuapp.com/api/tiktokpp?user=${q}`)
                    if (tkt.data.error) return geps.reply(self, tkt.data.error, id)
                    await geps.sendFileFromUrl(self, tkt.data.result, 'tiktokpic.jpg', 'Ini :D', id)
                    console.log('Success sending TikTok profile pic!')
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, 'Error!', id)
                }
            break
            case prefix+'starmaker':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                try {
                const smkr2 = await axios.get(`https://api.vhtear.com/starmakerdl?link=${q}&apikey=${config.vhtear}`)
                const { image, url, title } = smkr2.data.result

                const pictk = await bent("buffer")(image)
                const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                geps.sendImage(self, base64, 'image.jpg', 'nihh mhank')
                geps.sendFileFromUrl(self, url, `${title}.mp4`, '', id)
                } catch (err) {
                 console.error(err.message)
                 await geps.sendFileFromUrl(self, errorImg, 'error.png', '💔️ Maaf, User tidak ditemukan')
                 geps.sendText(ownerNumber, 'Error Starmaker : '+ err)
               }
              break
            case prefix+'tiktoknowm': // by: VideFrelan
            case prefix+'tktnowm':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                downloader.tikNoWm(q)
                    .then(async (res) => {
                        fs.writeFileSync(`./temp/${sender.id}.mp4`, res)
                        await geps.sendFile(self, `./temp/${sender.id}.mp4`, 'nowm.mp4', '', id)
                        console.log('Success sending TikTok video with no WM!')
                        fs.unlinkSync(`./temp/${sender.id}.mp4`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'tiktok':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                downloader.tik(q)
                    .then(async ({ result })=> {
                        await geps.sendFileFromUrl(self, result.video, 'tiktok.mp4', '', id)
                        console.log('Success sending TikTok video!')
                    })
                    .catch(async (err) => {
                        console.log(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'twitter':
            case prefix+'twt':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                downloader.tweet(q)
                    .then(async (data) => {
                        if (data.type === 'video') {
                            const content = data.variants.filter((x) => x.content_type !== 'application/x-mpegURL').sort((a, b) => b.bitrate - a.bitrate)
                            const result = await misc.shortener(content[0].url)
                            console.log('Shortlink:', result)
                            await geps.sendFileFromUrl(self, content[0].url, 'video.mp4', `Link HD: ${result}`, id)
                                .then(() => console.log('Success sending Twitter media!'))
                                .catch(async (err) => {
                                    console.error(err)
                                    await geps.reply(self, 'Error!', id)
                                })
                        } else if (data.type === 'photo') {
                            for (let i = 0; i < data.variants.length; i++) {
                                await geps.sendFileFromUrl(self, data.variants[i], data.variants[i].split('/media/')[1], '', id)
                                .then(() => console.log('Success sending Twitter media!'))
                                .catch(async (err) => {
                                    console.error(err)
                                    await geps.reply(self, 'Error!', id)
                                })
                            }
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break

            // Misc
            case prefix+'afk':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(self, ind.groupOnly(), id)
                if (isAfkOn) return await geps.reply(self, ind.afkOnAlready(), id)
                const reason = q ? q : 'Nothing.'
                afk.addAfkUser(sender.id, time, reason, _afk)
                await geps.reply(self, ind.afkOn(pushname, reason), id)
            break
            case prefix+'subreddit':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                try {
                    const response1 = await axios.get('https://meme-api.herokuapp.com/gimme/' + q + '/');
                    const { postLink, title, subreddit, url, nsfw, spoiler } = response1.data
                    if (nsfw == true) {
                        if ((isGroupMsg) && (isNsfw)) {
                            await geps.reply(self, ind.wait(), id)
                            await geps.sendFileFromUrl(self, `${url}`, 'Reddit.jpg', `*Title*: ${title}` + '\n\n*Postlink*:' + `${postLink}`)
                        }
                    } else {
                        await geps.reply(self, ind.wait(), id)
                        await geps.sendFileFromUrl(self, `${url}`, 'Reddit.jpg', `*Title*: ${title}` + '\n\n*Postlink*:' + `${postLink}`)                    }
                } catch (err) {
                    await geps.sendImage(self, errorImg, 'oppss.jpg', '', id)
                }
                break
            case prefix+'wallanime':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                const walnime = ['https://wallpaperaccess.com/full/395986.jpg', 'https://wallpaperaccess.com/full/21628.jpg', 'https://wallpaperaccess.com/full/21622.jpg', 'https://wallpaperaccess.com/full/21612.jpg', 'https://wallpaperaccess.com/full/21611.png', 'https://wallpaperaccess.com/full/21597.jpg', 'https://cdn.nekos.life/wallpaper/QwGLg4oFkfY.png', 'https://wallpaperaccess.com/full/21591.jpg', 'https://cdn.nekos.life/wallpaper/bUzSjcYxZxQ.jpg', 'https://cdn.nekos.life/wallpaper/j49zxzaUcjQ.jpg', 'https://cdn.nekos.life/wallpaper/YLTH5KuvGX8.png', 'https://cdn.nekos.life/wallpaper/Xi6Edg133m8.jpg', 'https://cdn.nekos.life/wallpaper/qvahUaFIgUY.png', 'https://cdn.nekos.life/wallpaper/leC8q3u8BSk.jpg', 'https://cdn.nekos.life/wallpaper/tSUw8s04Zy0.jpg', 'https://cdn.nekos.life/wallpaper/sqsj3sS6EJE.png', 'https://cdn.nekos.life/wallpaper/HmjdX_s4PU4.png', 'https://cdn.nekos.life/wallpaper/Oe2lKgLqEXY.jpg', 'https://cdn.nekos.life/wallpaper/GTwbUYI-xTc.jpg', 'https://cdn.nekos.life/wallpaper/nn_nA8wTeP0.png', 'https://cdn.nekos.life/wallpaper/Q63o6v-UUa8.png', 'https://cdn.nekos.life/wallpaper/ZXLFm05K16Q.jpg', 'https://cdn.nekos.life/wallpaper/cwl_1tuUPuQ.png', 'https://cdn.nekos.life/wallpaper/wWhtfdbfAgM.jpg', 'https://cdn.nekos.life/wallpaper/3pj0Xy84cPg.jpg', 'https://cdn.nekos.life/wallpaper/sBoo8_j3fkI.jpg', 'https://cdn.nekos.life/wallpaper/gCUl_TVizsY.png', 'https://cdn.nekos.life/wallpaper/LmTi1k9REW8.jpg', 'https://cdn.nekos.life/wallpaper/sbq_4WW2PUM.jpg', 'https://cdn.nekos.life/wallpaper/QOSUXEbzDQA.png', 'https://cdn.nekos.life/wallpaper/khaqGIHsiqk.jpg', 'https://cdn.nekos.life/wallpaper/iFtEXugqQgA.png', 'https://cdn.nekos.life/wallpaper/deFKIDdRe1I.jpg', 'https://cdn.nekos.life/wallpaper/OHZVtvDm0gk.jpg', 'https://cdn.nekos.life/wallpaper/YZYa00Hp2mk.jpg', 'https://cdn.nekos.life/wallpaper/R8nPIKQKo9g.png', 'https://cdn.nekos.life/wallpaper/_brn3qpRBEE.jpg', 'https://cdn.nekos.life/wallpaper/ADTEQdaHhFI.png', 'https://cdn.nekos.life/wallpaper/MGvWl6om-Fw.jpg', 'https://cdn.nekos.life/wallpaper/YGmpjZW3AoQ.jpg', 'https://cdn.nekos.life/wallpaper/hNCgoY-mQPI.jpg', 'https://cdn.nekos.life/wallpaper/3db40hylKs8.png', 'https://cdn.nekos.life/wallpaper/iQ2FSo5nCF8.jpg', 'https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png', 'https://cdn.nekos.life/wallpaper/CmEmn79xnZU.jpg', 'https://cdn.nekos.life/wallpaper/MAL18nB-yBI.jpg', 'https://cdn.nekos.life/wallpaper/FUuBi2xODuI.jpg', 'https://cdn.nekos.life/wallpaper/ez-vNNuk6Ck.jpg', 'https://cdn.nekos.life/wallpaper/K4-z0Bc0Vpc.jpg', 'https://cdn.nekos.life/wallpaper/Y4JMbswrNg8.jpg', 'https://cdn.nekos.life/wallpaper/ffbPXIxt4-0.png', 'https://cdn.nekos.life/wallpaper/x63h_W8KFL8.jpg', 'https://cdn.nekos.life/wallpaper/lktzjDRhWyg.jpg', 'https://cdn.nekos.life/wallpaper/j7oQtvRZBOI.jpg', 'https://cdn.nekos.life/wallpaper/MQQEAD7TUpQ.png', 'https://cdn.nekos.life/wallpaper/lEG1-Eeva6Y.png', 'https://cdn.nekos.life/wallpaper/Loh5wf0O5Aw.png', 'https://cdn.nekos.life/wallpaper/yO6ioREenLA.png', 'https://cdn.nekos.life/wallpaper/4vKWTVgMNDc.jpg', 'https://cdn.nekos.life/wallpaper/Yk22OErU8eg.png', 'https://cdn.nekos.life/wallpaper/Y5uf1hsnufE.png', 'https://cdn.nekos.life/wallpaper/xAmBpMUd2Zw.jpg', 'https://cdn.nekos.life/wallpaper/f_RWFoWciRE.jpg', 'https://cdn.nekos.life/wallpaper/Y9qjP2Y__PA.jpg', 'https://cdn.nekos.life/wallpaper/eqEzgohpPwc.jpg', 'https://cdn.nekos.life/wallpaper/s1MBos_ZGWo.jpg', 'https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png', 'https://cdn.nekos.life/wallpaper/32EAswpy3M8.png', 'https://cdn.nekos.life/wallpaper/Z6eJZf5xhcE.png', 'https://cdn.nekos.life/wallpaper/xdiSF731IFY.jpg', 'https://cdn.nekos.life/wallpaper/Y9r9trNYadY.png', 'https://cdn.nekos.life/wallpaper/8bH8CXn-sOg.jpg', 'https://cdn.nekos.life/wallpaper/a02DmIFzRBE.png', 'https://cdn.nekos.life/wallpaper/MnrbXcPa7Oo.png', 'https://cdn.nekos.life/wallpaper/s1Tc9xnugDk.jpg', 'https://cdn.nekos.life/wallpaper/zRqEx2gnfmg.jpg', 'https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png', 'https://cdn.nekos.life/wallpaper/0ECCRW9soHM.jpg', 'https://cdn.nekos.life/wallpaper/kAw8QHl_wbM.jpg', 'https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg', 'https://cdn.nekos.life/wallpaper/WVEdi9Ng8UE.png', 'https://cdn.nekos.life/wallpaper/IRu29rNgcYU.png', 'https://cdn.nekos.life/wallpaper/LgIJ_1AL3rM.jpg', 'https://cdn.nekos.life/wallpaper/DVD5_fLJEZA.jpg', 'https://cdn.nekos.life/wallpaper/siqOQ7k8qqk.jpg', 'https://cdn.nekos.life/wallpaper/CXNX_15eGEQ.png', 'https://cdn.nekos.life/wallpaper/s62tGjOTHnk.jpg', 'https://cdn.nekos.life/wallpaper/tmQ5ce6EfJE.png', 'https://cdn.nekos.life/wallpaper/Zju7qlBMcQ4.jpg', 'https://cdn.nekos.life/wallpaper/CPOc_bMAh2Q.png', 'https://cdn.nekos.life/wallpaper/Ew57S1KtqsY.jpg', 'https://cdn.nekos.life/wallpaper/hVpFbYJmZZc.jpg', 'https://cdn.nekos.life/wallpaper/sb9_J28pftY.jpg', 'https://cdn.nekos.life/wallpaper/JDoIi_IOB04.jpg', 'https://cdn.nekos.life/wallpaper/rG76AaUZXzk.jpg', 'https://cdn.nekos.life/wallpaper/9ru2luBo360.png', 'https://cdn.nekos.life/wallpaper/ghCgiWFxGwY.png', 'https://cdn.nekos.life/wallpaper/OSR-i-Rh7ZY.png', 'https://cdn.nekos.life/wallpaper/65VgtPyweCc.jpg', 'https://cdn.nekos.life/wallpaper/3vn-0FkNSbM.jpg', 'https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg', 'https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg', 'https://cdn.nekos.life/wallpaper/3VjNKqEPp58.jpg', 'https://cdn.nekos.life/wallpaper/NoG4lKnk6Sc.jpg', 'https://cdn.nekos.life/wallpaper/xiTxgRMA_IA.jpg', 'https://cdn.nekos.life/wallpaper/yq1ZswdOGpg.png', 'https://cdn.nekos.life/wallpaper/4SUxw4M3UMA.png', 'https://cdn.nekos.life/wallpaper/cUPnQOHNLg0.jpg', 'https://cdn.nekos.life/wallpaper/zczjuLWRisA.jpg', 'https://cdn.nekos.life/wallpaper/TcxvU_diaC0.png', 'https://cdn.nekos.life/wallpaper/7qqWhEF_uoY.jpg', 'https://cdn.nekos.life/wallpaper/J4t_7DvoUZw.jpg', 'https://cdn.nekos.life/wallpaper/xQ1Pg5D6J4U.jpg', 'https://cdn.nekos.life/wallpaper/aIMK5Ir4xho.jpg', 'https://cdn.nekos.life/wallpaper/6gneEXrNAWU.jpg', 'https://cdn.nekos.life/wallpaper/PSvNdoISWF8.jpg', 'https://cdn.nekos.life/wallpaper/SjgF2-iOmV8.jpg', 'https://cdn.nekos.life/wallpaper/vU54ikOVY98.jpg', 'https://cdn.nekos.life/wallpaper/QjnfRwkRU-Q.jpg', 'https://cdn.nekos.life/wallpaper/uSKqzz6ZdXc.png', 'https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg', 'https://cdn.nekos.life/wallpaper/N1l8SCMxamE.jpg', 'https://cdn.nekos.life/wallpaper/n2cBaTo-J50.png', 'https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg', 'https://cdn.nekos.life/wallpaper/7bwxy3elI7o.png', 'https://cdn.nekos.life/wallpaper/7VW4HwF6LcM.jpg', 'https://cdn.nekos.life/wallpaper/YtrPAWul1Ug.png', 'https://cdn.nekos.life/wallpaper/1p4_Mmq95Ro.jpg', 'https://cdn.nekos.life/wallpaper/EY5qz5iebJw.png', 'https://cdn.nekos.life/wallpaper/aVDS6iEAIfw.jpg', 'https://cdn.nekos.life/wallpaper/veg_xpHQfjE.jpg', 'https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png', 'https://cdn.nekos.life/wallpaper/Xa_GtsKsy-s.png', 'https://cdn.nekos.life/wallpaper/6Bx8R6D75eM.png', 'https://cdn.nekos.life/wallpaper/zXOGXH_b8VY.png', 'https://cdn.nekos.life/wallpaper/VQcviMxoQ00.png', 'https://cdn.nekos.life/wallpaper/CJnRl-PKWe8.png', 'https://cdn.nekos.life/wallpaper/zEWYfFL_Ero.png', 'https://cdn.nekos.life/wallpaper/_C9Uc5MPaz4.png', 'https://cdn.nekos.life/wallpaper/zskxNqNXyG0.jpg', 'https://cdn.nekos.life/wallpaper/g7w14PjzzcQ.jpg', 'https://cdn.nekos.life/wallpaper/KavYXR_GRB4.jpg', 'https://cdn.nekos.life/wallpaper/Z_r9WItzJBc.jpg', 'https://cdn.nekos.life/wallpaper/Qps-0JD6834.jpg', 'https://cdn.nekos.life/wallpaper/Ri3CiJIJ6M8.png', 'https://cdn.nekos.life/wallpaper/ArGYIpJwehY.jpg', 'https://cdn.nekos.life/wallpaper/uqYKeYM5h8w.jpg', 'https://cdn.nekos.life/wallpaper/h9cahfuKsRg.jpg', 'https://cdn.nekos.life/wallpaper/iNPWKO8d2a4.jpg', 'https://cdn.nekos.life/wallpaper/j2KoFVhsNig.jpg', 'https://cdn.nekos.life/wallpaper/z5Nc-aS6QJ4.jpg', 'https://cdn.nekos.life/wallpaper/VUFoK8l1qs0.png', 'https://cdn.nekos.life/wallpaper/rQ8eYh5mXN8.png', 'https://cdn.nekos.life/wallpaper/D3NxNISDavQ.png', 'https://cdn.nekos.life/wallpaper/Z_CiozIenrU.jpg', 'https://cdn.nekos.life/wallpaper/np8rpfZflWE.jpg', 'https://cdn.nekos.life/wallpaper/ED-fgS09gik.jpg', 'https://cdn.nekos.life/wallpaper/AB0Cwfs1X2w.jpg', 'https://cdn.nekos.life/wallpaper/DZBcYfHouiI.jpg', 'https://cdn.nekos.life/wallpaper/lC7pB-GRAcQ.png', 'https://cdn.nekos.life/wallpaper/zrI-sBSt2zE.png', 'https://cdn.nekos.life/wallpaper/_RJhylwaCLk.jpg', 'https://cdn.nekos.life/wallpaper/6km5m_GGIuw.png', 'https://cdn.nekos.life/wallpaper/3db40hylKs8.png', 'https://cdn.nekos.life/wallpaper/oggceF06ONQ.jpg', 'https://cdn.nekos.life/wallpaper/ELdH2W5pQGo.jpg', 'https://cdn.nekos.life/wallpaper/Zun_n5pTMRE.png', 'https://cdn.nekos.life/wallpaper/VqhFKG5U15c.png', 'https://cdn.nekos.life/wallpaper/NsMoiW8JZ60.jpg', 'https://cdn.nekos.life/wallpaper/XE4iXbw__Us.png', 'https://cdn.nekos.life/wallpaper/a9yXhS2zbhU.jpg', 'https://cdn.nekos.life/wallpaper/jjnd31_3Ic8.jpg', 'https://cdn.nekos.life/wallpaper/Nxanxa-xO3s.png', 'https://cdn.nekos.life/wallpaper/dBHlPcbuDc4.jpg', 'https://cdn.nekos.life/wallpaper/6wUZIavGVQU.jpg', 'https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg', 'https://cdn.nekos.life/wallpaper/H9OUpIrF4gU.jpg', 'https://cdn.nekos.life/wallpaper/xlRdH3fBMz4.jpg', 'https://cdn.nekos.life/wallpaper/7IzUIeaae9o.jpg', 'https://cdn.nekos.life/wallpaper/FZCVL6PyWq0.jpg', 'https://cdn.nekos.life/wallpaper/5dG-HH6d0yw.png', 'https://cdn.nekos.life/wallpaper/ddxyA37HiwE.png', 'https://cdn.nekos.life/wallpaper/I0oj_jdCD4k.jpg', 'https://cdn.nekos.life/wallpaper/ABchTV97_Ts.png', 'https://cdn.nekos.life/wallpaper/58C37kkq39Y.png', 'https://cdn.nekos.life/wallpaper/HMS5mK7WSGA.jpg', 'https://cdn.nekos.life/wallpaper/1O3Yul9ojS8.jpg', 'https://cdn.nekos.life/wallpaper/hdZI1XsYWYY.jpg', 'https://cdn.nekos.life/wallpaper/h8pAJJnBXZo.png', 'https://cdn.nekos.life/wallpaper/apO9K9JIUp8.jpg', 'https://cdn.nekos.life/wallpaper/p8f8IY_2mwg.jpg', 'https://cdn.nekos.life/wallpaper/HY1WIB2r_cE.jpg', 'https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg', 'https://cdn.nekos.life/wallpaper/jzN74LcnwE8.png', 'https://cdn.nekos.life/wallpaper/IeAXo5nJhjw.jpg', 'https://cdn.nekos.life/wallpaper/7lgPyU5fuLY.jpg', 'https://cdn.nekos.life/wallpaper/f8SkRWzXVxk.png', 'https://cdn.nekos.life/wallpaper/ZmDTpGGeMR8.jpg', 'https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg', 'https://cdn.nekos.life/wallpaper/ZhP-f8Icmjs.jpg', 'https://cdn.nekos.life/wallpaper/7FyUHX3fE2o.jpg', 'https://cdn.nekos.life/wallpaper/CZoSLK-5ng8.png', 'https://cdn.nekos.life/wallpaper/pSNDyxP8l3c.png', 'https://cdn.nekos.life/wallpaper/AhYGHF6Fpck.jpg', 'https://cdn.nekos.life/wallpaper/ic6xRRptRes.jpg', 'https://cdn.nekos.life/wallpaper/89MQq6KaggI.png', 'https://cdn.nekos.life/wallpaper/y1DlFeHHTEE.png']
                let walnimek = walnime[Math.floor(Math.random() * walnime.length)]
                geps.reply(self, ind.wait(), id)
                geps.sendFileFromUrl(self, walnimek, 'Nimek.jpg', '*Wallanime!*', id)
                break
            /*case prefix+'meme':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const response = await axios.get('https://meme-api.herokuapp.com/gimme/wholesomeanimemes')
                const { postlink, title, subreddit, url, nsfw, spoiler } = response.data
                geps.sendFileFromUrl(self, `${url}`, 'meme.jpg', `${title}`)
                break*/
            case prefix+'lyric':
            case prefix+'lirik':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                await geps.reply(self, ind.wait(), id)
                misc.lirik(q)
                    .then(async ({ result }) => {
                        if (result.code !== 200) return await geps.reply(self, 'Not found.', id)
                        await geps.reply(self, result.result, id)
                        console.log('Success sending lyric!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'shorttiny':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                const surl = await axios.get(`https://tobz-api.herokuapp.com/api/tinyurl?url=${q}&apikey=BotWeA`)
                const surll = surl.data
                if (surll.error) return geps.reply(self, surll.error, id)
                const surl2 = `Link : ${q}\nShort URL : ${surll.result}`
                geps.reply(self, surl2, id)
                break
            case prefix+'shortbitly':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                const surl3 = await axios.get(`https://tobz-api.herokuapp.com/api/bitly?url=${q}&apikey=BotWeA`)
                const surll2 = surl3.data
                if (surll2.error) return geps.reply(self, surll2.error, id)
                const surl22 = `Link : ${q}\nShort URL : ${surll2.result}`
                geps.reply(self, surl22, id)
                break
            case prefix+'maps':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                try {
                    const mapz2 = await axios.get(`https://mnazria.herokuapp.com/api/maps?search=${q}`)
                    const { gambar } = mapz2.data
                    const pictk = await bent("buffer")(gambar)
                    const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                    geps.sendImage(self, base64, 'maps.jpg', `*Hasil Maps : ${q}*`)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(self, errorImg, 'error.png', '💔️ Maaf, User tidak ditemukan')
                    geps.sendText(ownerNumber, 'Error Maps : ' + err)
                }
                break
            case prefix+'qrcode':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.sendFileFromUrl(self, `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${q}`, 'gambar.png', 'Nihh bree...', id)
                break
            case prefix+'shortlink':
            case prefix+'shorturl':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isUrl(url)) return await geps.reply(self, ind.wrongFormat(), id)
                const urlShort = await misc.shortener(url)
                await geps.reply(self, ind.wait(), id)
                await geps.reply(self, urlShort, id)
                console.log('Success!')
            break
            case prefix+'wikipedia':
            case prefix+'wiki':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                await geps.reply(self, ind.wait(), id)
                misc.wiki(q)
                    .then(async ({ result, status }) => {
                        if (status !== 200) {
                            return await geps.reply(self, 'Not found.', id)
                        } else {
                            await geps.reply(self, result, id)
                            console.log('Success sending Wiki!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'news':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                geps.reply(self, ind.wait(), id)
                try {
                    const response2 = await fetch(`https://api.vhtear.com/beritaterbaru&apikey=${config.vhtear}`)
                    if (!response2.ok) throw new Error(`unexpected response ${response2.statusText}`)
                    const jsonber = await response2.json()
                    const { data } = await jsonber.result
                    let xixixi = `*「 BERITA TERKINI 」*\n\n`
                    for (let i = 0; i < data.length; i++) {
                        xixixi += `\n─────────────────\n\n*Source* : ${data[i].url}\n*Penulis* : ${data[i].author}\n*Judul* : ${data[i].title}\n*Deskripsi* : ${data[i].description}\n*Dipublikasi* : ${data[i].publishedAt}\n*Konten* : ${data[i].content}\n`
                    }
                    await geps.sendFileFromUrl(self, data[0].urlToImage, 'thumbserc.jpg', xixixi, id)
                } catch (err) {
                        console.log(err)
                        await geps.sendFileFromUrl(self, errorImg, 'error.jpg', '💔️ Maaf, Berita tidak ditemukan')
                        geps.sendText(ownerNumber, 'Berita Error : ' + err)
                }
                break
            case prefix+'instastory': //By: VideFrelan
            case prefix+'igstory':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                misc.its(q)
                    .then(async ({ result }) => {
                        for (let i = 0; i < result.story.itemlist.length; i++) {
                            const { urlDownload } = result.story.itemlist[i]
                            await geps.sendFileFromUrl(self, urlDownload, '', 'Nehhh...', id)
                            console.log('Success sending IG Story!')
                        }
                    })
            break
            case prefix+'google':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                geps.reply(self, ind.wait(), id)
                if (q == undefined || q == ' ') return geps.reply(self, `*Hasil Pencarian : ${q}* tidak ditemukan`, id)
                google({ 'query': q }).then(results => {
                    let vars = `_*Hasil Pencarian : ${q}*_\n`
                    for (let i = 0; i < results.length; i++) {
                        vars += `\n═════════════════\n\n*Judul* : ${results[i].title}\n\n*Deskripsi* : ${results[i].snippet}\n\n*Link* : ${results[i].link}\n\n`
                    }
                    geps.reply(self, vars, id);
                }).catch(e => {
                    console.log(e)
                    geps.sendText(ownerNumber, 'Google Error : ' + e);
                })
                break
            case prefix+'kbbi':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                await geps.reply(self, ind.wait(), id)
                misc.kbbi(q)
                    .then(async ({ result }) => {
                        await geps.reply(self, result.hasil, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'linesticker':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                const getline = await axios.get(`http://enznoire.herokuapp.com/line?url=${q}`)
                if (getline.status === false) {
                    return geps.relpy(self, 'Upss maaf terjadi kesalahan [ERROR] mungkin linknya tidak valid')
                } else {
                    geps.reply(self, ind.wait(), id)
                    await geps.sendStickerfromUrl(self, getline.data.thumb)
                    for (let i = 0; i < getline.data.sticker.length; i++) {
                    await geps.sendStickerfromUrl(self, `${getline.data.sticker[i]}`)
                    }
                }
                break
            case prefix+'newsline':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                misc.linesticker()
                    .then(async ({ result }) => {
                        let lines = '-----[ *NEW STICKER* ]-----'
                        for (let i = 0; i < result.hasil.length; i++) {
                            lines +=  `\n\n➸ *Title*: ${result.hasil[i].title}\n➸ *URL*: ${result.hasil[i].uri}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(self, lines, id)
                        console.log('Success sending sticker Line!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'jadwalsholat':
            case prefix+'jadwalsolat':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                await geps.reply(self, ind.wait(), id)
                misc.jadwalSholat(q)
                    .then((data) => {
                        data.map(async ({isya, subuh, dzuhur, ashar, maghrib, terbit}) => {
                            const x = subuh.split(':')
                            const y = terbit.split(':')
                            const xy = x[0] - y[0]
                            const yx = x[1] - y[1]
                            const perbandingan = `${xy < 0 ? Math.abs(xy) : xy} jam ${yx < 0 ? Math.abs(yx) : yx} menit`
                            const msg = `Jadwal sholat untuk ${q} dan sekitarnya ( *${tanggal}* )\n\nDzuhur: ${dzuhur}\nAshar: ${ashar}\nMaghrib: ${maghrib}\nIsya: ${isya}\nSubuh: ${subuh}\n\nDiperkirakan matahari akan terbit pada pukul ${terbit} dengan jeda dari subuh sekitar ${perbandingan}`
                            await geps.reply(self, msg, id)
                            console.log('Success sending jadwal sholat!')
                        })
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'gempa':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                misc.bmkg()
                    .then(async ({ kedalaman, koordinat, lokasi, magnitude, map, potensi, waktu }) => {
                        const teksInfo = `${lokasi}\n\nKoordinat: ${koordinat}\nKedalaman: ${kedalaman}\nMagnitudo: ${magnitude} SR\nPotensi: ${potensi}\n\n${waktu}`
                        await geps.sendFileFromUrl(self, map, 'gempa.jpg', teksInfo, id)
                        console.log('Success sending info!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'talk':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                geps.reply(self, q, id)
                break
            case prefix+'addsay':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                const says = body.slice(8)
                say.push(says)
                fs.writeFileSync('./database/bot/say.json', JSON.stringify(say))
                geps.reply(self, `Add ${says} sukses!\nUntuk melihat list ketik ${prefix}saylist`, id)
                break
            case prefix+'delsay':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                let delsayso = say.indexOf(q)
                say.splice(delsayso, 1)
                fs.writeFileSync('./database/bot/say.json', JSON.stringify(say))
                geps.reply(self, `Delete ${q} sukses!`, id)
                break
            case prefix+'say':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const manggildlu = JSON.parse(fs.readFileSync('./database/bot/say.json'))
                const ngemathbre = manggildlu[Math.floor(Math.random() * (manggildlu.length))]
                geps.reply(self, `${ngemathbre}`, id)
                break
            case prefix+'saylist':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                let saylisto = `Random say list\nTotal : ${say.length}\n`
                for (let i of say) {
                    saylisto += `☛ ${i}\n`
                }
                await geps.reply(self, saylisto, id)
                break
            /*case prefix+'igstalk':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                misc.igStalk(q)
                    .then(async ({ graphql }) => {
                        if (graphql === undefined) {
                            await geps.reply(self, 'Not found.', id)
                        } else {
                            const { biography, edge_followed_by, edge_follow, full_name, is_private, is_verified, profile_pic_url_hd, username, edge_owner_to_timeline_media } = graphql.user
                            const text = `*「 IG STALK 」*\n\n➸ *Username*: ${username}\n➸ *Bio*: ${biography}\n➸ *Full name*: ${full_name}\n➸ *Followers*: ${edge_followed_by.count}\n➸ *Followings*: ${edge_follow.count}\n➸ *Private*: ${is_private ? 'Yes' : 'No'}\n➸ *Verified*: ${is_verified ? 'Yes' : 'No'}\n➸ *Total posts*: ${edge_owner_to_timeline_media.count}`
                            await geps.sendFileFromUrl(self, profile_pic_url_hd, 'insta.jpg', text, id)
                            console.log('Success sending IG stalk!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break*/
            case prefix+'igstalk':
                 //if (!isGroupMsg) return geps.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            if (isLimit(serial)) return geps.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)

            await limitAdd(serial)
            if (args.length === 1)  return geps.reply(self, 'Kirim perintah *@igstalk @username*\nContoh *@igstalk duar_amjay*', id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const istalk = await slicedArgs.join(' ')
            console.log(istalk)
            try {
            const istalk2 = await axios.get('https://api.vhtear.com/igprofile?query=' + istalk + '&apikey=' + vhtearkey)
            const { biography, follower, follow, post_count, full_name, username, picture, is_private } = istalk2.data.result
            const istalk3 = `*User Ditemukan!*
➸ *Username:* ${username}
➸ *Nama:* ${full_name}
➸ *Bio:* ${biography}
➸ *Mengikuti:* ${follow}
➸ *Pengikut:* ${follower}
➸ *Jumlah Postingan:* ${post_count}`

            const pictk = await bent("buffer")(picture)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            geps.sendImage(self, base64, username, istalk3)
            } catch (err) {
            console.error(err.message)
            await geps.sendFileFromUrl(self, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
            geps.sendText(ownerNumber, 'Igstalk Error : ' + err)
            }
            break
            case prefix+'gsmarena':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                try {
                    misc.gsmarena(q)
                        .then(async ({ result }) => {
                            await geps.sendFileFromUrl(self, result.image, `${result.title}.jpg`, ind.gsm(result), id)
                            console.log('Success sending phone info!')
                        })
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, 'Error!', id)
                }
            break
            case prefix+'resepmakanan':
            case prefix+'resep':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                try {
                    misc.resep(q)
                        .then(async ({ result }) => {
                            await geps.sendFileFromUrl(self, result.image, `${result.title}.jpg`, ind.receipt(result), id)
                            console.log('Success sending food receipt!')
                        })
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, 'Error!', id)
                }
            break
            case prefix+'findsticker':
            case prefix+'findstiker':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                try {
                    misc.sticker(q)
                        .then(async ({ result }) => {
                            if (result.response !== 200) return await geps.reply(self, 'Not found!', id)
                            for (let i = 0; i < result.data.length; i++) {
                                await geps.sendStickerfromUrl(self, result.data[i])
                            }
                            console.log('Success sending sticker!')
                        })
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, `Error!\n\n${err}`, id)
                }
            break
            case prefix+'movie':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                misc.movie(q)
                    .then(async ({ result }) => {
                        let movies = `Result for: *${result.judul}*`
                        for (let i = 0; i < result.data.length; i++) {
                            movies +=  `\n\n➸ *Quality:* : ${result.data[i].resolusi}\n➸ *URL*: ${result.data[i].urlDownload}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(self, movies, id)
                        console.log('Success sending movie result!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'cekongkir': // By: VideFrelan
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                const kurir = q.substring(0, q.indexOf('|') - 1)
                const askot = q.substring(q.indexOf('|') + 2, q.lastIndexOf('|') - 1)
                const tukot = q.substring(q.lastIndexOf('|') + 2)
                misc.ongkir(kurir, askot, tukot)
                    .then(async ({ result }) => {
                        let onkir = `-----[ *${result.title}* ]-----`
                        for (let i = 0; i < result.data.length; i++) {
                            onkir +=  `\n\n➸ *Layanan*: ${result.data[i].layanan}\n➸ *Estimasi*: ${result.data[i].etd}\n➸ *Tarif*: ${result.data[i].tarif}\n➸ *Info*: ${result.informasi}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(self, onkir, id)
                        console.log('Success sending ongkir info!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
                break
            case prefix + 'milik':
                geps.reply(self, '*I C H I  X  A I S H A*', 'true_6285755495437@c.us_9QGSMMRAIMCUKW8CFMMN')
                break
            case prefix + 'wa':
                await geps.sendText('0@c.us', 'Assalamualaikum warahmatullahi wabarakatuh')
                break
            case prefix + 'ttp':
            case prefix+'tosticker':
                        try
                    {
                        const string = body.toLowerCase().includes('#ttp') ? body.slice(5) : body.slice(5)
                        if(args)
                        {
                            if(quotedMsgObj == null)
                            {
                                const gasMake = await getStickerMaker(string)
                                if(gasMake.status == true)
                                {
                                    try{
                                        await geps.sendImageAsSticker(self, gasMake.base64)
                                    }catch(err) {
                                        await geps.reply(self, 'Gagal membuat.', id)
                                    }
                                }else{
                                    await geps.reply(self, gasMake.reason, id)
                                }
                            }else if(quotedMsgObj != null){
                                const gasMake = await getStickerMaker(quotedMsgObj.body)
                                if(gasMake.status == true)
                                {
                                    try{
                                        await geps.sendImageAsSticker(self, gasMake.base64)
                                    }catch(err) {
                                        await geps.reply(self, 'Gagal membuat.', id)
                                    }
                                }else{
                                    await geps.reply(self, gasMake.reason, id)
                                }
                            }

                        }else{
                            await geps.reply(self, 'Tidak boleh kosong.', id)
                        }
                    }catch(error)
                    {
                        console.log(error)
                    }
                break
            case prefix+'distance':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                const kotaAsal = q.substring(0, q.indexOf('|') - 1)
                const kotaTujuan = q.substring(q.lastIndexOf('|') + 2)
                misc.distance(kotaAsal, kotaTujuan)
                    .then(async ({ result }) => {
                        if (result.response !== 200) {
                            await geps.reply(self, 'Error!', id)
                        } else {
                            await geps.reply(self, result.data, id)
                            console.log('Success sending distance info!')
                        }
                    })
            break
            case prefix+`addimage`:
                let imageom = body.slice(10)
                if (!imageom) return geps.reply(self, `teksnya mana?\nContoh : ${prefix}addimage punya AISHA`, id)
                if (quotedMsg && quotedMsg.type == 'image'){
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const filename = `./database/temp/image/${imageom}.jpeg`
                    await fs.writeFileSync(filename, mediaData)
                    imagelist.push(imageom)
                    fs.writeFileSync('./database/bot/image.json', JSON.stringify(imagelist))
                    await geps.reply(self, `Image dengan nama ${imageom} berhasil disimpan!\nSilahkan ketik ${prefix}imagelist untuk melihat list image`, id)
                }else if(quotedMsg && quotedMsg.type == 'image'){
                    const mediaData = await decryptMedia(message, uaOverride)
                    const filename = `./database/temp/image/${imageom}.jpeg`
                    await fs.writeFileSync(filename, mediaData)
                    imagelist.push(imageom)
                    fs.writeFileSync('./database/bot/image.json', JSON.stringify(imagelist))
                    await geps.reply(self, `Image dengan nama ${imageom} berhasil disimpan!\nSilahkan ketik ${prefix}imagelist untuk melihat list image`, id)
                }else{
                    await geps.reply(self, 'Error! Silahkan coba kembali...', id)
                }
                break
                case prefix+`getimage`:
                    try {
                    const pftpt = body.slice(10)
                    await geps.sendImage(self, `./database/temp/image/${pftpt}.jpeg`, id)
                } catch (err) {
                    //console.error(err)
                    await geps.reply(self, `Pastikan nama image ada di ${prefix}imagelist`, id)
                }
                break
                case prefix+'imagelist':
                case prefix+'imglist':
                case prefix+'listimage':
                case prefix+'listimg':
                    let imagebos = `┌─「 *LIST IMAGE RANDOM* 」\n│\n├ Total : ${imagelist.length}\n`
                    for (let i of imagelist) {
                    imagebos += `├ `
                    imagebos += `${i}\n`
                    }
                    imagebos += '│\n└─「 *SELF BOT* 」'
                    await geps.sendText(self, imagebos)
                  break
                  case prefix+`getvn`:
                    try{
                    const namfil = body.slice(7)
                    await geps.sendPtt(self, `./database/temp/vn/${namfil}.mp3`, id)
                } catch (err) {
                    //console.error(err)
                    await geps.reply(self, `Pastikan nama vn ada di ${prefix}vnlist`, id)
                }
                    break
                case prefix+`addvn`:
                    let nmfil = body.slice(7)
                    if (!nmfil) return geps.reply(self, `teksnya mana?\nContoh : ${prefix}setvn desah`, id)
                    if (isQuotedAudio){
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        const filename = `./database/temp/vn/${nmfil}.mp3`
                        await fs.writeFileSync(filename, mediaData)
                        vnlist.push(nmfil)
                        fs.writeFileSync('./database/bot/vn.json', JSON.stringify(vnlist))
                        await geps.reply(self, `Vn dengan nama ${nmfil} berhasil disimpan!\nSilahkan ketik ${prefix}vnlist untuk melihat list vn`, id)
                    }else if(isMedia && type === 'audio'){
                        const mediaData = await decryptMedia(message, uaOverride)
                        const filename = `./database/temp/vn/${nmfil}.mp3`
                        await fs.writeFileSync(filename, mediaData)
                        vnlist.push(nmfil)
                        fs.writeFileSync('./database/bot/vn.json', JSON.stringify(vnlist))
                        await geps.reply(self, `Vn dengan nama ${nmfil} berhasil disimpan!\nSilahkan ketik ${prefix}vnlist untuk melihat list vn`, id)
                    }else{
                        await geps.reply(self, 'Error! Silahkan coba kembali...', id)
                    }
                    break
                case prefix+'vnlist':
                case prefix+'listvn':
                    let vn = `┌─「 *LIST VN RANDOM* 」\n│\n├ Total : ${vnlist.length}\n`
                    for (let i of vnlist) {
                    vn += `├ `
                    vn += `${i}\n`
                    }
                    vn += '│\n└─「 *SELF BOT* 」'
                    await geps.reply(self, vn, id)
                    break
            case prefix+'ytsearch':
            case prefix+'yts':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isPremium) return geps.reply(self, `Maaf kak ${pushname}\nPerintah ini hanya bisa digunakan user premium!`, id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                await geps.reply(self, ind.wait(), id)
                try {
                    misc.ytSearch(q)
                        .then(async ({ result }) => {
                            for (let i = 0; i < 5; i++) {
                                const { urlyt, image, title, channel, duration, views } = await result[i]
                                await geps.sendFileFromUrl(self, image, `${title}.jpg`, ind.ytResult(urlyt, title, channel, duration, views), id)
                                console.log('Success sending YouTube results!')
                            }
                        })
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, 'Error!', id)
                }
            break
            case prefix+'hemker': {
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const hemkers = body.slice(8)
                const puppeteer = require('puppeteer')
                if (!hemkers) return geps.reply(self, `Kirim perintah *${prefix}hemker [text]*\n\nContoh : ${prefix}hemker clay`, id)
                geps.reply(self, ind.wait(), id)
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://textpro.me/matrix-style-text-effect-online-884.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", hemkers);
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 3000));
                                const element = await page.$(
                                    'div[class="thumbnail"] > img'
                                );
                                const text = await (await element.getProperty("src")).jsonValue();
                                geps.sendFileFromUrl(self, text, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(self, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(self, 'error', id)
                }
            }
                break
            case prefix+'wolf1': {
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const logowolfs = body.slice(7)
                const logowolfs1 = logowolfs.split('|')[0]
                const logowolfs2 = logowolfs.split('|')[1]
                const puppeteer = require('puppeteer')
                if (!logowolfs) return geps.reply(self, `Kirim perintah *${prefix}wolf1 text1|text2*\n\nContoh : ${prefix}wolf1 aing|gamteng`, id)
                geps.reply(self, ind.wait(), id)
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://textpro.me/create-wolf-logo-galaxy-online-936.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", logowolfs1);
                                await page.type("#text-1", logowolfs2);
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 3000));
                                const element = await page.$(
                                    'div[class="btn-group"] > a'
                                );
                                const text = await (await element.getProperty("href")).jsonValue();
                                geps.sendFileFromUrl(self, text, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(self, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(self, 'error', id)
                }
            }
                break
            case prefix+'sandwriting':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                try {
                    const swrt2 = await axios.get(`https://api.vhtear.com/sand_writing?text1=${q}&apikey=${config.vhtear}`)
                    const { imgUrl } = swrt2.data.result
                    const swrt3 = `*「 SAND WRITING 」*

*Text : ${q}*`
                    const pictk = await bent("buffer")(imgUrl)
                    const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                    geps.sendImage(self, base64, swrt3)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(self, errorImg, 'error.png', 'Gagal membuat:(')
                    geps.sendText(ownerNumber, 'Sand Writing Error : ' + err)
                }
                break
            case prefix+'joker': {
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const logojoker = body.slice(7)
                const puppeteer = require('puppeteer')
                if (!logojoker) return geps.reply(self, `Kirim perintah *${prefix}joker [text]*\n\nContoh : ${prefix}joker laylay`, id)
                geps.reply(self, ind.wait(), id)
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://textpro.me/create-logo-joker-online-934.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", logojoker);
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 3000));
                                const element = await page.$(
                                    'div[class="thumbnail"] > img'
                                );
                                const texts1 = await (await element.getProperty("src")).jsonValue();
                                geps.sendFileFromUrl(self, texts1, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(self, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(self, 'error', id)
                }
            }
                break
            case prefix+'singa': {
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const neoncuyss = body.slice(7)
                const neoncuyss1 = neoncuyss.split('|')[0]
                const neoncuyss2 = neoncuyss.split('|')[1]
                if (!neoncuyss) return geps.reply(self, 'Kirim perintah *#singa text1|text2*\n\nContoh : #singa Subscribe|ICHI X AISHA', id)
                geps.reply(self, ind.wait(), id)
                const puppeteer = require('puppeteer')
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://textpro.me/create-lion-logo-mascot-online-938.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", neoncuyss1);
                                await page.type("#text-1", neoncuyss2);
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 3000));
                                const element = await page.$(
                                    'div[class="thumbnail"] > img'
                                );
                                const text = await (await element.getProperty("src")).jsonValue();
                                geps.sendFileFromUrl(self, text, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(self, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(self, 'error', id)
                }
            }
                break
            case prefix+'ninja': {
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const logo3 = body.slice(7)
                const logo31 = logo3.split('|')[0]
                const logo32 = logo3.split('|')[1]
                if (!logo3) return geps.reply(self, `Kirim perintah *${prefix}ninja text1|text2*\n\nContoh : ${prefix}ninja Subscribe|ICHI X AISHA`, id)
                geps.reply(self, ind.wait(), id)
                const puppeteer = require('puppeteer')
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://textpro.me/create-ninja-logo-online-935.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", logo31);
                                await page.type("#text-1", logo32);
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 3000));
                                const element = await page.$(
                                    'div[class="btn-group"] > a'
                                );
                                const text = await (await element.getProperty("href")).jsonValue();
                                geps.sendFileFromUrl(self, text, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(self, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(self, 'error', id)
                }
            }
                break
            case prefix+'beruang': {
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const logo4 = body.slice(9)
                if (!logo4) return geps.reply(self, `Kirim perintah *${prefix}beruang [text]*\n\nContoh : ${prefix}beruang LUCU`, id)
                geps.reply(self, ind.wait(), id)
                const puppeteer = require('puppeteer')
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://ephoto360.com/tao-logo-team-logo-gaming-phong-cach-mascot-mien-phi-633.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", logo4);
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 10000));
                                const element = await page.$(
                                    'div[class="btn-group"] > a'
                                );
                                const text = await (await element.getProperty("href")).jsonValue();
                                geps.sendFileFromUrl(self, text, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(self, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(self, 'error', id)
                }
            }
                break
            case prefix+'rabbit': {
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const logo5 = body.slice(8)
                if (!logo5) return geps.reply(self, `Kirim perintah *${prefix}rabbit [text]*\n\nContoh : ${prefix}rabbit ICHI X AISHA`, id)
                geps.reply(self, ind.wait(), id)
                const puppeteer = require('puppeteer')
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://ephoto360.com/tao-logo-game-pubg-free-fire-fps-online-dep-607.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", logo5);
                                await page.click("#radio0-radio-bb937ed86ace4fb6bc632e90a737e32c");
                                await new Promise(resolve => setTimeout(resolve, 7000));
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 5000));
                                const element = await page.$(
                                    'div[class="btn-group"] > a'
                                );
                                const text = await (await element.getProperty("href")).jsonValue();
                                geps.sendFileFromUrl(self, text, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(self, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(self, 'error', id)
                }
            }
                break
            case prefix+'weasel': {
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const logo6 = body.slice(8)
                if (!logo6) return geps.reply(self, `Kirim perintah *${prefix}weasel [text]*\n\nContoh : ${prefix}weasel ICHI X AISHA`, id)
                geps.reply(self, ind.wait(), id)
                const puppeteer = require('puppeteer')
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://ephoto360.com/tao-logo-game-pubg-free-fire-fps-online-dep-607.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", logo6);
                                await page.click("#radio0-radio-f53b5da95e994874a634d06ae81a2b09");
                                await new Promise(resolve => setTimeout(resolve, 7000));
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 5000));
                                const element = await page.$(
                                    'div[class="btn-group"] > a'
                                );
                                const text = await (await element.getProperty("href")).jsonValue();
                                geps.sendFileFromUrl(self, text, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(self, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(self, 'error', id)
                }
            }
                break
            case prefix+'dragon': {
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const logo7 = body.slice(8)
                if (!logo7) return geps.reply(self, `Kirim perintah *${prefix}dragon [text]*\n\nContoh : ${prefix}dragon ICHI X AISHA`, id)
                geps.reply(self, ind.wait(), id)
                const puppeteer = require('puppeteer')
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://ephoto360.com/tao-logo-team-logo-gaming-phong-cach-mascot-mien-phi-633.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", logo7);
                                await page.click("#radio0-radio-f99fea3e79c242959b4a241e8332780b");
                                await new Promise(resolve => setTimeout(resolve, 5000));
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 5000));
                                const element = await page.$(
                                    'div[class="btn-group"] > a'
                                );
                                const text = await (await element.getProperty("href")).jsonValue();
                                geps.sendFileFromUrl(self, text, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(self, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(self, 'error', id)
                }
            }
                break
            case prefix+'wolfblue': {
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const logo9 = body.slice(10)
                if (!logo9) return geps.reply(self, `Kirim perintah *${prefix}wolfblue [text]*\n\nContoh : ${prefix}wolfblue ICHI X AISHA`, id)
                geps.reply(self, ind.wait(), id)
                const puppeteer = require('puppeteer')
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://ephoto360.com/tao-logo-team-logo-gaming-phong-cach-mascot-mien-phi-633.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", logo9);
                                await page.click("#radio0-radio-7e8d1d6b1b72481abc38a9d26513a803");
                                await new Promise(resolve => setTimeout(resolve, 5000));
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 5000));
                                const element = await page.$(
                                    'div[class="btn-group"] > a'
                                );
                                const text = await (await element.getProperty("href")).jsonValue();
                                geps.sendFileFromUrl(self, text, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(self, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(self, 'error', id)
                }
            }
                break
            case prefix+'shark': {
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const logo10 = body.slice(7)
                if (!logo10) return geps.reply(self, `Kirim perintah *${prefix}shark [text]*\n\nContoh : ${prefix}shark ICHI X AISHA`, id)
                geps.reply(self, ind.wait(), id)
                const puppeteer = require('puppeteer')
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://ephoto360.com/tao-logo-team-logo-gaming-phong-cach-mascot-mien-phi-633.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", logo10);
                                await page.click("#radio0-radio-2952bc88e2e345fdb54da8f73b52413f");
                                await new Promise(resolve => setTimeout(resolve, 5000));
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 5000));
                                const element = await page.$(
                                    'div[class="btn-group"] > a'
                                );
                                const text = await (await element.getProperty("href")).jsonValue();
                                geps.sendFileFromUrl(self, text, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(self, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(self, 'error', id)
                }
            }
                break
            case prefix+'wolf2': {
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const logowolfss = body.slice(7)
                const logowolfss1 = logowolfss.split('|')[0]
                const logowolfss2 = logowolfss.split('|')[1]
                const puppeteer = require('puppeteer')
                if (!logowolfss) return geps.reply(self, `Kirim perintah *${prefix}wolf2 text1|text2*\n\nContoh : ${prefix}wolf2 aing|gamteng`, id)
                geps.reply(self, ind.wait(), id)
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://textpro.me/create-wolf-logo-black-white-937.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", logowolfss1);
                                await page.type("#text-1", logowolfss2);
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 3000));
                                const element = await page.$(
                                    'div[class="btn-group"] > a'
                                );
                                const text = await (await element.getProperty("href")).jsonValue();
                                geps.sendFileFromUrl(self, text, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(self, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(self, 'error', id)
                }
            }
                break
            case prefix+'tiktod': {
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const tiktods = body.slice(8)
                const tiktods1 = tiktods.split('|')[0]
                const tiktods2 = tiktods.split('|')[1]
                const puppeteer = require('puppeteer')
                if (!tiktods) return geps.reply(self, `Kirim perintah *${prefix}tiktod teks|teks*\nContoh : ${prefix}tiktod aing|gans`, id)
                geps.reply(self, ind.wait(), id)
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", tiktods1);
                                await page.type("#text-1", tiktods2);
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 3000));
                                const element = await page.$(
                                    'div[class="thumbnail"] > img'
                                );
                                const text = await (await element.getProperty("src")).jsonValue();
                                geps.sendFileFromUrl(self, text, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(self, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(self, 'error', id)
                }
            }
                break
            case prefix+'tiktokstalk':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                try {
                    const tstalk2 = await axios.get(`https://api.vhtear.com/tiktokprofile?query=${q}&apikey=${config.vhtear}`)
                    const { username, bio, follow, follower, title, like_count, video_post, description, picture, url_account } = tstalk2.data.result
                    const tiktod = `*User Ditemukan!*
➸ *Username:* ${username}
➸ *Judul:* ${title}
➸ *Bio:* ${bio}
➸ *Mengikuti:* ${follow}
➸ *Pengikut:* ${follower}
➸ *Jumlah Like*: ${like_count}
➸ *Jumlah Postingan:* ${video_post}
➸ *Deskripsi:* ${description}
➸ *Link:* ${url_account}`

                    const pictk = await bent("buffer")(picture)
                    const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                    geps.sendImage(self, base64, title, tiktod)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(self, errorImg, 'error.png', '💔️ Maaf, User tidak ditemukan')
                    geps.sendText(ownerNumber, 'Error Tiktokstalk : ' + err)
                }
                break
            case prefix+'tts':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                const speech = q.substring(q.indexOf('|') + 2)
                const ptt = tts(ar[0])
                try {
                    ptt.save(`${speech}.mp3`, speech, async () => {
                        await geps.sendPtt(self, `${speech}.mp3`, id)
                        fs.unlinkSync(`${speech}.mp3`)
                    })
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, 'Error!', id)
                }
            break
            case prefix+'flip':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const sides = Math.floor(Math.random() * 2) + 1
                if (sides == 1) {
                geps.sendStickerfromUrl(self, 'https://i.ibb.co/LJjkVK5/heads.png', id)
              } else {
                geps.sendStickerfromUrl(self, 'https://i.ibb.co/wNnZ4QD/tails.png', id)
              }
                break
            case prefix+'pantun':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/pantun.txt')
                .then(res => res.text())
                .then(body => {
                let splitpantun = body.split('\n')
                let randompantun = splitpantun[Math.floor(Math.random() * splitpantun.length)]
                geps.reply(self, randompantun.replace(/aruga-line/g,"\n"), id)
                })
                .catch(() => {
                geps.reply(self, 'Ada yang Error!', id)
                })
                break
            case prefix+'fakta':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/faktaunix.txt')
                .then(res => res.text())
                .then(body => {
                let splitnix = body.split('\n')
                let randomnix = splitnix[Math.floor(Math.random() * splitnix.length)]
                geps.reply(self, randomnix, id)
                })
                .catch(() => {
                geps.reply(self, 'Ada yang Error!', id)
                })
                break
            case prefix+'katabijak':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/katabijax.txt')
                .then(res => res.text())
                .then(body => {
                let splitbijak = body.split('\n')
                let randombijak = splitbijak[Math.floor(Math.random() * splitbijak.length)]
                geps.reply(self, randombijak, id)
                })
                .catch(() => {
                geps.reply(self, 'Ada yang Error!', id)
                })
                break
            case prefix+'tomp3': // by: Piyobot
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                if ((isMedia && isVideo || isQuotedVideo)) {
                    await geps.reply(self, ind.wait(), id)
                    const encryptMedia = isQuotedVideo ? quotedMsg : message
                    const _mimetype = isQuotedVideo ? quotedMsg.mimetype : mimetype
                    console.log(color('[WAPI]', 'green'), 'Downloading and decrypt media...')
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, 'video', `${name}.${_mimetype.replace(/.+\//, '')}`)
                    const fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
                    fs.writeFile(fileInputPath, mediaData, (err) => {
                        if (err) return console.error(err)
                        ffmpeg(fileInputPath)
                            .format('mp3')
                            .on('start', (commandLine) => {
                                //console.log(color('[FFmpeg]', 'green'), commandLine) Nyepam su
                            })
                            .on('progress', (progress) => {
                                //console.log(color('[FFmpeg]', 'green'), progress) Nyepam ugha
                            })
                            .on('end', async () => {
                                console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                await geps.sendFile(self, fileOutputPath, 'audio.mp3', '', id)
                                setTimeout(() => {
                                    fs.unlinkSync(fileInputPath)
                                    fs.unlinkSync(fileOutputPath)
                                }, 30000)
                            })
                            .save(fileOutputPath)
                    })
                } else {
                    await geps.reply(self, `Reply videonya kaka dengan caption ${prefix}tomp3`, id)
                }
            break
            case prefix+'playstore':
            case prefix+'ps':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isPremium) return geps.reply(self, `Maaf kak ${pushname}\nPerintah ini hanya bisa digunakan user premium!`, id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                await geps.reply(self, ind.wait(), id)
                try {
                    misc.playstore(q)
                        .then(async ({ result }) => {
                            for (let i = 0; i < 5; i++) {
                                const { app_id, icon, title, developer, description, price, free } = result[i]
                                await geps.sendFileFromUrl(self, icon, `${title}.jpg`, ind.playstore(app_id, title, developer, description, price, free))
                            }
                            console.log('Success sending PlayStore result!')
                        })
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, `Error!\n\n${err}`, id)
                }
            break
            case prefix+'math':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (typeof mathjs.evaluate(q) !== 'number') {
                    await geps.reply(self, ind.notNum(q), id)
                } else {
                    await geps.reply(self, `*「 MATH 」*\n\n${q} = ${mathjs.evaluate(q)}`, id)
                }
            break
            case prefix+'shopee':
            case prefix+'shoope':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isPremium) return geps.reply(self, `Maaf kak ${pushname}\nPerintah ini hanya bisa digunakan user premium!`, id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                const namaBarang = q.substring(0, q.indexOf('|') - 1)
                const jumlahBarang = q.substring(q.lastIndexOf('|') + 2)
                await geps.reply(self, ind.wait(), id)
                try {
                    misc.shopee(namaBarang, jumlahBarang)
                        .then(async ({ result }) => {
                            for (let i = 0; i < result.items.length; i++) {
                                const { nama, harga, terjual, shop_location, description, link_product, image_cover } = result.items[i]
                                await geps.sendFileFromUrl(self, image_cover, `${nama}.jpg`, ind.shopee(nama, harga, terjual, shop_location, description, link_product))
                            }
                            console.log('Success sending Shopee data!')
                        })
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, `Error!\n\n${err}`, id)
                }
            break
            case prefix+'partner':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isGroupMsg) return await geps.reply(self, 'Command ini tidak bisa digunakan di dalam grup!\nKarena saya menjaga privasi seseorang untuk tidak diumbar!', id)
                await geps.reply(self, 'Looking for a partner...', id)
                await geps.sendContact(self, register.getRegisteredRandomId(_registered))
                await geps.sendText(self, `Partner found: 🙉\n*${prefix}next* — find a new partner`)
            break
            case prefix+'fakename':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const linkfake = await axios.get(`https://freerestapi.herokuapp.com/api/v1/fakename?country=en`)
                const fakelink = linkfake.data
                geps.reply(self, `「 *FAKE-NAME* 」\n\n*Name* : ${fakelink.name} \n*Birthday* : ${fakelink.birthday} \n*Address* : ${fakelink.address} \n*City* : ${fakelink.city} \n*Region* : ${fakelink.region} \n*Country* : ${fakelink.country} \n*Zip* : ${fakelink.zip} \n*Phone Number* : ${fakelink.phone_number} \n*Username* : ${fakelink.username} \n*Password* : ${fakelink.password} \n*Email* : ${fakelink.email}`, id)
                break
            case prefix+'next':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isGroupMsg) return await geps.reply(self, 'Command ini tidak bisa digunakan di dalam grup!\nKarena saya menjaga privasi seseorang untuk tidak diumbar!', id)
                await geps.reply(self, 'Looking for a partner...', id)
                await geps.sendContact(self, register.getRegisteredRandomId(_registered))
                await geps.sendText(self, `Partner found: 🙉\n*${prefix}next* — find a new partner`)
            break
            case prefix+'tafsir':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (args.length === 0) return geps.reply(self, `Untuk menampilkan ayat Al-Qur'an tertentu beserta tafsir dan terjemahannya\ngunakan ${prefix}tafsir surah ayat\n\nContoh: ${prefix}tafsir Al-Mulk 10`, id)
                await geps.reply(self, ind.wait(), id)
                const responSurah = await axios.get('https://raw.githubusercontent.com/VideFrelan/words/main/tafsir.txt')
                const { data } = responSurah.data
                const idx = data.findIndex((post) => {
                    if ((post.name.transliteration.id.toLowerCase() === args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() === args[0].toLowerCase())) return true
                })
                const nomerSurah = data[idx].number
                if (!isNaN(nomerSurah)) {
                    const responseh = await axios.get('https://api.quran.sutanlab.id/surah/'+ nomerSurah + '/'+ args[1])
                    const { data } = responseh.data
                    let pesan = ''
                    pesan += 'Tafsir Q.S. ' + data.surah.name.transliteration.id + ':' + args[1] + '\n\n'
                    pesan += data.text.arab + '\n\n'
                    pesan += '_' + data.translation.id + '_\n\n' + data.tafsir.id.long
                    await geps.reply(self, pesan, id)
                }
            break
            case prefix+'listsurah':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                await geps.reply(self, ind.wait(), id)
                misc.listSurah()
                    .then(async ({ result }) => {
                        let list = '-----[ AL-QUR\'AN LIST ]-----\n\n'
                        for (let i = 0; i < result.list.length; i++) {
                            list += `${result.list[i]}\n\n`
                        }
                        await geps.reply(self, list, id)
                        console.log('Success sending Al-Qur\'an list!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'surah':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (args.length !== 1) return await geps.reply(self, ind.wrongFormat(), id)
                await geps.reply(self, ind.wait(), id)
                misc.getSurah(args[0])
                    .then(async ({ result }) => {
                        await geps.reply(self, `${result.surah}\n\n${result.quran}`, id)
                        console.log('Success sending surah!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'motivasi':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                misc.motivasi()
                    .then(async (body) => {
                        const motivasiSplit = body.split('\n')
                        const randomMotivasi = motivasiSplit[Math.floor(Math.random() * motivasiSplit.length)]
                        await geps.reply(self, randomMotivasi, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'play':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isPremium) return geps.reply(self, `Maaf kak ${pushname}\nPerintah ini hanya bisa digunakan user premium!`, id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                        try {
                geps.reply(from, mess.wait, id)
                const serplay = body.slice(6)
                const webplay = await fetch(`https://api.xteam.xyz/dl/play?lagu=${serplay}&APIKEY=d682fc863988869d`)
                if (!webplay.ok) throw new Error(`Error Play : ${webplay.statusText}`)
                const webplay2 = await webplay.json()
                 if (webplay2.status == false) {
                    geps.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                } else {

                    if (Number(webplay2.size.split(' MB')[0]) >= 10.00) return geps.reply(from, 'Maaf durasi music sudah melebihi batas maksimal 10 MB!', id)
                    
                    const captplay = `*「 PLAY 」*\n\n• *Judul* : ${webplay2.judul}\n• *Filesize* : ${webplay2.size}\n• *Exp* : \n\n_*Music Sedang Dikirim*_`
                    await geps.sendFileFromUrl(from, webplay2.thumbnail, `thumb.jpg`, captplay, id)
                    await geps.sendFileFromUrl(from, webplay2.url, `${webplay2.judul}.mp3`, '', id).catch(() => geps.reply(from, mess.error.Yt4, id))
                    await limitAdd(serial)
                }
            } catch (err) {
                geps.sendText(ownerNumber, 'Error Play : '+ err)
                geps.reply(from, 'Jangan meminta lagu yang sama dengan sebelumnya!', id)
            }
            break    
            /*case prefix+'ytmp4': {
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                const puppeteer = require('puppeteer')
                try {
                (async () => {
                const browser = await puppeteer.launch({
                    headless: false,
                });
                const page = await browser.newPage();
                await page
                .goto("https://id.savefrom.net/1-cara-mengunduh-video-youtube.html", {
                waitUntil: "networkidle2"
                })
                .then(async () => {
                await page.type("#sf_url", q);
                await new Promise(resolve => setTimeout(resolve, 6000));
                await page.click("#sf_submit");
                await new Promise(resolve => setTimeout(resolve, 6000));
                const element = await page.$(
                    'div[class="def-btn-box"] > a'
                );
                const hamsilnye = await (await element.getProperty("href")).jsonValue();
                //geps.sendFileFromUrl(self, text, id)
                const respytmp4 = await fetch(hamsilnye);
                const downytmp4 = await respytmp4.buffer();
                browser.close();
                const namefileytmp4 = Math.floor(Math.random() * 10) + 20
                await fs.writeFile(`./temp/${namefileytmp4}.mp4`, downytmp4)
                await geps.sendFile(self, `./temp/${namefileytmp4}.mp4`)
                fs.unlinkSync(`./temp/${namefileytmp4}.mp4`)

                })
                .catch((err => {
                console.log(err)
                geps.reply(self, 'error', id)
                }))
                })();
                } catch (error) {
                console.log('error bang')
                geps.reply(self, 'error', id)
                }
                }
                break
            /*case prefix+'ytmp4':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                downloader.ytdl(q)
                    .then(async ({ result }) => {
                        if (Number(result[0].size.split(' MB')[0]) >= 30.0) return geps.reply(self, `Maaf ${pushname}, Maximal File 30mb`, id)
                            await geps.sendFileFromUrl(self, result.thumbnail, `${result.title}.jpg`, ind.ytFound(result), id)
                            const respytmp4 = await fetch(result.mp4);
                            const downytmp4 = await respytmp4.buffer();
                            const namefileytmp4 = Math.floor(Math.random() * 10) + 20
                            await fs.writeFile(`./temp/${namefileytmp4}.mp4`, downytmp4)
                            await geps.sendFile(self, `./temp/${namefileytmp4}.mp4`)
                            fs.unlinkSync(`./temp/${namefileytmp4}.mp3`)
                            console.log('Success sending YouTube video!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break*/
            case prefix+'joox':
                if (!isRegistered) return await bocchi.reply(self, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                downloader.joox(q)
                    .then(async ({ result }) => {
                        if (Number(result[0].filesize.split(' MB')[0]) >= 10.0) return geps.sendFileFromUrl(self, result[0].linkImg, `${result[0].judul}.jpg`, `Judul: ${result[0].judul}\nSize: *${result[0].filesize}*\n\nGagal, Maksimal video size adalah *10MB*!`, id)
                        await geps.sendFileFromUrl(self, result[0].linkImg, `${result.title}.jpg`, ind.joox(result), id)
                        const responsess = await fetch(result[0].linkMp3);
                        const buffers = await responsess.buffer();
                        const namefilejoox = Math.floor(Math.random() * 10) + 20
                        await fs.writeFile(`./temp/${namefilejoox}.mp3`, buffers)
                        await geps.sendPtt(self, `./temp/${namefilejoox}.mp3`)
                        console.log('Success sending Joox!')
                        fs.unlinkSync(`./temp/${namefilejoox}.mp3`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'ssweb':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                geps.sendFileFromUrl(self, `https://api.apiflash.com/v1/urltoimage?access_key=0c630fb86b394348aaa65629409ea387&format=jpeg&no_cookie_banners=true&quality=100&response_type=image&url=${q}`, 'ssurl.jpg', `*Result* : ${q}`, id)
                break
            case prefix+'whois':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (args.length !== 1) return await geps.reply(self, ind.wrongFormat(), id)
                await geps.reply(self, ind.wait(), id)
                misc.whois(args[0])
                    .then(async ({ result }) => {
                        await geps.reply(self, `*「 WHOIS 」*\n\n➸ *IP address*: ${result.ip_address}\n➸ *City*: ${result.city}\n➸ *Region*: ${result.region}\n➸ *Country*: ${result.country}\n➸ *ZIP code*: ${result.postal_code}\n➸ *Latitude and longitude*: ${result.latitude_longitude}\n➸ *Time zone*: ${result.time_zone}\n➸ *Call code*: ${result.calling_code}\n➸ *Currency*: ${result.currency}\n➸ *Language code*: ${result.languages}\n➸ *ASN*: ${result.asn}\n➸ *Organization*: ${result.org}`, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            /*case prefix+'sms':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q.includes('|')) return await geps.reply(self, ind.wrongFormat(), id)
                const pesanPengirim = q.substring(0, q.indexOf('|') - 1)
                const nomorPenerima = q.substring(q.lastIndexOf('|') + 2)
                await geps.reply(self, ind.wait(), id)
                misc.sms(nomorPenerima, pesanPengirim)
                    .then(async ({ status, pesan }) => {
                        if (status !== 'success') return await geps.reply(self, pesan, id)
                        await geps.reply(self, `Success sending SMS to: ${nomorPenerima}\nMessage: ${pesanPengirim}`, id)
                        console.log(`Success sending SMS to ${nomorPenerima}!`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break*/
            case prefix+'toxic':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                await geps.reply(self, toxic(), id)
            break
            case prefix+'alkitab':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                await geps.reply(self, ind.wait(), id)
                misc.alkitab(q)
                    .then(async ({ result }) => {
                        let alkitab = '-----[ *AL-KITAB* ]-----'
                        for (let i = 0; i < result.length; i++) {
                            alkitab +=  `\n\n➸ *Ayat*: ${result[i].ayat}\n➸ *Isi*: ${result[i].isi}\n➸ *Link*: ${result[i].link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(self, alkitab, id)
                        console.log('Success sending Al-Kitab!')
                    })
            break
            case prefix+'quran':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                const qura = `https://api.vhtear.com/quran?no=${q}&apikey=${config.vhtear}`
                const quraan = await axios.get(qura)
                const quraann = quraan.data
                let hasqu = `*「 AL-QURAN 」*\n\n*Surah : ${quraann.result.surah}*\n*Quran* : ${quraann.result.quran}*`
                await geps.reply(self, `${hasqu}`, id).catch(() => geps.reply(self, `*Terdapat kesalahan saat mencari surat ${q}*`, id))
                break
            case prefix+'reminder': // by Slavyan
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q.includes('|')) return await geps.reply(self, ind.wrongFormat(), id)
                const timeRemind = q.substring(0, q.indexOf('|') - 1)
                const messRemind = q.substring(q.lastIndexOf('|') + 2)
                const parsedTime = ms(toMs(timeRemind))
                reminder.addReminder(sender.id, messRemind, timeRemind, _reminder)
                await geps.sendTextWithMentions(self, `*「 REMINDER 」*\n\nReminder diaktifkan! :3\n\n➸ *Pesan*: ${messRemind}\n➸ *Durasi*: ${parsedTime.hours} jam ${parsedTime.minutes} menit ${parsedTime.seconds} detik\n➸ *Untuk*: @${sender.id.replace('@c.us', '')}`, id)
                const intervRemind = setInterval(async () => {
                    if (Date.now() >= reminder.getReminderTime(sender.id, _reminder)) {
                        await geps.sendTextWithMentions(self, `⏰ *「 REMINDER 」* ⏰\n\nAkhirnya tepat waktu~ @${sender.id.replace('@c.us', '')}\n\n➸ *Pesan*: ${reminder.getReminderMsg(sender.id, _reminder)}`)
                        _reminder.splice(reminder.getReminderPosition(sender.id, _reminder), 1)
                        fs.writeFileSync('./database/user/reminder.json', JSON.stringify(_reminder))
                        clearInterval(intervRemind)
                    }
                }, 1000)
            break
            case prefix+'ojoin': // by Hnd-SELFBOT
            if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
            if (!isOwner) return geps.reply(self, `Perintah ini hanya untuk Owner Bot!`, id)
            if (!q.includes('|')) return await geps.reply(self, ind.wrongFormat(), id)
            const amsyuuuu = body.slice(7)
            const timeJoin = amsyuuuu.split('|')[0]
            const linkgrup = amsyuuuu.split('|')[1]
            const olehhhhh = `${pushname}`
            const TimeInGRoup = ms(toMs(timeJoin))
            const checkInvites = await geps.inviteInfo(linkgrup)
            const obeje = { id: `${serial}`, msg: `${olehhhhh}`, time: Date.now() + toMs(timeJoin)};
            __auto.push(obeje);
                fs.writeFileSync('./database/group/auto.json', JSON.stringify(__auto, 1));
            reminder.addReminder(sender.id, olehhhhh, timeJoin, __auto)
            await geps.reply(self, `*「 AUTO JOIN GC 」*\n\nAuto join grup berhasil diaktifkan dalam waktu\n• ${TimeInGRoup.hours} Jam\n• ${TimeInGRoup.minutes} Menit\n• ${TimeInGRoup.seconds} Detik`, id)
            await geps.joinGroupViaLink(linkgrup)
            await geps.sendText(checkInvites.id, `Hello All Im ICHI X AISHA-BOT!`)
            const intervReminds = setInterval(async () => {
                if (Date.now() >= reminder.getReminderTime(sender.id, __auto)) {
                    const checkInvitess = await geps.inviteInfo(linkgrup)
                    await geps.sendText(checkInvites.id, `*「 EXPIRE JOIN GC 」*\n\nAkhirnya tepat waktu~\nWaktu grup ini telah habis dan Hnd-SELFBOT akan keluar Sayonara`)
                    await sleeps(2000)
                    await geps.leaveGroup(checkInvitess)
                    __auto.splice(reminder.getReminderPosition(sender.id, __auto), 1)
                    fs.writeFileSync('./database/group/auto.json', JSON.stringify(__auto))
                    clearInterval(intervReminds)
                }
            }, 1000)
            break
            case prefix+'join':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, `Linknya mana?\nContoh ${prefix}join https://example.com`, id)
                const checkInvite = await geps.inviteInfo(q)
                if (isOwner) {
                    await geps.joinGroupViaLink(q)
                    await geps.reply(self, ind.ok(), id)
                    await geps.sendText(checkInvite.id, `Hello!! I was invited by ${pushname}`)
                } else {
                    const getGroupData = await geps.getAllGroups()
                    if (getGroupData.length >= groupLimit) {
                        await geps.reply(self, `Invite refused. Max group is: ${groupLimit}`, id)
                    } else if (getGroupData.size <= memberLimit) {
                        await geps.reply(self, `Invite refused. Minimum member is: ${memberLimit}`, id)
                    } else {
                        await geps.joinGroupViaLink(q)
                        await geps.reply(self, ind.ok(), id)
                        await geps.sendText(checkInvite.id, `Hello!! I was invited by ${pushname}`)
                    }
                }
            break
            case prefix+'autoclose': // by MrG3P5
            if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
            if (!isGroupMsg) return geps.reply(self, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return geps.reply(self, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return geps.reply(self, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (!q) return await geps.reply(from, ind.wrongFormat(), id)
            const olehhhh = `${pushname}`
            const parsedTimes = ms(toMs(q))
            reminder.addReminder(sender.id, olehhhh, q, __auto)
            await geps.reply(self, `*「 AUTO CLOSE GC 」*\n\nAuto close grup berhasil diaktifkan dalam waktu\n• ${parsedTimes.hours} Jam\n• ${parsedTimes.minutes} Menit\n• ${parsedTimes.seconds} Detik`, id)
            const ntervReminds = setInterval(async () => {
                if (Date.now() >= reminder.getReminderTime(sender.id, __auto)) {
                    await geps.sendTextWithMentions(self, `*「 AUTO CLOSE GC 」*\n\nAkhirnya tepat waktu~\nGrup ditutup oleh @${sender.id.replace('@c.us', '')}`, id)
                    geps.setGroupToAdminsOnly(groupId, true)
                    __auto.splice(reminder.getReminderPosition(sender.id, __auto), 1)
                    fs.writeFileSync('./database/group/auto.json', JSON.stringify(__auto))
                    clearInterval(ntervReminds)
                }
            }, 1000)
            break
            case prefix+'autoopen': // by Hnd-SELFBOT
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, 'Fitur ini hanya bisa di gunakan dalam group', id)
                if (!isGroupAdmins) return geps.reply(self, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
                if (!isBotGroupAdmins) return geps.reply(self, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                const olehhhhhh = `${pushname}`
                const parsedTimess = ms(toMs(q))
                reminder.addReminder(sender.id, olehhhhhh, q, __auto)
                await geps.reply(self, `*「 AUTO OPEN GC 」*\n\nAuto open grup berhasil diaktifkan dalam waktu\n• ${parsedTimess.hours} Jam\n• ${parsedTimess.minutes} Menit\n• ${parsedTimess.seconds} Detik`, id)
                const intervRemindss = setInterval(async () => {
                    if (Date.now() >= reminder.getReminderTime(sender.id, __auto)) {
                        await geps.sendTextWithMentions(self, `*「 AUTO OPEN GC 」*\n\nAkhirnya tepat waktu~\nGrup dibuka oleh @${sender.id.replace('@c.us', '')}`, id)
                        geps.setGroupToAdminsOnly(groupId, false)
                        __auto.splice(reminder.getReminderPosition(sender.id, __auto), 1)
                        fs.writeFileSync('./database/group/auto.json', JSON.stringify(__auto))
                        clearInterval(intervRemindss)
                    }
                }, 1000)
                break
            case prefix+'imagetourl':
            case prefix+'imgtourl':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(self, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const linkImg = await uploadImages(mediaData, `${sender.id}_img`)
                    await geps.reply(self, linkImg, id)
                } else {
                    await geps.reply(self, ind.wrongFormat(), id)
                }
            break
            case prefix+'infohoax':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                await geps.reply(self, ind.wait(), id)
                misc.infoHoax()
                    .then(async ({ result }) => {
                        let txt = '*「 HOAXES 」*'
                        for (let i = 0; i < result.length; i++) {
                            const { tag, title, link } = result[i]
                            txt += `\n\n➸ *Status*: ${tag}\n➸ *Deskripsi*: ${title}\n➸ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.sendFileFromUrl(self, result[0].image, 'hoax.jpg', txt, id)
                        console.log('Success sending info!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'pinterest':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                const ptrst = await fetch(`https://api.vhtear.com/pinterest?query=${q}&apikey=${config.vhtear}`)
                //if (!ptrst.ok) throw new Error(`Error Pinterest : ${ptrst.statusText}`)
                const ptrs = await ptrst.json()
                const ptrsn = ptrs.result
                const b = JSON.parse(JSON.stringify(ptrsn))
                const ptrs2 = b[Math.floor(Math.random() * b.length)]
                const image = await bent("buffer")(ptrs2)
                const base64 = `data:image/jpg;base64,${image.toString("base64")}`
                await geps.sendImage(self, base64, 'ptrs.jpg', `*Pinterest*\n\n*Hasil Pencarian : ${q}*`, id)
                break
            case prefix+'brainly':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                try {
                    const resp = await axios.get(`https://api.vhtear.com/branly?query=${q}&apikey=${config.vhtear}`)
                    if (resp.data.error) return geps.reply(self, resp.data.error, id)
                    const anm2 = `➸ Jawaban : ${resp.data.result.data}`
                    geps.reply(self, anm2, id)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(self, errorImg, 'error.png', '💔️ Maaf, User tidak ditemukan')
                    geps.sendText(ownerNumber, 'Brainly Error : ' + err)
                }
                break
            case prefix+'estetik':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const aestetic = ["http://wa-botstiker.my.id/images/aesthetic/aachal-6geVJeZJMg8-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/abyan-athif-BCx6t5pJwVw-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/alexander-popov-UUJzCuHUfYI-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/alexander-popov-kx1r9Fgqe7s-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/alexander-popov-lXaOSpd_UQw-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/anders-jilden-AkUR27wtaxs-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/andrea-boschini-5Ipk8IgNpPg-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/anmol-gupta-6Zpojuvyr-E-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/austin-chan-ukzHlkoz1IE-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/bantersnaps-1sUs8JbGx74-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/beasty--HxIhfS_dUk-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/daniel-tseng-W9kq9suABY4-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/estee-janssens-MUf7Ly04sOI-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/fabian-moller-gI7zgb80QWY-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/florian-klauer-mk7D-4UCfmg-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/ian-dooley-aaAllJ6bmac-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/karthikeya-gs-ZMM2sVJKd3A-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/kevin-laminto-hSeh-3ID830-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/larm-rmah-CB8tGaFoW38-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/matthew-ronder-seid-GWzCpqXPNDw-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/orfeas-green-G5A5ZNjS2tE-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/pari-karra-elK1z1WcsR8-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/sean-foley-qEWEz-U5p8Q-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/sean-foley-z4gWzj0p93c-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/tamara-gore-ldZrvy2SOEA-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/vanessa-serpas-S4fYv5LQ4_A-unsplash.jpg"]
                let aes = aestetic[Math.floor(Math.random() * aestetic.length)]
                geps.sendFileFromUrl(self, aes, 'aestetic.jpg', 'aesthetic')
                break
            case prefix+'cecan':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const itemslh = ["https://i.pinimg.com/originals/69/d7/b3/69d7b3d5a089e7cbee0250ea5da9b14b.jpg","https://i.pinimg.com/originals/78/fa/10/78fa10ab94c0dc9e19a18358a9752070.jpg","https://i.pinimg.com/originals/93/e0/a3/93e0a3816183696ff89b1ad7db2fd3c0.jpg","https://i.pinimg.com/originals/a6/34/cf/a634cfa655269069439e9476780b46fe.jpg","https://i.pinimg.com/originals/dc/f5/69/dcf569a7b08efcae64d0747b51d04a7d.jpg","https://i.pinimg.com/originals/4f/96/2b/4f962b89bd7ceb438b3e9ebbd075184c.jpg","https://i.pinimg.com/originals/c2/fb/e7/c2fbe7a6955a85c51b9ee8062a7b68d3.jpg","https://i.pinimg.com/originals/44/54/24/44542415cf206f2c041e3bbb52a69419.jpg","https://i.pinimg.com/originals/ae/3c/40/ae3c40e0a2f653811b5a67ccd6b9d8cc.jpg","https://i.pinimg.com/originals/bd/fa/33/bdfa3317d96e6cdafaf27e3b337d05b4.jpg","https://i.pinimg.com/originals/75/6a/f2/756af236ae909431567ed184c43aae6f.png","https://i.pinimg.com/originals/a5/95/d7/a595d7fe6b8dc00d1aaa7287f1dd304e.jpg","https://i.pinimg.com/originals/40/37/78/40377871ee06a4a434c39e90b1f647e1.jpg","https://i.pinimg.com/originals/45/73/ac/4573ac9484c480500872b7c91f758040.jpg","https://i.pinimg.com/originals/32/7d/0b/327d0be89cc60321128d0f0bdaadfc15.jpg","https://i.pinimg.com/originals/f4/a1/0f/f4a10ffd44aea604383be84a34f69f90.jpg","https://i.pinimg.com/originals/ec/7f/b5/ec7fb5506136f72876633aab957a755a.jpg","https://i.pinimg.com/originals/4c/e9/15/4ce915c8245586f541c4d0a8b71cc500.jpg","https://i.pinimg.com/originals/03/2a/14/032a145e96154753e33bdda30d9f41f1.jpg","https://i.pinimg.com/originals/f4/5b/07/f45b070de82acec89092eaea1b415029.jpg","https://i.pinimg.com/originals/a9/f2/da/a9f2da1277fb7bc801856c3b9c12d37d.jpg","https://i.pinimg.com/originals/af/ab/93/afab93ebbf109a601dcb77b5baa494b4.jpg","https://i.pinimg.com/originals/b9/38/df/b938dfba6c139ad45ce51203a43eac0d.jpg","https://i.pinimg.com/originals/af/10/0a/af100a49cb8f53f0dd5b48664ede9db8.jpg","https://i.pinimg.com/originals/99/18/6c/99186c2145e1223f885103f51817be78.jpg","https://i.pinimg.com/originals/3c/fd/c9/3cfdc9ba7cf79ed061808e162162f4da.jpg","https://i.pinimg.com/originals/31/95/64/319564a33b5ed46a52d30c18d2310f22.jpg","https://i.pinimg.com/originals/1c/2d/9f/1c2d9ffdd104200355bab43c9d3fad20.gif","https://i.pinimg.com/originals/4a/aa/12/4aaa12940f51fdfb1684964df3796c4c.jpg","https://i.pinimg.com/originals/37/90/bc/3790bc29be16d95174af4eff4ee3859f.jpg","https://i.pinimg.com/originals/4c/12/8f/4c128fda6e71a9f4c670a78a21d8c196.jpg","https://i.pinimg.com/originals/34/92/10/3492100b4a924458a2bf5340d68293c2.jpg","https://i.pinimg.com/originals/5a/dd/12/5add12091eafba364ec76c91d20e75ac.jpg","https://i.pinimg.com/originals/da/c3/59/dac359d1fc87193c2b9d85bb96fedcbc.jpg","https://i.pinimg.com/originals/2e/d6/a9/2ed6a9670d942220eab92b99bb0d1c09.jpg","https://i.pinimg.com/originals/f1/89/e3/f189e3d9b353f91b60060cc64e6706c9.jpg","https://i.pinimg.com/originals/8c/06/c2/8c06c22283cf98abdb8922e2f3aa0a6a.jpg","https://i.pinimg.com/originals/8b/6f/0b/8b6f0b1e213240eaad90894292a2d3c1.jpg","https://i.pinimg.com/originals/89/bf/b8/89bfb86392d39477adcd66444cf19845.jpg","https://i.pinimg.com/originals/35/e2/cc/35e2cc3c535d8f1cfeaf13cce69ac984.jpg","https://i.pinimg.com/originals/c0/01/a1/c001a16e2629872a3d7ea7fdbe5a4e98.jpg","https://i.pinimg.com/originals/b4/eb/48/b4eb486def2d413716c5fa033af9fb34.jpg","https://i.pinimg.com/originals/55/ee/7b/55ee7b5f4889cc34ec1a01d2e7875b53.jpg","https://i.pinimg.com/originals/0c/b3/0e/0cb30ea660aafbae32cc07433bf3eea2.jpg","https://i.pinimg.com/originals/1f/50/23/1f5023991f2a01cff748e84c4cf3612d.jpg","https://i.pinimg.com/originals/ab/53/07/ab5307df9234934f385eb6235aa6c2cd.jpg","https://i.pinimg.com/originals/e1/a1/7c/e1a17c5f359846741c687ef1fcadb316.jpg","https://i.pinimg.com/originals/16/1b/21/161b215ee2f8e0a040c91f18c054d705.jpg","https://i.pinimg.com/originals/da/07/1a/da071a5fafbc6487d38edd4e9f3401db.jpg","https://i.pinimg.com/originals/54/f4/26/54f42615f9ad45743e6fb08ed86623f0.jpg"]
                let cewelh = itemslh[Math.floor(Math.random() *itemslh.length)]
                geps.sendFileFromUrl(self, cewelh, 'ptlsh.jpeg', 'Wkwkwkw', id)
                break
            case prefix+'cogan':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const lista = ["https://croedil.com/wp-content/uploads/2020/04/jmet-6.jpg","https://1.bp.blogspot.com/-VgD8M3SboB4/VjrXsjMuqVI/AAAAAAAAAEw/u3XH204M-v4/s1600/emo-alay.jpg,","https://cdn.idntimes.com/content-images/qna/2020/04/1127-0e907286abdd5b121c1ba478bf438740_600x400.jpg","https://pbs.twimg.com/media/EZurOJKUYAA9SOm.jpg","https://cdn-brilio-net.akamaized.net/news/2020/05/08/184074/1223821-8-penampakan-tokoh-upin-ipin-jadi-jamet.jpg","https://i1.sndcdn.com/avatars-000563943594-kprysk-t500x500.jpg","https://4.bp.blogspot.com/-tipqBt89hso/UEp1Kbk57BI/AAAAAAAAA3I/UkCWeaubvY8/s280/531597_204824659645932_284866801_n.jpg","https://i.pinimg.com/236x/f2/cd/f2/f2cdf277b050a4177a413cbb1a3670a2.jpg","https://3.bp.blogspot.com/-fX4LAMxwtTw/T0pK9AMCk_I/AAAAAAAAADY/Vjycs-5daNk/s1600/383980_317815444909102_100000419486231_1170665_1061758354_n.jpg","https://2.bp.blogspot.com/-6ClgolefeeM/U-uDyvQRA3I/AAAAAAAALmY/sx7_-93-qac/s1600/MANUSIA%2BPALING%2BJELEK%2BSEDUNIA.jpg","https://jajanksblog.files.wordpress.com/2012/02/hikmah2bjadi2borang2bjelek.jpg"]
                let ra = lista[Math.floor(Math.random() * lista.length)]
                geps.sendFileFromUrl(self, ra, 'cwo.jpeg', 'nih cogan !')
                break
            case prefix+'dadu':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const dice = Math.floor(Math.random() * 6) + 1
                await geps.sendStickerfromUrl(self, 'https://www.random.org/dice/dice' + dice + '.png', { method: 'get' })
                break
            case prefix+'koin':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const side = Math.floor(Math.random() * 2) + 1
                if (side == 1) {
                geps.sendStickerfromUrl(self, 'https://i.ibb.co/YTWZrZV/2003-indonesia-500-rupiah-copy.png', { method: 'get' })
                } else {
                geps.sendStickerfromUrl(self, 'https://i.ibb.co/bLsRM2P/2003-indonesia-500-rupiah-copy-1.png', { method: 'get' })
                }
                break
            case prefix+'ptl':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                const pptl = ["https://i.pinimg.com/564x/b2/84/55/b2845599d303a4f8fc4f7d2a576799fa.jpg","https://i.pinimg.com/236x/98/08/1c/98081c4dffde1c89c444db4dc1912d2d.jpg","https://i.pinimg.com/236x/a7/e2/fe/a7e2fee8b0abef9d9ecc8885557a4e91.jpg","https://i.pinimg.com/236x/ee/ae/76/eeae769648dfaa18cac66f1d0be8c160.jpg","https://i.pinimg.com/236x/b2/84/55/b2845599d303a4f8fc4f7d2a576799fa.jpg","https://i.pinimg.com/564x/78/7c/49/787c4924083a9424a900e8f1f4fdf05f.jpg","https://i.pinimg.com/236x/eb/05/dc/eb05dc1c306f69dd43b7cae7cbe03d27.jpg","https://i.pinimg.com/236x/d0/1b/40/d01b40691c68b84489f938b939a13871.jpg","https://i.pinimg.com/236x/31/f3/06/31f3065fa218856d7650e84b000d98ab.jpg","https://i.pinimg.com/236x/4a/e5/06/4ae5061a5c594d3fdf193544697ba081.jpg","https://i.pinimg.com/236x/56/45/dc/5645dc4a4a60ac5b2320ce63c8233d6a.jpg","https://i.pinimg.com/236x/7f/ad/82/7fad82eec0fa64a41728c9868a608e73.jpg","https://i.pinimg.com/236x/ce/f8/aa/cef8aa0c963170540a96406b6e54991c.jpg","https://i.pinimg.com/236x/77/02/34/77023447b040aef001b971e0defc73e3.jpg","https://i.pinimg.com/236x/4a/5c/38/4a5c38d39687f76004a097011ae44c7d.jpg","https://i.pinimg.com/236x/41/72/af/4172af2053e54ec6de5e221e884ab91b.jpg","https://i.pinimg.com/236x/26/63/ef/2663ef4d4ecfc935a6a2b51364f80c2b.jpg","https://i.pinimg.com/236x/2b/cb/48/2bcb487b6d398e8030814c7a6c5a641d.jpg","https://i.pinimg.com/236x/62/da/23/62da234d941080696428e6d4deec6d73.jpg","https://i.pinimg.com/236x/d4/f3/40/d4f340e614cc4f69bf9a31036e3d03c5.jpg","https://i.pinimg.com/236x/d4/97/dd/d497dd29ca202be46111f1d9e62ffa65.jpg","https://i.pinimg.com/564x/52/35/66/523566d43058e26bf23150ac064cfdaa.jpg","https://i.pinimg.com/236x/36/e5/27/36e52782f8d10e4f97ec4dbbc97b7e67.jpg","https://i.pinimg.com/236x/02/a0/33/02a033625cb51e0c878e6df2d8d00643.jpg","https://i.pinimg.com/236x/30/9b/04/309b04d4a498addc6e4dd9d9cdfa57a9.jpg","https://i.pinimg.com/236x/9e/1d/ef/9e1def3b7ce4084b7c64693f15b8bea9.jpg","https://i.pinimg.com/236x/e1/8f/a2/e18fa21af74c28e439f1eb4c60e5858a.jpg","https://i.pinimg.com/236x/22/d9/22/22d9220de8619001fe1b27a2211d477e.jpg","https://i.pinimg.com/236x/af/ac/4d/afac4d11679184f557d9294c2270552d.jpg","https://i.pinimg.com/564x/52/be/c9/52bec924b5bdc0d761cfb1160865b5a1.jpg","https://i.pinimg.com/236x/1a/5a/3c/1a5a3cffd0d936cd4969028668530a15.jpg"]
                let pep = pptl[Math.floor(Math.random() * pptl.length)]
                geps.sendFileFromUrl(self, pep, 'pptl.jpg', 'Nehhh', id)
                break
                case prefix+'bass':{
                    if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                    if (!isQuotedAudio) return await geps.reply(self, `Reply vnnya kaka dengan valuenya\nContoh : ${prefix}bass 1000`, id)
                    if (isLimit(serial)) return
                    await limitAdd(serial)
                    if (isQuotedAudio) {
                        let dB = 20
                        let freq = 60
                        if (args[0]) dB = clamp(parseInt(args[0]) || 20, 0, 50)
                        if (args[1]) freq = clamp(parseInt(args[1]) || 20, 20, 500)
                        let mediaData = await decryptMedia(quotedMsg)
                        let temp = './temp'
                        let name = new Date() * 1
                        let fileInputPath = path.join(temp, 'audio', `${name}.mp3`)
                        let fileOutputPath = path.join(temp, 'audio', `${name}_2.mp3`)
                        console.log(color('[fs]', 'green'), `Writing media into '${fileInputPath}'`)
                        //geps.reply(self, 'tunggu ya sedang diproses', ('mp3', 'mp3', `Bass ${freq}hz: +${dB}dB`), id)
                        fs.writeFile(fileInputPath, mediaData, err => {
                            if (err) return geps.sendText(self, 'Ada yang error saat menulis file', id)
                            ffmpeg(fileInputPath)
                                .audioFilter('equalizer=f=' + freq + ':width_type=o:width=2:g=' + dB)
                                .format('mp3')
                                .on('start', function (commandLine) {
                                    //console.log(color('[FFmpeg]', 'green'), commandLine)
                                })
                                .on('progress', function (progress) {
                                    //console.log(color('[FFmpeg]', 'green'), progress)
                                })
                                .on('end', function () {
                                    console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                    // fs.readFile(fileOutputPath, { encoding: 'base64' }, (err, base64) => {
                                    // if (err) return client.sendText(self, 'Ada yang error saat membaca file .mp3') && console.log(color('[ERROR]', 'red'), err)
                                    geps.sendPtt(self, fileOutputPath, id)
                                    // })
                                    setTimeout(() => {
                                        try {
                                            fs.unlinkSync(fileInputPath)
                                            fs.unlinkSync(fileOutputPath)
                                        } catch (e) { _err(e) }
                                    }, 30000)
                                })
                                .save(fileOutputPath)
                        })
                    }
                }
                break
            case prefix+'trending':
            case prefix+'trendtwit':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                misc.trendingTwt()
                    .then(async ({ result }) => {
                        let txt = '*「 TRENDING TWITTER 」*'
                        for (let i = 0; i < result.length; i++) {
                            const { hastag, rank, tweet, link } = result[i]
                            txt += `\n\n${rank}. *${hastag}*\n➸ *Tweets*: ${tweet}\n➸ *Link*: ${link}`
                        }
                        await geps.reply(self, txt, id)
                        console.log('Success sending trending!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'jobseek':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                misc.jobSeek()
                    .then(async ({ result }) => {
                        let txt = '*「 JOB SEEKER 」*'
                        for (let i = 0; i < result.length; i++) {
                            const { perusahaan, link, profesi, gaji, lokasi, pengalaman, edukasi, desc, syarat } = result[i]
                            txt += `\n\n➸ *Perusahaan*: ${perusahaan}\n➸ *Lokasi*: ${lokasi}\n➸ *Profesi*: ${profesi}\n➸ *Gaji*: ${gaji}\n➸ *Pengalaman*: ${pengalaman}\n➸ *Deskripsi*: ${desc}\n➸ *Syarat*: ${syarat}\n➸ *Edukasi*: ${edukasi}\n➸ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(self, txt, id)
                        console.log('Success sending jobseek!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'spamcall':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (args.length !== 1) return await geps.reply(self, ind.wrongFormat(), id)
                if (isNaN(Number(args[0]))) return await geps.reply(self, ind.wrongFormat())
                arg = body.trim().split(' ')
                console.log(...arg[1])
                var slicedArgs = Array.prototype.slice.call(arg, 1);
                console.log(slicedArgs)
                const spam = await slicedArgs.join(' ')
                console.log(spam)
                const call2 = await axios.get('https://mhankbarbar.tech/api/spamcall?no=' + spam)
                const { logs } = call2.data
                await geps.sendText(self, `Logs : ${logs}` + '.')
                break

case prefix+'qmo':

geps.reply(self, quotedMsgObj.id, id)

break


            case prefix+'spamsms':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (args.length !== 2) return await geps.reply(self, ind.wrongFormat(), id)
                if (isNaN(Number(args[0])) && isNaN(Number(args[1]))) return await geps.reply(self, ind.wrongFormat(), id)
                if (Number(args[1]) > 10) return await geps.reply(self, 'Maximum 10 SMS.', id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                misc.spamsms(args[0], args[1])
                    .then(async ({ status, logs, msg }) => {
                        if (status !== 200) {
                            await geps.reply(self, msg, id)
                        } else {
                            await geps.reply(self, logs, id)
                            console.log('Success sending spam!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'menu':
            case prefix+'help':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const rankUser = level.getLevelingLevel(sender.id, _level)
                const jumlahUser = _registered.length
                const levelMenu = level.getLevelingLevel(sender.id, _level)
                const xpMenu = level.getLevelingXp(sender.id, _level)
                const reqXpMenu = 200 * (Math.pow(2, levelMenu) - 1)
                function format(seconds){
                    function pad(s){
                    return (s < 10 ? '0' : '') + s;
                    }

                    var hours = Math.floor(seconds / (60*60));
                    var minutes = Math.floor(seconds % (60*60) / 60);
                    var seconds = Math.floor(seconds % 60);

                    return pad(hours) + 'H ' + pad(minutes) + 'M ' + pad(seconds) + 'S';
                    }

                    var uptime = process.uptime();
                geps.reply(self, `┌──「 *ICHI X AISHA - BOT* 」
│
├「 *USER STATUS* 」
│
├ *Nama* : ${pushname}
├ *Level* : ${levelMenu}
├ *XP* : ${xpMenu}
├ *Rank* : ${role}
├ *Premium* : ${isPremium ? 'YES' : 'NO'}
├ *Total user* : ${jumlahUser}
├ *īchixaishh.wtf*
│
├「 INFORMATION 」
│
├ ${prefix}runtime
├ ${prefix}ping
├ ${prefix}speed
├ ${prefix}iklan
├ ${prefix}info
├ ${prefix}limit
├ ${prefix}limitmining
├ ${prefix}snk
├ ${prefix}donate
├ ${prefix}botgroup
├ ${prefix}owner
├ ${prefix}listbanned
├ ${prefix}listblock
├ ${prefix}listpremium
│
├「 SYSTEM-MENU 」
│
├ ${prefix}nsfw enable|disable
├ ${prefix}welcome enable|disable
├ ${prefix}simi enable|disable
├ ${prefix}antilink enable|disable
├ ${prefix}autosticker enable|disable
├ ${prefix}antinsfw enable|disable
├ ${prefix}leveling enable|disable
├ ${prefix}balance enable|disable
├ ${prefix}cekbalance
├ ${prefix}ceklevel
├ ${prefix}topbalance
├ ${prefix}toplevel
│
├「 OWNER-MENU 」
│
├ ${prefix}getses
├ ${prefix}exif pack_name | author_name
├ ${prefix}shutdown
├ ${prefix}bc
├ ${prefix}leaveall
├ ${prefix}block 𝟼𝟸𝟾𝟻𝟾xxxxx
├ ${prefix}unblock 𝟼𝟸𝟾𝟻𝟾xxxxx
├ ${prefix}restart
├ ${prefix}eval [kode javascript]
├ ${prefix}setname
├ ${prefix}setstatus
├ ${prefix}setpict
├ ${prefix}banchat
├ ${prefix}premium add 𝟼𝟸𝟾𝟻𝟾xxxxx 30d
├ ${prefix}premium del 𝟼𝟸𝟾𝟻𝟾xxxxx
├ ${prefix}unbanchat
│
├「 PREMIUM-MENU 」
│
├ ${prefix}ban add/del @tag
├ ${prefix}kickreply [replychatmember]
├ ${prefix}edotensei @tagmember
├ ${prefix}animesearch [optional]
├ ${prefix}yts [optional]
├ ${prefix}shopee [optional]
├ ${prefix}playstore [optional]
│
├「 STICKER-MENU 」
│
├ ${prefix}snobg [reply image]
├ ${prefix}stickerwaifu
├ ${prefix}striggered [reply image]
├ ${prefix}sticker [reply image]
├ ${prefix}sgif
├ ${prefix}ttg [teks]
├ ${prefix}ttp [teks]
├ ${prefix}ttps [teks]
├ ${prefix}tosticker [reply chat]
├ ${prefix}stickerp [reply image]
├ ${prefix}stcwm author | packname
├ ${prefix}takestick author | packname
├ ${prefix}stcmeme teksatas | teksbawah
├ ${prefix}esticker [emoji]
│
├「 PRAY-MENU 」
│
├ ${prefix}alkitabharian
├ ${prefix}renungan
├ ${prefix}alkitab [nama_injil]
├ ${prefix}quran [urutan surah]
├ ${prefix}tafsir [nama surah] [ayat]
├ ${prefix}jadwalsholat [daerah]
├ ${prefix}listsurah
│
├「 KERANG-MENU 」
│
├ ${prefix}apakah [optional]
├ ${prefix}rate [optional]
├ ${prefix}bisakah [optional]
├ ${prefix}kapankah [optional]
├ ${prefix}ratecantik [optional]
├ ${prefix}ratetampan [optional]
├ ${prefix}ratelesbi [optional]
├ ${prefix}rategay [optional]
│
├「 ANIME-MENU 」
│
├ ${prefix}maluser [optional]
├ ${prefix}nhentaipdf [KODE NUKLIR]
├ ${prefix}samehadaku [optional]
├ ${prefix}wallanime
├ ${prefix}kemono
├ ${prefix}loli
├ ${prefix}shota
├ ${prefix}waifu
├ ${prefix}husbu
├ ${prefix}wait [reply image]
├ ${prefix}malanime [optional]
├ ${prefix}malcharacter [optional]
├ ${prefix}animesearch [optional]
├ ${prefix}anoboylast
├ ${prefix}neonimelast
├ ${prefix}randomcry
├ ${prefix}randomanime
├ ${prefix}randomkiss
├ ${prefix}randomhug
│
├「 MEDIA-MENU 」
│
├ ${prefix}togel
├ ${prefix}cineplexlast
├ ${prefix}lk21 [optional]
├ ${prefix}mediafire [LINK]
├ ${prefix}heroml [optional]
├ ${prefix}shortbitly [LINK]
├ ${prefix}shorttiny [LINK]
├ ${prefix}subreddit [optional]
├ ${prefix}happymod [optional]
├ ${prefix}moddroid [optional]
├ ${prefix}tiktokstalk [username]
├ ${prefix}trending
├ ${prefix}findsticker [optional]
├ ${prefix}gsmarena [optional]
├ ${prefix}pasangan nama | pasangan
├ ${prefix}artinama [optional]
├ ${prefix}movie [optional]
├ ${prefix}wallpaper
├ ${prefix}nulis [teks]
├ ${prefix}resepmakanan [optional]
├ ${prefix}tts kode bahasa | teksnya
├ ${prefix}igstalk [username]
├ ${prefix}tiktokstalk [username]
├ ${prefix}smulestalk [username]
├ ${prefix}kbbi [optional]
├ ${prefix}wiki [optional]
├ ${prefix}google [optional]
├ ${prefix}pinterest [optional]
├ ${prefix}brainly [optional]
├ ${prefix}lirik [optional]
├ ${prefix}qrcode [optional]
├ ${prefix}maps [optional]
├ ${prefix}whois [ipnya]
├ ${prefix}ssweb [linknya]
├ ${prefix}shorturl [linknya]
│
├「 NSFW-MENU 」
│
├ ${prefix}nekopoihentai
├ ${prefix}nekopoijav
├ ${prefix}3dnekopoilast
├ ${prefix}nekopoicosplay
├ ${prefix}fetish armpits
├ ${prefix}fetish feets
├ ${prefix}fetish thighs
├ ${prefix}fetish ass
├ ${prefix}fetish boobs
├ ${prefix}fetish belly
├ ${prefix}fetish sideboobs
├ ${prefix}fetish ahegao
├ ${prefix}lewds
├ ${prefix}mlewd
├ ${prefix}femdom
├ ${prefix}lewdavatar
├ ${prefix}yuri
├ ${prefix}phdl [url]
├ ${prefix}waifu18
├ ${prefix}nekosearch [optional]
├ ${prefix}randomhentai
├ ${prefix}randomnsfwneko
├ ${prefix}randomtrapnime
├ ${prefix}randomblowjob
├ ${prefix}nhsearch [optional]
├ ${prefix}nhentai [kode]
├ ${prefix}nhdl [kode]
├ ${prefix}nekopoilast
│
├「 GROUP-MENU 」
│
├ ${prefix}autoopen 10s/10m/10h
├ ${prefix}autoclose 10s/10m/10h
├ ${prefix}infoauto
├ ${prefix}tagme
├ ${prefix}grayscale @tag/me
├ ${prefix}beautiful @tag/me
├ ${prefix}blur @tag/me
├ ${prefix}invert @tag/me
├ ${prefix}jokeoverhead @tag/me
├ ${prefix}hitler @tag/me
├ ${prefix}pacefalm @tag/me
├ ${prefix}circle @tag/me
├ ${prefix}clyde [teks]
├ ${prefix}changemymind [teks]
├ ${prefix}sepia @tag/me
├ ${prefix}shit @tag/me
├ ${prefix}rainbow @tag/me
├ ${prefix}rip @tag/me
├ ${prefix}wanted @tag/me
├ ${prefix} [teks]
├ ${prefix}reminder 10s | pesan_pengingat
├ ${prefix}jadian
├ ${prefix}fun [tanya]
├ ${prefix}truth
├ ${prefix}dare
├ ${prefix}tod
├ ${prefix}ava [reply chat orang]
├ ${prefix}afk [alasan]
├ ${prefix}setgrupname [optional]
├ ${prefix}sider [reply chat bot]
├ ${prefix}linkgrup
├ ${prefix}resetlinkgrup
├ ${prefix}setgroupicon
├ ${prefix}groupinfo
├ ${prefix}add 628xxxx
├ ${prefix}kick @tag
├ ${prefix}promote @tag
├ ${prefix}demote @tag
├ ${prefix}tagall
├ ${prefix}adminlist
├ ${prefix}ownergroup
├ ${prefix}leave
├ ${prefix}delete [reply chat bot]
├ ${prefix}opengc
├ ${prefix}closegc
│
├「 FUN-MENU 」
│
├ ${prefix}mining
├ ${prefix}cekwatak
├ ${prefix}family100
├ ${prefix}tebakgambar
├ ${prefix}caklontong
├ ${prefix}citacita
├ ${prefix}toxic
├ ${prefix}talk [teks]
├ ${prefix}addsay [teks]
├ ${prefix}delsay [teks]
├ ${prefix}say
├ ${prefix}partner
├ ${prefix}next
├ ${prefix}hug @tagmember
├ ${prefix}pat @tagmember
├ ${prefix}nye @tagmember
├ ${prefix}saylist
├ ${prefix}slap @tagmember
│
├「 DOWNLOADER-MENU 」
│
├ ${prefix}indoxxi [optional]
├ ${prefix}ytmp3 [link]
├ ${prefix}ytmp4 [link]
├ ${prefix}igdl [link]
├ ${prefix}fb [link]
├ ${prefix}twitter [link]
├ ${prefix}smule [link]
├ ${prefix}tiktokpic [username]
├ ${prefix}tiktoknowm [link]
├ ${prefix}tiktok [link]
├ ${prefix}starmaker [link]
├ ${prefix}joox [optional]
├ ${prefix}play [optional]
├ ${prefix}igstory [optional]
│
├「 MAKER-MENU 」
│
├ ${prefix}cute [reply image]
├ ${prefix}affect [reply image]
├ ${prefix}deletedd [reply image]
├ ${prefix}gay [reply image]
├ ${prefix}jail [reply image]
├ ${prefix}trash [reply image]
├ ${prefix}captcha [reply image]
├ ${prefix}blurpify [reply image]
├ ${prefix}deepfry [reply image]
├ ${prefix}threats [reply image]
├ ${prefix}captain [teks]
├ ${prefix}kanna [teks]
├ ${prefix}trumptweet [teks]
├ ${prefix}luxury [teks]
├ ${prefix}vintage [teks]
├ ${prefix}summer [teks]
├ ${prefix}realcloud [teks]
├ ${prefix}pantai [teks]
├ ${prefix}pantai2 [teks]
├ ${prefix}balon [teks]
├ ${prefix}lem [teks]
├ ${prefix}gplaybutton [teks]
├ ${prefix}splaybutton [teks]
├ ${prefix}cmd [teks]
├ ${prefix}tahta [teks]
├ ${prefix}galaxy [teks]
├ ${prefix}blmaker nama1 | nama2
├ ${prefix}mlmaker nama_hero | teks
├ ${prefix}firemaker [teks]
├ ${prefix}blackpink [teks]
├ ${prefix}ffbanner teks1 | teks2
├ ${prefix}fflogo teks1 | teks2
├ ${prefix}phcomment username | teks
├ ${prefix}text3d [teks]
├ ${prefix}glitchtext teks1 | teks2
├ ${prefix}calender [reply image]
├ ${prefix}neongreen [teks]
├ ${prefix}neonblue [teks]
├ ${prefix}tiktod teks1|teks2
├ ${prefix}hemker [teks]
├ ${prefix}wolf1 teks|teks
├ ${prefix}wolf2 teks|teks
├ ${prefix}ttps [teks]
├ ${prefix}ttp [teks]s
├ ${prefix}ttg [teks]
├ ${prefix}sandwriting [teks]
├ ${prefix}joker [teks]
├ ${prefix}singa teks|teks
├ ${prefix}ninja teks|teks
├ ${prefix}beruang [teks]
├ ${prefix}rabbit [teks]
├ ${prefix}weasel [teks]
├ ${prefix}dragon [teks]
├ ${prefix}wolfblue [teks]
├ ${prefix}shark [teks]
├ ${prefix}phmaker teks_kiri | teks_kanan
├ ${prefix}esticker [emoji]
│
├「 OTHER-MENU 」
│
├ ${prefix}apkpure [optional]
├ ${prefix}randompic
├ ${prefix}darkjokes
├ ${prefix}randompuisi
├ ${prefix}cersex
├ ${prefix}infoloker
├ ${prefix}bucin
├ ${prefix}infomobil [optional]
├ ${prefix}infomotor [optional]
├ ${prefix}zodiak [optional]
├ ${prefix}me
├ ${prefix}fakename
├ ${prefix}triggered [reply pesan]
├ ${prefix}weton tanggal | bulan | tahun
├ ${prefix}spamsms 0812xxxxxxxx jumlah_pesan
├ ${prefix}spamcall 812xxxxxxxx
├ ${prefix}motivasi
├ ${prefix}cekongkir kurir | asal | tujuan
├ ${prefix}tosticker [reply chat orang]
├ ${prefix}hilih [reply chat]
├ ${prefix}halah [reply chat]
├ ${prefix}holoh [reply chat]
├ ${prefix}heleh [reply chat]
├ ${prefix}huluh [reply chat]
├ ${prefix}cekpremium
├ ${prefix}readmore teks1 | teks2
├ ${prefix}imgtourl
├ ${prefix}infohoax
├ ${prefix}jobseek
├ ${prefix}asupan
├ ${prefix}wasted [reply image]
├ ${prefix}kiss [reply chat]
├ ${prefix}jadwalbola
├ ${prefix}news
├ ${prefix}newsline
├ ${prefix}distance daerah1 | daerah2
├ ${prefix}addimage [teks]
├ ${prefix}getimage [nama]
├ ${prefix}imagelist
├ ${prefix}addvn [reply vn]
├ ${prefix}getvn [nama vn]
├ ${prefix}listvn
├ ${prefix}linesticker [link]
├ ${prefix}trendtwit
├ ${prefix}cecan
├ ${prefix}cogan
├ ${prefix}estetik
├ ${prefix}bass [reply vn]
├ ${prefix}tomp3 [reply video]
├ ${prefix}flip
├ ${prefix}katabijak
├ ${prefix}fakta
├ ${prefix}pantun
├ ${prefix}bahasa
├ ${prefix}toimg
├ ${prefix}neko
├ ${prefix}nomorhoki [nohp]
├ ${prefix}artimimpi [optional]
├ ${prefix}infoalamat [optional]
├ ${prefix}pokemon
├ ${prefix}inu
├ ${prefix}quotes
├ ${prefix}infogempa
├ ${prefix}ptl
├ ${prefix}dadu
├ ${prefix}koin
├ ${prefix}bugreport [ᴛᴇᴋs]
├ ${prefix}listblock
├ ${prefix}listbanned
├ ${prefix}listgroup
│
└──「 *ICHI X AISHA - BOT* 」
`, id)
                break
            case prefix+'group':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, 'Fitur ini hanya bisa di gunakan dalam group', id)
                if (!isGroupAdmins) return geps.reply(self, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
                if (!isBotGroupAdmins) return geps.reply(self, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
                if (args.length === 1) return geps.reply(self, 'Pilih open atau close!', id)
                if (args[0].toLowerCase() === 'open') {
                    geps.setGroupToAdminsOnly(groupId, false)
                    geps.sendTextWithMentions(self, `Group telah dibuka oleh admin @${sender.id.replace('@c.us', '')}\nSekarang *semua member* dapat mengirim pesan`)
                } else if (args[1].toLowerCase() === 'close') {
                    geps.setGroupToAdminsOnly(groupId, true)
                    geps.sendTextWithMentions(self, `Group telah ditutup oleh admin @${sender.id.replace('@c.us', '')}\nSekarang *hanya admin* yang dapat mengirim pesan`)
                } else {
                    geps.reply(self, 'Pilih open atau disable close!', id)
                }
                break
            case prefix+'infoauto':
                geps.reply(self, ind.ingfoautoclose(), id)
                break
            case prefix+'opengc':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, 'Fitur ini hanya bisa di gunakan dalam group', id)
                if (!isGroupAdmins) return geps.reply(self, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
                if (!isBotGroupAdmins) return geps.reply(self, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
                geps.setGroupToAdminsOnly(groupId, false)
                geps.sendTextWithMentions(self, `Group telah dibuka oleh admin @${sender.id.replace('@c.us', '')}\nSekarang *semua member* dapat mengirim pesan`)
                break
            case prefix+'closegc':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, 'Fitur ini hanya bisa di gunakan dalam group', id)
                if (!isGroupAdmins) return geps.reply(self, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
                if (!isBotGroupAdmins) return geps.reply(self, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
                geps.setGroupToAdminsOnly(groupId, true)
                geps.sendTextWithMentions(self, `Group telah ditutup oleh admin @${sender.id.replace('@c.us', '')}\nSekarang *semua member* tidak dapat mengirim pesan`)
                break
            case prefix+'kapankah':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const when = args.join(' ')
                const kapankah = ['1 Minggu lagi', 'Tidak mungkin', '1 Bulan lagi', '1 Tahun lagi']
                const ans = kapankah[Math.floor(Math.random() * (kapankah.length))]
                if (!when) geps.reply(self, 'Format salah! Ketik *#menu* untuk penggunaan.')
                await geps.reply(self, `Pertanyaan: *${when}* \n\nJawaban: ${ans}`, id)
                break
            case prefix+'nilai':
            case prefix+'rate':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const rating = args.join(' ')
                const rate = ['100%', '95%', '90%', '85%', '80%', '75%', '70%', '65%', '60%', '55%', '50%', '45%', '40%', '35%', '30%', '25%', '20%', '15%', '10%', '5%']
                const awr = rate[Math.floor(Math.random() * (rate.length))]
                if (!rating) geps.reply(self, 'Format salah! Ketik *#menu* untuk penggunaan.')
                await geps.reply(self, `Pertanyaan: *${rating}* \n\nJawaban: ${awr}`, id)
                break
            case prefix+'apakah':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const nanya = args.join(' ')
                const apakah = ['Ya', 'Tidak', 'Mungkin', 'Coba Ulangi']
                const jawab = apakah[Math.floor(Math.random() * (apakah.length))]
                if (!nanya) geps.reply(self, 'Format salah! Ketik *#menu* untuk penggunaan.')
                await geps.reply(self, `Pertanyaan: *${nanya}* \n\nJawaban: ${jawab}`, id)
                break
            case prefix+'bisakah':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const bsk = args.join(' ')
                const bisakah = ['Bisa', 'Tidak Bisa', 'Mungkin', 'Coba Ulangi']
                const jbsk = bisakah[Math.floor(Math.random() * (bisakah.length))]
                if (!bsk) geps.reply(self, 'Format salah! Ketik *#menu* untuk penggunaan.')
                await geps.reply(self, `Pertanyaan: *${bsk}* \n\nJawaban: ${jbsk}`, id)
                break
            case prefix+'rategay':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                const ratings = args.join(' ')
                const kimakss_ = body.slice(9)
                const rategay = ['100%\n*Mending lu ganti kartu daripada dishot 1 by 1*', '95%\n*Milos Detected*', '90%', '85%', '80%', '75%', '70%', '60%', '50%', '45%', '40%', '25%', '20%', '15%', '10%', '5%\n *AMAN BRO*']
                const awrs = rategay[Math.floor(Math.random() * (rategay.length))]
                if (!ratings) geps.reply(self, 'Format salah! Ketik *#menu* untuk penggunaan.')
                await geps.reply(self, `Seberapa Gay : *${kimakss_}*\nJawaban : *${awrs}*`, id)
                break
            case prefix+'ratelesbi':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                const ratingss = args.join(' ')
                const kimaksss_ = body.slice(11)
                const ratelesbi = ['100%', '95%', '90%', '85%', '80%', '75%', '70%', '65%', '60%', '55%', '50%', '45%', '40%', '35%', '30%', '25%', '20%', '15%', '10%', '5%']
                const awrss = ratelesbi[Math.floor(Math.random() * (ratelesbi.length))]
                if (!ratingss) geps.reply(self, 'Format salah! Ketik *#menu* untuk penggunaan.')
                await geps.reply(self, `Seberapa Lesbi : *${kimaksss_}*\nJawaban : *${awrss}*`, id)
                break
            case prefix+'ratetampan':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                const yodhiya = args.join(' ')
                const pukilol = body.slice(12)
                const ratetampan = ['*100%*\nJangan insecure bro,\nSoalnya lu Tampan bet:D', '*90%*\nLebih tampan nih orang daripada bts:v', '*80%*\nGila anaknya noah yaw?', '*70%*\nBukan maen nih anak', '*60%*\nYaelah masih kurang:v', '*50%*\nTerus berkembang bro', '*40%*\nLumayan sih:v', '*30%*\nMending lu rawat komok lagi dah', '*20%*\nnjir komoknya kek udin', '*10%*\nMuka apa talenan bro?', '*5%*\nMuka apa tembok kos"an?']
                const auah = ratetampan[Math.floor(Math.random() * (ratetampan.length))]
                if (!yodhiya) geps.reply(self, 'Formatsalah! Ketik *#menu* untuk penggunaan.')
                await geps.reply(self, `Nama : *${pukilol}*\nTingkat Ketampanan : ${auah}`, id)
                break
            case prefix+'ratecantik':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                const yodhiyaa = args.join(' ')
                const pukilols = body.slice(12)
                const ratecantik = ['*100%*\nJangan insecure bro,\nSoalnya Kawai bet:D', '*90%*\nLebih Kawaii nih orang daripada sagiri:v', '*80%*\nGila, Bapaknya sunat dimana?', '*70%*\nBukan maen nih anak', '*60%*\nYaelah masih kurang:v', '*50%*\nTerus berkembang bro', '*40%*\nLumayan sih:v', '*30%*\nMending lu rawat komok lagi dah', '*20%*\nnjir komoknya kek dia:v', '*10%*\nMuka apa talenan bro?', '*5%*\nMuka apa tembok kos"an?']
                const sygg = ratecantik[Math.floor(Math.random() * (ratecantik.length))]
                if (!yodhiyaa) geps.reply(self, 'Format salah! Ketik *#menu* untuk penggunaan.')
                await geps.reply(self, `Nama : *${pukilols}*\nTingkat kecantikan : ${sygg}`, id)
                break
            case prefix+'nhdl':
                // Premium unlocked
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                if (isGroupMsg) {
                    if (!isNsfw) return await geps.reply(self, ind.notNsfw(), id)
                    await geps.reply(self, ind.wait(), id)
                    const kode = args[0]
                    const validate = await nhentai.exists(kode)
                    if (validate === true) {
                        try {
                            const dojin = await nhentai.getDoujin(kode)
                            const { title } = dojin
                            await exec(`nhentai --id=${kode} --output=./temp/doujin/${kode} --format=${kode} --no-html --pdf --rm-origin-dir`)
                            await geps.sendFile(self, `./temp/doujin/${kode}/${kode}.pdf`, `${title}.pdf`, '', id)
                            fs.unlinkSync(`./temp/doujin/${kode}/${kode}.pdf`)
                        } catch (err) {
                            console.error(err)
                            await geps.reply(self, 'Error!', id)
                        }
                    } else {
                        await geps.reply(self, ind.nhFalse(), id)
                    }
                } else {
                    await geps.reply(self, ind.wait(), id)
                    const kode = args[0]
                    const validate = await nhentai.exists(kode)
                    if (validate === true) {
                        try {
                            const dojin = await nhentai.getDoujin(kode)
                            const { title } = dojin
                            await exec(`nhentai --id=${kode} --output=./temp/doujin/${kode} --format=${kode} --no-html --pdf --rm-origin-dir`)
                            await geps.sendFile(self, `./temp/doujin/${kode}/${kode}.pdf`, `${title}.pdf`, '', id)
                            fs.unlinkSync(`./temp/doujin/${kode}/${kode}.pdf`)
                        } catch (err) {
                            console.error(err)
                            await geps.reply(self, 'Error!', id)
                        }
                    } else {
                        await geps.reply(self, ind.nhFalse(), id)
                    }
                }
                break
            case prefix+'animesearch':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isPremium) return geps.reply(self, `Maaf kak ${pushname}\nPerintah ini hanya bisa digunakan user premium!`, id)
                const anser = body.slice(13)
                if (!anser) return geps.reply(self, `Kirim perintah ${prefix}animesearch [query], Contoh : ${prefix}animesearch DXD (Hanya Bisa Satu Kata)`, id)
                geps.reply(self, ind.wait(), id)
                try {
                    const response2 = await fetch(`https://mnazria.herokuapp.com/api/anime?query=${encodeURIComponent(anser)}`)
                    if (!response2.ok) throw new Error(`unexpected response ${response2.statusText}`)
                    const animeser = await response2.json()
                    const { result } = await animeser
                    let xixixi = `Hasil Pencarian : ${anser}\n`
                    for (let i = 0; i < result.length; i++) {
                        xixixi += `\n═════════════════\n\n*Judul* : ${result[i].title}\n*Ditonton* : ${result[i].url}\n`
                    }
                    await geps.reply(self, xixixi, id)
                } catch (err) {
                    console.log(err)
                    await geps.sendFileFromUrl(self, errorImg, 'error.png', '💔 Maaf, Anime tidak ditemukan')
                    geps.sendText(ownerNumber, 'Anime Search Error : ' + err)
                }
                break
            case prefix+'groupinfo':
            case prefix+'grupinfo':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                var totalMem = chat.groupMetadata.participants.length
                var desc = chat.groupMetadata.desc
                var groupnames = name
                var welgrp = _welcome.includes(chat.id)
                var ngrp = _nsfw.includes(chat.id)
                var antlink = _antilink.includes(chat.id)
                var simu = simi_.includes(chat.id)
                var levelings = _leveling.includes(chat.id)
                var balances = _balance.includes(chat.id)
                var autostick = _autosticker.includes(groupId)
                var antinsfw = _antinsfw.includes(groupId)
                var grouppic = await geps.getProfilePicFromServer(chat.id)
                if (grouppic == undefined) {
                    var pfp = errorurl
                } else {
                    var pfp = grouppic
                }
                await geps.sendFileFromUrl(self, pfp, 'group.png', `*「 GROUP INFO 」*

- *Name* : ${groupnames}
- *Members* : ${totalMem}
- *Welcome* : ${welgrp ? 'On' : 'Off'}
- *NSFW* : ${ngrp ? 'On' : 'Off'}
- *Simsimi* : ${simu ? 'On' : 'Off'}
- *Anti Link* : ${antlink ? 'On' : 'Off'}
- *Anti Nsfw* : ${antinsfw ? 'On' : 'Off'}
- *Auto Sticker* : ${autostick ? 'On' : 'Off'}
- *System Balance* : ${balances ? 'On' : 'Off'}
- *System Leveling* : ${levelings ? 'On' : 'Off'}
- *Group Description*
${desc}`)
                break
            case prefix+'fun':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, 'perintah ini hanya dapat digunakan di dalam grup', id)
                const tanyanya = body.slice(5)
                const groupMemeks = await geps.getGroupMembers(groupId)
                const memsmek = groupMemeks
                const auahajg = memsmek[Math.floor(Math.random() * memsmek.length)];
                const sapaa = `${tanyanya} adalah @${auahajg.id.replace(/@c.us/g, '')}`
                await geps.sendTextWithMentions(self, sapaa, id)
                break
            case prefix+'iklan':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.iklandulu(), id)
                break
            /*case prefix+'downloadmenu':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.menuDownloads(), id)
                break
            case prefix+'stickermenu':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.menuStikel(), id)
                break
            case prefix+'grupmenu':
            case prefix+'groupmenu':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.menuGrupnyee(), id)
                break
            case prefix+'makermenu':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.menuMaker(), id)
                break
            case prefix+'funmenu':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.menuFuns(), id)
                break
            case prefix+'ownermenu':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.menuOwners(), id)
                break
            case prefix+'nsfwmenu':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.menuNswfs(), id)
                break
            case prefix+'mediamenu':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.menuMedianye(), id)
                break
            case prefix+'animemenu':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.menuAnimek(), id)
                break
            case prefix+'kerangmenu':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.menuKerang(), id)
                break
            case prefix+'praymenu':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.menupraying(), id)
                break
            case prefix+'premiummenu':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.menuPremiums(), id)
                break
            case prefix+'othermenu':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.menuLainya(), id)
                break
            case prefix+'infomenu':
                 if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.menuIngfo(), id)
                break
            case prefix+'systemmenu':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.menuSystem(), id)
                break*/
            case prefix+'donate':
            case prefix+'donasi':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.donatenya(), id)
                break
            case prefix+'snk':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.snk(), id)
                break
            case prefix+'bahasa':
            case prefix+'listbahasa':
            case prefix+'bahasalist':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.listbahasatts(), id)
                break
            case prefix+'botgroup':
            case prefix+'botgrup':
            case prefix+'groupbot':
            case prefix+'grupbot':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.sendLinkWithAutoPreview(self, `Link Group ICHI X AISHA-BOT\nhttps://chat.whatsapp.com/HK8DMxzNRkR1XPzh4hAh98\nJangan Lupa Join Ya Kak ${pushname}`, id)
                break
            case prefix+'nsfw':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(self, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(self, ind.adminOnly(), id)
                if (ar[0] === 'enable') {
                    if (isNsfw) return await geps.reply(self, ind.nsfwAlready(), id)
                    _nsfw.push(groupId)
                    fs.writeFileSync('./database/group/nsfw.json', JSON.stringify(_nsfw))
                    await geps.reply(self, ind.nsfwOn(), id)
                } else if (ar[0] === 'disable') {
                    _nsfw.splice(groupId, 1)
                    fs.writeFileSync('./database/group/nsfw.json', JSON.stringify(_nsfw))
                    await geps.reply(self, ind.nsfwOff(), id)
                } else {
                    await geps.reply(self, ind.wrongFormat(), id)
                }
            break
            case prefix+'ping':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const loadedMsg = await geps.getAmountOfLoadedMessages()
                const chatIds = await geps.getAllChatIds()
                const groups = await geps.getAllGroups()
                const groupsIn = groups.filter(x => x.groupMetadata.participants.map(x => [botNumber, '79856996827@c.us'].includes(x.id._serialized)).includes(true))
                const me = await geps.getMe()
                const battery = await geps.getBatteryLevel()
                const isCharging = await geps.getIsPlugged()
                const cpus = os.cpus().map(cpu => {
                cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
                return cpu
                })
                geps.reply(self, `「 *𝙎𝙏𝘼𝙏𝙐𝙎 𝘾𝙃𝘼𝙏* 」

- *Loaded Messages* > ${loadedMsg}
- *Group Chats* > ${groups.length}
- *Group Joined* > ${groupsIn.length}
- *Group Left* > ${groups.length - groupsIn.length}
- *Personal Chats* > ${chatIds.length - groups.length}
- *Personal Chats Active* > ${chatIds.length - groups.length - groupsIn.length}
- *Total Chats* > ${chatIds.length}
- *Total Chats Active* > ${chatIds.length - groupsIn.length}
- *Charger* > ${isCharging}
- *Penggunaan RAM* > ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
- *Cpu* > ${cpus.length}
\n「 *𝙎𝙏𝘼𝙏𝙐𝙎 𝙃𝙋 𝘽𝙊𝙏* 」\n${(`
\n- *Battery* ${battery}% ${isCharging ? 'Loading Power...' : 'Power Ready!'}
${Object.keys(me.phone).map(key => `*- ${key}* > ${me.phone[key]}`).join('\n')}`.slice(1, -1))}\n\n\n*Speed* > Uwuuu!`, id)
                break
            case prefix+'listhell':
            case prefix+'helllist':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                let block = ind.listBlock(blockNumber)
                for (let i of blockNumber) {
                    block += `@${i.replace('@c.us', '')}\n`
                }
                await geps.reply(self, block, id)
            break
            case prefix+'speed':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const speeds = moment() / 1000 - t
                geps.reply(self, `「 *𝙎𝙋𝙀𝙀𝘿 𝙏𝙀𝙎𝙏* 」\nMerespon dalam ${speeds} Sec 💬`, id)
            break
            case prefix+'ownerbot':
            case prefix+'owner':
            case prefix+'creator':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                await geps.sendContact(self, ownerNumber)
            break
            case prefix+'listbanned':
                let bened = `This is list of banned number\nTotal : ${banned.length}\n`
                for (let i of banned) {
                    bened += `➸ ${i.replace(/@c.us/g, '')}\n`
                }
                await geps.reply(self, bened, id)
                break
            case prefix+'darkjokes':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                const djokes = await axios.get(`http://api.zeks.xyz/api/darkjokes?apikey=apivinz`)
                geps.sendFileFromUrl(self, djokes.data.result, 'djokes.jpg', `......`, id)
                break
            case prefix+'randompic':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                const rpic = await axios.get(`https://api.zeks.xyz/api/estetikpic?apikey=apivinz`)
                geps.sendFileFromUrl(self, rpic.data.result.result, 'Rpic.jpg', `Random Pic`, id)
                break
            case prefix+'tagme':
                geps.sendTextWithMentions(self, `@${sender.id.replace("@c.us", "")} Tagged`)
                break
            case prefix+'striggered':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(self, ind.wait(), id)
                    var encryptMedia = isQuotedImage ? quotedMsg : message
                    const smediaData = await decryptMedia(encryptMedia, uaOverride)
                    const simageLink = await uploadImages(smediaData, `calendar.${sender.id}`)
                    geps.sendStickerfromUrl(self, `http://api.zeks.xyz/api/triger?apikey=apivinz&img=${simageLink}`, { method: 'get' })
                }

                break
            case prefix+'delete':
            case prefix+'del':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!quotedMsg) return await geps.reply(self, ind.wrongFormat(), id)
                if (!quotedMsgObj.fromMe) return await geps.reply(self, ind.wrongFormat(), id)
                await geps.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
                break
            case prefix+'listgroup':
                geps.getAllGroups().then((res) => {
                let gc = `*This is list of group* :\n`
                for (let i = 0; i < res.length; i++) {
                gc += `\n═════════════════\n\n*No : ${i+1}*\n*Nama* : ${res[i].name}\n*Pesan Belum Dibaca* : ${res[i].unreadCount} chat\n*Tidak Spam* : ${res[i].notSpam}\n`
                }
                geps.reply(self, gc, id)
                })
                break
            case prefix+'report':
            case prefix+'bugreport':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.emptyMess(), id)
                const lastReport = limit.getLimit(sender.id, _limit)
                if (lastReport !== undefined && cd - (Date.now() - lastReport) > 0) {
                    const time = ms(cd - (Date.now() - lastReport))
                    await geps.reply(self, ind.limit(time), id)
                } else {
                    if (isGroupMsg) {
                        await geps.sendText(ownerNumber, `-----[ REPORT ]-----\n\n*From*: ${pushname}\n*ID*: ${sender.id}\n*Group*: ${(name || formattedTitle)}\n*Message*: ${q}`)
                        await geps.reply(self, ind.received(pushname), id)
                    } else {
                        await geps.sendText(ownerNumber, `-----[ REPORT ]-----\n\n*From*: ${pushname}\n*ID*: ${sender.id}\n*Message*: ${q}`)
                        await geps.reply(self, ind.received(pushname), id)
                    }
                    limit.addLimit(sender.id, _limit)
                }
            break
            case prefix+'premiumcheck':
            case prefix+'cekpremium':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isPremium) return await geps.reply(self, ind.notPremium(), id)
                const cekExp = ms(premium.getPremiumExpired(sender.id, _premium) - Date.now())
                await geps.reply(self, `*「 PREMIUM EXPIRE 」*\n\n➸ *ID*: ${sender.id}\n➸ *Premium left*: ${cekExp.days} day(s) ${cekExp.hours} hour(s) ${cekExp.minutes} minute(s)`, id)
            break
            case prefix+'premiumlist':
            case prefix+'listpremium':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                let listPremi = '「 *PREMIUM USER LIST* 」\n\n'
                let nomorList = 0
                const arrayPremi = []
                for (let i = 0; i < premium.getAllPremiumUser(_premium).length; i++) {
                    arrayPremi.push(await geps.getContact(premium.getAllPremiumUser(_premium)[i]))
                    nomorList++
                    listPremi += `${nomorList}. ${premium.getAllPremiumUser(_premium)[i]}\n➸ *Name*: ${arrayPremi[i].pushname}\n`
                }
                await geps.reply(self, listPremi, id)
            break
            case prefix+'limit':
                var found = false
                const limidat = JSON.parse(fs.readFileSync('./database/user/limit.json'))
                for (let lmt of limidat) {
                    if (lmt.id === serial) {
                        const limitCounts = limitCount - lmt.limit
                        if (limitCounts <= 0) return geps.reply(self, `Limit request anda sudah habis\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                        geps.reply(self, `Sisa limit request anda tersisa : *${limitCount}*\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                        found = true
                    }
                }
                //console.log(limit)
                //console.log(limidat) BLOCK AJA MERUSAK PEMANDANGAN SU:v
                if (found === false) {
                    let obj = { id: `${serial}`, limit: 1 };
                    limit.push(obj);
                    fs.writeFileSync('./database/user/limit.json', JSON.stringify(limit, 1));
                    geps.reply(self, `Sisa limit request anda tersisa : *${limitCount}*\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                }
                break
            case prefix+'limitmining':
                var found = false
                const limidata = JSON.parse(fs.readFileSync('./database/user/mining.json'))
                for (let lmt of limidata) {
                    if (lmt.id === serial) {
                        const limitMinings = limitMining - lmt.limit
                        if (limitMinings <= 0) return geps.reply(self, `Limit Mining anda sudah habis\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                        geps.reply(self, `Sisa limit Mining anda tersisa : *${limitMinings}*\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                        found = true
                    }
                }
                //console.log(limitmining)
                //console.log(limidata)
                if (found === false) {
                    let obj = { id: `${serial}`, limit: 1};
                    limitmining.push(obj);
                    fs.writeFileSync('./database/user/mining.json', JSON.stringify(limitmining, 1));
                    geps.reply(self, `Sisa limit Mining anda tersisa : *${limitMining}*\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                }
                break
            case prefix+'mining':
                if (isLimitMining(serial)) return
                limitAddMining(serial)
                const mathxpnye = Math.floor(Math.random() * 10) + 15
                level.addLevelingXp(sender.id, mathxpnye, _level)
                geps.reply(self, `Selamat kamu mendapatkan ${mathxpnye} XP!`, id)
                break
                case prefix+'miningpro':
                    if (!isOwner) return geps.reply(self, `lah?`, id)
                    const mathxpnyee = Math.floor(Math.random() * 10) + 100000000
                    level.addLevelingXp(sender.id, mathxpnyee, _level)
                    geps.reply(self, `Selamat kamu mendapatkan ${mathxpnyee} XP!`, id)
                    break
            /*case prefix+'buylimit':
                if (args[0] === '5') {
                    await geps.reply(self, ind.wait(), id)
                    let bayartagihan = 500
                    lessLevelingXpBalance(sender.id, bayartagihan, userbalance)
                    let obj = { id: `${serial}`, limit: 5 };
                    limit.push(obj);
                    fs.writeFileSync('./database/user/limit.json', JSON.stringify(limit, 5));
                    geps.reply(self, `Suceess Membeli 5 Limit dengan $ 500`, id)
                } else if (args[0] === '10') {
                    await geps.reply(self, ind.wait(), id)
                    let bayartagihan = 1000
                    lessLevelingXpBalance(sender.id, bayartagihan, userbalance)
                    let obj = { id: `${serial}`, limit: 10 };
                    limit.push(obj);
                    fs.writeFileSync('./database/user/limit.json', JSON.stringify(limit, 10));
                    geps.reply(self, `Suceess Membeli 10 Limit dengan $ 1000`, id)
                } else {
                    await geps.reply(self, `Opss`, id)
                }
                break
            case prefix+'tes':
                await limitAdd(serial)
                geps.reply(self, 'Okeh nyala', id)
                break
            /*case prefix+'buylimit':
                const payout = body.slice(10)
                if (!payout) return geps.reply(self, `Berapa limit yang mau di beli kak? Pastiin uang kakak cukup juga kak! \n\nCara cek uang: ${prefix}cekbalance`, id)
                const koinPerlimit = 1000
                const total = koinPerlimit * payout
                if (checkATMuser(sender) <= total) return geps.reply(self, `maaf uang kamu belum mencukupi. silahkan kumpulkan dan beli nanti`, id)
                if (checkATMuser(sender) >= total) {
                    confirmATM(sender, total)
                    bayarLimit(sender, payout)
                    await geps.reply(self, `*「 PEMBAYARANBERHASIL 」*\n\n*pengirim* : Admin\n*penerima* : ${pushname}\n*nominal pembelian* : ${payout} \n *harga limit* : ${koinPerlimit}/limit\n *sisa uang mu* : ${checkATMuser(sender)}\n\nproses berhasil dengan nomer pembayaran \n${createSerial(15)}`, id)
                }
                break*/
            case prefix+'getpic':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (mentionedJidList.length !== 0) {
                    const userPic = await geps.getProfilePicFromServer(mentionedJidList[0])
                    if (userPic === undefined) {
                        var pek = errorImg
                    } else {
                        pek = userPic
                    }
                    await geps.sendFileFromUrl(self, pek, 'pic.jpg', '', id)
                } else if (args.length !== 0) {
                    const userPic = await geps.getProfilePicFromServer(args[0] + '@c.us')
                    if (userPic === undefined) {
                        var peks = errorImg
                    } else {
                        peks = userPic
                    }
                    await geps.sendFileFromUrl(self, peks, 'pic.jpg', '', id)
                } else {
                    await geps.reply(self, ind.wrongFormat(), id)
                }
            break

            // Weeb zone
            case prefix+'neko':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                await geps.reply(self, ind.wait(), id)
                console.log('Getting neko image...')
                await geps.sendFileFromUrl(self, (await neko.sfw.neko()).url, 'neko.jpg', 'Neko', null, null, true)
                    .then(() => console.log('Success sending neko image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'nomorhoki':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                const nande = body.slice(11)
                if (!nande) return geps.reply(self, 'Kirim perintah *#nomorhoki [no hp kamu]*\nContoh : *#nomorhoki 089652903288*', id)
                try {
                const resp = await axios.get(`https://api.vhtear.com/nomerhoki?no=${nande}&apikey=${config.vhtear}`)
                if (resp.data.error) return geps.reply(self, resp.data.error, id)
                const anm2 = `➸ Hasil :\n ${resp.data.result.hasil}`
                geps.reply(self, anm2, id)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(self, errorImg, 'error.png', '💔️ Maaf, Nomor Hoki tidak ditemukan', id)
                    geps.sendText(ownerNumber, 'Nomorhoki Error : ' + err)
               }
                break
            case prefix+'artimimpi':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                const piye = body.slice(10)
                if (!piye) return geps.reply(self, 'Kirim perintah *#artimimpi [mimpi]*\nContoh : *#artimimpi ular*', id)
                try {
                const resp = await axios.get(`https://api.vhtear.com/artimimpi?query=${piye}&apikey=${config.vhtear}`)
                if (resp.data.error) return geps.reply(self, resp.data.error, id)
                const anm2 = `➸ Artimimpi : ${resp.data.result.hasil}`
                geps.reply(self, anm2, id)
                } catch (err) {
                console.error(err.message)
                await geps.sendFileFromUrl(self, errorImg, 'error.png', '💔️ Maaf, Mimpi tidak ditemukan', id)
                geps.sendText(ownerNumber, 'Artimimpi Error : ' + err)
                }
                break
            case prefix+'luxury':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (q.length > 15) return geps.reply(self, 'maximal 15 Huruf', id)
                geps.sendFileFromUrl(self, `https://arugaz.my.id/api/textpro/luxury?text=${q}`, 'luxvile.jpg', `Ini kak ${pushname}\n_*Dah Jadi_`, id)
                break
            case prefix+'stickerw':
            case prefix+'stickerwaifu':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const wast = ["0001", "0002", "0003", "0004", "0005", "0006", "0007", "0008", "0009", "0010", "0011", "0012", "0013", "0014", "0015", "0016", "0017", "0018", "0019", "0020", "0021", "0022", "0023", "0024", "0025", "0026", "0027", "0028", "0029", "0030", "0031", "0032", "0033", "0034", "0035", "0036", "0037", "0038", "0039", "0040", "0041", "0042", "0043", "0044", "0045", "0046", "0047", "0048", "0049", "0050", "0051", "0052", "0053", "0054", "0055", "0056", "0057", "0058", "0059", "0060", "0061", "0062", "0063", "0064", "0065", "0066", "0067", "0068", "0069", "0070", "0071", "0072", "0073", "0074", "0075", "0076", "0077", "0078", "0079", "0080", "0081", "0082", "0083", "0084", "0085", "0086", "0087", "0088", "0089", "0090", "0091", "0092", "0093", "0094", "0095", "0096", "0097", "0098", "0099"]
                const wast2 = wast[Math.floor(Math.random() * (wast.length))]
                await geps.sendStickerfromUrl(self, `http://randomwaifu.altervista.org/images/${wast2}.png`)
                break
            case prefix+'kanna':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                geps.sendFileFromUrl(self, `https://nekobot.xyz/api/imagegen?type=kannagen&text=${q}&raw=1`, `Nekonime.jpg`, 'Nehh...', id)
                break
            case prefix+'trumptweet':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                geps.sendFileFromUrl(self, `https://nekobot.xyz/api/imagegen?type=trumptweet&text=${q}&raw=1`, `Nekonime.jpg`, 'Nehh....', id)
                break
            case prefix+'nekopoi3d':
            case prefix+'3dnekopoi':
            case prefix+'3dnekopoilast':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isNsfw) return await geps.reply(self, ind.notNsfw(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                geps.reply(self, ind.wait(), id)
                try {
                    const bsangee = await axios.get(`https://api.vhtear.com/neko3d&apikey=${config.vhtear}`)
                    const bsangee2 = bsangee.data
                    let keluarplay = `*List update 3D JAV*\n`
                    for (let i = 0; i < bsangee2.result.length; i++) {
                        keluarplay += `\n═════════════════\n\n*Judul* : ${bsangee2.result[i].title}\n*Deskripsi* : ${bsangee2.result[i].description}\n*Link* : ${bsangee2.result[i].url}\n`
                    }
                    await geps.reply(self, keluarplay, id)
                } catch (err) {
                    console.log(err)
                    geps.reply(self, 'Opps error', id)
                }
                break
            case prefix+'nekopoijav':
            case prefix+'javnekopoi':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isNsfw) return await geps.reply(self, ind.notNsfw(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                geps.reply(self, ind.wait(), id)
                try {
                    const bsangce = await axios.get(`https://api.vhtear.com/nekojavlist&apikey=${config.vhtear}`)
                    const bsangce2 = bsangce.data
                    let keluarplay = `*List update JAV*\n`
                    for (let i = 0; i < bsangce2.result.length; i++) {
                        keluarplay += `\n═════════════════\n\n*Judul* : ${bsangce2.result[i].title}\n*Serial JAV* : ${bsangce2.result[i].seri}\n*Link* : ${bsangce2.result[i].url}\n`
                    }
                    await geps.reply(self, keluarplay, id)
                } catch (err) {
                    console.log(err)
                }
                break
            case prefix+'mostview':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.wait(), id)
                try {
                    const dataplai = await axios.get(`https://docs-jojo.herokuapp.com/api/mostviewfilm`)
                    const dataplay = dataplai.data
                    let mosviev = `*THIS IS MOST VIEWED MOVIE*\n`
                    for (let i = 0; i < dataplay.result.length; i++) {
                        mosviev += `\n═════════════════\n\n*Rank* : ${dataplay.result[i].rank}\n*Judul* : ${dataplay.result[i].title}\n*Penonton* : ${dataplay.result[i].penonton}\n*Information : ${dataplay.result[i].link}\n`
                    }
                    await geps.reply(self, mosviev, id)
                } catch (err) {
                    console.log(err)
                    geps.reply(self, 'Yah error..', id)
                }
                break
            case prefix+'nekopoihentai':
            case prefix+'hentainekopoi':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isNsfw) return await geps.reply(self, ind.notNsfw(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                geps.reply(self, ind.wait(), id)
                try {
                    const bsangpe = await axios.get(`https://api.vhtear.com/nekohentai&apikey=${config.vhtear}`)
                    const bsangpe2 = bsangpe.data
                    let keluarplay = `*List update HEMTAI*\n`
                    for (let i = 0; i < bsangpe2.result.length; i++) {
                        keluarplay += `\n═════════════════\n\n*Judul* : ${bsangpe2.result[i].title}\n*Info* : ${bsangpe2.result[i].detail}\n*Link* : ${bsangpe2.result[i].url}\n`
                    }
                    await geps.sendFileFromUrl(self, bsangpe2.result[0].image, 'kddk.jpg', keluarplay, id)
                } catch (err) {
                    console.log(err)
                }
                break
            case prefix+'nekopoicosplay':
            case prefix+'cosplaynekopoi':
                try {
                    if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                    if (!isNsfw) return await geps.reply(self, ind.notNsfw(), id)
                    if (isLimit(serial)) return
                    await limitAdd(serial)
                    geps.reply(self, ind.wait(), id)
                    const bsangbe = await axios.get(`https://api.vhtear.com/nekojavcosplay&apikey=${config.vhtear}`)
                    const bsangbe2 = bsangbe.data
                    let keluarplay = `*List update Cosplay JAV*\n`
                    for (let i = 0; i < bsangbe2.result.length; i++) {
                        keluarplay += `\n═════════════════\n\n*Judul* : ${bsangbe2.result[i].title}\n*Deskripsi* : ${bsangbe2.result[i].detail}\n*Link* : ${bsangbe2.result[i].url}\n`
                    }
                    await geps.reply(self, keluarplay, id)
                } catch (err) {
                    console.log(err)
                }
                break
            case prefix+'maluser':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                geps.reply(self, ind.wait(), id)
                try {
                    const result = await axios.get(`https://api.jikan.moe/v3/user/${q}`)
                    const jikan = result.data
                    const Data = `*「 USER - MYANIMELIST 」*

• Username: ${jikan.username}
• User ID: ${jikan.user_id}
• Gender: ${jikan.gender}
• Location: ${jikan.location}
• Joined: ${jikan.joined}
⭐️ Anime Stats ⭐️
• Days Watched: ${jikan.anime_stats.days_watched}
• Mean Score: ${jikan.anime_stats.mean_score}
• Currently Watching: ${jikan.anime_stats.watching}
• Completed: ${jikan.anime_stats.completed}
• On Hold: ${jikan.anime_stats.on_hold}
• Dropped: ${jikan.anime_stats.dropped}
• Plan to Watch: ${jikan.anime_stats.plan_to_watch}
🎯️ Manga Stats 🎯️
• Days Read: ${jikan.manga_stats.days_read}
• Mean Score: ${jikan.manga_stats.mean_score}
• Currently Reading: ${jikan.manga_stats.reading}
• Completed: ${jikan.manga_stats.completed}
• On Hold: ${jikan.manga_stats.on_hold}
• Dropped: ${jikan.manga_stats.dropped}
• Plan to Read: ${jikan.manga_stats.plan_to_read}`

                    await geps.sendFileFromUrl(self, `${jikan.image_url}`, `user.png`, Data)
                } catch (err) {
                    console.log(err)
                    await geps.sendFileFromUrl(self, errorImg, 'error.png', 'Maaf, User tidak ditemukan')
                }
                break
            case prefix+'captain':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                {
                    if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                    geps.reply(self, ind.wait(), id)
                    const puppeteer = require('puppeteer')
                    try {
                        (async () => {
                            const browser = await puppeteer.launch({
                                headless: true,
                            });
                            const page = await browser.newPage();
                            await page
                                .goto("https://textpro.me/captain-america-text-effect-905.html", {
                                    waitUntil: "networkidle2"
                                })
                                .then(async () => {
                                    await page.type("#text-0", q);
                                    await page.click("#submit");
                                    await new Promise(resolve => setTimeout(resolve, 3000));
                                    const element = await page.$(
                                        'div[class="thumbnail"] > img'
                                    );
                                    const text = await (await element.getProperty("src")).jsonValue();
                                    const urlmp4 = ({
                                        url: text
                                    })
                                    geps.sendFileFromUrl(self, text, id)
                                    await limitAdd(serial)
                                    browser.close();

                                })
                                .catch((err => {
                                    console.log(err)
                                    geps.reply(self, 'error', id)
                                }))
                        })();
                    } catch (error) {
                        console.log('error bang')
                        geps.reply(self, 'error', id)
                    }
                }
                break
            case prefix+'vintage':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (q.length > 15) return geps.reply(self, 'maximal 15 Huruf', id)
                geps.sendFileFromUrl(self, `https://arugaz.my.id/api/textpro/realvintage?text=${q}`, 'vintage.jpg', `ini kak ${pushname}\n*Udah Jadi Pesanan nya*`, id)
                break
            case prefix+'realcloud':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (q.length > 15) return geps.reply(self, 'maximal 15 Huruf', id)
                geps.sendFileFromUrl(self, `https://arugaz.my.id/api/textpro/realcloud?text=${q}`, 'realcloud.jpg', `Nihh Kak ${pushname}\n_Udah Jadi_`, id)
                break
            case prefix+'apkpure':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                const puree = await axios.get(`https://api-melodicxt-3.herokuapp.com/api/apkpure/search?query=${q}&apiKey=administrator`)
                let purex = `*「 ApkPure Search 」*\nKata Kunci ${q}\n\n`
                for (let i = 0; i < puree.data.result.data_apk.length; i++) {
                    purex += `=> Title : ${puree.data.result.data_apk[i].title}\n=> Author : ${puree.data.result.data_apk[i].detail_author}\n=> SDK : ${puree.data.result.data_apk[i].detail_sdk}\n=> Link : ${puree.data.result.data_apk[i].link}\n=> Download Link : ${puree.data.result.data_apk[i].download_link}\n=> Deskripsi : ${puree.data.result.data_apk[i].description}\n\n`
                }
                geps.reply(self, purex, id)
                break
            case prefix+'summer':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (q.length > 15) return geps.reply(self, 'maximal 15 Huruf', id)
                geps.sendFileFromUrl(self, `https://arugaz.my.id/api/textpro/sandsummer?text=${q}`, 'summer.jpg', `Nih kak ${pushname}\n*Niih Kak Dah Jadi*`, id)
                break
            case prefix+'pantai':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (q.length > 15) return geps.reply(self, 'maximal 15 Huruf', id)
                geps.sendFileFromUrl(self, `https://arugaz.my.id/api/textpro/sandwrite?text=${q}`, 'pantai.jpg', `neeh kak ${pushname}\n*ngak lama kan, Ngak kayak nunggu dia Datang Tak di undang Pulang tak di antar*`, id)
                break
            case prefix+'pantai2':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (q.length > 15) return geps.reply(self, 'maximal 15 Huruf', id)
                geps.sendFileFromUrl(self, `https://arugaz.my.id/api/textpro/sandsummery?text=${q}`, 'pantai2.jpg', `neeh kak ${pushname}\n*ngak lama kan, Ngak kayak nunggu dia Datang Tak di undang Pulang tak di antar*`, id)
                break
            case prefix+'balon':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (q.length > 15) return geps.reply(self, 'maximal 15 Huruf', id)
                geps.sendFileFromUrl(self, `https://arugaz.my.id/api/textpro/foilballoon?text=${q}`, 'pantai.jpg', `neeh kak ${pushname}\n*ngak lama kan, Ngak kayak nunggu dia Datang Tak di undang Pulang tak di antar*`, id)
                break
            case prefix+'lem':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (q.length > 15) return geps.reply(self, 'maximal 15 Huruf', id)
                geps.sendFileFromUrl(self, `https://arugaz.my.id/api/textpro/glue3d?text=${q}`, 'pantai.jpg', `neeh kak ${pushname}\n*ngak lama kan, Ngak kayak nunggu dia Datang Tak di undang Pulang tak di antar*`, id)
                break
            case prefix+'lk21':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                try {
                const filmm = await axios.get(`https://api.vhtear.com/downloadfilm?judul=${q}&apikey=${config.vhtear}`)
                const filmxx = filmm.data
                let filmx = `*「 Download Film 」*\nJudul : ${filmxx.result.judul}\n\n`
                for (let i = 0; i < filmxx.result.data.length; i++) {
                    filmx += `Resolusi : ${filmxx.result.data[i].resolusi}\nLink Download : ${filmxx.result.data[i].urlDownload}\n\n`
                }
                    geps.reply(self, filmx, id)
            } catch (err) {
                    geps.reply(self, 'Tidak ditemukan judul tsb!', id)
                }
                break
            case prefix+'infomotor':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                try {
                    const istalk2s = await axios.get(`https://api.vhtear.com/infomotor?merk=${q}&apikey=${config.vhtear}`)
                    const { title, harga, kekurangan, kelebihan, image, spesifikasi } = istalk2s.data.result
                    const istalk3s = `*Data Ditemukan!*
\n➸ *Nama* : ${title}
\n➸ *Harga* : ${harga}
\n➸ *Kekurangan* : ${kekurangan}
\n➸ *Kelebihan* : ${kelebihan}
\n➸ *Spek* : ${spesifikasi}`

                    const pictk = await bent("buffer")(image)
                    const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                    geps.sendImage(self, base64, image, istalk3s)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(self, errorImg, 'error.png', '💔️ Maaf, Data tidak ditemukan')
                    geps.sendText(ownerNumber, 'infomotor Error : ' + err)
                }
                break
            case prefix+'infomobil':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                try {
                    const istalk2ss = await axios.get(`https://api.vhtear.com/infomobil?merk=${q}&apikey=${config.vhtear}`)
                    const { title, harga, kekurangan, kelebihan, image, spesifikasi } = istalk2ss.data.result
                    const istalk3ss = `*Data Ditemukan!*
                \n➸ *Nama* : ${title}
                \n➸ *Harga* : ${harga}
                \n➸ *Kekurangan* : ${kekurangan}
                \n➸ *Kelebihan* : ${kelebihan}
                \n➸ *Spek* : ${spesifikasi}`

                    const pictk = await bent("buffer")(image)
                    const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                    geps.sendImage(self, base64, image, istalk3ss)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(self, errorImg, 'error.png', '💔️ Maaf, Data tidak ditemukan')
                    geps.sendText(ownerNumber, 'infomobil Error : ' + err)
                }
                break
            case prefix+'infoalamat':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const isekai = body.slice(11)
                if (!isekai) return geps.reply(self, 'Kirim perintah *#infoalamat [optional]*Contoh : *#infoalamat jakarta*', id)
                try {
                const resp = await axios.get(`https://api.vhtear.com/infoalamat?query=${isekai}&apikey=${config.vhtear}`)
                if (resp.data.error) return geps.reply(self, resp.data.error, id)
                const anm2 = `➸ Info : ${resp.data.result.data}
\n➸ Deskripsi : ${resp.data.result.deskripsi}`
                geps.reply(self, anm2, id)
                } catch (err) {
                console.error(err.message)
                await geps.sendFileFromUrl(self, errorImg, 'error.png', '💔️ Maaf, User tidak ditemukan', id)
                geps.sendText(ownerNumber, 'Ingfoalamat Error : ' + err)
                }
                break
            case prefix+'pokemon':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                q7 = Math.floor(Math.random() * 890) + 1;
                geps.sendFileFromUrl(self, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+q7+'.png','Pokemon.png',)
                break
            case prefix+'quote':
            case prefix+'quotes':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const quotez2 = await axios.get('https://tobz-api.herokuapp.com/api/randomquotes?apikey=BotWeA')
                geps.reply(self, `➸ *Quotes* : ${quotez2.data.quotes}\n➸ *Author* : ${quotez2.data.author}`, id)
                break
            case prefix+'infogempa':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const bmkg = await axios.get('https://tobz-api.herokuapp.com/api/infogempa?apikey=BotWeA')
                const { potensi, koordinat, lokasi, kedalaman, magnitude, waktu, map } = bmkg.data
                const hasil = `*${waktu}*\n📍 *Lokasi* : *${lokasi}*\n〽️ *Kedalaman* : *${kedalaman}*\n💢 *Magnitude* : *${magnitude}*\n🔘 *Potensi* : *${potensi}*\n📍 *Koordinat* : *${koordinat}*`
                geps.sendFileFromUrl(self, map, 'shakemap.jpg', hasil, id)
                break
            case prefix+'inu':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const list = ["https://cdn.shibe.online/shibes/247d0ac978c9de9d9b66d72dbdc65f2dac64781d.jpg","https://cdn.shibe.online/shibes/1cf322acb7d74308995b04ea5eae7b520e0eae76.jpg","https://cdn.shibe.online/shibes/1ce955c3e49ae437dab68c09cf45297d68773adf.jpg","https://cdn.shibe.online/shibes/ec02bee661a797518d37098ab9ad0c02da0b05c3.jpg","https://cdn.shibe.online/shibes/1e6102253b51fbc116b887e3d3cde7b5c5083542.jpg","https://cdn.shibe.online/shibes/f0c07a7205d95577861eee382b4c8899ac620351.jpg","https://cdn.shibe.online/shibes/3eaf3b7427e2d375f09fc883f94fa8a6d4178a0a.jpg","https://cdn.shibe.online/shibes/c8b9fcfde23aee8d179c4c6f34d34fa41dfaffbf.jpg","https://cdn.shibe.online/shibes/55f298bc16017ed0aeae952031f0972b31c959cb.jpg","https://cdn.shibe.online/shibes/2d5dfe2b0170d5de6c8bc8a24b8ad72449fbf6f6.jpg","https://cdn.shibe.online/shibes/e9437de45e7cddd7d6c13299255e06f0f1d40918.jpg","https://cdn.shibe.online/shibes/6c32141a0d5d089971d99e51fd74207ff10751e7.jpg","https://cdn.shibe.online/shibes/028056c9f23ff40bc749a95cc7da7a4bb734e908.jpg","https://cdn.shibe.online/shibes/4fb0c8b74dbc7653e75ec1da597f0e7ac95fe788.jpg","https://cdn.shibe.online/shibes/125563d2ab4e520aaf27214483e765db9147dcb3.jpg","https://cdn.shibe.online/shibes/ea5258fad62cebe1fedcd8ec95776d6a9447698c.jpg","https://cdn.shibe.online/shibes/5ef2c83c2917e2f944910cb4a9a9b441d135f875.jpg","https://cdn.shibe.online/shibes/6d124364f02944300ae4f927b181733390edf64e.jpg","https://cdn.shibe.online/shibes/92213f0c406787acd4be252edb5e27c7e4f7a430.jpg","https://cdn.shibe.online/shibes/40fda0fd3d329be0d92dd7e436faa80db13c5017.jpg","https://cdn.shibe.online/shibes/e5c085fc427528fee7d4c3935ff4cd79af834a82.jpg","https://cdn.shibe.online/shibes/f83fa32c0da893163321b5cccab024172ddbade1.jpg","https://cdn.shibe.online/shibes/4aa2459b7f411919bf8df1991fa114e47b802957.jpg","https://cdn.shibe.online/shibes/2ef54e174f13e6aa21bb8be3c7aec2fdac6a442f.jpg","https://cdn.shibe.online/shibes/fa97547e670f23440608f333f8ec382a75ba5d94.jpg","https://cdn.shibe.online/shibes/fb1b7150ed8eb4ffa3b0e61ba47546dd6ee7d0dc.jpg","https://cdn.shibe.online/shibes/abf9fb41d914140a75d8bf8e05e4049e0a966c68.jpg","https://cdn.shibe.online/shibes/f63e3abe54c71cc0d0c567ebe8bce198589ae145.jpg","https://cdn.shibe.online/shibes/4c27b7b2395a5d051b00691cc4195ef286abf9e1.jpg","https://cdn.shibe.online/shibes/00df02e302eac0676bb03f41f4adf2b32418bac8.jpg","https://cdn.shibe.online/shibes/4deaac9baec39e8a93889a84257338ebb89eca50.jpg","https://cdn.shibe.online/shibes/199f8513d34901b0b20a33758e6ee2d768634ebb.jpg","https://cdn.shibe.online/shibes/f3efbf7a77e5797a72997869e8e2eaa9efcdceb5.jpg","https://cdn.shibe.online/shibes/39a20ccc9cdc17ea27f08643b019734453016e68.jpg","https://cdn.shibe.online/shibes/e67dea458b62cf3daa4b1e2b53a25405760af478.jpg","https://cdn.shibe.online/shibes/0a892f6554c18c8bcdab4ef7adec1387c76c6812.jpg","https://cdn.shibe.online/shibes/1b479987674c9b503f32e96e3a6aeca350a07ade.jpg","https://cdn.shibe.online/shibes/0c80fc00d82e09d593669d7cce9e273024ba7db9.jpg","https://cdn.shibe.online/shibes/bbc066183e87457b3143f71121fc9eebc40bf054.jpg","https://cdn.shibe.online/shibes/0932bf77f115057c7308ef70c3de1de7f8e7c646.jpg","https://cdn.shibe.online/shibes/9c87e6bb0f3dc938ce4c453eee176f24636440e0.jpg","https://cdn.shibe.online/shibes/0af1bcb0b13edf5e9b773e34e54dfceec8fa5849.jpg","https://cdn.shibe.online/shibes/32cf3f6eac4673d2e00f7360753c3f48ed53c650.jpg","https://cdn.shibe.online/shibes/af94d8eeb0f06a0fa06f090f404e3bbe86967949.jpg","https://cdn.shibe.online/shibes/4b55e826553b173c04c6f17aca8b0d2042d309fb.jpg","https://cdn.shibe.online/shibes/a0e53593393b6c724956f9abe0abb112f7506b7b.jpg","https://cdn.shibe.online/shibes/7eba25846f69b01ec04de1cae9fed4b45c203e87.jpg","https://cdn.shibe.online/shibes/fec6620d74bcb17b210e2cedca72547a332030d0.jpg","https://cdn.shibe.online/shibes/26cf6be03456a2609963d8fcf52cc3746fcb222c.jpg","https://cdn.shibe.online/shibes/c41b5da03ad74b08b7919afc6caf2dd345b3e591.jpg","https://cdn.shibe.online/shibes/7a9997f817ccdabac11d1f51fac563242658d654.jpg","https://cdn.shibe.online/shibes/7221241bad7da783c3c4d84cfedbeb21b9e4deea.jpg","https://cdn.shibe.online/shibes/283829584e6425421059c57d001c91b9dc86f33b.jpg","https://cdn.shibe.online/shibes/5145c9d3c3603c9e626585cce8cffdfcac081b31.jpg","https://cdn.shibe.online/shibes/b359c891e39994af83cf45738b28e499cb8ffe74.jpg","https://cdn.shibe.online/shibes/0b77f74a5d9afaa4b5094b28a6f3ee60efcb3874.jpg","https://cdn.shibe.online/shibes/adccfdf7d4d3332186c62ed8eb254a49b889c6f9.jpg","https://cdn.shibe.online/shibes/3aac69180f777512d5dabd33b09f531b7a845331.jpg","https://cdn.shibe.online/shibes/1d25e4f592db83039585fa480676687861498db8.jpg","https://cdn.shibe.online/shibes/d8349a2436420cf5a89a0010e91bf8dfbdd9d1cc.jpg","https://cdn.shibe.online/shibes/eb465ef1906dccd215e7a243b146c19e1af66c67.jpg","https://cdn.shibe.online/shibes/3d14e3c32863195869e7a8ba22229f457780008b.jpg","https://cdn.shibe.online/shibes/79cedc1a08302056f9819f39dcdf8eb4209551a3.jpg","https://cdn.shibe.online/shibes/4440aa827f88c04baa9c946f72fc688a34173581.jpg","https://cdn.shibe.online/shibes/94ea4a2d4b9cb852e9c1ff599f6a4acfa41a0c55.jpg","https://cdn.shibe.online/shibes/f4478196e441aef0ada61bbebe96ac9a573b2e5d.jpg","https://cdn.shibe.online/shibes/96d4db7c073526a35c626fc7518800586fd4ce67.jpg","https://cdn.shibe.online/shibes/196f3ed10ee98557328c7b5db98ac4a539224927.jpg","https://cdn.shibe.online/shibes/d12b07349029ca015d555849bcbd564d8b69fdbf.jpg","https://cdn.shibe.online/shibes/80fba84353000476400a9849da045611a590c79f.jpg","https://cdn.shibe.online/shibes/94cb90933e179375608c5c58b3d8658ef136ad3c.jpg","https://cdn.shibe.online/shibes/8447e67b5d622ef0593485316b0c87940a0ef435.jpg","https://cdn.shibe.online/shibes/c39a1d83ad44d2427fc8090298c1062d1d849f7e.jpg","https://cdn.shibe.online/shibes/6f38b9b5b8dbf187f6e3313d6e7583ec3b942472.jpg","https://cdn.shibe.online/shibes/81a2cbb9a91c6b1d55dcc702cd3f9cfd9a111cae.jpg","https://cdn.shibe.online/shibes/f1f6ed56c814bd939645138b8e195ff392dfd799.jpg","https://cdn.shibe.online/shibes/204a4c43cfad1cdc1b76cccb4b9a6dcb4a5246d8.jpg","https://cdn.shibe.online/shibes/9f34919b6154a88afc7d001c9d5f79b2e465806f.jpg","https://cdn.shibe.online/shibes/6f556a64a4885186331747c432c4ef4820620d14.jpg","https://cdn.shibe.online/shibes/bbd18ae7aaf976f745bc3dff46b49641313c26a9.jpg","https://cdn.shibe.online/shibes/6a2b286a28183267fca2200d7c677eba73b1217d.jpg","https://cdn.shibe.online/shibes/06767701966ed64fa7eff2d8d9e018e9f10487ee.jpg","https://cdn.shibe.online/shibes/7aafa4880b15b8f75d916b31485458b4a8d96815.jpg","https://cdn.shibe.online/shibes/b501169755bcf5c1eca874ab116a2802b6e51a2e.jpg","https://cdn.shibe.online/shibes/a8989bad101f35cf94213f17968c33c3031c16fc.jpg","https://cdn.shibe.online/shibes/f5d78feb3baa0835056f15ff9ced8e3c32bb07e8.jpg","https://cdn.shibe.online/shibes/75db0c76e86fbcf81d3946104c619a7950e62783.jpg","https://cdn.shibe.online/shibes/8ac387d1b252595bbd0723a1995f17405386b794.jpg","https://cdn.shibe.online/shibes/4379491ef4662faa178f791cc592b52653fb24b3.jpg","https://cdn.shibe.online/shibes/4caeee5f80add8c3db9990663a356e4eec12fc0a.jpg","https://cdn.shibe.online/shibes/99ef30ea8bb6064129da36e5673649e957cc76c0.jpg","https://cdn.shibe.online/shibes/aeac6a5b0a07a00fba0ba953af27734d2361fc10.jpg","https://cdn.shibe.online/shibes/9a217cfa377cc50dd8465d251731be05559b2142.jpg","https://cdn.shibe.online/shibes/65f6047d8e1d247af353532db018b08a928fd62a.jpg","https://cdn.shibe.online/shibes/fcead395cbf330b02978f9463ac125074ac87ab4.jpg","https://cdn.shibe.online/shibes/79451dc808a3a73f99c339f485c2bde833380af0.jpg","https://cdn.shibe.online/shibes/bedf90869797983017f764165a5d97a630b7054b.jpg","https://cdn.shibe.online/shibes/dd20e5801badd797513729a3645c502ae4629247.jpg","https://cdn.shibe.online/shibes/88361ee50b544cb1623cb259bcf07b9850183e65.jpg","https://cdn.shibe.online/shibes/0ebcfd98e8aa61c048968cb37f66a2b5d9d54d4b.jpg"]
                let kya = list[Math.floor(Math.random() * list.length)]
                geps.sendFileFromUrl(self, kya, 'Dog.jpeg', 'Inu', id)
                break
            case prefix+'wallpaper':
            case prefix+'wp':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                await geps.reply(self, ind.wait(), id)
                console.log('Getting wallpaper image...')
                await geps.sendFileFromUrl(self, (await neko.sfw.wallpaper()).url, 'wallpaper.jpg', '', null, null, true)
                    .then(() => console.log('Success sending wallpaper image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id )
                    })
            break
            case prefix+'kemono':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                await geps.reply(self, ind.wait(), id)
                console.log('Getting kemonomimi image...')
                await geps.sendFileFromUrl(self, (await neko.sfw.kemonomimi()).url, 'kemono.jpg', '', null, null, true)
                    .then(() => console.log('Success sending kemonomimi image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'komiku':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                await geps.reply(self, ind.wait(), id)
                weeaboo.manga(q)
                    .then(async ({ genre, info, link_dl, sinopsis, thumb }) => {
                        let mangak = `${info}${genre}\nSinopsis: ${sinopsis}\nLink download:\n${link_dl}`
                        await geps.sendFileFromUrl(self, thumb, 'mangak.jpg', mangak, null, null, true)
                            .then(() => console.log('Success sending manga info!'))
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'wait':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(self, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    weeaboo.wait(imageBase64)
                        .then(async (result) => {
                            if (result.docs && result.docs.length <= 0) {
                                return await geps.reply(self, 'Anime not found! :(', id)
                            } else {
                                const { title, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = result.docs[0]
                                let teks = ''
                                if (similarity < 0.92) {
                                    teks = 'Low similarity. 🤔\n\n'
                                } else {
                                    teks += `*Title*: ${title}\n*Romaji*: ${title_romaji}\n*English*: ${title_english}\n*Episode*: ${episode}\n*Similarity*: ${(similarity * 100).toFixed(1)}%`
                                    const video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`
                                    await geps.sendFileFromUrl(self, video, `${title_romaji}.mp4`, teks, id)
                                        .then(() => console.log('Success sending anime source!'))
                                }
                            }
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await geps.reply(self, 'Error!', id)
                        })
                } else {
                    await geps.reply(self, ind.wrongFormat(), id)
                }
            break
            /*case prefix+'source':
            case prefix+'sauce':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(self, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    try {
                        const imageLink = await uploadImages(mediaData, `sauce.${sender.id}`)
                        console.log('Searching for source...')
                        const results = await saus(imageLink)
                        for (let i = 0; i < results.length; i++) {
                            let teks = ''
                            if (results[i].similarity < 80.00) {
                                teks = 'Low similarity. 🤔\n\n'
                            } else {
                                teks += `*Link*: ${results[i].url}\n*Site*: ${results[i].site}\n*Author name*: ${results[i].authorName}\n*Author link*: ${results[i].authorUrl}\n*Similarity*: ${results[i].similarity}%`
                                await geps.sendLinkWithAutoPreview(self, results[i].url, teks)
                                    .then(() => console.log('Source found!'))
                            }
                        }
                    } catch (err) {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    }
                } else {
                    await geps.reply(self, ind.wrongFormat(), id)
                }
            break*/
            case prefix+'waifu':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                weeaboo.waifu(false)
                    .then(async ({ url }) => {
                        await geps.sendFileFromUrl(self, url, 'waifu.png', '*WAIFU!*', id)
                            .then(() => console.log('Success sending waifu!'))
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'husbu':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                const diti = fs.readFileSync('./lib/husbu.json')
                const ditiJsin = JSON.parse(diti)
                const rindIndix = Math.floor(Math.random() * ditiJsin.length)
                const rindKiy = ditiJsin[rindIndix]
                geps.sendFileFromUrl(self, rindKiy.image, 'Husbu.jpg', rindKiy.teks, id)
                break
            case prefix+'malanime':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                const keyword = body.slice(10)
                try {
                    const data = await fetch(
                        `https://api.jikan.moe/v3/search/anime?q=${keyword}`
                    )
                    const parsed = await data.json()
                    if (!parsed) {
                        await geps.sendFileFromUrl(self, errorImg, 'error.png', '💔️ Maaf, Anime tidak ditemukan', id)
                        return null
                    }
                    const { title, synopsis, episodes, url, rated, score, image_url } = parsed.results[0]
                    const content = `*Anime Ditemukan!*
✨️ *Title:* ${title}
🎆️ *Episodes:* ${episodes}
💌️ *Rating:* ${rated}
❤️ *Score:* ${score}
💚️ *Synopsis:* ${synopsis}
🌐️ *URL*: ${url}`

                    const image = await bent("buffer")(image_url)
                    const base64 = `data:image/jpg;base64,${image.toString("base64")}`
                    geps.sendImage(self, base64, title, content)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(self, errorImg, 'error.png', '💔️ Maaf, Anime tidak ditemukan')
                }
                break
            case prefix+'malcharacter':
                const keywords = args.join(' ')
                try {
                    const data = await fetch(
                        `https://api.jikan.moe/v3/search/character?q=${keywords}`
                    )
                    const parsed = await data.json()
                    if (!parsed) {
                        await geps.sendFileFromUrl(self, errorImg, 'error.png', '💔️ Maaf, Anime tidak ditemukan', id)
                        return null
                    }
                    const { name, alternative_names, url, image_url } = parsed.results[0]
                    const contentt = `*Anime Ditemukan!*

✨️ *Name:* ${name}
💌️ *Alternative Names:* ${alternative_names}
🌐️ *URL*: ${url}`

                    const image = await bent("buffer")(image_url)
                    const base64 = `data:image/jpg;base64,${image.toString("base64")}`
                    geps.sendImage(self, base64, name, contentt)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(self, errorImg, 'error.png', '💔️ Maaf, Anime tidak ditemukan')
                }
                break
            case prefix+'shota':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                const imageToBase64 = require('image-to-base64')
                var shouta = ['shota anime', 'anime shota'];
                var shotaa = shouta[Math.floor(Math.random() * shouta.length)];
                var urlshot = "https://api.fdci.se/rep.php?gambar=" + shotaa;

                axios.get(urlshot)
                    .then((result) => {
                        var sht = JSON.parse(JSON.stringify(result.data));
                        var shotaak = sht[Math.floor(Math.random() * sht.length)];
                        imageToBase64(shotaak)
                            .then(
                                (response) => {
                                    let img = 'data:image/jpeg;base64,' + response
                                    geps.sendFile(self, img, "shota.jpg", `*SHOTA*`, id)
                                })
                            .catch(
                                (error) => {
                                    console.log(error);
                                })
                    })
                break
            case prefix+'loli':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                const loli = await axios.get(`https://api.vhtear.com/randomloli&apikey=${config.vhtear}`)
                const loly = loli.data.result
                geps.sendFileFromUrl(self, loly.result, 'loli.jpeg', '*LOLI*', id)
                break
            case prefix+'anitoki':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                weeaboo.anitoki()
                    .then(async ({ result }) => {
                        let anitoki = '-----[ *ANITOKI LATEST* ]-----'
                        for (let i = 0; i < result.length; i++) {
                            anitoki += `\n\n➸ *Title*: ${result[i].title}\n➸ *URL*: ${result[i].link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(self, anitoki, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'neonimelast':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                weeaboo.neonime()
                    .then(async ({ status, result }) => {
                        if (status !== 200) return await geps.reply(self, 'Not found.', id)
                        let neoInfo = '-----[ *NEONIME LATEST* ]-----'
                        for (let i = 0; i < result.length; i++) {
                            const { date, title, link, desc } = result[i]
                            neoInfo += `\n\n➸ *Title*: ${title}\n➸ *Date*: ${date}\n➸ *Synopsis*: ${desc}\n➸ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(self, neoInfo, id)
                        console.log('Success sending Neonime latest update!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'anoboylast':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                weeaboo.anoboy()
                    .then(async ({ result }) => {
                        let anoboyInfo = '-----[ *ANOBOY ON-GOING* ]-----'
                        for (let i = 0; i < result.length; i++) {
                            anoboyInfo += `\n\n➸ *Title*: ${result[i].title}\n➸ *URL*: ${result[i].url}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(self, anoboyInfo, id)
                        console.log('Success sending on-going anime!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break

            // Fun
            case prefix+'asupan': // shansekai
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                fun.asupan()
                    .then(async (body) => {
                        const asupan = body.split('\n')
                        const asupanx = asupan[Math.floor(Math.random() * asupan.length)]
                        await geps.sendFileFromUrl(self, `http://sansekai.my.id/ptl_repost/${asupanx}`, 'asupan.mp4', 'Nehhh...', id)
                        console.log('Success sending video!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'citacita': // Piyobot
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                fun.cita()
                    .then(async (body) => {
                        const cita = body.split('\n')
                        const randomCita = cita[Math.floor(Math.random() * cita.length)]
                        await geps.sendFileFromUrl(self, randomCita, 'cita.mp3', '', id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'profile':
            case prefix+'me':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (quotedMsg) {
                    const getQuoted = quotedMsgObj.sender.id
                    const profilePic = await geps.getProfilePicFromServer(getQuoted)
                    const username = quotedMsgObj.sender.name
                    const statuses = await geps.getStatus(getQuoted)
                    const benet = _ban.includes(getQuoted) ? 'Yes' : 'No'
                    const adm = groupAdmins.includes(getQuoted) ? 'Yes' : 'No'
                    const premi = premium.checkPremiumUser(getQuoted, _premium) ? 'Yes' : 'No'
                    const levelMe = level.getLevelingLevel(getQuoted, _level)
                    const xpMe = level.getLevelingXp(getQuoted, _level)
                    const req = 200 * (Math.pow(2, levelMe) - 1)
                    const { status } = statuses
                    if (profilePic === undefined) {
                        var pfp = errorImg
                    } else {
                        pfp = profilePic
                    }
                    await geps.sendFileFromUrl(self, pfp, `${username}.jpg`, ind.profile(username, status, premi, benet, adm, levelMe, req, xpMe), id)
                } else {
                    const profilePic = await geps.getProfilePicFromServer(sender.id)
                    const username = pushname
                    const statuses = await geps.getStatus(sender.id)
                    const benet = isBanned ? 'Yes' : 'No'
                    const adm = isGroupAdmins ? 'Yes' : 'No'
                    const premi = isPremium ? 'Yes' : 'No'
                    const levelMe = level.getLevelingLevel(sender.id, _level)
                    const xpMe = level.getLevelingXp(sender.id, _level)
                    const req = 200 * (Math.pow(2, levelMe) - 1)
                    const { status } = statuses
                    if (profilePic === undefined) {
                        var pfps = errorImg
                    } else {
                        pfps = profilePic
                    }
                    await geps.sendFileFromUrl(self, pfps, `${username}.jpg`, ind.profile(username, status, premi, benet, adm, levelMe, req, xpMe), id)
                }
            break
            case prefix+'hartatahta':
            case prefix+'tahta':
            case prefix+'harta':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                console.log('Creating harta tahta text...')
                await geps.sendFileFromUrl(self, `https://api.vhtear.com/hartatahta?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'artinama':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                try {
                    const resp = await axios.get(`https://api.vhtear.com/artinama?nama=${q}&apikey=${config.vhtear}`)
                    if (resp.data.error) return geps.reply(self, resp.data.error, id)
                    const anm2 = `➸ Artinama : ${resp.data.result.hasil}`
                    geps.reply(self, anm2, id)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(self, errorImg, 'error.png', '💔️ Maaf, User tidak ditemukan')
                    geps.sendText(ownerNumber, 'Artinama Error : ' + err)
                }
                break
            case prefix+'pasangan':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                const nama = q.substring(0, q.indexOf('|') - 1)
                const pasangan = q.substring(q.lastIndexOf('|') + 2)
                await geps.reply(self, ind.wait(), id)
                fun.pasangan(nama, pasangan)
                    .then(async ({ result }) => {
                        await geps.reply(self, result.hasil, id)
                            .then(() => console.log('Success sending fortune!'))
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'zodiac':
            case prefix+'zodiak':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (args.length !== 1) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                fun.zodiak(args[0])
                    .then(async ({ result }) => {
                        if (result.status === 204) {
                            return await geps.reply(self, result.ramalan, id)
                        } else {
                            let ramalan = `Zodiak: ${result.zodiak}\n\nRamalan: ${result.ramalan}\n\nAngka laksek: ${result.nomorKeberuntungan}\n\n${result.motivasi}\n\n${result.inspirasi}`
                            await geps.reply(self, ramalan, id)
                                .then(() => console.log('Success sending zodiac fortune!'))
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'nulis':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(self, ind.wait(), id)
                console.log('Creating writing...')
                await geps.sendFileFromUrl(self, `https://api.vhtear.com/write?text=${q}&apikey=${config.vhtear}`, 'nulis.jpg', '', id)
                    .then(() => console.log('Success sending write image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'ffbanner': // By: VideFrelan
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q.includes('|')) return geps.reply(self, ind.wrongFormat(), id)
                await geps.reply(self, ind.wait(), id)
                console.log('Creating FF banner...')
                const teks1ffanjg = q.substring(0, q.indexOf('|') - 1)
                const teks2ffanjg = q.substring(q.lastIndexOf('|') + 2)
                await geps.sendFileFromUrl(self, `https://api.vhtear.com/bannerff?title=${teks1ffanjg}&text=${teks2ffanjg}&apikey=${config.vhtear}`, id)
                console.log('Success!')
            break
            case prefix+'caklontong': //By: VideFrelan
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                await geps.reply(self, ind.wait(), id)
                fun.caklontong()
                .then(async ( { result }) => {
                    await geps.reply(self, `➸ *Soal*: ${result.soal}`, id)
                    geps.sendText(self, '30 Detik Tersisa...', id)
                    await sleeps(10000)
                    geps.sendText(self, '20 Detik Tersisa...', id)
                    await sleeps(10000)
                    geps.sendText(self, '10 Detik Tersisa...', id)
                    await sleeps(10000)
                    await geps.reply(self, `➸ *Jawaban*: ${result.jawaban}\n${result.desk}`, id)
                })
                .then(() => {
                    console.log('Sukses mengirim jawaban caklontong!')
                })
                .catch(async (err) => {
                    console.error(err)
                    await geps.reply(self, 'Error!')
                })
            break
            case prefix+'fflogo': // By: VideFrelan
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q.includes('|')) return geps.reply(self, `Untuk membuat Logo Karakter Freefire\ngunakan ${prefix}fflogo karakter | teks\n\nContoh: ${prefix}fflogo alok | Fikri gans`, id)
                await geps.reply(self, ind.wait(), id)
                console.log('Creating FF logo...')
                const karakter = q.substring(0, q.indexOf('|') - 1)
                const teksff = q.substring(q.lastIndexOf('|') + 2)
                await geps.sendFileFromUrl(self, `https://api.vhtear.com/logoff?hero=${karakter}&text=${teksff}&apikey=${config.vhtear}`, id)
                console.log('Success!')
            break
            case prefix+'': // APINYA EMRROR
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isSimi) return geps.reply(self, 'command/Perintah Simi belum di aktifkan di group ini!', id)
                //if (ar.length === 1) return geps.reply(self, 'Kirim perintah *# [teks]*\nContoh : *# halo*', id)
                const que = body.slice(2)
                const sigo = await axios.get(`http://simsumi.herokuapp.com/api?text=${que}&lang=id`)
                const sigot = sigo.data
                geps.reply(self, sigot.success, id)
                console.log(sigot)
                break
            case prefix+'simi':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isGroupAdmins) return geps.reply(self, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
                if (ar[0].toLowerCase() === 'enable') {
                    simi_.push(groupId)
                    fs.writeFileSync('./database/group/simih.json', JSON.stringify(simi_))
                    geps.reply(self, 'Simsimi berhasil di aktifkan di group ini! Kirim perintah *# [teks]*\nContoh : *# halo*', id)
                } else if (ar[0].toLowerCase() === 'disable') {
                    simi_.splice(groupId, 1)
                    fs.writeFileSync('./database/group/simih.json', JSON.stringify(simi_))
                    geps.reply(self, 'Simsimi berhasil di nonaktifkan di group ini!', id)
                } else {
                    geps.reply(self, 'Pilih enable atau disable udin!', id)
                }
                break
            case prefix+'calender':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.wait(), id)
                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    const getUrli = await uploadImages(mediaData, false)
                    const imgnya = await calender(getUrli)
                    const calnder = imgnya.result.imgUrl
                    await geps.sendFileFromUrl(self, calnder)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const getUrli = await uploadImages(mediaData, false)
                    const imgnya = await calender(getUrli)
                    const calnder = imgnya.result.imgUrl
                    await geps.sendFileFromUrl(self, calnder)
                } else {
                    await geps.reply(self, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan #calender`, id)
                }
                break
            case prefix+'neongreen': {
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const ajglah = args.join(' ')
                const puppeteer = require('puppeteer')
                if (!ajglah) return geps.reply(self, `Kirim perintah *${prefix}neongreen [text]*\n\nContoh : ${prefix}neongreen ICHI X AISHA`, id)
                geps.reply(self, ind.wait(), id)
        try {
            (async () => {
                const browser = await puppeteer.launch({
                    headless: true,
                });
                const page = await browser.newPage();
                await page
                    .goto("https://textpro.me/green-neon-text-effect-874.html", {
                        waitUntil: "networkidle2"
                    })
                    .then(async () => {
                        await page.type("#text-0", ajglah);
                        await page.click("#submit");
                        await new Promise(resolve => setTimeout(resolve, 3000));
                        const element = await page.$(
                            'div[class="thumbnail"] > img'
                            );
                        const text = await (await element.getProperty("src")).jsonValue();
                        geps.sendFileFromUrl(self, text, id)
                        browser.close();

                    })
                    .catch((err => {
                        console.log(err)
                        geps.reply(self, 'error', id)
                        }))
                        })();
                        } catch (error) {
                        console.log('error bang')
                        geps.reply(self, 'error', id)
                        }
                    }
                    break
            case prefix+'neonblue': {
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const ajglahh = args.join(' ')
                const puppeteer = require('puppeteer')
                if (!ajglahh) return geps.reply(self, `Kirim perintah *${prefix}neonblue [text]*\n\nContoh : ${prefix}neonblue ICHI X AISHA`, id)
                geps.reply(self, ind.wait(), id)
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://textpro.me/neon-light-text-effect-online-882.html", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#text-0", ajglahh);
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 3000));
                                const element = await page.$(
                                    'div[class="thumbnail"] > img'
                                );
                                const texts = await (await element.getProperty("src")).jsonValue();
                                geps.sendFileFromUrl(self, texts, id)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(self, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(self, 'error', id)
                }
            }
                break
            case prefix+'glitchtext':
            case prefix+'glitext':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                const teks1 = q.substring(0, q.indexOf('|') - 1)
                const teks2 = q.substring(q.lastIndexOf('|') + 2)
                await geps.reply(self, ind.wait(), id)
                console.log('Creating glitch text...')
                await geps.sendFileFromUrl(self, `http://lolhuman.herokuapp.com/api/textprome2/glitch?apikey=WEMPYGANSS&text1=${teks1}&text2=${teks2}`, 'glitch.jpg', '*Ini Nyaa~*', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
   case prefix+'glitch':
            if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)   
               const argz = body.trim().split('|')
            if (argz.length >= 2) {
              
                const glitch1 = argz[1]
                const glitch2 = argz[2]
                if (glitch1.length > 10) return geps.reply(from, '*Teks1 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
                if (glitch2.length > 15) return geps.reply(from, '*Teks2 Terlalu Panjang!*\n_Maksimal 15 huruf!_', id)
                geps.sendFileFromUrl(from, `https://api.vhtear.com/glitchtext?text1=${glitch1}&text2=${glitch2}&apikey=${config.vhtear}`)
                await limitAdd(serial)
            } else {
                await geps.reply(from, `Wrong Format!\n[❗] Kirim perintah *#glitch [ |Teks1|Teks2 ]*, contoh *#glitch |Tobz|Dev Elaina*`, id)
            }
            break
            case prefix+'phmaker':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                const kiri = q.substring(0, q.indexOf('|') - 1)
                const kanan = q.substring(q.lastIndexOf('|') + 2)
                await geps.reply(self, ind.wait(), id)
                console.log('Creating Pornhub text...')
                await geps.sendFileFromUrl(self, `https://api.vhtear.com/pornlogo?text1=${kiri}&text2=${kanan}&apikey=${config.vhtear}`, 'ph.jpg', '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'blackpink':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                await geps.reply(self, ind.wait(), id)
                console.log('Creating Blackpink text...')
                await geps.sendFileFromUrl(self, `https://api.vhtear.com/blackpinkicon?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'galaxy':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                await geps.reply(self, ind.wait(), id)
                console.log('Creating galaxy text...')
                await geps.sendFileFromUrl(self, `https://api.vhtear.com/galaxytext?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'tod':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                await geps.reply(self, 'Sebelum bermain berjanjilah akan melaksanakan apapun perintah yang diberikan.' , id)
                await geps.sendText(self, `Silakan ketik *${prefix}truth* atau *${prefix}dare*`)
            break
            case prefix+'weton':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q.includes('|')) return await geps.reply(self, ind.wrongFormat(), id)
                const tgl = q.substring(0, q.indexOf('|') - 1)
                const bln = q.substring(q.indexOf('|') + 2, q.lastIndexOf('|') - 1)
                const thn = q.substring(q.lastIndexOf('|') + 2)
                await geps.reply(self, ind.wait(), id)
                fun.weton(tgl, bln, thn)
                    .then(async ({ result }) => {
                        await geps.reply(self, result.hasil, id)
                        console.log('Success sending weton info!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'truth':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                fun.truth()
                    .then(async (body) => {
                        const tod = body.split('\n')
                        const randomTod = tod[Math.floor(Math.random() * tod.length)]
                        await geps.reply(self, randomTod, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'dare':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                fun.dare()
                    .then(async (body) => {
                        const dare = body.split('\n')
                        const randomDare = dare[Math.floor(Math.random() * dare.length)]
                        await geps.reply(self, randomDare, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'triggered':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                try {
                    if (isMedia && isImage) {
                        const ppRaw = await decryptMedia(message, uaOverride)
                        canvas.Canvas.trigger(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await geps.sendFile(self, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    } else if (quotedMsg) {
                        const ppRaw = await geps.getProfilePicFromServer(quotedMsgObj.sender.id)
                        canvas.Canvas.trigger(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await geps.sendFile(self, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, 'Akokawokoaw', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    } else {
                        const ppRaw = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.trigger(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await geps.sendFile(self, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, 'Error!', id)
                }
            break
            case prefix+'wasted':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                    if (isMedia && type === 'image' || isQuotedImage) {
                    const encryptMediaWt = isQuotedImage ? quotedMsg : message
                    const dataPotoWt = await decryptMedia(encryptMediaWt, uaOverride)
                    const fotoWtNya = await uploadImages(dataPotoWt, `fotoProfilWt.${sender.id}`)
                    await geps.reply(self, ind.wait(), id)
                    //await geps.sendFileFromUrl(self, `https://some-random-api.ml/canvas/wasted?avatar=${fotoWtNya}`, 'Wasted.jpg', 'Ini..., sticker nya lagi di kirim', id)
                    //.then(() =>
                    .then(async (body) => {
                    await geps.sendStickerfromUrl(self, `https://some-random-api.ml/canvas/wasted?avatar=${fotoWtNya}`)
                    console.log('Success Wasted Sticker')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
                } else {
                    await geps.reply(self, `Format salah! Silahkan kirim gambar dengan caption${prefix}wasted atau reply gambar dengan caption ${prefix}wasted`, id)
                }
                break
                case prefix+'jadwalbola':
                    if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                    geps.reply(self, ind.wait(), id)
                    try {
                        const jdbola = await fetch(`https://api.vhtear.com/jadwalbola&apikey=${config.vhtearkey}`)
                        if (!jdbola.ok) throw new Error(`unexpected response ${jdbola.statusText}`)
                        const jdbola2 = await jdbola.json()
                        const { data } = await jdbola2.result
                        let xixixi = `*「 JADWAL BOLA 」*\n\n`
                        for (let i = 0; i < data.length; i++) {
                            xixixi += `\n─────────────────\n\n*Kick-Off* : ${data[i].kickoff}\n*Pertandingan* : ${data[i].pertandingan}\n*Stasiun TV* : ${data[i].stasiuntv}\n`
                        }
                        await geps.sendText(self, xixixi, id)
                    } catch (err) {
                            console.log(err)
                            await geps.sendFileFromUrl(self, errorImg, 'error.png', '💔️ Maaf, Jadwal tidak ditemukan')
                            geps.sendText(ownerNumber, 'Jadwal Bola Error : ' + err)
                    }
                    break
            case prefix+'kiss':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                try {
                    if (isMedia && isImage) {
                        const ppRaw = await geps.getProfilePicFromServer(sender.id)
                        const ppSecond = await decryptMedia(message, uaOverride)
                        if (ppRaw === undefined) {
                            var ppFirst = errorImg
                        } else {
                            ppFirst = ppRaw
                        }
                        canvas.Canvas.kiss(ppFirst, ppSecond)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_kiss.png`)
                                await geps.sendFile(self, `${sender.id}_kiss.png`, `${sender.id}_kiss.png`, '', id)
                                fs.unlinkSync(`${sender.id}_kiss.png`)
                            })
                    } else if (quotedMsg) {
                        const ppRaw = await geps.getProfilePicFromServer(sender.id)
                        const ppSecond = await geps.getProfilePicFromServer(quotedMsgObj.sender.id)
                        if (ppRaw === undefined) {
                            var ppFirsts = errorImg
                        } else {
                            ppFirsts = ppRaw
                        }
                        canvas.Canvas.kiss(ppFirsts, ppSecond)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_kiss.png`)
                                await geps.sendFile(self, `${sender.id}_kiss.png`, `${sender.id}_kiss.png`, '', id)
                                fs.unlinkSync(`${sender.id}_kiss.png`)
                            })
                    } else {
                        await geps.reply(self, ind.wrongFormat(), id)
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, 'Error!', id)
                }
            break
            case prefix+'phcomment':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q.includes('|')) return await geps.reply(self, ind.wrongFormat(), id)
                const usernamePh = q.substring(0, q.indexOf('|') - 1)
                const commentPh = q.substring(q.lastIndexOf('|') + 2)
                const ppPhRaw = await geps.getProfilePicFromServer(sender.id)
                if (ppPhRaw === undefined) {
                    var ppPh = errorImg
                } else {
                    ppPh = ppPhRaw
                }
                const dataPpPh = await bent('buffer')(ppPh)
                const linkPpPh = await uploadImages(dataPpPh, `${sender.id}_ph`)
                await geps.reply(self, ind.wait(), id)
                const preproccessPh = await axios.get(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${linkPpPh}&text=${commentPh}&username=${usernamePh}`)
                await geps.sendFileFromUrl(self, preproccessPh.data.message, 'ph.jpg', '', id)
                console.log('Success creating image!')
            break
            case prefix+'readmore':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q.includes('|')) return await geps.reply(self, ind.wrongFormat(), id)
                const rawReadMore = `a


​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​���​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​b`
                const pertama = q.substring(0, q.indexOf('|') - 1)
                const kedua = q.substring(q.lastIndexOf('|') + 2)
                const formatted1 = rawReadMore.replace('a', pertama)
                const formatted2 = formatted1.replace('b', kedua)
                await geps.sendText(self, formatted2)
            break
            case prefix+'firemaker':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                await geps.reply(self, ind.wait(), id)
                await geps.sendFileFromUrl(self, `https://api.vhtear.com/fire_maker?text=${q}&apikey=${config.vhtear}`)
                console.log('Success creating image!')
            break
            case prefix+'mlmaker':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q.includes('|')) return await geps.reply(self, ind.wrongFormat(), id)
                const namaHero = q.substring(0, q.indexOf('|') - 1)
                const teksMl = q.substring(q.lastIndexOf('|') + 2)
                await geps.reply(self, ind.wait(), id)
                await geps.sendFileFromUrl(self, `https://api.vhtear.com/logoml?hero=${namaHero}&text=${teksMl}&apikey=${config.vhtear}`)
                console.log('Success creating image!')
            break
            case prefix+'balloonmaker':
            case prefix+'blmaker':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q.includes('|')) return await geps.reply(self, ind.wrongFormat(), id)
                const namaKiri = q.substring(0, q.indexOf('|') - 1)
                const namaKanan = q.substring(q.lastIndexOf('|') + 2)
                await geps.reply(self, ind.wait(), id)
                await geps.sendFileFromUrl(self, `https://api.vhtear.com/balloonmaker?text1=${namaKiri}&text2=${namaKanan}&apikey=${config.vhtear}`)
                console.log('Success creating image!')
            break

            // Sticker
            case prefix+'stickerwm': // By Slavyan
            case prefix+'stcwm':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                //if (!isPremium) return await geps.reply(self, ind.notPremium(), id)
                if (!q.includes('|')) return await geps.reply(self, ind.wrongFormat(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(self, ind.wait(), id)
                    const packname = q.substring(0, q.indexOf('|') - 1)
                    const author = q.substring(q.lastIndexOf('|') + 2)
                    exif.create(packname, author, `stc_${sender.id}`)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    webp.buffer2webpbuffer(mediaData, 'jpg', '-q 100')
                        .then((res) => {
                            sharp(res)
                                .resize(512, 512)
                                .toFile(`./temp/stage_${sender.id}.webp`, async (err) => {
                                    if (err) return console.error(err)
                                    await exec(`webpmux -set exif ./temp/stc_${sender.id}.exif ./temp/stage_${sender.id}.webp -o ./temp/${sender.id}.webp`, { log: false })
                                    if (fs.existsSync(`./temp/${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await geps.sendRawWebpAsSticker(self, base64)
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/stage_${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/stc_${sender.id}.exif`)
                                    }
                                })
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await geps.reply(self, 'Error!', id)
                        })
                    } else {
                        await geps.reply(self, ind.wrongFormat(), id)
                    }
            break
            case prefix+'stickermeme':
            case prefix+'stcmeme':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q.includes('|')) return await geps.reply(self, ind.wrongFormat(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(self, ind.wait(), id)
                    const top = q.substring(0, q.indexOf('|') - 1)
                    const bottom = q.substring(q.lastIndexOf('|') + 2)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const getUrl = await uploadImages(mediaData, `meme.${sender.id}`)
                    const create = `https://api.memegen.link/images/custom/${top}/${bottom}.png?background=${getUrl}`
                    const meme = await bent('buffer')(create)
                    webp.buffer2webpbuffer(meme, 'png', '-q 100')
                        .then((res) => {
                            sharp(res)
                                .resize(512, 512)
                                .toFile(`./temp/stage_${sender.id}.webp`, async (err) => {
                                    if (err) return await geps.reply(self, `Pastikan data sudah benar!`, id)
                                    await exec(`webpmux -set exif ./temp/data.exif ./temp/stage_${sender.id}.webp -o ./temp/${sender.id}.webp`, { log: false })
                                    if (fs.existsSync(`./temp/${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await geps.sendRawWebpAsSticker(self, base64)
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/stage_${sender.id}.webp`)
                                    }
                                })
                        })
                } else {
                    await geps.reply(self, ind.wrongFormat(), id)
                }
            break
            case prefix+'takestick': // By: VideFrelan
            case prefix+'take':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q.includes('|')) return await geps.reply(self, ind.wrongFormat(), id)
                if (!isPremium) return geps.reply(self, `Maaf kak ${pushname}\nPerintah ini hanya bisa digunakan user premium!`, id)
                if (quotedMsg && quotedMsg.type == 'sticker') {
                    const mediaDataTake = await decryptMedia(quotedMsg, uaOverride)
                    await geps.reply(self, ind.wait(), id)
                    const packname = q.substring(0, q.indexOf('|') - 1)
                    const author = q.substring(q.lastIndexOf('|') + 2)
                    exif.create(packname, author, `takestick_${sender.id}`)
                    webp.buffer2webpbuffer(mediaDataTake, 'jpg', '-q 100')
                        .then((res) => {
                            sharp(res)
                                .resize(512, 512)
                                .toFile(`./temp/takestickstage_${sender.id}.webp`, async (err) => {
                                    if (err) return console.error(err)
                                    await exec(`webpmux -set exif ./temp/takestick_${sender.id}.exif ./temp/takestickstage_${sender.id}.webp -o ./temp/takestick_${sender.id}.webp`, { log: false })
                                    if (fs.existsSync(`./temp/takestick_${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/takestick_${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await geps.sendRawWebpAsSticker(self, base64)
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/takestick_${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/takestickstage_${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/takestick_${sender.id}.exif`)
                                    }
                                })
                        })
                } else {
                    await geps.reply(self, ind.wrongFormat(), id)
                }
            break
            case prefix+'sticker':
            case prefix+'stiker':
            case prefix+'s':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                    await geps.sendImageAsSticker(self, imageBase64)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                    await geps.sendImageAsSticker(self, imageBase64)
                } else if (args.length === 2) {
                    const url = args[1]
                    if (url.match(isUrl)) {
                        await geps.sendStickerfromUrl(self, url, { method: 'get' })
                            .catch(err => console.log('Caught exception: ', err))
                    } else {
                        geps.reply(self, mess.error.Iv, id)
                    }
                } else {
                    await geps.reply(self, ind.wrongFormat(), id)
                }
                    break

            case prefix+'stickerp':
            case prefix+'stikerp':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                //if (!isPremium) return await geps.reply(self, ind.notPremium(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(self, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    webp.buffer2webpbuffer(mediaData, 'jpg', '-q 100')
                        .then((res) => {
                            sharp(res)
                                .resize({
                                    width: 512,
                                    height: 512,
                                    fit: 'contain',
                                    background: {
                                        r: 255,
                                        g: 255,
                                        b: 255,
                                        alpha: 0
                                    }
                                })
                                .toFile(`./temp/stage_${sender.id}.webp`, async (err) => {
                                    if (err) return console.error(err)
                                    await exec(`webpmux -set exif ./temp/data.exif ./temp/stage_${sender.id}.webp -o ./temp/${sender.id}.webp`, { log: false })
                                    if (fs.existsSync(`./temp/${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await geps.sendRawWebpAsSticker(self, base64)
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/stage_${sender.id}.webp`)
                                    }
                                })
                        })
                } else {
                   await geps.reply(self, ind.wrongFormat(), id)
                }
            break
            case prefix+'circlesticker':
            case prefix+'circlestiker':
            case prefix+'cs':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                //if (!isPremium) return await geps.reply(self, ind.notPremium(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(self, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    webp.buffer2webpbuffer(mediaData, 'jpg', '-q 100')
                        .then((res) => {
                            sharp(res)
                                .resize({
                                    width: 512,
                                    height: 512,
                                    fit: 'sharp.fit.contain',
                                    background: {
                                        r: 0,
                                        g: 0,
                                        b: 0,
                                        alpha: 0
                                    }
                                })
                                .toFile(`./temp/stage_${sender.id}.webp`, async (err) => {
                                    if (err) return console.error(err)
                                    await exec(`webpmux -set exif ./temp/data.exif ./temp/stage_${sender.id}.webp -o ./temp/${sender.id}.webp`, { log: false })
                                    if (fs.existsSync(`./temp/${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await geps.sendRawWebpAsSticker(self, base64)
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/stage_${sender.id}.webp`)
                                    }
                                })
                        })
                } else {
                   await geps.reply(self, ind.wrongFormat(), id)
                }
            break
            case prefix+'ttps':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const ttp2t = body.slice(6)
                if (!ttp2t) return await geps.reply(self, `Kirim perintah ${prefix}ttps [teks]\nContoh : ${prefix}ttps halo`, id)
                const lttp2 = ["Orange","White","Green","Black","Purple","Red","Yellow","Blue","Navy","Grey","Magenta","Brown","Gold"]
                const rttp2 = lttp2[Math.floor(Math.random() * (lttp2.length))]
                await geps.sendStickerfromUrl(self, `https://api.vhtear.com/textmaker?text=${ttp2t}&warna=${rttp2}&apikey=${config.vhtear}`)
                break
            case prefix+'stickergif':
            case prefix+'stikergif':
            case prefix+'sgif':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isMedia && type === 'video' || mimetype === 'image/gif') {
                    await geps.reply(self, ind.wait(), id)
                    try {
                        const mediaData = await decryptMedia(message, uaOverride)
                        const videoBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                        await geps.sendMp4AsSticker(self, videoBase64, { fps: 15, startTime: '00:00:00.0', endTime : '00:00:05.0', loop: 0 })
                            .then(async () => {
                                console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                await geps.sendText(self, ind.ok())
                            })
                    } catch (err) {
                        //console.error(err)
                        await geps.reply(self, ind.videoLimit(), id)
                    }
                } else if (isQuotedGif || isQuotedVideo) {
                    await geps.reply(self, ind.wait(), id)
                    try {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        const videoBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await geps.sendMp4AsSticker(self, videoBase64, { fps: 15, startTime: '00:00:00.0', endTime : '00:00:05.0', loop: 0 })
                            .then(async () => {
                                console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                            })
                    } catch (err) {
                        //console.error(err)
                        await geps.reply(self, ind.videoLimit(), id)
                    }
                } else {
                    await geps.reply(self, ind.wrongFormat(), id)
                }
            break
            case prefix+'ttg':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                await geps.reply(self, ind.wait(), id)
                await geps.sendStickerfromUrl(self, `https://api.vhtear.com/textxgif?text=${q}&apikey=${config.vhtear}`)
                    .then(() => console.log('Success creating GIF!'))
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    })
            break
            case prefix+'stickertoimg':
            case prefix+'stikertoimg':
            case prefix+'toimg':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isQuotedSticker) {
                    await geps.reply(self, ind.wait(), id)
                    try {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await geps.sendFile(self, imageBase64, 'sticker.jpg', '', id)
                    } catch (err) {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    }
                } else {
                    await geps.reply(self, ind.wrongFormat(), id)
                }
            break
 case prefix+'lol':
 if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (args.length !== 1) return geps.reply(self, ind.wrongFormat(), id)
   

kaki = body.slice(5)
				geps.reply(self, ind.wait(), id)
				ct = `http://lolhuman.herokuapp.com/api/ephoto1/textbyname?apikey=WEMPYGANSS&text=${kaki}`
				await geps.sendFileFromUrl(self, ct, 'image.jpg', '*Udah Ini Nyaaa~*', id)
				
			
break
            case prefix+'emojisticker':
            case prefix+'emojistiker':
            case prefix+'esticker':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (args.length !== 1) return geps.reply(self, ind.wrongFormat(), id)
                const emoji = body.slice(10)
                await geps.reply(self, ind.wait(), id)
                console.log('Creating emoji code for =>', emoji)
                try {
                await geps.sendStickerfromUrl(self, `https://api.zeks.xyz/api/emoji-image?apikey=apivinz&emoji=${emoji}`)
            } catch (err) {
                    //console.error(err)
                    await geps.reply(self, 'Cukup satu emoji tidak boleh 2', id)
            }
            break
            // NSFW
            case prefix+'lewds':
            case prefix+'lewd':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await geps.reply(self, ind.notNsfw(), id)
                    await geps.reply(self, ind.wait(), id)
                    nsfw.randomLewd()
                        .then(async ({ url }) => {
                            await geps.sendFileFromUrl(self, url, 'lewd.jpg', '', null, null, true)
                                .then(() => console.log('Success sending lewd!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await geps.reply(self, 'Error!', id)
                        })
                } else {
                    await geps.reply(self, ind.wait(), id)
                    nsfw.randomLewd()
                        .then(async ({ url }) => {
                            await geps.sendFileFromUrl(self, url, 'lewd.jpg', '', null, null, true)
                                .then(() => console.log('Success sending lewd!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await geps.reply(self, 'Error!', id)
                        })
                }
            break
            case prefix+'fetish':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (ar.length !== 1) return await geps.reply(self, ind.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await geps.reply(self, ind.notNsfw(), id)
                    await geps.reply(self, ind.wait(), id)
                    try {
                        if (ar[0] === 'armpits') {
                            nsfw.armpits()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(self, url, 'armpits.jpg', '', id)
                                        .then(() => console.log('Success sending armpits pic!'))
                                })
                        } else if (ar[0] === 'feets') {
                            nsfw.feets()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(self, url, 'feets.jpg', '', id)
                                        .then(() => console.log('Success sending feets pic!'))
                                })
                        } else if (ar[0] === 'thighs') {
                            nsfw.thighs()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(self, url, 'thighs.jpg', '', id)
                                        .then(() => console.log('Success sending thighs pic!'))
                                })
                        } else if (ar[0] === 'ass') {
                            nsfw.ass()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(self, url, 'ass.jpg', '', id)
                                        .then(() => console.log('Success sending ass pic!'))
                                })
                        } else if (ar[0] === 'boobs') {
                            nsfw.boobs()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(self, url, 'boobs.jpg', '', id)
                                        .then(() => console.log('Success sending boobs pic!'))
                                })
                        } else if (ar[0] === 'belly') {
                            nsfw.belly()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(self, url, 'belly.jpg', '', id)
                                        .then(() => console.log('Success sending belly pic!'))
                                })
                        } else if (ar[0] === 'sideboobs') {
                            nsfw.sideboobs()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(self, url, 'sideboobs.jpg', '', id)
                                        .then(() => console.log('Success sending sideboobs pic!'))
                                })
                        } else if (ar[0] === 'ahegao') {
                            nsfw.ahegao()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(self, url, 'ahegao.jpg', '', id)
                                        .then(() => console.log('Success sending ahegao pic!'))
                                })
                        } else {
                            await geps.reply(self, 'Tag not found.', id)
                        }
                    } catch (err) {
                        console.error(err)
                        await geps.reply(self, err, id)
                    }
                } else {
                    await geps.reply(self, ind.wait(), id)
                    try {
                        if (ar[0] === 'armpits') {
                            nsfw.armpits()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(self, url, 'armpits.jpg', '', id)
                                        .then(() => console.log('Success sending armpits pic!'))
                                })
                        } else if (ar[0] === 'feets') {
                            nsfw.feets()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(self, url, 'feets.jpg', '', id)
                                        .then(() => console.log('Success sending feets pic!'))
                                })
                        } else if (ar[0] === 'thighs') {
                            nsfw.thighs()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(self, url, 'thighs.jpg', '', id)
                                        .then(() => console.log('Success sending thighs pic!'))
                                })
                        } else if (ar[0] === 'ass') {
                            nsfw.ass()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(self, url, 'ass.jpg', '', id)
                                        .then(() => console.log('Success sending ass pic!'))
                                })
                        } else if (ar[0] === 'boobs') {
                            nsfw.boobs()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(self, url, 'boobs.jpg', '', id)
                                        .then(() => console.log('Success sending boobs pic!'))
                                })
                        } else if (ar[0] === 'belly') {
                            nsfw.belly()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(self, url, 'belly.jpg', '', id)
                                        .then(() => console.log('Success sending belly pic!'))
                                })
                        } else if (ar[0] === 'sideboobs') {
                            nsfw.sideboobs()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(self, url, 'sideboobs.jpg', '', id)
                                        .then(() => console.log('Success sending sideboobs pic!'))
                                })
                        } else if (ar[0] === 'ahegao') {
                            nsfw.ahegao()
                                .then(async ({ url }) => {
                                    await geps.sendFileFromUrl(self, url, 'ahegao.jpg', '', id)
                                        .then(() => console.log('Success sending ahegao pic!'))
                                })
                        } else {
                            await geps.reply(self, 'Tag not found.', id)
                        }
                    } catch (err) {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    }
                }
            break
            case prefix+'nhentai':
            case prefix+'nh':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (args.length !== 1) return await geps.reply(self, ind.wrongFormat(), id)
                if (isNaN(Number(args[0]))) return await geps.reply(self, ind.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await geps.reply(self, ind.notNsfw(), id)
                    await geps.reply(self, ind.wait(), id)
                    console.log(`Searching nHentai for ${args[0]}...`)
                    const validate = await nhentai.exists(args[0])
                    if (validate === true) {
                        try {
                            const pic = await api.getBook(args[0])
                                .then((book) => {
                                    return api.getImageURL(book.cover)
                                })
                            const dojin = await nhentai.getDoujin(args[0])
                            const { title, details, link } = dojin
                            const { tags, artists, languages, categories } = await details
                            let teks = `*Title*: ${title}\n\n*Tags*: ${tags.join(', ')}\n\n*Artists*: ${artists}\n\n*Languages*: ${languages.join(', ')}\n\n*Categories*: ${categories}\n\n*Link*: ${link}`
                            await geps.sendFileFromUrl(self, pic, 'nhentai.jpg', teks, id)
                                .then(() => console.log('Success sending nHentai info!'))
                        } catch (err) {
                            console.error(err)
                            await geps.reply(self, 'Error!', id)
                        }
                    } else {
                        await geps.reply(self, ind.nhFalse(), id)
                    }
                } else {
                    await geps.reply(self, ind.wait(), id)
                    console.log(`Searching nHentai for ${args[0]}...`)
                    const validate = await nhentai.exists(args[0])
                    if (validate === true) {
                        try {
                            const pic = await api.getBook(args[0])
                                .then((book) => {
                                    return api.getImageURL(book.cover)
                                })
                            const dojin = await nhentai.getDoujin(args[0])
                            const { title, details, link } = dojin
                            const { tags, artists, languages, categories } = await details
                            let teks = `*Title*: ${title}\n\n*Tags*: ${tags.join(', ')}\n\n*Artists*: ${artists}\n\n*Languages*: ${languages.join(', ')}\n\n*Categories*: ${categories}\n\n*Link*: ${link}`
                            await geps.sendFileFromUrl(self, pic, 'nhentai.jpg', teks, id)
                                .then(() => console.log('Success sending nHentai info!'))
                        } catch (err) {
                            console.error(err)
                            await geps.reply(self, 'Error!', id)
                        }
                    } else {
                        await geps.reply(self, ind.nhFalse(), id)
                    }
                }
                break
                case prefix+'nhdl':
                    if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                    if (isGroupMsg) {
                        if (!isNsfw) return await geps.reply(self, ind.notNsfw(), id)
                        await geps.reply(self, ind.wait(), id)
                        const kode = args[0]
                        const validate = await nhentai.exists(kode)
                        if (validate === true) {
                            try {
                                const dojin = await nhentai.getDoujin(kode)
                                const { title } = dojin
                                await exec(`nhentai --id=${kode} --output=./temp/doujin/${kode} --format=${kode} --no-html --pdf --rm-origin-dir`)
                                await geps.sendFile(self, `./temp/doujin/${kode}/${kode}.pdf`, `${title}.pdf`, '', id)
                                fs.unlinkSync(`./temp/doujin/${kode}/${kode}.pdf`)
                            } catch (err) {
                                console.error(err)
                                await geps.reply(self, 'Error!', id)
                            }
                        } else {
                            await geps.reply(self, ind.nhFalse(), id)
                        }
                    } else {
                        await geps.reply(self, ind.wait(), id)
                        const kode = args[0]
                        const validate = await nhentai.exists(kode)
                        if (validate === true) {
                            try {
                                const dojin = await nhentai.getDoujin(kode)
                                const { title } = dojin
                                await exec(`nhentai --id=${kode} --output=./temp/doujin/${kode} --format=${kode} --no-html --pdf --rm-origin-dir`)
                                await geps.sendFile(self, `./temp/doujin/${kode}/${kode}.pdf`, `${title}.pdf`, '', id)
                                fs.unlinkSync(`./temp/doujin/${kode}/${kode}.pdf`)
                            } catch (err) {
                                console.error(err)
                                await geps.reply(self, 'Error!', id)
                            }
                        } else {
                            await geps.reply(self, ind.nhFalse(), id)
                        }
                    }
                break
            case prefix+'nhsearch':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (args.length !== 1) return await geps.reply(self, ind.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await geps.reply(self, ind.notNsfw(), id)
                    await geps.reply(self, ind.wait(), id)
                    console.log(`Searching nHentai for ${q}...`)
                    nana.search(q)
                        .then(async (g) => {
                            let txt = `-----[ *NHENTAI* ]-----\n\n➸ *Result for*: ${q}`
                            for (let i = 0; i < g.results.length; i++) {
                                const { id, title, language } = g.results[i]
                                txt += `\n\n➸ *Title*: ${title}\n➸ *Language*: ${language.charAt(0).toUpperCase() + language.slice(1)}\n➸ *Link*: nhentai.net/g/${id}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                            }
                            await geps.sendFileFromUrl(self, g.results[0].thumbnail.s, `${g.results[0].title}`, txt, id)
                                .then(() => console.log('Success sending nHentai results!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await geps.reply(self, 'Error!', id)
                        })
                } else {
                    await geps.reply(self, ind.wait(), id)
                    console.log(`Searching nHentai for ${q}...`)
                    nana.search(q)
                        .then(async (g) => {
                            let txt = `-----[ *NHENTAI* ]-----\n\n➸ *Result for*: ${q}`
                            for (let i = 0; i < g.results.length; i++) {
                                const { id, title, language } = g.results[i]
                                txt += `\n\n➸ *Title*: ${title}\n➸ *Language*: ${language.charAt(0).toUpperCase() + language.slice(1)}\n➸ *Link*: nhentai.net/g/${id}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                            }
                            await geps.sendFileFromUrl(self, g.results[0].thumbnail.s, `${g.results[0].title}`, txt, id)
                                .then(() => console.log('Success sending nHentai results!'))
                        })
                        .catch(async(err) => {
                            console.error(err)
                            await geps.reply(self, 'Error!', id)
                        })
                }
            break
            case prefix+'jadian':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, 'perintah ini hanya dapat digunakan di dalam grup', id)
                const groupMemek = await geps.getGroupMembers(groupId)
                const mem = groupMemek
                const aku = mem[Math.floor(Math.random() * mem.length)];
                const kamu = mem[Math.floor(Math.random() * mem.length)];
                const sapa = `Cieee... @${aku.id.replace(/@c.us/g, '')} 💘 @${kamu.id.replace(/[@c.us]/g, '')} baru jadian nih\nBagi pj nya dong`
                await geps.sendTextWithMentions(self, sapa, id)
                break
            case prefix+'nekopoi':
            case prefix+'nekopoilast':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await geps.reply(self, ind.notNsfw(), id)
                    await geps.reply(self, ind.wait(), id)
                    try {
                        const res = await nekobocc.latest()
                        let text = '-----[ *NEKOPOI LATEST* ]-----'
                        for (let i = 0; i < res.result.length; i++) {
                            const { title, link } = res.result[i]
                            text += `\n\n➵ *Title*: ${title}\n➵ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(self, text, id)
                    } catch (err) {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    }
                } else {
                    await geps.reply(self, ind.wait(), id)
                    try {
                        const res = await nekobocc.latest()
                        let text = '-----[ *NEKOPOI LATEST* ]-----'
                        for (let i = 0; i < res.result.length; i++) {
                            const { title, link } = res.result[i]
                            text += `\n\n➵ *Title*: ${title}\n➵ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(self, text, id)
                    } catch (err) {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    }
                }
            break
            case prefix+'randomhentai':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isNsfw) return geps.reply(self, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
                const hentai = await axios.get(`https://tobz-api.herokuapp.com/api/hentai?apikey=BotWeA`)
                const henta = hentai.data
                if (henta.result.endsWith('.png')) {
                    var ext = '.png'
                } else {
                    var ext = '.jpg'
                }
                geps.reply(self, ind.wait(), id)
                geps.sendImage(self, henta.result, `RandomHentai${ext}`, 'Random Hentai!', id)
                break
            case prefix+'randomnsfwneko':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isNsfw) return geps.reply(self, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
                const nsfwneko = await axios.get('https://tobz-api.herokuapp.com/api/nsfwneko?apikey=BotWeA')
                const nsfwn = nsfwneko.data
                if (nsfwn.result.endsWith('.png')) {
                    var ext = '.png'
                } else {
                    var ext = '.jpg'
                }
                geps.reply(self, ind.wait(), id)
                geps.sendImage(self, nsfwn.result, `NsfwNeko${ext}`, 'NsfwNeko!', id)
                break
            case prefix+'randomtrapnime':
            case prefix+'randomtrapanime':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isNsfw) return geps.reply(self, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
                const trapnime = await axios.get('https://tobz-api.herokuapp.com/api/nsfwtrap?apikey=BotWeA')
                const trapn = trapnime.data
                if (trapn.result.endsWith('.png')) {
                    var ext = '.png'
                } else {
                    var ext = '.jpg'
                }
                geps.reply(self, ind.wait(), id)
                geps.sendImage(self, trapn.result, `trapnime${ext}`, '*Trapnime!*', id)
                break
            case prefix+'randomblowjob':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isNsfw) return geps.reply(self, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
                const sblow = await axios.get('https://tobz-api.herokuapp.com/api/nsfwblowjob?apikey=BotWeA')
                const rblow = sblow.data
                geps.reply(self, ind.wait(), id)
                geps.sendFileFromUrl(self, rblow.result, `RandoBlow${ext}`, '*Random Blowjob!*', id)
                break
            case prefix+'hug':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (!isGroupMsg) return geps.reply(self, 'Perintah ini hanya bisa di gunakan dalam group', id)
                const janjing = author.replace('@c.us', '')
                await geps.sendGiphyAsSticker(self, 'https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif')
                geps.sendTextWithMentions(self, `${prefix}` + janjing + ' *peyuuuk* ' + q)
                break
            case prefix+'slap':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (!isGroupMsg) return geps.reply(self, 'Perintah ini hanya bisa di gunakan dalam group', id)
                const person = author.replace('@c.us', '')
                await geps.sendGiphyAsSticker(self, 'https://media.giphy.com/media/S8507sBJm1598XnsgD/source.gif')
                geps.sendTextWithMentions(self, '@' + person + ' *slapped* ' + q)
                break
            case prefix+'pat':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (!isGroupMsg) return geps.reply(self, 'Perintah ini hanya bisa di gunakan dalam group', id)
                const jartod = author.replace('@c.us', '')
                await geps.sendGiphyAsSticker(self, 'https://media.giphy.com/media/Z7x24IHBcmV7W/giphy.gif')
                geps.sendTextWithMentions(self, jartod + ' *👈 Si Mengelu-elus si👉* ' + q)
                break
            case prefix+'randomhug':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const shug = await axios.get('https://tobz-api.herokuapp.com/api/hug?apikey=BotWeA')
                const rhug = shug.data
                geps.sendFileFromUrl(self, rhug.result, `RandomHug${ext}`, 'Random Hug!', id)
                break
            case prefix+'randomcry':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const scry = await axios.get('https://tobz-api.herokuapp.com/api/cry?apikey=BotWeA')
                const rcry = scry.data
                geps.sendFileFromUrl(self, rcry.result, `RandomCry${ext}`, 'Random Cry!', id)
                break
            case prefix+'randomkiss':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const skiss = await axios.get('https://tobz-api.herokuapp.com/api/kiss?apikey=BotWeA')
                const rkiss = skiss.data
                geps.sendFileFromUrl(self, rkiss.result, `RandomKiss${ext}`, 'Random Kiss!', id)
                break
            case prefix+'nekosearch':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await geps.reply(self, ind.notNsfw(), id)
                    await geps.reply(self, ind.wait(), id)
                    try {
                        const res = await nekobocc.search(q)
                        let text = '-----[ *NEKOPOI RESULT* ]-----'
                        for (let i = 0; i < res.result.length; i++) {
                            const { title, link } = res.result[i]
                            text += `\n\n➵ *Title*: ${title}\n➵ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(self, text, id)
                    } catch (err) {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    }
                } else {
                    await geps.reply(self, ind.wait(), id)
                    try {
                        const res = await nekobocc.search(q)
                        let text = '-----[ *NEKOPOI RESULT* ]-----'
                        for (let i = 0; i < res.result.length; i++) {
                            const { title, link } = res.result[i]
                            text += `\n\n➵ *Title*: ${title}\n➵ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(self, text, id)
                    } catch (err) {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    }
                }
            break
            case prefix+'waifu18':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await geps.reply(self, ind.notNsfw(), id)
                    await geps.reply(self, ind.wait(), id)
                    weeaboo.waifu(true)
                        .then(async ({ url }) => {
                            await geps.sendFileFromUrl(self, url, 'waifu.png', '*Waifu 18+*', id)
                                .then(() => console.log('Success sending waifu!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await geps.reply(self, 'Error!', id)
                        })
                } else {
                    await geps.reply(self, ind.wait(), id)
                    weeaboo.waifu(true)
                        .then(async ({ url }) => {
                            await geps.sendFileFromUrl(self, url, 'waifu.png', '*Waifu 18+*', id)
                                .then(() => console.log('Success sending waifu!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await geps.reply(self, 'Error!', id)
                        })
                }
            break
            case prefix+'phdl':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await geps.reply(self, ind.notNsfw(), id)
                    if (!isUrl(url) && !url.includes('pornhub.com')) return await geps.reply(self, ind.wrongFormat(), id)
                    await geps.reply(self, ind.wait(), id)
                    try {
                        nsfw.phDl(url)
                            .then(async ({ title, download_urls, thumbnail_url }) => {
                                const count = Object.keys(download_urls).length
                                if (count !== 2) {
                                    const shortsLow = await misc.shortener(download_urls['240P'])
                                    const shortsMid = await misc.shortener(download_urls['480P'])
                                    const shortsHigh = await misc.shortener(download_urls['720P'])
                                    await geps.sendFileFromUrl(self, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)\n${shortsMid} (480P)\n${shortsHigh} (720P)`, id)
                                        .then(() => console.log('Success sending pornhub metadata!'))
                                } else {
                                    const shortsLow = await misc.shortener(download_urls['240P'])
                                    await geps.sendFileFromUrl(self, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)`, id)
                                        .then(() => console.log('Success sending pornhub metadata!'))
                                }
                            })
                    } catch (err) {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    }
                } else {
                    if (!isUrl(url) && !url.includes('pornhub.com')) return await geps.reply(self, ind.wrongFormat(), id)
                    await geps.reply(self, ind.wait(), id)
                    try {
                        nsfw.phDl(url)
                            .then(async ({ title, download_urls, thumbnail_url }) => {
                                const count = Object.keys(download_urls).length
                                if (count !== 2) {
                                    const shortsLow = await misc.shortener(download_urls['240P'])
                                    const shortsMid = await misc.shortener(download_urls['480P'])
                                    const shortsHigh = await misc.shortener(download_urls['720P'])
                                    await geps.sendFileFromUrl(self, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)\n${shortsMid} (480P)\n${shortsHigh} (720P)`, id)
                                        .then(() => console.log('Success sending pornhub metadata!'))
                                } else {
                                    const shortsLow = await misc.shortener(download_urls['240P'])
                                    await geps.sendFileFromUrl(self, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)`, id)
                                        .then(() => console.log('Success sending pornhub metadata!'))
                                }
                            })
                    } catch (err) {
                        console.error(err)
                        await geps.reply(self, 'Error!', id)
                    }
                }
            break
            case prefix+'yuri':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await geps.reply(self, ind.notNsfw(), id)
                    await geps.reply(self, ind.wait(), id)
                    await geps.sendFileFromUrl(self, (await neko.nsfw.eroYuri()).url, 'yuri.jpg', '*Yuri!*', id)
                } else {
                    await geps.reply(self, ind.wait(), id)
                    await geps.sendFileFromUrl(self, (await neko.nsfw.eroYuri()).url, 'yuri.jpg', '*Yuri!*', id)
                }
            break
            case prefix+'lewdavatar':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await geps.reply(self, ind.notNsfw(), id)
                    await geps.reply(self, ind.wait(), id)
                    await geps.sendFileFromUrl(self, (await neko.nsfw.avatar()).url, 'avatar.jpg', '*Lewdavatar!*', id)
                } else {
                    await geps.reply(self, ind.wait(), id)
                    await geps.sendFileFromUrl(self, (await neko.nsfw.avatar()).url, 'avatar.jpg', '*Lewdavatar!*', id)
                }
            break
            case prefix+'ava':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, 'Fitur ini hanya bisa diugnakan di dalam grup', id)
                if (!quotedMsg) return geps.reply(self, 'Quote/reply pesan seseorang yang akan di download fotonya!!', id)
                try {
                    const dp = await geps.getProfilePicFromServer(quotedMsgObj.sender.id)
                    if (dp == undefined) {
                        var pfp = geps.reply(self, 'Dia ini pemalu, mungkin sedang depresi tidak berani memasang foto profil', id)
                    } else {
                        var pfp = geps.sendFileFromUrl(self, dp, 'profile.png', 'Nih bro', id)
                    }
                } catch {
                    geps.reply(self, 'Tidak ada foto profil/private', id)
                }
                break
            case prefix+'setgroupname':
            case prefix+'setgrupname':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, `Fitur ini hanya bisa di gunakan dalam group`, id)
                if (!isGroupAdmins) return geps.reply(self, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
                if (!isBotGroupAdmins) return geps.reply(self, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
                const namagrup = body.slice(13)
                let sebelum = chat.groupMetadata.formattedName
                let halaman = global.page ? global.page : await geps.getPage()
                await halaman.evaluate((chatId, subject) =>
                    Store.WapQuery.changeSubject(chatId, subject), groupId, `${namagrup}`)
                geps.sendTextWithMentions(self, `Nama group telah diubah oleh admin @${sender.id.replace('@c.us', '')}\n\n• Before: ${sebelum}\n• After: ${namagrup}`)
                break
            case prefix+'femdom':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await geps.reply(self, ind.notNsfw(), id)
                    await geps.reply(self, ind.wait(), id)
                    await geps.sendFileFromUrl(self, (await neko.nsfw.femdom()).url, 'femdom.jpg', '*Femdom!*', id)
                } else {
                    await geps.reply(self, ind.wait(), id)
                    await geps.sendFileFromUrl(self, (await neko.nsfw.femdom()).url, 'femdom.jpg', '*Femdom!*', id)
                }
            break

            // Moderation command
            /*case prefix+'add':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(self, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(self, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await geps.reply(self, ind.botNotAdmin(), id)
                if (args.length !== 1) return await geps.reply(self, ind.wrongFormat(), id)
                try {
                    await geps.addParticipant(self, `${args[0]}@c.us`)
                    await geps.sendText(self, '🎉 Welcome! 🎉')
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, 'Error!', id)
                }
            break*/
            case prefix+'add':
                if (!isGroupMsg) return geps.reply(self, 'Fitur ini hanya bisa di gunakan dalam group', id)
                if (!isGroupAdmins) return geps.reply(self, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                if (!isBotGroupAdmins) return geps.reply(self, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                try {
                    await geps.addParticipant(self, `${q}@c.us`)
                } catch {
                    geps.reply(self, `Tidak bisa invite ${q} Karena diprivate olehnya`, id)
                }
                break
            case prefix+'kick':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(self, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(self, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await geps.reply(self, ind.botNotAdmin(), id)
                if (mentionedJidList.length === 0) return await geps.reply(self, ind.wrongFormat(), id)
                if (mentionedJidList[0] === botNumber) return await geps.reply(self, ind.wrongFormat(), id)
                for (let i of mentionedJidList) {
                    if (groupAdmins.includes(i)) return await geps.reply(self, 'Tidak bisa mengeluarkan admin', id)
                    await geps.sendTextWithMentions(self, `Good bye~\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
                    await geps.removeParticipant(groupId, i)
                }
            break
            case prefix+'promote':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(self, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(self, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await geps.reply(self, ind.botNotAdmin(), id)
                if (mentionedJidList.length !== 1) return await geps.reply(self, ind.wrongFormat(), id)
                if (mentionedJidList[0] === botNumber) return await geps.reply(self, ind.wrongFormat(), id)
                if (groupAdmins.includes(mentionedJidList[0])) return await geps.reply(self, ind.adminAlready(), id)
                await geps.promoteParticipant(groupId, mentionedJidList[0])
                await geps.reply(self, ind.ok(), id)
            break
            case prefix+'tagall':
            case prefix+'mentionall':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isGroupAdmins) return geps.reply(self, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                const groupMem = await geps.getGroupMembers(groupId)
                let hehe = '┌──「 *Mention All* 」\n│\n'
                for (let i = 0; i < groupMem.length; i++) {
                    hehe += '├> '
                    hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
                }
                hehe += '│\n└──「 *ICHI X AISHA* 」'
                await sleeps(2000)
                await geps.sendTextWithMentions(self, hehe)
                break
            case prefix+'family100':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                try {
                    const resp = await axios.get(`https://api.vhtear.com/family100&apikey=${config.vhtear}`)
                    if (resp.data.error) return geps.reply(self, resp.data.error, id)
                    const anm2 = `➸ Soal : ${resp.data.result.soal}\n_Silahkan DiJawab_`
                    const jwban = `➸ Jawaban : ${resp.data.result.jawaban}`
                    geps.reply(self, anm2, id)
                    geps.sendText(self, `30 Detik Lagi...`, id)
                    await sleeps(10000)
                    geps.sendText(self, `20 Detik Lagi...`, id)
                    await sleeps(10000)
                    geps.sendText(self, `10 Detik Lagi...`, id)
                    await sleeps(10000)
                    geps.reply(self, jwban, id)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(self, errorImg, 'error.png', 'Maaf, Soal Quiz tidak ditemukan')
                    geps.sendText(ownerNumber, 'Family100 Error : ' + err)
                }
                break
            case prefix+'adminlist':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                let mimin = ''
                for (let admon of groupAdmins) {
                    mimin += `➸ @${admon.replace(/@c.us/g, '')}\n`
                }
                await sleeps(2000)
                await geps.sendTextWithMentions(self, mimin)
                break
            case prefix+'ownergroup':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                const Owner_ = chat.groupMetadata.owner
                await geps.sendTextWithMentions(self, `Owner Group : @${Owner_}`)
                break
            case prefix+'demote':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(self, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(self, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await geps.reply(self, ind.botNotAdmin(), id)
                if (mentionedJidList.length !== 1) return await geps.reply(self, ind.wrongFormat(), id)
                if (mentionedJidList[0] === botNumber) return await geps.reply(self, ind.wrongFormat(), id)
                if (!groupAdmins.includes(mentionedJidList[0])) return await geps.reply(self, ind.notAdmin(), id)
                await geps.demoteParticipant(groupId, mentionedJidList[0])
                await geps.reply(self, ind.ok(), id)
            break
            case prefix+'leave':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(self, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(self, ind.adminOnly(), id)
                await geps.sendText(self, 'Sayounara~ 👋')
                await geps.leaveGroup(groupId)
            break
            case prefix+'groupicon':
            case prefix+'setgroupicon':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(self, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(self, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return geps.reply(self, ind.botNotAdmin(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(self, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await geps.setGroupIcon(groupId, imageBase64)
                    await geps.sendText(self, ind.ok())
                } else {
                    await geps.reply(self, ind.wrongFormat(), id)
                }
            break
            case prefix+'antilink':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(self, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(self, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await geps.reply(self, ind.botNotAdmin(), id)
                if (ar[0] === 'enable') {
                    if (isDetectorOn) return await geps.reply(self, ind.detectorOnAlready(), id)
                    _antilink.push(groupId)
                    fs.writeFileSync('./database/group/antilink.json', JSON.stringify(_antilink))
                    await geps.reply(self, ind.detectorOn(name, formattedTitle), id)
                } else if (ar[0] === 'disable') {
                    _antilink.splice(groupId, 1)
                    fs.writeFileSync('./database/group/antilink.json', JSON.stringify(_antilink))
                    await geps.reply(self, ind.detectorOff(), id)
                } else {
                    await geps.reply(self, ind.wrongFormat(), id)
                }
            break
            case prefix+'leveling':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(self, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(self, ind.adminOnly(), id)
                if (ar[0] === 'enable') {
                    if (isLevelingOn) return await geps.reply(self, ind.levelingOnAlready(), id)
                    _leveling.push(groupId)
                    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                    await geps.reply(self, ind.levelingOn(), id)
                } else if (ar[0] === 'disable') {
                    _leveling.splice(groupId, 1)
                    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                    await geps.reply(self, ind.levelingOff(), id)
                } else {
                    await geps.reply(self, ind.wrongFormat(), id)
                }
            break
            case prefix+'balance':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(self, "Fitur ini hanya bisa digunakan didalam Grup!", id)
                if (!isGroupAdmins) return await geps.reply(self, "Hanya admin yang bisa mengaktifkan fitur ini!", id)
                if (ar[0] === 'enable') {
                    if (isBalanceOn) return await geps.reply(self, "Fitur Ini sudah diaktifkan sebelumnya", id)
                    _balance.push(groupId)
                    fs.writeFileSync('./database/group/balance.json', JSON.stringify(_balance))
                    await geps.reply(self, "「 *FITUR BALANCE ENABLE!* 」\n\nKlean akan mendapatkan balance jika tidak menjadi seorang sider:v", id)
                } else if (ar[0] === 'disable') {
                    _balance.splice(groupId, 1)
                    fs.writeFileSync('./database/group/balance.json', JSON.stringify(_balance))
                    await geps.reply(self, `「 *FITUR BALANCE DISABLE!* 」\n\nFitur balance dimatikan oleh admin ${pushname}!`, id)
                } else {
                    await geps.reply(self, "Pilih enable atau disable cantik:v", id)
                }
            break
            case prefix+'sider':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                if (!quotedMsg) return geps.reply(self, `Tolong Reply Pesan ICHI X AISHA`, id)
                if (!quotedMsgObj.fromMe) return geps.reply(self, `Tolong Reply Pesan ICHI X AISHA`, id)
                try {
                    const reader = await geps.getMessageReaders(quotedMsgObj.id)
                    let list = ''
                    for (let pembaca of reader) {
                        list += `- @${pembaca.id.replace(/@c.us/g, '')}\n`
                    }
                    geps.sendTextWithMentions(self, `Ciee, Ngeread...\n${list}`)
                } catch (err) {
                    console.log(err)
                    geps.reply(self, `Maaf, Belum Ada Yang Membaca Pesan ICHI X AISHA atau Mereka Menonaktifkan Read Receipts`, id)
                }
                break
            case prefix+'linkgroup':
            case prefix+'linkgrup':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, `Fitur ini hanya bisa di gunakan dalam group`, id)
                if (!isGroupAdmins) return geps.reply(self, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
                if (!isBotGroupAdmins) return geps.reply(self, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
                const namagcnye = chat.formattedTitle
                var gclink = await geps.getGroupInviteLink(groupId)
                var linkgc = `Link group : *${namagcnye}*\n\n ${gclink}`
                geps.reply(self, linkgc, id)
                break
            case prefix+'resetlinkgrup':
            case prefix+'setlink':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, `Fitur ini hanya bisa di gunakan dalam group`, id)
                if (!isGroupAdmins) return geps.reply(self, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
                if (!isBotGroupAdmins) return geps.reply(self, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
                if (isGroupMsg) {
                    await geps.revokeGroupInviteLink(groupId);
                    geps.sendTextWithMentions(self, `Link group telah direset oleh admin @${sender.id.replace('@c.us', '')}`)
                }
                break
            case prefix+'welcome':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(self, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(self, ind.adminOnly(), id)
                if (ar[0] === 'enable') {
                    if (isWelcomeOn) return await geps.reply(self, ind.welcomeOnAlready(), id)
                    _welcome.push(groupId)
                    fs.writeFileSync('./database/group/welcome.json', JSON.stringify(_welcome))
                    await geps.reply(self, ind.welcomeOn(), id)
                } else if (ar[0] === 'disable') {
                    _welcome.splice(groupId, 1)
                    fs.writeFileSync('./database/group/welcome.json', JSON.stringify(_welcome))
                    await geps.reply(self, ind.welcomeOff(), id)
                } else {
                    await geps.reply(self, ind.wrongFormat(), id)
                }
            break
            case prefix+'autosticker':
            case prefix+'autostiker':
            case prefix+'autostik':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(self, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(self, ind.adminOnly(), id)
                if (ar[0] === 'enable') {
                    if (isAutoStickerOn) return await geps.reply(self, ind.autoStikOnAlready(), id)
                    _autosticker.push(groupId)
                    fs.writeFileSync('./database/group/autosticker.json', JSON.stringify(_autosticker))
                    await geps.reply(self, ind.autoStikOn(), id)
                } else if (ar[0] === 'disable') {
                    _autosticker.splice(groupId, 1)
                    fs.writeFileSync('./database/group/autosticker.json', JSON.stringify(_autosticker))
                    await geps.reply(self, ind.autoStikOff(), id)
                } else {
                    await geps.reply(self, ind.wrongFormat(), id)
                }
            break
            case prefix+'antinsfw':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return await geps.reply(self, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(self, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await geps.reply(self, ind.botNotAdmin(), id)
                if (ar[0] === 'enable') {
                    if (isDetectorOn) return await geps.reply(self, ind.antiNsfwOnAlready(), id)
                    _antinsfw.push(groupId)
                    fs.writeFileSync('./database/group/antinsfw.json', JSON.stringify(_antinsfw))
                    await geps.reply(self, ind.antiNsfwOn(name, formattedTitle), id)
                } else if (ar[0] === 'disable') {
                    _antinsfw.splice(groupId, 1)
                    fs.writeFileSync('./database/group/antinsfw.json', JSON.stringify(_antinsfw))
                    await geps.reply(self, ind.antiNsfwOff(), id)
                } else {
                    await geps.reply(self, ind.wrongFormat(), id)
                }
            break
            case prefix+'moddroid':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                try {
                    const moddroid = await axios.get(`https://tobz-api.herokuapp.com/api/moddroid?q=${q}&apikey=BotWeA`)
                    if (moddroid.data.error) return geps.reply(self, moddroid.data.error, id)
                    const modo = moddroid.data.result[0]
                    const resmod = `• *Title* : ${modo.title}\n• *Publisher* : ${modo.publisher}\n• *Size* : ${modo.size}\n• *MOD Info* : ${modo.mod_info}\n• *Version* : ${modo.latest_version}\n• *Genre* : ${modo.genre}\n• *Link* : ${modo.link}\n• *Download* : ${modo.download}`
                    geps.sendFileFromUrl(self, modo.image, 'MODDROID.jpg', resmod, id)
                } catch (err) {
                    console.log(err)
                }
                break
            case prefix+'tebakgambar':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                try {
                    const resp = await axios.get(`https://api.vhtear.com/tebakgambar&apikey=${config.vhtear}`)
                    if (resp.data.error) return geps.reply(self, resp.data.error, id)
                    const jwban = `➸ Jawaban : ${resp.data.result.jawaban}`
                    geps.sendFileFromUrl(self, resp.data.result.soalImg, 'tebakgambar.jpg', '_Silahkan Jawab Maksud Dari Gambar Ini_', id)
                    geps.sendText(self, `30 Detik Lagi...`, id)
                    await sleeps(10000)
                    geps.sendText(self, `20 Detik Lagi...`, id)
                    await sleeps(10000)
                    geps.sendText(self, `10 Detik Lagi...`, id)
                    await sleeps(10000)
                    geps.reply(self, jwban, id)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(self, errorImg, 'error.png', '💔️ Maaf, Soal Quiz tidak ditemukan')
                    geps.sendText(ownerNumber, 'Tebak Gambar Error : ' + err)
                }
                break
            case prefix+'heroml':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                try {
                    const resp = await axios.get(`https://api.vhtear.com/herodetail?query=${q}&apikey=${config.vhtear}`)
                    if (resp.data.error) return geps.reply(self, resp.data.error, id)
                    const anm2 = `➸ Title : ${resp.data.result.title}\n➸ Quotes : ${resp.data.result.quotes}\n➸ Info : ${resp.data.result.info}\n➸ Atribut : ${resp.data.result.attributes}`
                    geps.sendFileFromUrl(self, resp.data.result.pictHero, 'hero.jpg', anm2, id)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(self, errorImg, 'error.png', '💔️ Maaf, Hero tidak ditemukan')
                    geps.sendText(ownerNumber, 'Heroml Error : ' + err)
                }
                break
            case prefix+'runtime':
                function format(seconds) {
                    function pad(s) {
                        return (s < 10 ? '0' : '') + s;
                    }
                    var hours = Math.floor(seconds / (60 * 60));
                    var minutes = Math.floor(seconds % (60 * 60) / 60);
                    var seconds = Math.floor(seconds % 60);

                    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
                }

                var uptime = process.uptime();
                geps.reply(self, `Bot telah berjalan selama ${format(uptime)}`, id)
                break
            case prefix+'infoloker':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.reply(self, ind.wait(), id)
                try {
                    const loker = await axios.get(`https://docs-jojo.herokuapp.com/api/infoloker`)
                    const loker2 = await loker.data
                    let lokerr = `*「 INFO LOKER 」*\n\n`
                    for (let i = 0; i < loker2.result.length; i++) {
                        lokerr += `\n─────────────────\n\n*Profesi* : ${loker2.result[i].profesi}\n*Deskripsi* : ${loker2.result[i].desc}\n*Edukasi* : ${loker2.result[i].edukasi}\n*Gaji* : ${loker2.result[i].gaji}\n*Job Function* : ${loker2.result[i].jobFunction}\n*Level Karir* : ${loker2.result[i].levelKarir}\n*Link* : ${loker2.result[i].link}\n*Lokasi* : ${loker2.result[i].lokasi}\n*Pengalaman* : ${loker2.result[i].pengalaman}\n*Perusahaan* : ${loker2.result[i].perusahaan}\n*Syarat* : ${loker2.result[i].syarat}`
                    }
                    await geps.reply(self, lokerr, id)
                } catch (err) {
                    console.log(err)
                    await geps.sendFileFromUrl(self, errorImg, 'error.png', 'Maaf, Loker tidak ditemukan', id)
                    geps.sendText(ownerNumber, 'Loker Error : ' + err)
                }
                break
            /*case prefix+'pastebin': //BY VINZ
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const pastebinbro = body.slice(10)
                const pastesplit = pastebinbro.split('|')[0]
                geps.reply(self, ind.wait(), id)
                //var bdtrm = body.slice(10).trim().split('|')
                const pstbn = await axios.get(`http://api.zeks.xyz/api/pastebin?apikey=benbenz&text=${pastebinbro}&name=${pastesplit}`)
                console.log(bdtrm[0])
                if (pstbn.data.status == false) return geps.reply(self, pstbn.data.message, id)
                await geps.reply(self, pstbn.data.result, id)
                break*/
            case prefix+'samehadaku':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                const animee = await axios.get(`https://docs-jojo.herokuapp.com/api/samehadaku?q=${q}`)
                const xaxaxa = `➸ *Judul* : ${animee.data.title}\n➸ *Deskripsi* : ${animee.data.desc}\n➸ *Link* : ${animee.data.link}`
                geps.reply(self, ind.wait(), id)
                geps.sendFileFromUrl(self, animee.data.thumb, 'thumb.jpg', xaxaxa, id)
                break
            case prefix+'renungan':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const renung = await axios.get('https://docs-jojo.herokuapp.com/api/renungan')
                geps.reply(self, `➸ *Judul* : ${renung.data.judul}\n➸ *Isi* : ${renung.data.Isi}\n➸ *Pesan* : ${renung.data.pesan}`, id)
                break
            case prefix+'mediafire':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                const firem = await axios.get(`https://docs-jojo.herokuapp.com/api/mediafire?url=${q}`)
                geps.reply(self, ind.wait(), id)
                geps.reply(self, `➸ *Filename* : ${firem.data.filename}\n➸ *Deskripsi* : ${firem.data.desc}\n➸ *Filetype* : ${firem.data.filetype}\n➸ *Filesize* : ${firem.data.filesize}\n➸ *diupload pada* : ${firem.data.uploaded}`, id)
                ///geps.sendFileFromUrl(self, firem.data.url, firem.data.filename, 'Nih')
                break
            case prefix+'alkitabharian':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const alkitab = await axios.get(`https://docs-jojo.herokuapp.com/api/alkitab`)
                geps.sendFileFromUrl(self, alkitab.data.result.img,'alkitab.jpg',`➸ *Ayat* : ${alkitab.data.result.ayat}\n➸ *Isi* : ${alkitab.data.result.isi}\n➸ *Link* : ${alkitab.data.result.link}`,id)
                break
            case prefix+'cersex':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const cersex = await axios.get(`https://api.vhtear.com/cerita_sex&apikey=${config.vhtear}`)
                const cersexx = `Judul : ${cersex.data.result.judul}\nCerita : ${cersex.data.result.cerita}`
                geps.sendFileFromUrl(self, cersex.data.result.image, 'cersex.jpg', cersexx, id)
                break
            case prefix+'grayscale':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const grayscale = body.slice(11)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.greyscale(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_grayscale.png`)
                                await geps.sendFile(self, `${sender.id}_grayscale.png`, `${sender.id}_grayscale.png`, '', id)
                                fs.unlinkSync(`${sender.id}_grayscale.png`)
                            })
                    } else if (grayscale == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.greyscale(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_grayscale.png`)
                                await geps.sendFile(self, `${sender.id}_grayscale.png`, `${sender.id}_grayscale.png`, '', id)
                                fs.unlinkSync(`${sender.id}_grayscale.png`)
                            })

                    } else {
                        var texnugmm = body.slice(11)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.greyscale(jnckk)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_grayscale.png`)
                                await geps.sendFile(self, `${sender.id}_grayscale.png`, `${sender.id}_grayscale.png`, '', id)
                                fs.unlinkSync(`${sender.id}_grayscale.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, 'Error!', id)
                }
                break
            case prefix+'beautiful':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const beautiful = body.slice(11)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.beautiful(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_beautiful.png`)
                                await geps.sendFile(self, `${sender.id}_beautiful.png`, `${sender.id}_beautiful.png`, '', id)
                                fs.unlinkSync(`${sender.id}_beautiful.png`)
                            })
                    } else if (beautiful == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.beautiful(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_beautiful.png`)
                                await geps.sendFile(self, `${sender.id}_beautiful.png`, `${sender.id}_beautiful.png`, '', id)
                                fs.unlinkSync(`${sender.id}_beautiful.png`)
                            })

                    } else {
                        var texnugmm = body.slice(11)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.beautiful(jnckk)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_beautiful.png`)
                                await geps.sendFile(self, `${sender.id}_beautiful.png`, `${sender.id}_beautiful.png`, '', id)
                                fs.unlinkSync(`${sender.id}_beautiful.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, 'Error!', id)
                }
                break
            case prefix+'blur':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const blur = body.slice(6)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.blur(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_blur.png`)
                                await geps.sendFile(self, `${sender.id}_blur.png`, `${sender.id}_blur.png`, '', id)
                                fs.unlinkSync(`${sender.id}_blur.png`)
                            })
                    } else if (blur == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.blur(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_blur.png`)
                                await geps.sendFile(self, `${sender.id}_blur.png`, `${sender.id}_blur.png`, '', id)
                                fs.unlinkSync(`${sender.id}_blur.png`)
                            })

                    } else {
                        var texnugmm = body.slice(6)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.blur(jnckk)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_blur.png`)
                                await geps.sendFile(self, `${sender.id}_blur.png`, `${sender.id}_blur.png`, '', id)
                                fs.unlinkSync(`${sender.id}_blur.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, 'Error!', id)
                }
                break
            case prefix+'invert':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const invert = body.slice(8)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.invert(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_invert.png`)
                                await geps.sendFile(self, `${sender.id}_invert.png`, `${sender.id}_invert.png`, '', id)
                                fs.unlinkSync(`${sender.id}_invert.png`)
                            })
                    } else if (invert == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.invert(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_invert.png`)
                                await geps.sendFile(self, `${sender.id}_invert.png`, `${sender.id}_invert.png`, '', id)
                                fs.unlinkSync(`${sender.id}_invert.png`)
                            })

                    } else {
                        var texnugmm = body.slice(8)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.invert(jnckk)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_invert.png`)
                                await geps.sendFile(self, `${sender.id}_invert.png`, `${sender.id}_invert.png`, '', id)
                                fs.unlinkSync(`${sender.id}_invert.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, 'Error!', id)
                }
                break
            case prefix+'jokeoverhead':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const jookOverHead = body.slice(14)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.jokeOverHead(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_jookOverHead.png`)
                                await geps.sendFile(self, `${sender.id}_jookOverHead.png`, `${sender.id}_jookOverHead.png`, '', id)
                                fs.unlinkSync(`${sender.id}_jookOverHead.png`)
                            })
                    } else if (jookOverHead == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.jokeOverHead(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_jookOverHead.png`)
                                await geps.sendFile(self, `${sender.id}_jookOverHead.png`, `${sender.id}_jookOverHead.png`, '', id)
                                fs.unlinkSync(`${sender.id}_jookOverHead.png`)
                            })

                    } else {
                        var texnugmm = body.slice(14)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.jokeOverHead(jnckk)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_jookOverHead.png`)
                                await geps.sendFile(self, `${sender.id}_jookOverHead.png`, `${sender.id}_jookOverHead.png`, '', id)
                                fs.unlinkSync(`${sender.id}_jookOverHead.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, 'Error!', id)
                }
                break
            case prefix+'hitler':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const hitler = body.slice(8)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.hitler(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_hitler.png`)
                                await geps.sendFile(self, `${sender.id}_hitler.png`, `${sender.id}_hitler.png`, '', id)
                                fs.unlinkSync(`${sender.id}_hitler.png`)
                            })
                    } else if (hitler == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.hitler(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_hitler.png`)
                                await geps.sendFile(self, `${sender.id}_hitler.png`, `${sender.id}_hitler.png`, '', id)
                                fs.unlinkSync(`${sender.id}_hitler.png`)
                            })

                    } else {
                        var texnugmm = body.slice(8)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.hitler(jnckk)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_hitler.png`)
                                await geps.sendFile(self, `${sender.id}_hitler.png`, `${sender.id}_hitler.png`, '', id)
                                fs.unlinkSync(`${sender.id}_hitler.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, 'Error!', id)
                }
                break
            case prefix+'pacefalm':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const facepalm = body.slice(10)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.facepalm(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_facepalm.png`)
                                await geps.sendFile(self, `${sender.id}_facepalm.png`, `${sender.id}_facepalm.png`, '', id)
                                fs.unlinkSync(`${sender.id}_facepalm.png`)
                            })
                    } else if (facepalm == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.facepalm(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_facepalm.png`)
                                await geps.sendFile(self, `${sender.id}_facepalm.png`, `${sender.id}_facepalm.png`, '', id)
                                fs.unlinkSync(`${sender.id}_facepalm.png`)
                            })

                    } else {
                        var texnugmm = body.slice(10)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.facepalm(jnckk)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_facepalm.png`)
                                await geps.sendFile(self, `${sender.id}_facepalm.png`, `${sender.id}_facepalm.png`, '', id)
                                fs.unlinkSync(`${sender.id}_facepalm.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, 'Error!', id)
                }
                break
            case prefix+'circle':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const circle = body.slice(8)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.circle(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_circle.png`)
                                await geps.sendFile(self, `${sender.id}_circle.png`, `${sender.id}_circle.png`, '', id)
                                fs.unlinkSync(`${sender.id}_circle.png`)
                            })
                    } else if (circle == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.circle(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_circle.png`)
                                await geps.sendFile(self, `${sender.id}_circle.png`, `${sender.id}_circle.png`, '', id)
                                fs.unlinkSync(`${sender.id}_circle.png`)
                            })

                    } else {
                        var texnugmm = body.slice(8)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.circle(jnckk)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_circle.png`)
                                await geps.sendFile(self, `${sender.id}_circle.png`, `${sender.id}_circle.png`, '', id)
                                fs.unlinkSync(`${sender.id}_circle.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, 'Error!', id)
                }
                break
            case prefix+'opinion':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const opinion = body.slice(9)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.opinion(ppRawww, opinion)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_opinion.png`)
                                await geps.sendFile(self, `${sender.id}_opinion.png`, `${sender.id}_opinion.png`, '', id)
                                fs.unlinkSync(`${sender.id}_opinion.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, 'Error!', id)
                }
                break
            case prefix+'fuse':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                var texnugmm = body.slice(6)
                var ppRaww = await geps.getProfilePicFromServer(quotedMsgObj.sender.id)
                var getnomberr = await geps.checkNumberStatus(texnugmm)
                var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                var imagee = await geps.getProfilePicFromServer(useriqq)

                canvas.Canvas.fuse(ppRaww, imagee)
                    .then(async (buffer) => {
                        canvas.write(buffer, `${sender.id}_fuse.png`)
                        await geps.sendFile(self, `${sender.id}_fuse.png`, `${sender.id}_fuse.png`, '', id)
                        fs.unlinkSync(`${sender.id}_fuse.png`)
                    })
                break
            case prefix+'ohno':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                var texnugmm = body.slice(6)

                canvas.Canvas.ohno(texnugmm)
                    .then(async (buffer) => {
                        canvas.write(buffer, `${sender.id}_ohno.png`)
                        await geps.sendFile(self, `${sender.id}_ohno.png`, `${sender.id}_ohno.png`, '', id)
                        fs.unlinkSync(`${sender.id}_ohno.png`)
                    })
                break
            case prefix+'clyde':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                var texnugmm = body.slice(6)

                canvas.Canvas.clyde(texnugmm)
                    .then(async (buffer) => {
                        canvas.write(buffer, `${sender.id}_clyde.png`)
                        await geps.sendFile(self, `${sender.id}_clyde.png`, `${sender.id}_clyde.png`, '', id)
                        fs.unlinkSync(`${sender.id}_clyde.png`)
                    })
                break
            case prefix+'changemymind':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                var texnugmm = body.slice(14)

                canvas.Canvas.changemymind(texnugmm)
                    .then(async (buffer) => {
                        canvas.write(buffer, `${sender.id}_changemymind.png`)
                        await geps.sendFile(self, `${sender.id}_changemymind.png`, `${sender.id}_changemymind.png`, '', id)
                        fs.unlinkSync(`${sender.id}_changemymind.png`)
                    })
                break
            case prefix+'randompuisi':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                geps.sendFileFromUrl(self, `https://api.vhtear.com/puisi_image&apikey=${config.vhtear}`, 'puisi.jpg', `Nih`, id)
                break
            case prefix+'burn':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                var texnugmm = body.slice(6)
                if (isMedia && isImage || isQuotedImage) {
                    var encryptMedia = isQuotedImage ? quotedMsg : message
                    var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                    canvas.Canvas.burn(ppRawww, texnugmm)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_burn.png`)
                            await geps.sendFile(self, `${sender.id}_burn.png`, `${sender.id}_burn.png`, '', id)
                            fs.unlinkSync(`${sender.id}_burn.png`)
                        })
                }
                break
            case prefix+'sepia':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const sepia = body.slice(7)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.sepia(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_sepia.png`)
                                await geps.sendFile(self, `${sender.id}_sepia.png`, `${sender.id}_sepia.png`, '', id)
                                fs.unlinkSync(`${sender.id}_sepia.png`)
                            })
                    } else if (sepia == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.sepia(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_sepia.png`)
                                await geps.sendFile(self, `${sender.id}_sepia.png`, `${sender.id}_sepia.png`, '', id)
                                fs.unlinkSync(`${sender.id}_sepia.png`)
                            })

                    } else {
                        var texnugmm = body.slice(7)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.sepia(jnckk)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_sepia.png`)
                                await geps.sendFile(self, `${sender.id}_sepia.png`, `${sender.id}_sepia.png`, '', id)
                                fs.unlinkSync(`${sender.id}_sepia.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, 'Error!', id)
                }
                break
            case prefix+'shit':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const shit = body.slice(6)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.shit(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_shit.png`)
                                await geps.sendFile(self, `${sender.id}_shit.png`, `${sender.id}_shit.png`, '', id)
                                fs.unlinkSync(`${sender.id}_shit.png`)
                            })
                    } else if (shit == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.shit(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_shit.png`)
                                await geps.sendFile(self, `${sender.id}_shit.png`, `${sender.id}_shit.png`, '', id)
                                fs.unlinkSync(`${sender.id}_shit.png`)
                            })

                    } else {
                        var texnugmm = body.slice(6)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.shit(jnckk)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_shit.png`)
                                await geps.sendFile(self, `${sender.id}_shit.png`, `${sender.id}_shit.png`, '', id)
                                fs.unlinkSync(`${sender.id}_shit.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, 'Error!', id)
                }
                break
            case prefix+'rainbow':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const rainboww = body.slice(9)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.rainbow(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_rainbow.png`)
                                await geps.sendFile(self, `${sender.id}_rainbow.png`, `${sender.id}_rainbow.png`, '', id)
                                fs.unlinkSync(`${sender.id}_rainbow.png`)
                            })
                    } else if (rainboww == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.rainbow(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_rainbow.png`)
                                await geps.sendFile(self, `${sender.id}_rainbow.png`, `${sender.id}_rainbow.png`, '', id)
                                fs.unlinkSync(`${sender.id}_rainbow.png`)
                            })

                    } else {
                        var texnugmm = body.slice(9)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.rainbow(jnckk)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_rainbow.png`)
                                await geps.sendFile(self, `${sender.id}_rainbow.png`, `${sender.id}_rainbow.png`, '', id)
                                fs.unlinkSync(`${sender.id}_rainbow.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, 'Error!', id)
                }
                break
            case prefix+'rip':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const ripp = body.slice(5)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.rip(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_rip.png`)
                                await geps.sendFile(self, `${sender.id}_rip.png`, `${sender.id}_rip.png`, '', id)
                                fs.unlinkSync(`${sender.id}_rip.png`)
                            })
                    } else if (ripp == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.rip(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_rip.png`)
                                await geps.sendFile(self, `${sender.id}_rip.png`, `${sender.id}_rip.png`, '', id)
                                fs.unlinkSync(`${sender.id}_rip.png`)
                            })

                    } else {
                        var texnugmm = body.slice(5)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.rip(jnckk)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_rip.png`)
                                await geps.sendFile(self, `${sender.id}_rip.png`, `${sender.id}_rip.png`, '', id)
                                fs.unlinkSync(`${sender.id}_rip.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, 'Error!', id)
                }
                break
            case prefix+'wanted':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const wantedd = body.slice(8)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRaww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.wanted(ppRaww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_wanted.png`)
                                await geps.sendFile(self, `${sender.id}_wanted.png`, `${sender.id}_wanted.png`, '', id)
                                fs.unlinkSync(`${sender.id}_wanted.png`)
                            })
                    } else if (wantedd == "me") {
                        var ppRaww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.wanted(ppRaww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_wanted.png`)
                                await geps.sendFile(self, `${sender.id}_wanted.png`, `${sender.id}_wanted.png`, '', id)
                                fs.unlinkSync(`${sender.id}_wanted.png`)
                            })

                    } else {
                        var texnugmm = body.slice(8)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnck = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.wanted(jnck)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_wanted.png`)
                                await geps.sendFile(self, `${sender.id}_wanted.png`, `${sender.id}_wanted.png`, '', id)
                                fs.unlinkSync(`${sender.id}_wanted.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, 'Error!', id)
                }
                break
            case prefix+'cekwatak':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                var namao = pushname
                var prfx = await geps.getProfilePicFromServer(sender)
                const wtk = watak[Math.floor(Math.random() * (watak.length))]
                const akhlak = ratenyaasu[Math.floor(Math.random() * (ratenyaasu.length))]
                const sft = sifat[Math.floor(Math.random() * (sifat.length))]
                const hby = hobby[Math.floor(Math.random() * (hobby.length))]
                const klbh = kelebihan[Math.floor(Math.random() * (kelebihan.length))]
                const typo = tipe[Math.floor(Math.random() * (tipe.length))]
                await geps.reply(self, `[ INTROGASI SUKSES ]\n\n*[Nama]:${namao}\n\n[Watak]:${wtk}\n\n[Akhlak✨]:${akhlak}\n\n[Sifat]:${sft}\n\n[Hobby]:${hby}\n\n[Tipe]:${typo}\n\n[Kelebihan]:${klbh}\n\n*Note\n\n_ini hanya main main_`, id)
                break
            case prefix+'nye':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!isGroupMsg) return geps.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                const jancuk7 = author.replace('@c.us', '')
                await geps.sendGiphyAsSticker(self, `https://media.giphy.com/media/cute-baka-13LunYkkBppSBa/giphy.gif`)
                geps.sendTextWithMentions(self, '@' + jancuk7 + ' *nye nye* ' + q)
                break
            case prefix+'bucin':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                fetch('https://raw.githubusercontent.com/beniismael/whatsapp-bot/master/bucin.txt')
                    .then(res => res.text())
                    .then(body => {
                        let splitcinta = body.split('\n')
                        let randomcinta = splitcinta[Math.floor(Math.random() * splitcinta.length)]
                        geps.reply(self, randomcinta, id)
                    })
                    .catch(() => {
                        geps.reply(self, `Ada yang Error!`, id)
                    })
                break
            case prefix+'gplaybutton':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                geps.reply(self, ind.wait(), id)
                const gplay = await axios.get(`http://api.zeks.xyz/api/gplaybutton?text=${q}&apikey=apivinz`)
                geps.sendFileFromUrl(self, gplay.data.result, 'gplay.jpg', `*Result* : ${q}`, id)
                break
            case prefix+'nhentaipdf':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                const lnuklir = await axios.get(`https://api.vhtear.com/nhentaipdfdownload?query=${q}&apikey=${config.vhtear}`)
                geps.reply(self, `➸ *Title* : ${lnuklir.data.result.title}\n➸ *Secondary Title* : ${lnuklir.data.result.secondary_title}\n\nTunggu sebentar...\nFile PDF sedang dikirim`, id)
                geps.sendFileFromUrl(self, lnuklir.data.result.pdf_file, `${lnuklir.data.result.title}.pdf`, 'Nih.....', id)
                break
            case prefix+'gcbanall': // Credit By ./NotF0und
                if (!isGroupMsg) return geps.reply(self, `Perintah ini hanya bisa digunakan dalam group!`, id)
                if (!isOwner) return geps.reply(self, `Perintah ini hanya untuk Owner Bot!`, id)
                const bMem = await geps.getGroupMembers(groupId)
                const groupnamae = name
                let banal = `Banned All Members~!\n*Group :* ${groupnamae}\n\n`
                for (let i = 0; i < bMem.length; i++) {
                    banal += '• '
                    banal += ` @${bMem[i].id.replace(/@c.us/g, '')}\n`
                    banned.push(bMem[i].id)
                    fs.writeFileSync('./database/user/banned.json', JSON.stringify(banned))
                }
                banal += `\nBanned : 365 days!`
                await sleeps(2000)
                await geps.sendTextWithMentions(self, banal)
                break
            case prefix+'splaybutton':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                geps.reply(self, ind.wait(), id)
                const splay = await axios.get(` http://api.zeks.xyz/api/splaybutton?text=${q}&apikey=apivinz`)
                geps.sendFileFromUrl(self, splay.data.result, 'splay.jpg', `*Result* : ${q}`, id)
                break
            case prefix+'cmd':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                await geps.sendFileFromUrl(self, `https://carbonnowsh.herokuapp.com/?code=${q}&theme=darcula&backgroundColor=rgba(144, 19, 254, 100)`, 'carbon.jpg', `*Result* : ${q}`, id)
                break
            case prefix+'happymod':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                try {
                    const happymod = await axios.get(`https://tobz-api.herokuapp.com/api/happymod?q=${q}&apikey=BotWeA`)
                    if (happymod.data.error) return geps.reply(self, happymod.data.error, id)
                    const modo = happymod.data.result[0]
                    const resmod = `• *Title* : ${modo.title}\n• *Purchase* : ${modo.purchase}\n• *Size* : ${modo.size}\n• *Root* : ${modo.root}\n• *Version* : ${modo.version}\n• *Price* : ${modo.price}\n• *Link* : ${modo.link}\n• *Download* : ${modo.download}`
                    geps.sendFileFromUrl(self, modo.image, 'HAPPYMOD.jpg', resmod, id)
                } catch (err) {
                    console.log(err)
                }
                break
            // Owner command
            case prefix+'info':
                if (!isRegistered) return await geps.reply(self, ind.notRegistered(), id)
                const urlinfo = 'https://www.linkpicture.com/q/198865_1.jpg'
                await geps.sendFileFromUrl(self, `${urlinfo}`,'bc.jpg', `\n┌──「 *INFORMATION* 」
│
├ *BOT TYPE* : NodeJS V14
├ *NAME*  : ICHI X AISHA BOT
├ *VERSION* : 3.0
├ *INSTAGRAM* : @Kingposeidon__
│
├─「 *𝙏𝙃𝘼𝙉𝙆𝙎 𝙏𝙊* 」
│
├ ALLAH SWT
├ EMAK
├ ARUGAZ
├ MHANKBARBAR
├ Tobz
├ VEZA
├ MRG3P5
├ NABIL
├ And all creator bot
│
└──「 *ICHI X AISHA* 」`, id)
                break
            case prefix+'bc':
                if (!isOwner) return geps.reply(self, `Perintah ini hanya untuk Owner ICHI X AISHA`, id)
                 bctxt = body.slice(4)
                txtbc = `*「 ICHI X AISHA BROADCAST 」*\n\n${bctxt}`
                const semuagrup = await geps.getAllChatIds();
                if(quotedMsg && quotedMsg.type == 'image'){
                    const mediaData = await decryptMedia(quotedMsg)
                    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                    for(let grupnya of semuagrup){
                        var cekgrup = await geps.getChatById(grupnya)
                        if(!cekgrup.isReadOnly) geps.sendImage(grupnya, imageBase64, 'gambar.jpeg', txtbc)
                    }
                    geps.reply('Broadcast sukses!')
              
                }
                break
            case prefix+'wame':
            case prefix+'wa.me':
                 if(isReg(obj)) return
                 if(cekumur(cekage)) return
                 var qmid = quotedMsgObj.sender.id
                 await geps.reply(self, ` ${pushname}\n wa.me/${qmid.replace('@c.us','')}?text=${body.slice(6).replace(/\s/g, '+')}`, id)
                 break
            case prefix+'leaveall':
                if (!isOwner) return await geps.reply(self, ind.ownerOnly(), id)
                if (!q) return await geps.reply(self, ind.emptyMess(), id)
                const allGroup = await geps.getAllGroups()
                for (let gclist of allGroup) {
                    await geps.sendText(gclist.contact.id, q)
                    await geps.leaveGroup(gclist.contact.id)
                }
                await geps.reply(self, ind.doneOwner())
            break
            case prefix+'getses':
                if (!isOwner) return await geps.reply(self, ind.ownerOnly(), id)
                const ses = await geps.getSnapshot()
                await geps.sendFile(self, ses, 'session.png', ind.doneOwner())
            break
            case prefix+'kickreply':
                if (!isPremium) return geps.reply(self, `Maaf kak ${pushname}\nPerintah ini hanya bisa digunakan user premium!`, id)
                if (!isGroupMsg) return geps.reply(self, 'Fitur ini hanya bisa digunakan didalam grup!', id)
                if (!isGroupAdmins) return geps.reply(self, 'Yahaha Gabisa LU bukan Admin !', id)
                if (!isBotGroupAdmins) return geps.reply(self, 'Bukan admin:(', id)
                if (quotedMsg) {
                var qmid = quotedMsgObj.sender.id
                await geps.removeParticipant(groupId, qmid)
                await geps.sendTextWithMentions(self, `TUSBOL @${qmid.replace('@c.us', '')}`, id)
                 }
                if(mentionedJidList.length === 0) return geps.reply(self, `...`, message.id)
                await geps.sendText(self, `Request Accepted! issued:\n${mentionedJidList.join('\n')}`)
                for (let i = 0; i < mentionedJidList.length; i++) {
                    if (groupAdmins.includes(mentionedJidList[i])) return await geps.reply(self, '....', message.id)
                    await geps.removeParticipant(groupId, mentionedJidList[i])
                    await geps.sendTextWithMentions(self, `TUSBOL @${mentionedJidList[i].replace('@c.us', '')}`, id)
                }
                break
            case prefix+'edotensei':
                if (!isGroupMsg) return geps.reply(self, 'Fitur ini hanya bisa di gunakan dalam group', id)
                if (!isPremium) return geps.reply(self, `Maaf kak ${pushname}\nPerintah ini hanya bisa digunakan user premium!`, id)
                if (!isBotGroupAdmins) return geps.reply(self, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
                if (mentionedJidList.length === 0) return geps.reply(self, 'Fitur untuk menghapus member lalu menambahkan member kembali,kirim perintah *#edotensei @tagmember*', id)
                for (let i = 0; i < mentionedJidList.length; i++) {
                if (groupAdmins.includes(mentionedJidList[i])) return geps.reply(self, ind.wrongFormat(), id)
                if (ownerNumber.includes(mentionedJidList[i])) return geps.reply(self, ind.wrongFormat(), id)
                await geps.removeParticipant(groupId, mentionedJidList[i])
                await sleeps(3000)
                await geps.addParticipant(self,`${mentionedJidList}`)
                }
                break
            case prefix+'blacklist':
                if (!isOwner) return await geps.reply(self, ind.ownerOnly(), id)
                if (ar[0] === 'add') {
                    if (mentionedJidList.length !== 0) {
                        for (let benet of mentionedJidList) {
                            if (benet === botNumber) return await geps.reply(self, ind.wrongFormat(), id)
                            await geps.contactBlock(benet)
                            _ban.push(benet)
                            fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        }
                        await geps.reply(self, ind.doneOwner(), id)
                    } else {
                        await geps.contactBlock(args[1] + '@c.us')
                        _ban.push(args[1] + '@c.us')
                        fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        await geps.reply(self, ind.doneOwner(), id)
                    }
                } else if (ar[0] === 'del') {
                    if (mentionedJidList.length !== 0) {
                        if (mentionedJidList[0] === botNumber) return await geps.reply(self, ind.wrongFormat(), id)
                        await geps.contactUnblock(mentionedJidList[0], 1)
                        _ban.splice(mentionedJidList[0], 1)
                        fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        await geps.reply(self, ind.doneOwner(), id)
                    } else{
                        await geps.contactUnblock(args[1] + '@c.us', 1)
                        _ban.splice(args[1] + '@c.us', 1)
                        fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        await geps.reply(self, ind.doneOwner(), id)
                    }
                } else {
                    await geps.reply(self, ind.wrongFormat(), id)
                }
            break
            case prefix+'block':
                if (!isOwner) return geps.reply(self, 'Perintah ini hanya bisa di gunakan oleh Owner ICHI X AISHA!', id)
                for (let i = 0; i < mentionedJidList.length; i++) {
                    let unblock = `${mentionedJidList[i]}`
                    await geps.contactBlock(unblock).then((a) => {
                        console.log(a)
                        geps.reply(self, `Success block ${args[1]}!`, id)
                    })
                }
                break
            case prefix+'restart': // WORK IF YOU RUN USING PM2
                if (!isOwner) return geps.reply(self, 'Perintah ini hanya bisa di gunakan oleh Owner ICHI X AISHA!', id)
                    geps.sendText(self, '*[WARN]* Restarting ...')
                    setting.restartState = true
                    setting.restartId = chatId
                    var obj = []
                    //fs.writeFileSync('./lib/setting.json', JSON.stringify(obj, null,2));
                    fs.writeFileSync('./lib/database/limit.json', JSON.stringify(obj));
                    fs.writeFileSync('./lib/database/muted.json', JSON.stringify(obj));
                    fs.writeFileSync('./lib/database/msgLimit.json', JSON.stringify(obj));
                    fs.writeFileSync('./lib/database/banned.json', JSON.stringify(obj));
                    fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(obj));
                    fs.writeFileSync('./lib/database/left.json', JSON.stringify(obj));
                    fs.writeFileSync('./lib/database/Simsimi.json', JSON.stringify(obj));
                    fs.writeFileSync('./lib/database/nsfwz.json', JSON.stringify(obj));
                    const spawn = require('child_process').exec;
                    function os_func() {
                        this.execCommand = function (command) {
                            return new Promise((resolve, reject) => {
                                spawn(command, (error, stdout) => {
                                    if (error) {
                                        reject(error);
                                        return;
                                    }
                                    resolve(stdout)
                                });
                            })
                        }
                    }
                    var oz = new os_func();
                    oz.execCommand('pm2 restart index').then(() => {
                    }).catch(err => {
                        console.log("os >>>", err);
                    })
                break
            case prefix+'unblock':
                if (!isOwner) return geps.reply(self, 'Perintah ini hanya bisa di gunakan oleh Owner ICHI X AISHA!', id)
                for (let i = 0; i < mentionedJidList.length; i++) {
                    let unblock = `${mentionedJidList[i]}`
                    await geps.contactUnblock(unblock).then((a) => {
                        console.log(a)
                        geps.reply(self, `Success unblok ${args[1]}!`, id)
                    })
                }
                break
            case prefix+'eval':
            case prefix+'ev':
                if (!isOwner) return await geps.reply(self, ind.ownerOnly(), id)
                if (!q) return await geps.reply(self, ind.wrongFormat(), id)
                try {
                    let evaled = await eval(q)
                    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                    await geps.sendText(self, evaled)
                } catch (err) {
                    console.error(err)
                    await geps.reply(self, 'Error!', id)
                }
            break
            case prefix+'setname':
                if (!isOwner) return geps.reply(self, `Perintah ini hanya bisa di gunakan oleh Owner ICHI X AISHA!`, id)
                const setnem = body.slice(9)
                await geps.setMyName(setnem)
                geps.sendTextWithMentions(self, `Makasih Nama Barunya @${sender.id.replace('@c.us', '')} 😘`)
                break
            case prefix+'setstatus':
                if (!isOwner) return geps.reply(self, `Perintah ini hanya bisa di gunakan oleh Owner ICHI X AISHA!`, id)
                const setstat = body.slice(11)
                await geps.setMyStatus(setstat)
                geps.sendTextWithMentions(self, `Makasih Status Barunya @${sender.id.replace('@c.us', '')} 😘`)
                break
            case prefix+'setpict':
                if (!isOwner) return geps.reply(self, `Perintah ini hanya bisa di gunakan oleh Owner ICHI X AISHA!`, id)
                if (isMedia) {
                    const mediaData = await decryptMedia(message)
                    const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                    await geps.setProfilePic(imageBase64)
                    geps.reply(self, `Makasih Owner Sama Foto Profilenya 😘`, id)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg)
                    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                    await geps.setProfilePic(imageBase64)
                    geps.reply(self, `Makasih Owner Sama Foto Profilenya 😘`, id)
                } else {
                    geps.reply(self, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan #setprofilepic`, id)
                }
                break
            case prefix+'shutdown':
                if (!isOwner) return await geps.reply(self, ind.ownerOnly(), id)
                await geps.sendText(self, 'Otsukaresama deshita~ 👋')
                    .then(async () => await geps.kill())
                    .catch(() => new Error('Target closed.'))
            break
            case prefix+'premium':
                if (!isOwner) return await geps.reply(self, ind.ownerOnly(), id)
                if (ar[0] === 'add') {
                    if (mentionedJidList.length !== 0) {
                        for (let benet of mentionedJidList) {
                            if (benet === botNumber) return await geps.reply(self, ind.wrongFormat(), id)
                            premium.addPremiumUser(benet, args[2], _premium)
                            await geps.reply(self, `*「 PREMIUM ADDED 」*\n\n➸ *ID*: ${benet}\n➸ *Expired*: ${ms(toMs(args[2])).days} day(s) ${ms(toMs(args[2])).hours} hour(s) ${ms(toMs(args[2])).minutes} minute(s)`, id)
                        }
                    } else {
                        premium.addPremiumUser(args[1] + '@c.us', args[2], _premium)
                        await geps.reply(self, `*「 PREMIUM ADDED 」*\n\n➸ *ID*: ${args[1]}@c.us\n➸ *Expired*: ${ms(toMs(args[2])).days} day(s) ${ms(toMs(args[2])).hours} hour(s) ${ms(toMs(args[2])).minutes} minute(s)`, id)
                    }
                } else if (ar[0] === 'del') {
                    if (mentionedJidList.length !== 0) {
                        if (mentionedJidList[0] === botNumber) return await geps.reply(self, ind.wrongFormat(), id)
                        _premium.splice(premium.getPremiumPosition(mentionedJidList[0], _premium), 1)
                        fs.writeFileSync('./database/bot/premium.json', JSON.stringify(_premium))
                        await geps.reply(self, ind.doneOwner(), id)
                    } else {
                        _premium.splice(premium.getPremiumPosition(args[1] + '@c.us', _premium), 1)
                        fs.writeFileSync('./database/bot/premium.json', JSON.stringify(_premium))
                        await geps.reply(self, ind.doneOwner(), id)
                    }
                } else {
                    await geps.reply(self, ind.wrongFormat(), id)
                }
            break

            case prefix+'setstatus':
            case prefix+'setstats':
            case prefix+'setstat':
                if (!isOwner) return await geps.reply(self, ind.ownerOnly(), id)
                if (!q) return await geps.reply(self, ind.emptyMess(), id)
                await geps.setMyStatus(q)
                await geps.sendText(self, ind.doneOwner())
            break
            case prefix+'exif':
                if (!isOwner) return await geps.reply(self, ind.ownerOnly(), id)
                if (!q.includes('|')) return await geps.reply(self, ind.wrongFormat(), id)
                const namaPack = q.substring(0, q.indexOf('|') - 1)
                const authorPack = q.substring(q.lastIndexOf('|') + 2)
                exif.create(namaPack, authorPack)
                await geps.reply(self, ind.doneOwner(), id)
            break
            default:
                if (isCmd) {
                    await geps.reply(self, ind.cmdNotFound(command), id)
                }
            break
        }
    }
    } catch (err) {
        console.error(color('[ERROR]', 'red'), err)
    }
}
/********** END OF MESSAGE HANDLER **********/
