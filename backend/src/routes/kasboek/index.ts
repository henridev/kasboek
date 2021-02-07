import { NextFunction, Request as Req, Response as Res } from "express";
import { Router } from "express";
import handler from './handler'
const router = Router();

router.get("*", async (req: Req, res: Res, next: NextFunction) => {
    console.log('req', req)

    const data = await handler.findAll(req.query.start as string, req.query.end as string)
    return res.json(data);
});

router.post("*", async (req: Req, res: Res, next: NextFunction) => {
    console.log("post")
    await handler.insertEntries(req.body)
    return res.send("success");
});

export default router;
