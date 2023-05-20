async function runBard() {
    const { init, askAI } = await import("bard-ai");
  
    await init("WwgQ-vtIJ9mBP_llStJ2rjZwS_2pnHX-bkYS-qFhytt_nN5e31crTMrg7sI0H9SRZC75cQ.");
    console.log(await askAI("what is the meaning of life?"));
  }
  
  runBard().catch((error) => {
    console.error(error);
  });
  