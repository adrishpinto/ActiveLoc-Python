import { useState } from "react";

const LanguageDropdownT2S = ({ selectedVoice, setSelectedVoice }) => {
  const voicesData = {
    Afrikaans: {
      ZA: {
        female: [{ label: "AdriNeural (af-ZA)", value: "af-ZA-AdriNeural" }],
        male: [{ label: "WillemNeural (af-ZA)", value: "af-ZA-WillemNeural" }],
      },
    },
    Albanian: {
      AL: {
        female: [{ label: "AnilaNeural (sq-AL)", value: "sq-AL-AnilaNeural" }],
        male: [{ label: "IlirNeural (sq-AL)", value: "sq-AL-IlirNeural" }],
      },
    },
    Amharic: {
      ET: {
        female: [
          { label: "MekdesNeural (am-ET)", value: "am-ET-MekdesNeural" },
        ],
        male: [{ label: "AmehaNeural (am-ET)", value: "am-ET-AmehaNeural" }],
      },
    },
    Arabic: {
      AE: {
        female: [
          { label: "FatimaNeural (ar-AE)", value: "ar-AE-FatimaNeural" },
        ],
        male: [{ label: "HamdanNeural (ar-AE)", value: "ar-AE-HamdanNeural" }],
      },
      BH: {
        female: [{ label: "LailaNeural (ar-BH)", value: "ar-BH-LailaNeural" }],
        male: [{ label: "AliNeural (ar-BH)", value: "ar-BH-AliNeural" }],
      },
      DZ: {
        female: [{ label: "AminaNeural (ar-DZ)", value: "ar-DZ-AminaNeural" }],
        male: [{ label: "IsmaelNeural (ar-DZ)", value: "ar-DZ-IsmaelNeural" }],
      },
      EG: {
        female: [{ label: "SalmaNeural (ar-EG)", value: "ar-EG-SalmaNeural" }],
        male: [{ label: "ShakirNeural (ar-EG)", value: "ar-EG-ShakirNeural" }],
      },
      IQ: {
        female: [{ label: "RanaNeural (ar-IQ)", value: "ar-IQ-RanaNeural" }],
        male: [{ label: "BasselNeural (ar-IQ)", value: "ar-IQ-BasselNeural" }],
      },
      JO: {
        female: [{ label: "SanaNeural (ar-JO)", value: "ar-JO-SanaNeural" }],
        male: [{ label: "TaimNeural (ar-JO)", value: "ar-JO-TaimNeural" }],
      },
      KW: {
        female: [{ label: "NouraNeural (ar-KW)", value: "ar-KW-NouraNeural" }],
        male: [{ label: "FahedNeural (ar-KW)", value: "ar-KW-FahedNeural" }],
      },
      LB: {
        female: [{ label: "LaylaNeural (ar-LB)", value: "ar-LB-LaylaNeural" }],
        male: [{ label: "RamiNeural (ar-LB)", value: "ar-LB-RamiNeural" }],
      },
      LY: {
        female: [{ label: "ImanNeural (ar-LY)", value: "ar-LY-ImanNeural" }],
        male: [{ label: "OmarNeural (ar-LY)", value: "ar-LY-OmarNeural" }],
      },
      MA: {
        female: [{ label: "MounaNeural (ar-MA)", value: "ar-MA-MounaNeural" }],
        male: [{ label: "JamalNeural (ar-MA)", value: "ar-MA-JamalNeural" }],
      },
      OM: {
        female: [{ label: "AyshaNeural (ar-OM)", value: "ar-OM-AyshaNeural" }],
        male: [
          { label: "AbdullahNeural (ar-OM)", value: "ar-OM-AbdullahNeural" },
        ],
      },
      QA: {
        female: [{ label: "AmalNeural (ar-QA)", value: "ar-QA-AmalNeural" }],
        male: [{ label: "MoazNeural (ar-QA)", value: "ar-QA-MoazNeural" }],
      },
      SA: {
        female: [
          { label: "ZariyahNeural (ar-SA)", value: "ar-SA-ZariyahNeural" },
        ],
        male: [{ label: "HamedNeural (ar-SA)", value: "ar-SA-HamedNeural" }],
      },
      SY: {
        female: [{ label: "AmanyNeural (ar-SY)", value: "ar-SY-AmanyNeural" }],
        male: [{ label: "LaithNeural (ar-SY)", value: "ar-SY-LaithNeural" }],
      },
      TN: {
        female: [{ label: "ReemNeural (ar-TN)", value: "ar-TN-ReemNeural" }],
        male: [{ label: "HediNeural (ar-TN)", value: "ar-TN-HediNeural" }],
      },
      YE: {
        female: [
          { label: "MaryamNeural (ar-YE)", value: "ar-YE-MaryamNeural" },
        ],
        male: [{ label: "SalehNeural (ar-YE)", value: "ar-YE-SalehNeural" }],
      },
    },
    Assamese: {
      IN: {
        female: [
          { label: "YashicaNeural (as-IN)", value: "as-IN-YashicaNeural" },
        ],
        male: [{ label: "PriyomNeural (as-IN)", value: "as-IN-PriyomNeural" }],
      },
    },
    Azerbaijani: {
      AZ: {
        female: [{ label: "BanuNeural (az-AZ)", value: "az-AZ-BanuNeural" }],
        male: [{ label: "BabekNeural (az-AZ)", value: "az-AZ-BabekNeural" }],
      },
    },
    Bulgarian: {
      BG: {
        female: [
          { label: "KalinaNeural (bg-BG)", value: "bg-BG-KalinaNeural" },
        ],
        male: [
          { label: "BorislavNeural (bg-BG)", value: "bg-BG-BorislavNeural" },
        ],
      },
    },
    Bangla: {
      BD: {
        female: [
          { label: "NabanitaNeural (bn-BD)", value: "bn-BD-NabanitaNeural" },
        ],
        male: [
          { label: "PradeepNeural (bn-BD)", value: "bn-BD-PradeepNeural" },
        ],
      },
    },
    Bengali: {
      IN: {
        female: [
          { label: "TanishaaNeural (bn-IN)", value: "bn-IN-TanishaaNeural" },
        ],
        male: [
          { label: "BashkarNeural (bn-IN)", value: "bn-IN-BashkarNeural" },
        ],
      },
    },

    Basque: {
      ES: {
        female: [
          { label: "AinhoaNeural (eu-ES)", value: "eu-ES-AinhoaNeural" },
        ],
        male: [{ label: "AnderNeural (eu-ES)", value: "eu-ES-AnderNeural" }],
      },
    },

    Bosnian: {
      BA: {
        female: [{ label: "VesnaNeural (bs-BA)", value: "bs-BA-VesnaNeural" }],
        male: [{ label: "GoranNeural (bs-BA)", value: "bs-BA-GoranNeural" }],
      },
    },
    Catalan: {
      ES: {
        female: [
          { label: "JoanaNeural (ca-ES)", value: "ca-ES-JoanaNeural" },
          { label: "AlbaNeural (ca-ES)", value: "ca-ES-AlbaNeural" },
        ],
        male: [{ label: "EnricNeural (ca-ES)", value: "ca-ES-EnricNeural" }],
      },
    },
    Chinese: {
      ZH_CN: {
        female: [
          { label: "XiaoxiaoNeural (zh-CN)", value: "zh-CN-XiaoxiaoNeural" },
          { label: "XiaoyiNeural (zh-CN)", value: "zh-CN-XiaoyiNeural" },
          { label: "XiaochenNeural (zh-CN)", value: "zh-CN-XiaochenNeural" },
          {
            label: "XiaochenMultilingualNeural (zh-CN)",
            value: "zh-CN-XiaochenMultilingualNeural",
          },
          { label: "XiaohanNeural (zh-CN)", value: "zh-CN-XiaohanNeural" },
          { label: "XiaomengNeural (zh-CN)", value: "zh-CN-XiaomengNeural" },
          { label: "XiaomoNeural (zh-CN)", value: "zh-CN-XiaomoNeural" },
          { label: "XiaoqiuNeural (zh-CN)", value: "zh-CN-XiaoqiuNeural" },
          { label: "XiaorouNeural (zh-CN)", value: "zh-CN-XiaorouNeural" },
          { label: "XiaoruiNeural (zh-CN)", value: "zh-CN-XiaoruiNeural" },
          {
            label: "XiaoshuangNeural (zh-CN, Child)",
            value: "zh-CN-XiaoshuangNeural",
          },
          {
            label: "XiaoxiaoDialectsNeural (zh-CN)",
            value: "zh-CN-XiaoxiaoDialectsNeural",
          },
          {
            label: "XiaoxiaoMultilingualNeural (zh-CN)",
            value: "zh-CN-XiaoxiaoMultilingualNeural",
          },
          { label: "XiaoyanNeural (zh-CN)", value: "zh-CN-XiaoyanNeural" },
          {
            label: "XiaoyouNeural (zh-CN, Child)",
            value: "zh-CN-XiaoyouNeural",
          },
          {
            label: "XiaoyuMultilingualNeural (zh-CN)",
            value: "zh-CN-XiaoyuMultilingualNeural",
          },
          { label: "XiaozhenNeural (zh-CN)", value: "zh-CN-XiaozhenNeural" },
          {
            label: "Xiaochen:DragonHDLatestNeural1 (zh-CN)",
            value: "zh-CN-Xiaochen:DragonHDLatestNeural1",
          },
        ],
        male: [
          { label: "YunxiNeural (zh-CN)", value: "zh-CN-YunxiNeural" },
          { label: "YunjianNeural (zh-CN)", value: "zh-CN-YunjianNeural" },
          { label: "YunyangNeural (zh-CN)", value: "zh-CN-YunyangNeural" },
          { label: "YunfengNeural (zh-CN)", value: "zh-CN-YunfengNeural" },
          { label: "YunhaoNeural (zh-CN)", value: "zh-CN-YunhaoNeural" },
          { label: "YunjieNeural (zh-CN)", value: "zh-CN-YunjieNeural" },
          { label: "YunxiaNeural (zh-CN)", value: "zh-CN-YunxiaNeural" },
          { label: "YunyeNeural (zh-CN)", value: "zh-CN-YunyeNeural" },
          {
            label: "YunyiMultilingualNeural (zh-CN)",
            value: "zh-CN-YunyiMultilingualNeural",
          },
          { label: "YunzeNeural (zh-CN)", value: "zh-CN-YunzeNeural" },
          {
            label: "YunfanMultilingualNeural (zh-CN)",
            value: "zh-CN-YunfanMultilingualNeural",
          },
          {
            label: "YunxiaoMultilingualNeural (zh-CN)",
            value: "zh-CN-YunxiaoMultilingualNeural",
          },
          {
            label: "Yunfan:DragonHDLatestNeural (zh-CN)",
            value: "zh-CN-Yunfan:DragonHDLatestNeural",
          },
        ],
      },
      ZH_CN_GUANGXI: {
        male: [
          {
            label: "YunqiNeural (ZH_CN_GUANGXI)",
            value: "zh-CN-guangxi-YunqiNeural",
          },
        ],
        female: [],
      },
      ZH_CN_HENAN: {
        female: [],
        male: [
          {
            label: "YundengNeural (ZH_CN_HENAN)",
            value: "zh-CN-henan-YundengNeural",
          },
        ],
      },
      ZH_CN_LIAONING: {
        female: [
          {
            label: "XiaobeiNeural (ZH_CN_LIAONING)",
            value: "zh-CN-liaoning-XiaobeiNeural",
          },
        ],
        male: [
          {
            label: "YunbiaoNeural (ZH_CN_LIAONING)",
            value: "zh-CN-liaoning-YunbiaoNeural",
          },
        ],
      },
      ZH_CN_SHAANXI: {
        female: [
          {
            label: "XiaoniNeural (ZH_CN_SHAANXI)",
            value: "zh-CN-shaanxi-XiaoniNeural",
          },
        ],
        male: [],
      },
      ZH_CN_SHANDONG: {
        female: [],
        male: [
          {
            label: "YunxiangNeural (ZH_CN_SHANDONG)",
            value: "zh-CN-shandong-YunxiangNeural",
          },
        ],
      },
      ZH_CN_SICHUAN: {
        female: [],
        male: [
          {
            label: "YunxiNeural (ZH_CN_SICHUAN)",
            value: "zh-CN-sichuan-YunxiNeural",
          },
        ],
      },
      ZH_HK: {
        female: [
          { label: "HiuMaanNeural (ZH_HK)", value: "zh-HK-HiuMaanNeural" },
          { label: "HiuGaaiNeural (ZH_HK)", value: "zh-HK-HiuGaaiNeural" },
        ],
        male: [
          { label: "WanLungNeural (ZH_HK)", value: "zh-HK-WanLungNeural" },
        ],
      },
      ZH_TW: {
        female: [
          { label: "HsiaoChenNeural (ZH_TW)", value: "zh-TW-HsiaoChenNeural" },
          { label: "HsiaoYuNeural (ZH_TW)", value: "zh-TW-HsiaoYuNeural" },
        ],
        male: [{ label: "YunJheNeural (ZH_TW)", value: "zh-TW-YunJheNeural" }],
      },
    },
    Czech: {
      CZ: {
        female: [
          { label: "VlastaNeural (cs-CZ)", value: "cs-CZ-VlastaNeural" },
        ],
        male: [
          { label: "AntoninNeural (cs-CZ)", value: "cs-CZ-AntoninNeural" },
        ],
      },
    },

    Danish: {
      DK: {
        female: [
          { label: "ChristelNeural (da-DK)", value: "da-DK-ChristelNeural" },
        ],
        male: [{ label: "JeppeNeural (da-DK)", value: "da-DK-JeppeNeural" }],
      },
    },

    Estonian: {
      EE: {
        female: [{ label: "AnuNeural (et-EE)", value: "et-EE-AnuNeural" }],
        male: [{ label: "KertNeural (et-EE)", value: "et-EE-KertNeural" }],
      },
    },

    English: {
      AU: {
        female: [
          { label: "NatashaNeural (en-AU)", value: "en-AU-NatashaNeural" },
          { label: "AnnetteNeural (en-AU)", value: "en-AU-AnnetteNeural" },
          { label: "CarlyNeural (en-AU)", value: "en-AU-CarlyNeural" },
          { label: "ElsieNeural (en-AU)", value: "en-AU-ElsieNeural" },
          { label: "FreyaNeural (en-AU)", value: "en-AU-FreyaNeural" },
          { label: "JoanneNeural (en-AU)", value: "en-AU-JoanneNeural" },
          { label: "KimNeural (en-AU)", value: "en-AU-KimNeural" },
          { label: "TinaNeural (en-AU)", value: "en-AU-TinaNeural" },
        ],
        male: [
          { label: "WilliamNeural (en-AU)", value: "en-AU-WilliamNeural" },
          { label: "DarrenNeural (en-AU)", value: "en-AU-DarrenNeural" },
          { label: "DuncanNeural (en-AU)", value: "en-AU-DuncanNeural" },
          { label: "KenNeural (en-AU)", value: "en-AU-KenNeural" },
          { label: "NeilNeural (en-AU)", value: "en-AU-NeilNeural" },
          { label: "TimNeural (en-AU)", value: "en-AU-TimNeural" },
        ],
      },
      CA: {
        female: [{ label: "ClaraNeural (en-CA)", value: "en-CA-ClaraNeural" }],
        male: [{ label: "LiamNeural (en-CA)", value: "en-CA-LiamNeural" }],
      },

      GB: {
        female: [
          { label: "SoniaNeural (en-GB)", value: "en-GB-SoniaNeural" },
          { label: "LibbyNeural (en-GB)", value: "en-GB-LibbyNeural" },
          {
            label: "AdaMultilingualNeural(en-GB)",
            value: "en-GB-AdaMultilingualNeural",
          },
          { label: "AbbiNeural (en-GB)", value: "en-GB-AbbiNeural" },
          { label: "BellaNeural (en-GB)", value: "en-GB-BellaNeural" },
          { label: "HollieNeural (en-GB)", value: "en-GB-HollieNeural" },
          { label: "MaisieNeural (en-GB)", value: "en-GB-MaisieNeural" },
          { label: "OliviaNeural (en-GB)", value: "en-GB-OliviaNeural" },
        ],
        male: [
          { label: "RyanNeural (en-GB)", value: "en-GB-RyanNeural" },
          {
            label: "OllieMultilingualNeural (en-GB)",
            value: "en-GB-OllieMultilingualNeural",
          },
          { label: "AlfieNeural (en-GB)", value: "en-GB-AlfieNeural" },
          { label: "ElliotNeural (en-GB)", value: "en-GB-ElliotNeural" },
          { label: "EthanNeural (en-GB)", value: "en-GB-EthanNeural" },
          { label: "NoahNeural (en-GB)", value: "en-GB-NoahNeural" },
          { label: "OliverNeural (en-GB)", value: "en-GB-OliverNeural" },
          { label: "ThomasNeural (en-GB)", value: "en-GB-ThomasNeural" },
        ],
      },
      HK: {
        female: [{ label: "YanNeural (en-HK)", value: "en-HK-YanNeural" }],
        male: [{ label: "SamNeural (en-HK)", value: "en-HK-SamNeural" }],
      },
      IE: {
        female: [{ label: "EmilyNeural (en-IE)", value: "en-IE-EmilyNeural" }],
        male: [{ label: "ConnorNeural (en-IE)", value: "en-IE-ConnorNeural" }],
      },
      IN: {
        female: [
          { label: "AashiNeural (en-IN)", value: "en-IN-AashiNeural" },
          { label: "AartiNeural (en-IN)", value: "en-IN-AartiNeural" },
          { label: "AnanyaNeural (en-IN)", value: "en-IN-AnanyaNeural" },
          { label: "KavyaNeural (en-IN)", value: "en-IN-KavyaNeural" },
          { label: "NeerjaNeural (en-IN)", value: "en-IN-NeerjaNeural" },
        ],
        male: [
          { label: "AaravNeural (en-IN)", value: "en-IN-AaravNeural" },
          { label: "ArjunNeural (en-IN)", value: "en-IN-ArjunNeural" },
          { label: "KunalNeural (en-IN)", value: "en-IN-KunalNeural" },
          { label: "PrabhatNeural (en-IN)", value: "en-IN-PrabhatNeural" },
          { label: "RehaanNeural (en-IN)", value: "en-IN-RehaanNeural" },
        ],
      },
      KE: {
        female: [
          { label: "AsiliaNeural (en-KE)", value: "en-KE-AsiliaNeural" },
        ],
        male: [
          { label: "ChilembaNeural (en-KE)", value: "en-KE-ChilembaNeural" },
        ],
      },
      NG: {
        female: [
          { label: "EzinneNeural (en-NG)", value: "en-NG-EzinneNeural" },
        ],
        male: [{ label: "AbeoNeural (en-NG)", value: "en-NG-AbeoNeural" }],
      },
      NZ: {
        female: [{ label: "MollyNeural (en-NZ)", value: "en-NZ-MollyNeural" }],
        male: [
          { label: "MitchellNeural (en-NZ)", value: "en-NZ-MitchellNeural" },
        ],
      },
      PH: {
        female: [{ label: "RosaNeural (en-PH)", value: "en-PH-RosaNeural" }],
        male: [{ label: "JamesNeural (en-PH)", value: "en-PH-JamesNeural" }],
      },
      SG: {
        female: [{ label: "LunaNeural (en-SG)", value: "en-SG-LunaNeural" }],
        male: [{ label: "WayneNeural (en-SG)", value: "en-SG-WayneNeural" }],
      },
      TZ: {
        female: [{ label: "ImaniNeural (en-TZ)", value: "en-TZ-ImaniNeural" }],
        male: [{ label: "ElimuNeural (en-TZ)", value: "en-TZ-ElimuNeural" }],
      },
      US: {
        female: [
          {
            label: "AvaMultilingualNeural (en-US)",
            value: "en-US-AvaMultilingualNeural",
          },
          {
            label: "EmmaMultilingualNeural (en-US)",
            value: "en-US-EmmaMultilingualNeural",
          },
          {
            label: "NovaTurboMultilingualNeural (en-US)",
            value: "en-US-NovaTurboMultilingualNeural",
          },
          {
            label: "ShimmerTurboMultilingualNeural (en-US)",
            value: "en-US-ShimmerTurboMultilingualNeural",
          },
          { label: "AvaNeural (en-US)", value: "en-US-AvaNeural" },
          { label: "EmmaNeural (en-US)", value: "en-US-EmmaNeural" },
          { label: "JennyNeural (en-US)", value: "en-US-JennyNeural" },
          { label: "AriaNeural (en-US)", value: "en-US-AriaNeural" },
          { label: "JaneNeural (en-US)", value: "en-US-JaneNeural" },
          { label: "LunaNeural (en-US)", value: "en-US-LunaNeural" },
          { label: "SaraNeural (en-US)", value: "en-US-SaraNeural" },
          { label: "NancyNeural (en-US)", value: "en-US-NancyNeural" },
          {
            label: "CoraMultilingualNeural (en-US)",
            value: "en-US-CoraMultilingualNeural",
          },
          { label: "ElizabethNeural (en-US)", value: "en-US-ElizabethNeural" },
          {
            label: "JennyMultilingualNeural (en-US)",
            value: "en-US-JennyMultilingualNeural",
          },
          { label: "MichelleNeural (en-US)", value: "en-US-MichelleNeural" },
          { label: "MonicaNeural (en-US)", value: "en-US-MonicaNeural" },
          {
            label: "AIGenerate2Neural (en-US)",
            value: "en-US-AIGenerate2Neural",
          },
          {
            label: "AmandaMultilingualNeural (en-US)",
            value: "en-US-AmandaMultilingualNeural",
          },
          {
            label: "EvelynMultilingualNeural (en-US)",
            value: "en-US-EvelynMultilingualNeural",
          },
          {
            label: "LolaMultilingualNeural (en-US)",
            value: "en-US-LolaMultilingualNeural",
          },
          {
            label: "NancyMultilingualNeural (en-US)",
            value: "en-US-NancyMultilingualNeural",
          },
          {
            label: "PhoebeMultilingualNeural (en-US)",
            value: "en-US-PhoebeMultilingualNeural",
          },
          {
            label: "SerenaMultilingualNeural (en-US)",
            value: "en-US-SerenaMultilingualNeural",
          },
          {
            label: "Aria:DragonHDLatestNeural (en-US)",
            value: "en-US-Aria:DragonHDLatestNeural",
          },
          {
            label: "Ava:DragonHDLatestNeural (en-US)",
            value: "en-US-Ava:DragonHDLatestNeural",
          },
          {
            label: "Emma:DragonHDLatestNeural (en-US)",
            value: "en-US-Emma:DragonHDLatestNeural",
          },
          {
            label: "Emma2:DragonHDLatestNeural (en-US)",
            value: "en-US-Emma2:DragonHDLatestNeural",
          },
          {
            label: "Jenny:DragonHDLatestNeural (en-US)",
            value: "en-US-Jenny:DragonHDLatestNeural",
          },
          {
            label: "Nova:DragonHDLatestNeural (en-US)",
            value: "en-US-Nova:DragonHDLatestNeural",
          },
          {
            label: "Phoebe:DragonHDLatestNeural (en-US)",
            value: "en-US-Phoebe:DragonHDLatestNeural",
          },
          {
            label: "NovaMultilingualNeural (en-US)",
            value: "en-US-NovaMultilingualNeural",
          },
          {
            label: "ShimmerMultilingualNeural (en-US)",
            value: "en-US-ShimmerMultilingualNeural",
          },
          {
            label: "NovaMultilingualNeuralHD (en-US)",
            value: "en-US-NovaMultilingualNeuralHD",
          },
          {
            label: "ShimmerMultilingualNeuralHD (en-US)",
            value: "en-US-ShimmerMultilingualNeuralHD",
          },
          {
            label: "Serena:DragonHDLatestNeural (en-US)",
            value: "en-US-Serena:DragonHDLatestNeural",
          },
        ],
        male: [
          {
            label: "AndrewMultilingualNeural (en-US)",
            value: "en-US-AndrewMultilingualNeural",
          },
          {
            label: "AlloyTurboMultilingualNeural (en-US)",
            value: "en-US-AlloyTurboMultilingualNeural",
          },
          {
            label: "EchoTurboMultilingualNeural (en-US)",
            value: "en-US-EchoTurboMultilingualNeural",
          },
          {
            label: "OnyxTurboMultilingualNeural (en-US)",
            value: "en-US-OnyxTurboMultilingualNeural",
          },
          {
            label: "BrianMultilingualNeural (en-US)",
            value: "en-US-BrianMultilingualNeural",
          },
          { label: "AndrewNeural (en-US)", value: "en-US-AndrewNeural" },
          { label: "BrianNeural (en-US)", value: "en-US-BrianNeural" },
          { label: "GuyNeural (en-US)", value: "en-US-GuyNeural" },
          { label: "DavisNeural (en-US)", value: "en-US-DavisNeural" },
          { label: "JasonNeural (en-US)", value: "en-US-JasonNeural" },
          { label: "KaiNeural (en-US)", value: "en-US-KaiNeural" },
          { label: "TonyNeural (en-US)", value: "en-US-TonyNeural" },
          {
            label: "ChristopherMultilingualNeural (en-US)",
            value: "en-US-ChristopherMultilingualNeural",
          },
          { label: "EricNeural (en-US)", value: "en-US-EricNeural" },
          { label: "JacobNeural (en-US)", value: "en-US-JacobNeural" },
          { label: "RogerNeural (en-US)", value: "en-US-RogerNeural" },
          {
            label: "RyanMultilingualNeural (en-US)",
            value: "en-US-RyanMultilingualNeural",
          },
          { label: "SteffanNeural (en-US)", value: "en-US-SteffanNeural" },
          {
            label: "AdamMultilingualNeural (en-US)",
            value: "en-US-AdamMultilingualNeural",
          },
          {
            label: "AIGenerate1Neural (en-US)",
            value: "en-US-AIGenerate1Neural",
          },
          {
            label: "DavisMultilingualNeural (en-US)",
            value: "en-US-DavisMultilingualNeural",
          },
          {
            label: "DerekMultilingualNeural (en-US)",
            value: "en-US-DerekMultilingualNeural",
          },
          {
            label: "DustinMultilingualNeural (en-US)",
            value: "en-US-DustinMultilingualNeural",
          },
          {
            label: "LewisMultilingualNeural (en-US)",
            value: "en-US-LewisMultilingualNeural",
          },
          {
            label: "SamuelMultilingualNeural (en-US)",
            value: "en-US-SamuelMultilingualNeural",
          },
          {
            label: "SteffanMultilingualNeural (en-US)",
            value: "en-US-SteffanMultilingualNeural",
          },
          {
            label: "Adam:DragonHDLatestNeural (en-US)",
            value: "en-US-Adam:DragonHDLatestNeural",
          },
          {
            label: "Alloy:DragonHDLatestNeural (en-US)",
            value: "en-US-Alloy:DragonHDLatestNeural",
          },
          {
            label: "Andrew:DragonHDLatestNeural (en-US)",
            value: "en-US-Andrew:DragonHDLatestNeural",
          },
          {
            label: "Andrew2:DragonHDLatestNeural (en-US)",
            value: "en-US-Andrew2:DragonHDLatestNeural",
          },
          {
            label: "Brian:DragonHDLatestNeural (en-US)",
            value: "en-US-Brian:DragonHDLatestNeural",
          },
          {
            label: "Davis:DragonHDLatestNeural (en-US)",
            value: "en-US-Davis:DragonHDLatestNeural",
          },
          {
            label: "AlloyMultilingualNeural (en-US)",
            value: "en-US-AlloyMultilingualNeural",
          },
          {
            label: "EchoMultilingualNeural (en-US)",
            value: "en-US-EchoMultilingualNeural",
          },
          {
            label: "OnyxMultilingualNeural (en-US)",
            value: "en-US-OnyxMultilingualNeural",
          },
          {
            label: "AlloyMultilingualNeuralHD (en-US)",
            value: "en-US-AlloyMultilingualNeuralHD",
          },
          {
            label: "EchoMultilingualNeuralHD (en-US)",
            value: "en-US-EchoMultilingualNeuralHD",
          },
          {
            label: "OnyxMultilingualNeuralHD (en-US)",
            value: "en-US-OnyxMultilingualNeuralHD",
          },
          {
            label: "Steffan:DragonHDLatestNeural (en-US)",
            value: "en-US-Steffan:DragonHDLatestNeural",
          },
        ],
        neutral: [
          {
            label: "FableTurboMultilingualNeural (en-US)",
            value: "en-US-FableTurboMultilingualNeural",
          },
          {
            label: "FableMultilingualNeural (en-US)",
            value: "en-US-FableMultilingualNeural",
          },
          {
            label: "FableMultilingualNeuralHD (en-US)",
            value: "en-US-FableMultilingualNeuralHD",
          },
        ],
      },
      ZA: {
        female: [{ label: "LeahNeural (en-ZA)", value: "en-ZA-LeahNeural" }],
        male: [{ label: "LukeNeural (en-ZA)", value: "en-ZA-LukeNeural" }],
      },
    },
    German: {
      AT: {
        female: [
          { label: "IngridNeural (de-AT)", value: "de-AT-IngridNeural" },
        ],
        male: [{ label: "JonasNeural (de-AT)", value: "de-AT-JonasNeural" }],
      },
      CH: {
        female: [{ label: "LeniNeural (de-CH)", value: "de-CH-LeniNeural" }],
        male: [{ label: "JanNeural (de-CH)", value: "de-CH-JanNeural" }],
      },
      DE: {
        female: [
          { label: "KatjaNeural (de-DE)", value: "de-DE-KatjaNeural" },
          {
            label: "SeraphinaMultilingualNeural (de-DE)",
            value: "de-DE-SeraphinaMultilingualNeural",
          },
          { label: "AmalaNeural (de-DE)", value: "de-DE-AmalaNeural" },
          { label: "ElkeNeural (de-DE)", value: "de-DE-ElkeNeural" },
          { label: "GiselaNeural (de-DE, Child)", value: "de-DE-GiselaNeural" },
          { label: "KlarissaNeural (de-DE)", value: "de-DE-KlarissaNeural" },
          { label: "LouisaNeural (de-DE)", value: "de-DE-LouisaNeural" },
          { label: "MajaNeural (de-DE)", value: "de-DE-MajaNeural" },
          { label: "TanjaNeural (de-DE)", value: "de-DE-TanjaNeural" },
          {
            label: "Seraphina:DragonHDLatestNeural (de-DE)",
            value: "de-DE-Seraphina:DragonHDLatestNeural",
          },
        ],
        male: [
          { label: "ConradNeural (de-DE)", value: "de-DE-ConradNeural" },
          {
            label: "FlorianMultilingualNeural (de-DE)",
            value: "de-DE-FlorianMultilingualNeural",
          },
          { label: "BerndNeural (de-DE)", value: "de-DE-BerndNeural" },
          { label: "ChristophNeural (de-DE)", value: "de-DE-ChristophNeural" },
          { label: "KasperNeural (de-DE)", value: "de-DE-KasperNeural" },
          { label: "KillianNeural (de-DE)", value: "de-DE-KillianNeural" },
          { label: "KlausNeural (de-DE)", value: "de-DE-KlausNeural" },
          { label: "RalfNeural (de-DE)", value: "de-DE-RalfNeural" },
          {
            label: "Florian:DragonHDLatestNeural (de-DE)",
            value: "de-DE-Florian:DragonHDLatestNeural",
          },
        ],
      },
    },
    Greek: {
      GR: {
        female: [
          { label: "AthinaNeural (el-GR)", value: "el-GR-AthinaNeural" },
        ],
        male: [
          { label: "NestorasNeural (el-GR)", value: "el-GR-NestorasNeural" },
        ],
      },
    },

    Spanish: {
      AR: {
        female: [{ label: "ElenaNeural (es-AR)", value: "es-AR-ElenaNeural" }],
        male: [{ label: "TomasNeural (es-AR)", value: "es-AR-TomasNeural" }],
      },
      BO: {
        female: [{ label: "SofiaNeural (es-BO)", value: "es-BO-SofiaNeural" }],
        male: [
          { label: "MarceloNeural (es-BO)", value: "es-BO-MarceloNeural" },
        ],
      },
      CL: {
        female: [
          { label: "CatalinaNeural (es-CL)", value: "es-CL-CatalinaNeural" },
        ],
        male: [
          { label: "LorenzoNeural (es-CL)", value: "es-CL-LorenzoNeural" },
        ],
      },
      CO: {
        female: [
          { label: "SalomeNeural (es-CO)", value: "es-CO-SalomeNeural" },
        ],
        male: [
          { label: "GonzaloNeural (es-CO)", value: "es-CO-GonzaloNeural" },
        ],
      },
      CR: {
        female: [{ label: "MariaNeural (es-CR)", value: "es-CR-MariaNeural" }],
        male: [{ label: "JuanNeural (es-CR)", value: "es-CR-JuanNeural" }],
      },
      CU: {
        female: [
          { label: "BelkysNeural (es-CU)", value: "es-CU-BelkysNeural" },
        ],
        male: [{ label: "ManuelNeural (es-CU)", value: "es-CU-ManuelNeural" }],
      },
      DO: {
        female: [
          { label: "RamonaNeural (es-DO)", value: "es-DO-RamonaNeural" },
        ],
        male: [{ label: "EmilioNeural (es-DO)", value: "es-DO-EmilioNeural" }],
      },
      EC: {
        female: [
          { label: "AndreaNeural (es-EC)", value: "es-EC-AndreaNeural" },
        ],
        male: [{ label: "LuisNeural (es-EC)", value: "es-EC-LuisNeural" }],
      },
      ES: {
        female: [
          { label: "ElviraNeural (es-ES)", value: "es-ES-ElviraNeural" },
          {
            label: "ArabellaMultilingualNeural (es-ES)",
            value: "es-ES-ArabellaMultilingualNeural",
          },
          {
            label: "IsidoraMultilingualNeural (es-ES)",
            value: "es-ES-IsidoraMultilingualNeural",
          },
          {
            label: "XimenaMultilingualNeural (es-ES)",
            value: "es-ES-XimenaMultilingualNeural",
          },
          { label: "AbrilNeural (es-ES)", value: "es-ES-AbrilNeural" },
          { label: "EstrellaNeural (es-ES)", value: "es-ES-EstrellaNeural" },
          { label: "IreneNeural (es-ES)", value: "es-ES-IreneNeural" },
          { label: "LaiaNeural (es-ES)", value: "es-ES-LaiaNeural" },
          { label: "LiaNeural (es-ES)", value: "es-ES-LiaNeural" },
          { label: "TrianaNeural (es-ES)", value: "es-ES-TrianaNeural" },
          { label: "VeraNeural (es-ES)", value: "es-ES-VeraNeural" },
          { label: "XimenaNeural (es-ES)", value: "es-ES-XimenaNeural" },
          {
            label: "Ximena:DragonHDLatestNeural1 (es-ES)",
            value: "es-ES-Ximena:DragonHDLatestNeural1",
          },
        ],
        male: [
          { label: "AlvaroNeural (es-ES)", value: "es-ES-AlvaroNeural" },
          {
            label: "TristanMultilingualNeural (es-ES)",
            value: "es-ES-TristanMultilingualNeural",
          },
          { label: "ArnauNeural (es-ES)", value: "es-ES-ArnauNeural" },
          { label: "DarioNeural (es-ES)", value: "es-ES-DarioNeural" },
          { label: "EliasNeural (es-ES)", value: "es-ES-EliasNeural" },
          { label: "NilNeural (es-ES)", value: "es-ES-NilNeural" },
          { label: "SaulNeural (es-ES)", value: "es-ES-SaulNeural" },
          { label: "TeoNeural (es-ES)", value: "es-ES-TeoNeural" },
          {
            label: "Tristan:DragonHDLatestNeural1 (es-ES)",
            value: "es-ES-Tristan:DragonHDLatestNeural1",
          },
        ],
      },
      GQ: {
        female: [
          { label: "TeresaNeural (es-GQ)", value: "es-GQ-TeresaNeural" },
        ],
        male: [{ label: "JavierNeural (es-GQ)", value: "es-GQ-JavierNeural" }],
      },
      GT: {
        female: [{ label: "MartaNeural (es-GT)", value: "es-GT-MartaNeural" }],
        male: [{ label: "AndresNeural (es-GT)", value: "es-GT-AndresNeural" }],
      },
      HN: {
        female: [{ label: "KarlaNeural (es-HN)", value: "es-HN-KarlaNeural" }],
        male: [{ label: "CarlosNeural (es-HN)", value: "es-HN-CarlosNeural" }],
      },
      MX: {
        female: [
          { label: "DaliaNeural (es-MX)", value: "es-MX-DaliaNeural" },
          { label: "BeatrizNeural (es-MX)", value: "es-MX-BeatrizNeural" },
          { label: "CandelaNeural (es-MX)", value: "es-MX-CandelaNeural" },
          { label: "CarlotaNeural (es-MX)", value: "es-MX-CarlotaNeural" },
          { label: "LarissaNeural (es-MX)", value: "es-MX-LarissaNeural" },
          { label: "MarinaNeural (es-MX)", value: "es-MX-MarinaNeural" },
          { label: "NuriaNeural (es-MX)", value: "es-MX-NuriaNeural" },
          { label: "RenataNeural (es-MX)", value: "es-MX-RenataNeural" },
        ],
        male: [
          { label: "JorgeNeural (es-MX)", value: "es-MX-JorgeNeural" },
          { label: "CecilioNeural (es-MX)", value: "es-MX-CecilioNeural" },
          { label: "GerardoNeural (es-MX)", value: "es-MX-GerardoNeural" },
          { label: "LibertoNeural (es-MX)", value: "es-MX-LibertoNeural" },
          { label: "LucianoNeural (es-MX)", value: "es-MX-LucianoNeural" },
          { label: "PelayoNeural (es-MX)", value: "es-MX-PelayoNeural" },
          { label: "YagoNeural (es-MX)", value: "es-MX-YagoNeural" },
        ],
      },
      NI: {
        female: [
          { label: "YolandaNeural (es-NI)", value: "es-NI-YolandaNeural" },
        ],
        male: [
          { label: "FedericoNeural (es-NI)", value: "es-NI-FedericoNeural" },
        ],
      },
      PA: {
        female: [
          { label: "MargaritaNeural (es-PA)", value: "es-PA-MargaritaNeural" },
        ],
        male: [
          { label: "RobertoNeural (es-PA)", value: "es-PA-RobertoNeural" },
        ],
      },
      PE: {
        female: [
          { label: "CamilaNeural (es-PE)", value: "es-PE-CamilaNeural" },
        ],
        male: [{ label: "AlexNeural (es-PE)", value: "es-PE-AlexNeural" }],
      },
      PR: {
        female: [
          { label: "KarinaNeural (es-PR)", value: "es-PR-KarinaNeural" },
        ],
        male: [{ label: "VictorNeural (es-PR)", value: "es-PR-VictorNeural" }],
      },
      PY: {
        female: [{ label: "TaniaNeural (es-PY)", value: "es-PY-TaniaNeural" }],
        male: [{ label: "MarioNeural (es-PY)", value: "es-PY-MarioNeural" }],
      },
      SV: {
        female: [
          { label: "LorenaNeural (es-SV)", value: "es-SV-LorenaNeural" },
        ],
        male: [
          { label: "RodrigoNeural (es-SV)", value: "es-SV-RodrigoNeural" },
        ],
      },
      US: {
        female: [
          { label: "PalomaNeural (es-US)", value: "es-US-PalomaNeural" },
        ],
        male: [{ label: "AlonsoNeural (es-US)", value: "es-US-AlonsoNeural" }],
      },
      UY: {
        female: [
          { label: "ValentinaNeural (es-UY)", value: "es-UY-ValentinaNeural" },
        ],
        male: [{ label: "MateoNeural (es-UY)", value: "es-UY-MateoNeural" }],
      },
      VE: {
        female: [{ label: "PaolaNeural (es-VE)", value: "es-VE-PaolaNeural" }],
        male: [
          { label: "SebastianNeural (es-VE)", value: "es-VE-SebastianNeural" },
        ],
      },
    },

    Finnish: {
      FI: {
        female: [
          { label: "SelmaNeural (fi-FI)", value: "fi-FI-SelmaNeural" },
          { label: "NooraNeural (fi-FI)", value: "fi-FI-NooraNeural" },
        ],
        male: [{ label: "HarriNeural (fi-FI)", value: "fi-FI-HarriNeural" }],
      },
    },
    Filipino: {
      PH: {
        female: [
          { label: "BlessicaNeural (fil-PH)", value: "fil-PH-BlessicaNeural" },
        ],
        male: [
          { label: "AngeloNeural (fil-PH)", value: "fil-PH-AngeloNeural" },
        ],
      },
    },
    French: {
      female: [
        { label: "DeniseNeural (fr-FR)", value: "fr-FR-DeniseNeural" },
        {
          label: "VivienneMultilingualNeural (fr-FR)",
          value: "fr-FR-VivienneMultilingualNeural",
        },
        { label: "BrigitteNeural (fr-FR)", value: "fr-FR-BrigitteNeural" },
        { label: "CelesteNeural (fr-FR)", value: "fr-FR-CelesteNeural" },
        { label: "CoralieNeural (fr-FR)", value: "fr-FR-CoralieNeural" },
        { label: "EloiseNeural (fr-FR, Child)", value: "fr-FR-EloiseNeural" },
        { label: "JacquelineNeural (fr-FR)", value: "fr-FR-JacquelineNeural" },
        { label: "JosephineNeural (fr-FR)", value: "fr-FR-JosephineNeural" },
        { label: "YvetteNeural (fr-FR)", value: "fr-FR-YvetteNeural" },
      ],
      male: [
        { label: "HenriNeural (fr-FR)", value: "fr-FR-HenriNeural" },
        {
          label: "RemyMultilingualNeural (fr-FR)",
          value: "fr-FR-RemyMultilingualNeural",
        },
        {
          label: "LucienMultilingualNeural (fr-FR)",
          value: "fr-FR-LucienMultilingualNeural",
        },
        { label: "AlainNeural (fr-FR)", value: "fr-FR-AlainNeural" },
        { label: "ClaudeNeural (fr-FR)", value: "fr-FR-ClaudeNeural" },
        { label: "JeromeNeural (fr-FR)", value: "fr-FR-JeromeNeural" },
        { label: "MauriceNeural (fr-FR)", value: "fr-FR-MauriceNeural" },
        { label: "YvesNeural (fr-FR)", value: "fr-FR-YvesNeural" },
        {
          label: "Remy:DragonHDLatestNeural1 (fr-FR)",
          value: "fr-FR-Remy:DragonHDLatestNeural1",
        },
      ],
    },
    Irish: {
      IE: {
        female: [{ label: "OrlaNeural (ga-IE)", value: "ga-IE-OrlaNeural" }],
        male: [{ label: "ColmNeural (ga-IE)", value: "ga-IE-ColmNeural" }],
      },
    },
    Galician: {
      ES: {
        female: [
          { label: "SabelaNeural (gl-ES)", value: "gl-ES-SabelaNeural" },
        ],
        male: [{ label: "RoiNeural (gl-ES)", value: "gl-ES-RoiNeural" }],
      },
    },
    Gujarati: {
      IN: {
        female: [
          { label: "DhwaniNeural (gu-IN)", value: "gu-IN-DhwaniNeural" },
        ],
        male: [
          { label: "NiranjanNeural (gu-IN)", value: "gu-IN-NiranjanNeural" },
        ],
      },
    },
    Hebrew: {
      IL: {
        female: [{ label: "HilaNeural (he-IL)", value: "he-IL-HilaNeural" }],
        male: [{ label: "AvriNeural (he-IL)", value: "he-IL-AvriNeural" }],
      },
    },
    Hindi: {
      IN: {
        female: [
          { label: "AnanyaNeural (hi-IN)", value: "hi-IN-AnanyaNeural" },
          { label: "AartiNeural (hi-IN)", value: "hi-IN-AartiNeural" },
          { label: "KavyaNeural (hi-IN)", value: "hi-IN-KavyaNeural" },
          { label: "SwaraNeural (hi-IN)", value: "hi-IN-SwaraNeural" },
        ],
        male: [
          { label: "AaravNeural (hi-IN)", value: "hi-IN-AaravNeural" },
          { label: "ArjunNeural (hi-IN)", value: "hi-IN-ArjunNeural" },
          { label: "KunalNeural (hi-IN)", value: "hi-IN-KunalNeural" },
          { label: "RehaanNeural (hi-IN)", value: "hi-IN-RehaanNeural" },
          { label: "MadhurNeural (hi-IN)", value: "hi-IN-MadhurNeural" },
        ],
      },
    },
    Croatian: {
      HR: {
        female: [
          { label: "GabrijelaNeural (hr-HR)", value: "hr-HR-GabrijelaNeural" },
        ],
        male: [{ label: "SreckoNeural (hr-HR)", value: "hr-HR-SreckoNeural" }],
      },
    },
    Armenian: {
      AM: {
        female: [
          { label: "AnahitNeural (hy-AM)", value: "hy-AM-AnahitNeural" },
        ],
        male: [{ label: "HaykNeural (hy-AM)", value: "hy-AM-HaykNeural" }],
      },
    },
    Indonesian: {
      ID: {
        female: [{ label: "GadisNeural (id-ID)", value: "id-ID-GadisNeural" }],
        male: [{ label: "ArdiNeural (id-ID)", value: "id-ID-ArdiNeural" }],
      },
    },
    Icelandic: {
      IS: {
        female: [
          { label: "GudrunNeural (is-IS)", value: "is-IS-GudrunNeural" },
        ],
        male: [{ label: "GunnarNeural (is-IS)", value: "is-IS-GunnarNeural" }],
      },
    },
    Italian: {
      IT: {
        female: [
          { label: "ElsaNeural (it-IT)", value: "it-IT-ElsaNeural" },
          { label: "IsabellaNeural (it-IT)", value: "it-IT-IsabellaNeural" },
          {
            label: "IsabellaMultilingualNeural (it-IT)",
            value: "it-IT-IsabellaMultilingualNeural",
          },
          { label: "FabiolaNeural (it-IT)", value: "it-IT-FabiolaNeural" },
          { label: "FiammaNeural (it-IT)", value: "it-IT-FiammaNeural" },
          { label: "ImeldaNeural (it-IT)", value: "it-IT-ImeldaNeural" },
          { label: "IrmaNeural (it-IT)", value: "it-IT-IrmaNeural" },
          { label: "PalmiraNeural (it-IT)", value: "it-IT-PalmiraNeural" },
          { label: "PierinaNeural (it-IT)", value: "it-IT-PierinaNeural" },
        ],
        male: [
          { label: "DiegoNeural (it-IT)", value: "it-IT-DiegoNeural" },
          {
            label: "AlessioMultilingualNeural (it-IT)",
            value: "it-IT-AlessioMultilingualNeural",
          },
          {
            label: "GiuseppeMultilingualNeural (it-IT)",
            value: "it-IT-GiuseppeMultilingualNeural",
          },
          {
            label: "MarcelloMultilingualNeural (it-IT)",
            value: "it-IT-MarcelloMultilingualNeural",
          },
          { label: "BenignoNeural (it-IT)", value: "it-IT-BenignoNeural" },
          { label: "CalimeroNeural (it-IT)", value: "it-IT-CalimeroNeural" },
          { label: "CataldoNeural (it-IT)", value: "it-IT-CataldoNeural" },
          { label: "GianniNeural (it-IT)", value: "it-IT-GianniNeural" },
          { label: "GiuseppeNeural (it-IT)", value: "it-IT-GiuseppeNeural" },
          { label: "LisandroNeural (it-IT)", value: "it-IT-LisandroNeural" },
          { label: "RinaldoNeural (it-IT)", value: "it-IT-RinaldoNeural" },
        ],
      },
    },
    Inuktitut: {
      CANS_CA: {
        female: [
          {
            label: "SiqiniqNeural (iu-Cans-CA)",
            value: "iu-Cans-CA-SiqiniqNeural",
          },
        ],
        male: [
          {
            label: "TaqqiqNeural (iu-Cans-CA)",
            value: "iu-Cans-CA-TaqqiqNeural",
          },
        ],
      },
      LATN_CA: {
        female: [
          {
            label: "SiqiniqNeural (iu-Latn-CA)",
            value: "iu-Latn-CA-SiqiniqNeural",
          },
        ],
        male: [
          {
            label: "TaqqiqNeural (iu-Latn-CA)",
            value: "iu-Latn-CA-TaqqiqNeural",
          },
        ],
      },
    },
    Japanese: {
      JP: {
        female: [
          { label: "NanamiNeural (ja-JP)", value: "ja-JP-NanamiNeural" },
          { label: "AoiNeural (ja-JP)", value: "ja-JP-AoiNeural" },
          { label: "MayuNeural (ja-JP)", value: "ja-JP-MayuNeural" },
          { label: "ShioriNeural (ja-JP)", value: "ja-JP-ShioriNeural" },
        ],
        male: [
          { label: "KeitaNeural (ja-JP)", value: "ja-JP-KeitaNeural" },
          { label: "DaichiNeural (ja-JP)", value: "ja-JP-DaichiNeural" },
          { label: "NaokiNeural (ja-JP)", value: "ja-JP-NaokiNeural" },
          {
            label: "MasaruMultilingualNeural(ja-JP)",
            value: "ja-JP-MasaruMultilingualNeural",
          },
          {
            label: "Masaru:DragonHDLatestNeural1 (ja-JP)",
            value: "ja-JP-Masaru:DragonHDLatestNeural1",
          },
        ],
      },
    },
    Javanese: {
      ID: {
        female: [{ label: "SitiNeural (jv-ID)", value: "jv-ID-SitiNeural" }],
        male: [{ label: "DimasNeural (jv-ID)", value: "jv-ID-DimasNeural" }],
      },
    },
    Georgian: {
      GE: {
        female: [{ label: "EkaNeural (ka-GE)", value: "ka-GE-EkaNeural" }],
        male: [{ label: "GiorgiNeural (ka-GE)", value: "ka-GE-GiorgiNeural" }],
      },
    },
    Kazakh: {
      KZ: {
        female: [{ label: "AigulNeural (kk-KZ)", value: "kk-KZ-AigulNeural" }],
        male: [{ label: "DauletNeural (kk-KZ)", value: "kk-KZ-DauletNeural" }],
      },
    },
    Khmer: {
      KH: {
        female: [
          { label: "SreymomNeural (km-KH)", value: "km-KH-SreymomNeural" },
        ],
        male: [{ label: "PisethNeural (km-KH)", value: "km-KH-PisethNeural" }],
      },
    },
    Kannada: {
      IN: {
        female: [{ label: "SapnaNeural (kn-IN)", value: "kn-IN-SapnaNeural" }],
        male: [{ label: "GaganNeural (kn-IN)", value: "kn-IN-GaganNeural" }],
      },
    },
    Korean: {
      KR: {
        female: [
          { label: "SunHiNeural (ko-KR)", value: "ko-KR-SunHiNeural" },
          { label: "JiMinNeural (ko-KR)", value: "ko-KR-JiMinNeural" },
          { label: "SeoHyeonNeural (ko-KR)", value: "ko-KR-SeoHyeonNeural" },
          { label: "SoonBokNeural (ko-KR)", value: "ko-KR-SoonBokNeural" },
          { label: "YuJinNeural (ko-KR)", value: "ko-KR-YuJinNeural" },
        ],
        male: [
          { label: "InJoonNeural (ko-KR)", value: "ko-KR-InJoonNeural" },
          {
            label: "HyunsuMultilingualNeural (ko-KR)",
            value: "ko-KR-HyunsuMultilingualNeural",
          },
          { label: "BongJinNeural (ko-KR)", value: "ko-KR-BongJinNeural" },
          { label: "GookMinNeural (ko-KR)", value: "ko-KR-GookMinNeural" },
          { label: "HyunsuNeural (ko-KR)", value: "ko-KR-HyunsuNeural" },
        ],
      },
    },
    Lao: {
      LA: {
        female: [
          { label: "KeomanyNeural (lo-LA)", value: "lo-LA-KeomanyNeural" },
        ],
        male: [
          {
            label: "ChanthavongNeural (lo-LA)",
            value: "lo-LA-ChanthavongNeural",
          },
        ],
      },
    },
    Lithuanian: {
      LT: {
        female: [{ label: "OnaNeural (lt-LT)", value: "lt-LT-OnaNeural" }],
        male: [{ label: "LeonasNeural (lt-LT)", value: "lt-LT-LeonasNeural" }],
      },
    },
    Latvian: {
      LV: {
        female: [
          { label: "EveritaNeural (lv-LV)", value: "lv-LV-EveritaNeural" },
        ],
        male: [{ label: "NilsNeural (lv-LV)", value: "lv-LV-NilsNeural" }],
      },
    },
    Macedonian: {
      MK: {
        female: [
          { label: "MarijaNeural (mk-MK)", value: "mk-MK-MarijaNeural" },
        ],
        male: [
          {
            label: "AleksandarNeural (mk-MK)",
            value: "mk-MK-AleksandarNeural",
          },
        ],
      },
    },
    Malayalam: {
      IN: {
        female: [
          { label: "SobhanaNeural (ml-IN)", value: "ml-IN-SobhanaNeural" },
        ],
        male: [{ label: "MidhunNeural (ml-IN)", value: "ml-IN-MidhunNeural" }],
      },
    },
    Mongolian: {
      MN: {
        female: [{ label: "YesuiNeural (mn-MN)", value: "mn-MN-YesuiNeural" }],
        male: [{ label: "BataaNeural (mn-MN)", value: "mn-MN-BataaNeural" }],
      },
    },
    Marathi: {
      IN: {
        female: [
          { label: "AarohiNeural (mr-IN)", value: "mr-IN-AarohiNeural" },
        ],
        male: [
          { label: "ManoharNeural (mr-IN)", value: "mr-IN-ManoharNeural" },
        ],
      },
    },
    Malay: {
      MY: {
        female: [
          { label: "YasminNeural (ms-MY)", value: "ms-MY-YasminNeural" },
        ],
        male: [{ label: "OsmanNeural (ms-MY)", value: "ms-MY-OsmanNeural" }],
      },
    },
    Maltese: {
      MT: {
        female: [{ label: "GraceNeural (mt-MT)", value: "mt-MT-GraceNeural" }],
        male: [{ label: "JosephNeural (mt-MT)", value: "mt-MT-JosephNeural" }],
      },
    },
    Burmese: {
      MM: {
        female: [{ label: "NilarNeural (my-MM)", value: "my-MM-NilarNeural" }],
        male: [{ label: "ThihaNeural (my-MM)", value: "my-MM-ThihaNeural" }],
      },
    },
    "Norwegian Bokmål": {
      NO: {
        female: [
          { label: "PernilleNeural (nb-NO)", value: "nb-NO-PernilleNeural" },
          { label: "IselinNeural (nb-NO)", value: "nb-NO-IselinNeural" },
        ],
        male: [{ label: "FinnNeural (nb-NO)", value: "nb-NO-FinnNeural" }],
      },
    },
    Nepali: {
      NP: {
        female: [
          { label: "HemkalaNeural (ne-NP)", value: "ne-NP-HemkalaNeural" },
        ],
        male: [{ label: "SagarNeural (ne-NP)", value: "ne-NP-SagarNeural" }],
      },
    },
    Dutch: {
      BE: {
        female: [{ label: "DenaNeural (nl-BE)", value: "nl-BE-DenaNeural" }],
        male: [{ label: "ArnaudNeural (nl-BE)", value: "nl-BE-ArnaudNeural" }],
      },
      NL: {
        female: [
          { label: "FennaNeural (nl-NL)", value: "nl-NL-FennaNeural" },
          { label: "ColetteNeural (nl-NL)", value: "nl-NL-ColetteNeural" },
        ],
        male: [
          { label: "MaartenNeural (nl-NL)", value: "nl-NL-MaartenNeural" },
        ],
      },
    },
    Odia: {
      IN: {
        female: [
          { label: "SubhasiniNeural (or-IN)", value: "or-IN-SubhasiniNeural" },
        ],
        male: [{ label: "SukantNeural (or-IN)", value: "or-IN-SukantNeural" }],
      },
    },
    Punjabi: {
      IN: {
        female: [{ label: "VaaniNeural (pa-IN)", value: "pa-IN-VaaniNeural" }],
        male: [{ label: "OjasNeural (pa-IN)", value: "pa-IN-OjasNeural" }],
      },
    },
    Polish: {
      PL: {
        female: [
          { label: "AgnieszkaNeural (pl-PL)", value: "pl-PL-AgnieszkaNeural" },
          { label: "ZofiaNeural (pl-PL)", value: "pl-PL-ZofiaNeural" },
        ],
        male: [{ label: "MarekNeural (pl-PL)", value: "pl-PL-MarekNeural" }],
      },
    },
    Persian: {
      IR: {
        female: [
          { label: "DilaraNeural (fa-IR)", value: "fa-IR-DilaraNeural" },
        ],
        male: [{ label: "FaridNeural (fa-IR)", value: "fa-IR-FaridNeural" }],
      },
    },
    Pashto: {
      AF: {
        female: [
          { label: "LatifaNeural (ps-AF)", value: "ps-AF-LatifaNeural" },
        ],
        male: [
          { label: "GulNawazNeural (ps-AF)", value: "ps-AF-GulNawazNeural" },
        ],
      },
    },
    "Portuguese ": {
      BR: {
        female: [
          { label: "FranciscaNeural (pt-BR)", value: "pt-BR-FranciscaNeural" },
          {
            label: "ThalitaMultilingualNeural (pt-BR)",
            value: "pt-BR-ThalitaMultilingualNeural",
          },
          { label: "BrendaNeural (pt-BR)", value: "pt-BR-BrendaNeural" },
          { label: "ElzaNeural (pt-BR)", value: "pt-BR-ElzaNeural" },
          { label: "GiovannaNeural (pt-BR)", value: "pt-BR-GiovannaNeural" },
          { label: "LeilaNeural (pt-BR)", value: "pt-BR-LeilaNeural" },
          { label: "LeticiaNeural (pt-BR)", value: "pt-BR-LeticiaNeural" },
          { label: "ManuelaNeural (pt-BR)", value: "pt-BR-ManuelaNeural" },
          { label: "ThalitaNeural (pt-BR)", value: "pt-BR-ThalitaNeural" },
          { label: "YaraNeural (pt-BR)", value: "pt-BR-YaraNeural" },
        ],
        male: [
          { label: "AntonioNeural (pt-BR)", value: "pt-BR-AntonioNeural" },
          {
            label: "MacerioMultilingualNeural (pt-BR)",
            value: "pt-BR-MacerioMultilingualNeural",
          },
          { label: "DonatoNeural (pt-BR)", value: "pt-BR-DonatoNeural" },
          { label: "FabioNeural (pt-BR)", value: "pt-BR-FabioNeural" },
          { label: "HumbertoNeural (pt-BR)", value: "pt-BR-HumbertoNeural" },
          { label: "JulioNeural (pt-BR)", value: "pt-BR-JulioNeural" },
          { label: "NicolauNeural (pt-BR)", value: "pt-BR-NicolauNeural" },
          { label: "ValerioNeural (pt-BR)", value: "pt-BR-ValerioNeural" },
        ],
      },
      PT: {
        female: [
          { label: "RaquelNeural (pt-PT)", value: "pt-PT-RaquelNeural" },
          { label: "FernandaNeural (pt-PT)", value: "pt-PT-FernandaNeural" },
        ],
        male: [{ label: "DuarteNeural (pt-PT)", value: "pt-PT-DuarteNeural" }],
      },
    },
    Romanian: {
      RO: {
        female: [{ label: "AlinaNeural (ro-RO)", value: "ro-RO-AlinaNeural" }],
        male: [{ label: "EmilNeural (ro-RO)", value: "ro-RO-EmilNeural" }],
      },
    },
    Russian: {
      RU: {
        female: [
          { label: "SvetlanaNeural (ru-RU)", value: "ru-RU-SvetlanaNeural" },
          { label: "DariyaNeural (ru-RU)", value: "ru-RU-DariyaNeural" },
        ],
        male: [{ label: "DmitryNeural (ru-RU)", value: "ru-RU-DmitryNeural" }],
      },
    },
    Sinhala: {
      LK: {
        female: [
          { label: "ThiliniNeural (si-LK)", value: "si-LK-ThiliniNeural" },
        ],
        male: [
          { label: "SameeraNeural (si-LK)", value: "si-LK-SameeraNeural" },
        ],
      },
    },
    Slovak: {
      SK: {
        female: [
          { label: "ViktoriaNeural (sk-SK)", value: "sk-SK-ViktoriaNeural" },
        ],
        male: [{ label: "LukasNeural (sk-SK)", value: "sk-SK-LukasNeural" }],
      },
    },
    Slovenian: {
      SI: {
        female: [{ label: "PetraNeural (sl-SI)", value: "sl-SI-PetraNeural" }],
        male: [{ label: "RokNeural (sl-SI)", value: "sl-SI-RokNeural" }],
      },
    },
    Somali: {
      SO: {
        female: [{ label: "UbaxNeural (so-SO)", value: "so-SO-UbaxNeural" }],
        male: [{ label: "MuuseNeural (so-SO)", value: "so-SO-MuuseNeural" }],
      },
    },

    Serbian: {
      RSL: {
        female: [
          {
            label: "SophieNeural (sr-Latn-RS)",
            value: "sr-Latn-RS-SophieNeural",
          },
        ],
        male: [
          {
            label: "NicholasNeural (sr-Latn-RS)",
            value: "sr-Latn-RS-NicholasNeural",
          },
        ],
      },
      RS: {
        female: [
          { label: "SophieNeural (sr-RS)", value: "sr-RS-SophieNeural" },
        ],
        male: [
          { label: "NicholasNeural (sr-RS)", value: "sr-RS-NicholasNeural" },
        ],
      },
    },
    Sundanese: {
      ID: {
        female: [{ label: "TutiNeural (su-ID)", value: "su-ID-TutiNeural" }],
        male: [{ label: "JajangNeural (su-ID)", value: "su-ID-JajangNeural" }],
      },
    },
    Swedish: {
      SE: {
        female: [
          { label: "SofieNeural (sv-SE)", value: "sv-SE-SofieNeural" },
          { label: "HilleviNeural (sv-SE)", value: "sv-SE-HilleviNeural" },
        ],
        male: [
          { label: "MattiasNeural (sv-SE)", value: "sv-SE-MattiasNeural" },
        ],
      },
    },
    Kiswahili: {
      KE: {
        female: [{ label: "ZuriNeural (sw-KE)", value: "sw-KE-ZuriNeural" }],
        male: [{ label: "RafikiNeural (sw-KE)", value: "sw-KE-RafikiNeural" }],
      },
      TZ: {
        female: [
          { label: "RehemaNeural (sw-TZ)", value: "sw-TZ-RehemaNeural" },
        ],
        male: [{ label: "DaudiNeural (sw-TZ)", value: "sw-TZ-DaudiNeural" }],
      },
    },
    Tamil: {
      IN: {
        female: [
          { label: "PallaviNeural (ta-IN)", value: "ta-IN-PallaviNeural" },
        ],
        male: [
          { label: "ValluvarNeural (ta-IN)", value: "ta-IN-ValluvarNeural" },
        ],
      },
      LK: {
        female: [
          { label: "SaranyaNeural (ta-LK)", value: "ta-LK-SaranyaNeural" },
        ],
        male: [{ label: "KumarNeural (ta-LK)", value: "ta-LK-KumarNeural" }],
      },
      MY: {
        female: [{ label: "KaniNeural (ta-MY)", value: "ta-MY-KaniNeural" }],
        male: [{ label: "SuryaNeural (ta-MY)", value: "ta-MY-SuryaNeural" }],
      },
      SG: {
        female: [{ label: "VenbaNeural (ta-SG)", value: "ta-SG-VenbaNeural" }],
        male: [{ label: "AnbuNeural (ta-SG)", value: "ta-SG-AnbuNeural" }],
      },
    },
    Telugu: {
      IN: {
        female: [
          { label: "ShrutiNeural (te-IN)", value: "te-IN-ShrutiNeural" },
        ],
        male: [{ label: "MohanNeural (te-IN)", value: "te-IN-MohanNeural" }],
      },
    },
    Thai: {
      TH: {
        female: [
          { label: "PremwadeeNeural (th-TH)", value: "th-TH-PremwadeeNeural" },
          { label: "AcharaNeural (th-TH)", value: "th-TH-AcharaNeural" },
        ],
        male: [{ label: "NiwatNeural (th-TH)", value: "th-TH-NiwatNeural" }],
      },
    },

    Turkish: {
      TR: {
        female: [{ label: "EmelNeural (tr-TR)", value: "tr-TR-EmelNeural" }],
        male: [{ label: "AhmetNeural (tr-TR)", value: "tr-TR-AhmetNeural" }],
      },
    },

    Ukrainian: {
      UA: {
        female: [
          { label: "PolinaNeural (uk-UA)", value: "uk-UA-PolinaNeural" },
        ],
        male: [{ label: "OstapNeural (uk-UA)", value: "uk-UA-OstapNeural" }],
      },
    },

    Urdu: {
      UR_IN: {
        female: [{ label: "GulNeural (ur-IN)", value: "ur-IN-GulNeural" }],
        male: [{ label: "SalmanNeural (ur-IN)", value: "ur-IN-SalmanNeural" }],
      },
      UR_PK: {
        female: [{ label: "UzmaNeural (ur-PK)", value: "ur-PK-UzmaNeural" }],
        male: [{ label: "AsadNeural (ur-PK)", value: "ur-PK-AsadNeural" }],
      },
    },
    Uzbek: {
      UZ_UZ: {
        female: [
          { label: "MadinaNeural (UZ_UZ)", value: "uz-UZ-MadinaNeural" },
        ],
        male: [{ label: "SardorNeural (UZ_UZ)", value: "uz-UZ-SardorNeural" }],
      },
    },

    Vietnamese: {
      VI_VN: {
        female: [
          { label: "HoaiMyNeural (VI_VN)", value: "vi-VN-HoaiMyNeural" },
        ],
        male: [
          { label: "NamMinhNeural (VI_VN)", value: "vi-VN-NamMinhNeural" },
        ],
      },
    },
    Welsh: {
      GB: {
        female: [{ label: "NiaNeural (cy-GB)", value: "cy-GB-NiaNeural" }],
        male: [{ label: "AledNeural (cy-GB)", value: "cy-GB-AledNeural" }],
      },
    },
    Zulu: {
      ZU_ZA: {
        female: [
          { label: "ThandoNeural (ZU_ZA)", value: "zu-ZA-ThandoNeural" },
        ],
        male: [{ label: "ThembaNeural (ZU_ZA)", value: "zu-ZA-ThembaNeural" }],
      },
    },
  };

  const [selectedLang, setSelectedLang] = useState("");

  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);

  return (
    <div className="flex items-center flex-col border w-[60%] mx-auto py-5 bg-blue-100 rounded-lg">
      <h2 className="mb-4 font-semibold text-xl">Choose a Language</h2>
      <select
        className="p-2 border rounded outline-none w-1/2 mx-auto mb-8"
        value={selectedLang}
        onChange={(e) => {
          setSelectedLang(e.target.value);
          setSelectedVoice("");
        }}
      >
        <option value="" disabled>
          Select Language
        </option>
        {Object.keys(voicesData).map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>

      <div className="mx-auto">
        <button
          className={`px-3 py-1 border-2 border-blue-400 rounded-lg ml-2 mb-8 ${
            male ? "bg-blue-200" : "bg-slate-100"
          }`}
          onClick={() => {
            setMale((prev) => !prev), setFemale(false), setSelectedVoice("");
          }}
        >
          Male
        </button>

        <button
          className={`px-3 py-1 border-2 border-pink-400 rounded-lg ml-2 ${
            female ? "bg-pink-200" : "bg-slate-100"
          }`}
          onClick={() => {
            setFemale((prev) => !prev), setMale(false), setSelectedVoice("");
          }}
        >
          Female
        </button>
      </div>
      {selectedLang && male && (
        <select
          className="p-2 border rounded bg-white"
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
        >
          <option value="" disabled>
            Select Male Voice
          </option>
          {Object.values(voicesData[selectedLang])
            .flatMap((region) => region.male)
            .map((voice) => (
              <option key={voice.value} value={voice.value}>
                {voice.label}
              </option>
            ))}
        </select>
      )}

      {selectedLang && female && (
        <select
          className="p-2 border rounded bg-white"
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
        >
          <option value="" disabled>
            Select Female Voice
          </option>
          {Object.values(voicesData[selectedLang])
            .flatMap((region) => region.female)
            .map((voice) => (
              <option key={voice.value} value={voice.value}>
                {voice.label}
              </option>
            ))}
        </select>
      )}
    </div>
  );
};

export default LanguageDropdownT2S;
