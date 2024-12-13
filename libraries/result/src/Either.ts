type Left<Payload extends Error> = { payload: Payload; type: "failure" };

type Right<Payload> = { payload: Payload; type: "success" };

export type Either<LeftPayload extends Error, RightPayload> =
	| Left<LeftPayload>
	| Right<RightPayload>;
