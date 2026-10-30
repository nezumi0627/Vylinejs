// deno-lint-ignore-file
/**
 * Generated LINE Thrift enums and wire-structure types. These low-level
 * definitions mirror protocol data; most applications should use the
 * higher-level Client API instead.
 * @module
 */

type Int64 = number | bigint;
import type { Buffer } from "node:buffer";
/** A Talk operation received from LINE's event stream. */
export type { Pb1_C13154r6 as Operation, Pb1_EnumC13151r3 as ContactRelation };
/** Runtime lookup tables for protocol enum names and numeric values. */
export const enums: {
	AR0_g: Record<AR0_g & string, AR0_g & number>;
	AR0_q: Record<AR0_q & string, AR0_q & number>;
	AccountMigrationPincodeType: Record<
		AccountMigrationPincodeType & string,
		AccountMigrationPincodeType & number
	>;
	ApplicationType: Record<ApplicationType & string, ApplicationType & number>;
	BotType: Record<BotType & string, BotType & number>;
	CarrierCode: Record<CarrierCode & string, CarrierCode & number>;
	ChannelErrorCode: Record<
		ChannelErrorCode & string,
		ChannelErrorCode & number
	>;
	ContactAttribute: Record<
		ContactAttribute & string,
		ContactAttribute & number
	>;
	ContactSetting: Record<ContactSetting & string, ContactSetting & number>;
	ContactStatus: Record<ContactStatus & string, ContactStatus & number>;
	ContactType: Record<ContactType & string, ContactType & number>;
	ContentType: Record<ContentType & string, ContentType & number>;
	Eg_EnumC8927a: Record<Eg_EnumC8927a & string, Eg_EnumC8927a & number>;
	EmailConfirmationStatus: Record<
		EmailConfirmationStatus & string,
		EmailConfirmationStatus & number
	>;
	ErrorCode: Record<ErrorCode & string, ErrorCode & number>;
	Fg_a: Record<Fg_a & string, Fg_a & number>;
	FriendRequestStatus: Record<
		FriendRequestStatus & string,
		FriendRequestStatus & number
	>;
	IdentityProvider: Record<
		IdentityProvider & string,
		IdentityProvider & number
	>;
	LN0_F0: Record<LN0_F0 & string, LN0_F0 & number>;
	LN0_X0: Record<LN0_X0 & string, LN0_X0 & number>;
	MIDType: Record<MIDType & string, MIDType & number>;
	NZ0_B0: Record<NZ0_B0 & string, NZ0_B0 & number>;
	NZ0_C0: Record<NZ0_C0 & string, NZ0_C0 & number>;
	NZ0_EnumC12154b1: Record<
		NZ0_EnumC12154b1 & string,
		NZ0_EnumC12154b1 & number
	>;
	NZ0_EnumC12169g1: Record<
		NZ0_EnumC12169g1 & string,
		NZ0_EnumC12169g1 & number
	>;
	NZ0_EnumC12170h: Record<NZ0_EnumC12170h & string, NZ0_EnumC12170h & number>;
	NZ0_EnumC12188n: Record<NZ0_EnumC12188n & string, NZ0_EnumC12188n & number>;
	NZ0_EnumC12192o0: Record<
		NZ0_EnumC12192o0 & string,
		NZ0_EnumC12192o0 & number
	>;
	NZ0_EnumC12193o1: Record<
		NZ0_EnumC12193o1 & string,
		NZ0_EnumC12193o1 & number
	>;
	NZ0_EnumC12195p0: Record<
		NZ0_EnumC12195p0 & string,
		NZ0_EnumC12195p0 & number
	>;
	NZ0_EnumC12197q: Record<NZ0_EnumC12197q & string, NZ0_EnumC12197q & number>;
	NZ0_EnumC12218x0: Record<
		NZ0_EnumC12218x0 & string,
		NZ0_EnumC12218x0 & number
	>;
	NZ0_I0: Record<NZ0_I0 & string, NZ0_I0 & number>;
	NZ0_K0: Record<NZ0_K0 & string, NZ0_K0 & number>;
	NZ0_N0: Record<NZ0_N0 & string, NZ0_N0 & number>;
	NZ0_S0: Record<NZ0_S0 & string, NZ0_S0 & number>;
	NZ0_W0: Record<NZ0_W0 & string, NZ0_W0 & number>;
	NotificationStatus: Record<
		NotificationStatus & string,
		NotificationStatus & number
	>;
	NotificationType: Record<
		NotificationType & string,
		NotificationType & number
	>;
	Ob1_B0: Record<Ob1_B0 & string, Ob1_B0 & number>;
	Ob1_C1: Record<Ob1_C1 & string, Ob1_C1 & number>;
	Ob1_D0: Record<Ob1_D0 & string, Ob1_D0 & number>;
	Ob1_EnumC12607a1: Record<
		Ob1_EnumC12607a1 & string,
		Ob1_EnumC12607a1 & number
	>;
	Ob1_EnumC12610b1: Record<
		Ob1_EnumC12610b1 & string,
		Ob1_EnumC12610b1 & number
	>;
	Ob1_EnumC12631i1: Record<
		Ob1_EnumC12631i1 & string,
		Ob1_EnumC12631i1 & number
	>;
	Ob1_EnumC12638l: Record<Ob1_EnumC12638l & string, Ob1_EnumC12638l & number>;
	Ob1_EnumC12641m: Record<Ob1_EnumC12641m & string, Ob1_EnumC12641m & number>;
	Ob1_EnumC12652p1: Record<
		Ob1_EnumC12652p1 & string,
		Ob1_EnumC12652p1 & number
	>;
	Ob1_EnumC12656r0: Record<
		Ob1_EnumC12656r0 & string,
		Ob1_EnumC12656r0 & number
	>;
	Ob1_EnumC12664u: Record<Ob1_EnumC12664u & string, Ob1_EnumC12664u & number>;
	Ob1_EnumC12666u1: Record<
		Ob1_EnumC12666u1 & string,
		Ob1_EnumC12666u1 & number
	>;
	Ob1_F1: Record<Ob1_F1 & string, Ob1_F1 & number>;
	Ob1_I: Record<Ob1_I & string, Ob1_I & number>;
	Ob1_J0: Record<Ob1_J0 & string, Ob1_J0 & number>;
	Ob1_J1: Record<Ob1_J1 & string, Ob1_J1 & number>;
	Ob1_K1: Record<Ob1_K1 & string, Ob1_K1 & number>;
	Ob1_M1: Record<Ob1_M1 & string, Ob1_M1 & number>;
	Ob1_O0: Record<Ob1_O0 & string, Ob1_O0 & number>;
	Ob1_O1: Record<Ob1_O1 & string, Ob1_O1 & number>;
	Ob1_P1: Record<Ob1_P1 & string, Ob1_P1 & number>;
	Ob1_Q1: Record<Ob1_Q1 & string, Ob1_Q1 & number>;
	Ob1_R1: Record<Ob1_R1 & string, Ob1_R1 & number>;
	Ob1_U1: Record<Ob1_U1 & string, Ob1_U1 & number>;
	Ob1_V1: Record<Ob1_V1 & string, Ob1_V1 & number>;
	Ob1_X1: Record<Ob1_X1 & string, Ob1_X1 & number>;
	Ob1_a2: Record<Ob1_a2 & string, Ob1_a2 & number>;
	Ob1_c2: Record<Ob1_c2 & string, Ob1_c2 & number>;
	OpType: Record<OpType & string, OpType & number>;
	P70_g: Record<P70_g & string, P70_g & number>;
	PaidCallType: Record<PaidCallType & string, PaidCallType & number>;
	PayloadType: Record<PayloadType & string, PayloadType & number>;
	Pb1_A0: Record<Pb1_A0 & string, Pb1_A0 & number>;
	Pb1_A3: Record<Pb1_A3 & string, Pb1_A3 & number>;
	Pb1_B: Record<Pb1_B & string, Pb1_B & number>;
	Pb1_D0: Record<Pb1_D0 & string, Pb1_D0 & number>;
	Pb1_D4: Record<Pb1_D4 & string, Pb1_D4 & number>;
	Pb1_D6: Record<Pb1_D6 & string, Pb1_D6 & number>;
	Pb1_E7: Record<Pb1_E7 & string, Pb1_E7 & number>;
	Pb1_EnumC12917a6: Record<
		Pb1_EnumC12917a6 & string,
		Pb1_EnumC12917a6 & number
	>;
	Pb1_EnumC12926b1: Record<
		Pb1_EnumC12926b1 & string,
		Pb1_EnumC12926b1 & number
	>;
	Pb1_EnumC12941c2: Record<
		Pb1_EnumC12941c2 & string,
		Pb1_EnumC12941c2 & number
	>;
	Pb1_EnumC12945c6: Record<
		Pb1_EnumC12945c6 & string,
		Pb1_EnumC12945c6 & number
	>;
	Pb1_EnumC12970e3: Record<
		Pb1_EnumC12970e3 & string,
		Pb1_EnumC12970e3 & number
	>;
	Pb1_EnumC12997g2: Record<
		Pb1_EnumC12997g2 & string,
		Pb1_EnumC12997g2 & number
	>;
	Pb1_EnumC12998g3: Record<
		Pb1_EnumC12998g3 & string,
		Pb1_EnumC12998g3 & number
	>;
	Pb1_EnumC13009h0: Record<
		Pb1_EnumC13009h0 & string,
		Pb1_EnumC13009h0 & number
	>;
	Pb1_EnumC13010h1: Record<
		Pb1_EnumC13010h1 & string,
		Pb1_EnumC13010h1 & number
	>;
	Pb1_EnumC13015h6: Record<
		Pb1_EnumC13015h6 & string,
		Pb1_EnumC13015h6 & number
	>;
	Pb1_EnumC13022i: Record<Pb1_EnumC13022i & string, Pb1_EnumC13022i & number>;
	Pb1_EnumC13029i6: Record<
		Pb1_EnumC13029i6 & string,
		Pb1_EnumC13029i6 & number
	>;
	Pb1_EnumC13037j0: Record<
		Pb1_EnumC13037j0 & string,
		Pb1_EnumC13037j0 & number
	>;
	Pb1_EnumC13050k: Record<Pb1_EnumC13050k & string, Pb1_EnumC13050k & number>;
	Pb1_EnumC13082m3: Record<
		Pb1_EnumC13082m3 & string,
		Pb1_EnumC13082m3 & number
	>;
	Pb1_EnumC13093n0: Record<
		Pb1_EnumC13093n0 & string,
		Pb1_EnumC13093n0 & number
	>;
	Pb1_EnumC13127p6: Record<
		Pb1_EnumC13127p6 & string,
		Pb1_EnumC13127p6 & number
	>;
	Pb1_EnumC13128p7: Record<
		Pb1_EnumC13128p7 & string,
		Pb1_EnumC13128p7 & number
	>;
	Pb1_EnumC13148r0: Record<
		Pb1_EnumC13148r0 & string,
		Pb1_EnumC13148r0 & number
	>;
	Pb1_EnumC13151r3: Record<
		Pb1_EnumC13151r3 & string,
		Pb1_EnumC13151r3 & number
	>;
	Pb1_EnumC13162s0: Record<
		Pb1_EnumC13162s0 & string,
		Pb1_EnumC13162s0 & number
	>;
	Pb1_EnumC13196u6: Record<
		Pb1_EnumC13196u6 & string,
		Pb1_EnumC13196u6 & number
	>;
	Pb1_EnumC13209v5: Record<
		Pb1_EnumC13209v5 & string,
		Pb1_EnumC13209v5 & number
	>;
	Pb1_EnumC13221w3: Record<
		Pb1_EnumC13221w3 & string,
		Pb1_EnumC13221w3 & number
	>;
	Pb1_EnumC13222w4: Record<
		Pb1_EnumC13222w4 & string,
		Pb1_EnumC13222w4 & number
	>;
	Pb1_EnumC13237x5: Record<
		Pb1_EnumC13237x5 & string,
		Pb1_EnumC13237x5 & number
	>;
	Pb1_EnumC13238x6: Record<
		Pb1_EnumC13238x6 & string,
		Pb1_EnumC13238x6 & number
	>;
	Pb1_EnumC13251y5: Record<
		Pb1_EnumC13251y5 & string,
		Pb1_EnumC13251y5 & number
	>;
	Pb1_EnumC13252y6: Record<
		Pb1_EnumC13252y6 & string,
		Pb1_EnumC13252y6 & number
	>;
	Pb1_EnumC13260z0: Record<
		Pb1_EnumC13260z0 & string,
		Pb1_EnumC13260z0 & number
	>;
	Pb1_EnumC13267z7: Record<
		Pb1_EnumC13267z7 & string,
		Pb1_EnumC13267z7 & number
	>;
	Pb1_F0: Record<Pb1_F0 & string, Pb1_F0 & number>;
	Pb1_F4: Record<Pb1_F4 & string, Pb1_F4 & number>;
	Pb1_F5: Record<Pb1_F5 & string, Pb1_F5 & number>;
	Pb1_F6: Record<Pb1_F6 & string, Pb1_F6 & number>;
	Pb1_G3: Record<Pb1_G3 & string, Pb1_G3 & number>;
	Pb1_G4: Record<Pb1_G4 & string, Pb1_G4 & number>;
	Pb1_G6: Record<Pb1_G6 & string, Pb1_G6 & number>;
	Pb1_H6: Record<Pb1_H6 & string, Pb1_H6 & number>;
	Pb1_I6: Record<Pb1_I6 & string, Pb1_I6 & number>;
	Pb1_J4: Record<Pb1_J4 & string, Pb1_J4 & number>;
	Pb1_K2: Record<Pb1_K2 & string, Pb1_K2 & number>;
	Pb1_K6: Record<Pb1_K6 & string, Pb1_K6 & number>;
	Pb1_L2: Record<Pb1_L2 & string, Pb1_L2 & number>;
	Pb1_L4: Record<Pb1_L4 & string, Pb1_L4 & number>;
	Pb1_M6: Record<Pb1_M6 & string, Pb1_M6 & number>;
	Pb1_N6: Record<Pb1_N6 & string, Pb1_N6 & number>;
	Pb1_O2: Record<Pb1_O2 & string, Pb1_O2 & number>;
	Pb1_O6: Record<Pb1_O6 & string, Pb1_O6 & number>;
	Pb1_P6: Record<Pb1_P6 & string, Pb1_P6 & number>;
	Pb1_Q2: Record<Pb1_Q2 & string, Pb1_Q2 & number>;
	Pb1_R3: Record<Pb1_R3 & string, Pb1_R3 & number>;
	Pb1_S7: Record<Pb1_S7 & string, Pb1_S7 & number>;
	Pb1_T3: Record<Pb1_T3 & string, Pb1_T3 & number>;
	Pb1_T7: Record<Pb1_T7 & string, Pb1_T7 & number>;
	Pb1_V7: Record<Pb1_V7 & string, Pb1_V7 & number>;
	Pb1_W2: Record<Pb1_W2 & string, Pb1_W2 & number>;
	Pb1_W3: Record<Pb1_W3 & string, Pb1_W3 & number>;
	Pb1_X1: Record<Pb1_X1 & string, Pb1_X1 & number>;
	Pb1_X2: Record<Pb1_X2 & string, Pb1_X2 & number>;
	Pb1_Z2: Record<Pb1_Z2 & string, Pb1_Z2 & number>;
	Pb1_gd: Record<Pb1_gd & string, Pb1_gd & number>;
	Pb1_od: Record<Pb1_od & string, Pb1_od & number>;
	PointErrorCode: Record<PointErrorCode & string, PointErrorCode & number>;
	Q70_q: Record<Q70_q & string, Q70_q & number>;
	Q70_r: Record<Q70_r & string, Q70_r & number>;
	Qj_EnumC13584a: Record<Qj_EnumC13584a & string, Qj_EnumC13584a & number>;
	Qj_EnumC13585b: Record<Qj_EnumC13585b & string, Qj_EnumC13585b & number>;
	Qj_EnumC13588e: Record<Qj_EnumC13588e & string, Qj_EnumC13588e & number>;
	Qj_EnumC13592i: Record<Qj_EnumC13592i & string, Qj_EnumC13592i & number>;
	Qj_EnumC13597n: Record<Qj_EnumC13597n & string, Qj_EnumC13597n & number>;
	Qj_EnumC13604v: Record<Qj_EnumC13604v & string, Qj_EnumC13604v & number>;
	Qj_EnumC13605w: Record<Qj_EnumC13605w & string, Qj_EnumC13605w & number>;
	Qj_EnumC13606x: Record<Qj_EnumC13606x & string, Qj_EnumC13606x & number>;
	Qj_a0: Record<Qj_a0 & string, Qj_a0 & number>;
	Qj_e0: Record<Qj_e0 & string, Qj_e0 & number>;
	Qj_h0: Record<Qj_h0 & string, Qj_h0 & number>;
	Qj_i0: Record<Qj_i0 & string, Qj_i0 & number>;
	R70_e: Record<R70_e & string, R70_e & number>;
	RegistrationType: Record<
		RegistrationType & string,
		RegistrationType & number
	>;
	ReportType: Record<ReportType & string, ReportType & number>;
	S70_a: Record<S70_a & string, S70_a & number>;
	SettingsAttributeEx: Record<
		SettingsAttributeEx & string,
		SettingsAttributeEx & number
	>;
	SnsIdType: Record<SnsIdType & string, SnsIdType & number>;
	SpammerReason: Record<SpammerReason & string, SpammerReason & number>;
	SpotCategory: Record<SpotCategory & string, SpotCategory & number>;
	SquareAttribute: Record<SquareAttribute & string, SquareAttribute & number>;
	SquareAuthorityAttribute: Record<
		SquareAuthorityAttribute & string,
		SquareAuthorityAttribute & number
	>;
	SquareChatType: Record<SquareChatType & string, SquareChatType & number>;
	SquareMemberAttribute: Record<
		SquareMemberAttribute & string,
		SquareMemberAttribute & number
	>;
	SquareMembershipState: Record<
		SquareMembershipState & string,
		SquareMembershipState & number
	>;
	StickerResourceType: Record<
		StickerResourceType & string,
		StickerResourceType & number
	>;
	SyncCategory: Record<SyncCategory & string, SyncCategory & number>;
	T70_C: Record<T70_C & string, T70_C & number>;
	T70_EnumC14390b: Record<T70_EnumC14390b & string, T70_EnumC14390b & number>;
	T70_EnumC14392c: Record<T70_EnumC14392c & string, T70_EnumC14392c & number>;
	T70_EnumC14406j: Record<T70_EnumC14406j & string, T70_EnumC14406j & number>;
	T70_K: Record<T70_K & string, T70_K & number>;
	T70_L: Record<T70_L & string, T70_L & number>;
	T70_Z0: Record<T70_Z0 & string, T70_Z0 & number>;
	T70_e1: Record<T70_e1 & string, T70_e1 & number>;
	T70_j1: Record<T70_j1 & string, T70_j1 & number>;
	U70_c: Record<U70_c & string, U70_c & number>;
	Uf_EnumC14873o: Record<Uf_EnumC14873o & string, Uf_EnumC14873o & number>;
	VR0_l: Record<VR0_l & string, VR0_l & number>;
	VerificationMethod: Record<
		VerificationMethod & string,
		VerificationMethod & number
	>;
	VerificationResult: Record<
		VerificationResult & string,
		VerificationResult & number
	>;
	WR0_a: Record<WR0_a & string, WR0_a & number>;
	a80_EnumC16644b: Record<a80_EnumC16644b & string, a80_EnumC16644b & number>;
	FetchDirection: Record<FetchDirection & string, FetchDirection & number>;
	LiveTalkEventType: Record<
		LiveTalkEventType & string,
		LiveTalkEventType & number
	>;
	LiveTalkReportType: Record<
		LiveTalkReportType & string,
		LiveTalkReportType & number
	>;
	MessageSummaryReportType: Record<
		MessageSummaryReportType & string,
		MessageSummaryReportType & number
	>;
	NotificationPostType: Record<
		NotificationPostType & string,
		NotificationPostType & number
	>;
	SquareEventStatus: Record<
		SquareEventStatus & string,
		SquareEventStatus & number
	>;
	SquareEventType: Record<SquareEventType & string, SquareEventType & number>;
	AdScreen: Record<AdScreen & string, AdScreen & number>;
	BooleanState: Record<BooleanState & string, BooleanState & number>;
	ChatroomPopupType: Record<
		ChatroomPopupType & string,
		ChatroomPopupType & number
	>;
	ContentsAttribute: Record<
		ContentsAttribute & string,
		ContentsAttribute & number
	>;
	FetchType: Record<FetchType & string, FetchType & number>;
	LiveTalkAttribute: Record<
		LiveTalkAttribute & string,
		LiveTalkAttribute & number
	>;
	LiveTalkRole: Record<LiveTalkRole & string, LiveTalkRole & number>;
	LiveTalkSpeakerSetting: Record<
		LiveTalkSpeakerSetting & string,
		LiveTalkSpeakerSetting & number
	>;
	LiveTalkType: Record<LiveTalkType & string, LiveTalkType & number>;
	MessageReactionType: Record<
		MessageReactionType & string,
		MessageReactionType & number
	>;
	NotifiedMessageType: Record<
		NotifiedMessageType & string,
		NotifiedMessageType & number
	>;
	PopupAttribute: Record<PopupAttribute & string, PopupAttribute & number>;
	PopupType: Record<PopupType & string, PopupType & number>;
	SquareChatAttribute: Record<
		SquareChatAttribute & string,
		SquareChatAttribute & number
	>;
	SquareChatFeatureControlState: Record<
		SquareChatFeatureControlState & string,
		SquareChatFeatureControlState & number
	>;
	SquareChatMemberAttribute: Record<
		SquareChatMemberAttribute & string,
		SquareChatMemberAttribute & number
	>;
	SquareChatMembershipState: Record<
		SquareChatMembershipState & string,
		SquareChatMembershipState & number
	>;
	SquareChatState: Record<SquareChatState & string, SquareChatState & number>;
	SquareEmblem: Record<SquareEmblem & string, SquareEmblem & number>;
	SquareErrorCode: Record<SquareErrorCode & string, SquareErrorCode & number>;
	SquareFeatureControlState: Record<
		SquareFeatureControlState & string,
		SquareFeatureControlState & number
	>;
	SquareFeatureSetAttribute: Record<
		SquareFeatureSetAttribute & string,
		SquareFeatureSetAttribute & number
	>;
	SquareJoinMethodType: Record<
		SquareJoinMethodType & string,
		SquareJoinMethodType & number
	>;
	SquareMemberRelationState: Record<
		SquareMemberRelationState & string,
		SquareMemberRelationState & number
	>;
	SquareMemberRole: Record<
		SquareMemberRole & string,
		SquareMemberRole & number
	>;
	SquareMessageState: Record<
		SquareMessageState & string,
		SquareMessageState & number
	>;
	SquareMetadataAttribute: Record<
		SquareMetadataAttribute & string,
		SquareMetadataAttribute & number
	>;
	SquarePreferenceAttribute: Record<
		SquarePreferenceAttribute & string,
		SquarePreferenceAttribute & number
	>;
	SquareProviderType: Record<
		SquareProviderType & string,
		SquareProviderType & number
	>;
	SquareState: Record<SquareState & string, SquareState & number>;
	SquareThreadAttribute: Record<
		SquareThreadAttribute & string,
		SquareThreadAttribute & number
	>;
	SquareThreadMembershipState: Record<
		SquareThreadMembershipState & string,
		SquareThreadMembershipState & number
	>;
	SquareThreadState: Record<
		SquareThreadState & string,
		SquareThreadState & number
	>;
	SquareType: Record<SquareType & string, SquareType & number>;
	TargetChatType: Record<TargetChatType & string, TargetChatType & number>;
	TargetUserType: Record<TargetUserType & string, TargetUserType & number>;
	do0_EnumC23139B: Record<do0_EnumC23139B & string, do0_EnumC23139B & number>;
	do0_EnumC23147e: Record<do0_EnumC23147e & string, do0_EnumC23147e & number>;
	do0_EnumC23148f: Record<do0_EnumC23148f & string, do0_EnumC23148f & number>;
	do0_G: Record<do0_G & string, do0_G & number>;
	do0_M: Record<do0_M & string, do0_M & number>;
	fN0_EnumC24466B: Record<fN0_EnumC24466B & string, fN0_EnumC24466B & number>;
	fN0_EnumC24467C: Record<fN0_EnumC24467C & string, fN0_EnumC24467C & number>;
	fN0_EnumC24469a: Record<fN0_EnumC24469a & string, fN0_EnumC24469a & number>;
	fN0_F: Record<fN0_F & string, fN0_F & number>;
	fN0_G: Record<fN0_G & string, fN0_G & number>;
	fN0_H: Record<fN0_H & string, fN0_H & number>;
	fN0_o: Record<fN0_o & string, fN0_o & number>;
	fN0_p: Record<fN0_p & string, fN0_p & number>;
	fN0_q: Record<fN0_q & string, fN0_q & number>;
	g80_EnumC24993a: Record<g80_EnumC24993a & string, g80_EnumC24993a & number>;
	h80_EnumC25645e: Record<h80_EnumC25645e & string, h80_EnumC25645e & number>;
	I80_EnumC26392b: Record<I80_EnumC26392b & string, I80_EnumC26392b & number>;
	I80_EnumC26394c: Record<I80_EnumC26394c & string, I80_EnumC26394c & number>;
	I80_EnumC26408j: Record<I80_EnumC26408j & string, I80_EnumC26408j & number>;
	I80_EnumC26425y: Record<I80_EnumC26425y & string, I80_EnumC26425y & number>;
	j80_EnumC27228a: Record<j80_EnumC27228a & string, j80_EnumC27228a & number>;
	jO0_EnumC27533B: Record<jO0_EnumC27533B & string, jO0_EnumC27533B & number>;
	jO0_EnumC27535b: Record<jO0_EnumC27535b & string, jO0_EnumC27535b & number>;
	jO0_EnumC27559z: Record<jO0_EnumC27559z & string, jO0_EnumC27559z & number>;
	jf_EnumC27712a: Record<jf_EnumC27712a & string, jf_EnumC27712a & number>;
	jf_EnumC27717f: Record<jf_EnumC27717f & string, jf_EnumC27717f & number>;
	kf_EnumC28766a: Record<kf_EnumC28766a & string, kf_EnumC28766a & number>;
	kf_o: Record<kf_o & string, kf_o & number>;
	kf_p: Record<kf_p & string, kf_p & number>;
	kf_r: Record<kf_r & string, kf_r & number>;
	kf_u: Record<kf_u & string, kf_u & number>;
	kf_x: Record<kf_x & string, kf_x & number>;
	n80_o: Record<n80_o & string, n80_o & number>;
	o80_e: Record<o80_e & string, o80_e & number>;
	og_E: Record<og_E & string, og_E & number>;
	og_EnumC32661b: Record<og_EnumC32661b & string, og_EnumC32661b & number>;
	og_EnumC32663d: Record<og_EnumC32663d & string, og_EnumC32663d & number>;
	og_EnumC32671l: Record<og_EnumC32671l & string, og_EnumC32671l & number>;
	og_G: Record<og_G & string, og_G & number>;
	og_I: Record<og_I & string, og_I & number>;
	q80_EnumC33651c: Record<q80_EnumC33651c & string, q80_EnumC33651c & number>;
	qm_EnumC34112e: Record<qm_EnumC34112e & string, qm_EnumC34112e & number>;
	qm_s: Record<qm_s & string, qm_s & number>;
	r80_EnumC34361a: Record<r80_EnumC34361a & string, r80_EnumC34361a & number>;
	r80_EnumC34362b: Record<r80_EnumC34362b & string, r80_EnumC34362b & number>;
	r80_EnumC34365e: Record<r80_EnumC34365e & string, r80_EnumC34365e & number>;
	r80_EnumC34367g: Record<r80_EnumC34367g & string, r80_EnumC34367g & number>;
	r80_EnumC34368h: Record<r80_EnumC34368h & string, r80_EnumC34368h & number>;
	r80_EnumC34370j: Record<r80_EnumC34370j & string, r80_EnumC34370j & number>;
	r80_EnumC34371k: Record<r80_EnumC34371k & string, r80_EnumC34371k & number>;
	r80_EnumC34372l: Record<r80_EnumC34372l & string, r80_EnumC34372l & number>;
	r80_EnumC34374n: Record<r80_EnumC34374n & string, r80_EnumC34374n & number>;
	r80_EnumC34376p: Record<r80_EnumC34376p & string, r80_EnumC34376p & number>;
	r80_EnumC34377q: Record<r80_EnumC34377q & string, r80_EnumC34377q & number>;
	r80_EnumC34378s: Record<r80_EnumC34378s & string, r80_EnumC34378s & number>;
	r80_e0: Record<r80_e0 & string, r80_e0 & number>;
	r80_g0: Record<r80_g0 & string, r80_g0 & number>;
	r80_h0: Record<r80_h0 & string, r80_h0 & number>;
	r80_i0: Record<r80_i0 & string, r80_i0 & number>;
	r80_m0: Record<r80_m0 & string, r80_m0 & number>;
	r80_n0: Record<r80_n0 & string, r80_n0 & number>;
	r80_r: Record<r80_r & string, r80_r & number>;
	t80_h: Record<t80_h & string, t80_h & number>;
	t80_i: Record<t80_i & string, t80_i & number>;
	t80_n: Record<t80_n & string, t80_n & number>;
	t80_r: Record<t80_r & string, t80_r & number>;
	vh_EnumC37632c: Record<vh_EnumC37632c & string, vh_EnumC37632c & number>;
	vh_m: Record<vh_m & string, vh_m & number>;
	wm_EnumC38497a: Record<wm_EnumC38497a & string, wm_EnumC38497a & number>;
	zR0_EnumC40578c: Record<zR0_EnumC40578c & string, zR0_EnumC40578c & number>;
	zR0_EnumC40579d: Record<zR0_EnumC40579d & string, zR0_EnumC40579d & number>;
	zR0_h: Record<zR0_h & string, zR0_h & number>;
	zR0_j: Record<zR0_j & string, zR0_j & number>;
	zf_EnumC40713a: Record<zf_EnumC40713a & string, zf_EnumC40713a & number>;
	zf_EnumC40715c: Record<zf_EnumC40715c & string, zf_EnumC40715c & number>;
	zf_EnumC40716d: Record<zf_EnumC40716d & string, zf_EnumC40716d & number>;
	LoginResultType: Record<LoginResultType & string, LoginResultType & number>;
	F61_EnumC10204a0: Record<
		F61_EnumC10204a0 & string,
		F61_EnumC10204a0 & number
	>;
	ForbiddenWordsGroup: Record<
		ForbiddenWordsGroup & string,
		ForbiddenWordsGroup & number
	>;
	LMPCode: Record<LMPCode & string, LMPCode & number>;
	PaidSquareFormState: Record<
		PaidSquareFormState & string,
		PaidSquareFormState & number
	>;
	SquareSubscriptionProductRegistrationStatus: Record<
		SquareSubscriptionProductRegistrationStatus & string,
		SquareSubscriptionProductRegistrationStatus & number
	>;
	SquareSubscriptionStatus: Record<
		SquareSubscriptionStatus & string,
		SquareSubscriptionStatus & number
	>;
	TermsType: Record<TermsType & string, TermsType & number>;
} = {
	"AR0_g": {
		"ILLEGAL_ARGUMENT": 16641,
		"MAJOR_VERSION_NOT_SUPPORTED": 16642,
		"AUTHENTICATION_FAILED": 16897,
		"INTERNAL_SERVER_ERROR": 20737,
		"SERVICE_UNAVAILABLE": 20739,
	},
	"AR0_q": {
		"NOT_PURCHASED": 0,
		"SUBSCRIPTION": 1,
	},
	"AccountMigrationPincodeType": {
		"NOT_APPLICABLE": 0,
		"NOT_SET": 1,
		"SET": 2,
		"NEED_ENFORCED_INPUT": 3,
	},
	"ApplicationType": {
		"IOS": 16,
		"IOS_RC": 17,
		"IOS_BETA": 18,
		"IOS_ALPHA": 19,
		"ANDROID": 32,
		"ANDROID_RC": 33,
		"ANDROID_BETA": 34,
		"ANDROID_ALPHA": 35,
		"WAP": 48,
		"WAP_RC": 49,
		"WAP_BETA": 50,
		"WAP_ALPHA": 51,
		"BOT": 64,
		"BOT_RC": 65,
		"BOT_BETA": 66,
		"BOT_ALPHA": 67,
		"WEB": 80,
		"WEB_RC": 81,
		"WEB_BETA": 82,
		"WEB_ALPHA": 83,
		"DESKTOPWIN": 96,
		"DESKTOPWIN_RC": 97,
		"DESKTOPWIN_BETA": 98,
		"DESKTOPWIN_ALPHA": 99,
		"DESKTOPMAC": 112,
		"DESKTOPMAC_RC": 113,
		"DESKTOPMAC_BETA": 114,
		"DESKTOPMAC_ALPHA": 115,
		"CHANNELGW": 128,
		"CHANNELGW_RC": 129,
		"CHANNELGW_BETA": 130,
		"CHANNELGW_ALPHA": 131,
		"CHANNELCP": 144,
		"CHANNELCP_RC": 145,
		"CHANNELCP_BETA": 146,
		"CHANNELCP_ALPHA": 147,
		"WINPHONE": 160,
		"WINPHONE_RC": 161,
		"WINPHONE_BETA": 162,
		"WINPHONE_ALPHA": 163,
		"BLACKBERRY": 176,
		"BLACKBERRY_RC": 177,
		"BLACKBERRY_BETA": 178,
		"BLACKBERRY_ALPHA": 179,
		"WINMETRO": 192,
		"WINMETRO_RC": 193,
		"WINMETRO_BETA": 194,
		"WINMETRO_ALPHA": 195,
		"S40": 200,
		"S40_RC": 209,
		"S40_BETA": 210,
		"S40_ALPHA": 211,
		"CHRONO": 224,
		"CHRONO_RC": 225,
		"CHRONO_BETA": 226,
		"CHRONO_ALPHA": 227,
		"TIZEN": 256,
		"TIZEN_RC": 257,
		"TIZEN_BETA": 258,
		"TIZEN_ALPHA": 259,
		"VIRTUAL": 272,
		"FIREFOXOS": 288,
		"FIREFOXOS_RC": 289,
		"FIREFOXOS_BETA": 290,
		"FIREFOXOS_ALPHA": 291,
		"IOSIPAD": 304,
		"IOSIPAD_RC": 305,
		"IOSIPAD_BETA": 306,
		"IOSIPAD_ALPHA": 307,
		"BIZIOS": 320,
		"BIZIOS_RC": 321,
		"BIZIOS_BETA": 322,
		"BIZIOS_ALPHA": 323,
		"BIZANDROID": 336,
		"BIZANDROID_RC": 337,
		"BIZANDROID_BETA": 338,
		"BIZANDROID_ALPHA": 339,
		"BIZBOT": 352,
		"BIZBOT_RC": 353,
		"BIZBOT_BETA": 354,
		"BIZBOT_ALPHA": 355,
		"CHROMEOS": 368,
		"CHROMEOS_RC": 369,
		"CHROMEOS_BETA": 370,
		"CHROMEOS_ALPHA": 371,
		"ANDROIDLITE": 384,
		"ANDROIDLITE_RC": 385,
		"ANDROIDLITE_BETA": 386,
		"ANDROIDLITE_ALPHA": 387,
		"WIN10": 400,
		"WIN10_RC": 401,
		"WIN10_BETA": 402,
		"WIN10_ALPHA": 403,
		"BIZWEB": 416,
		"BIZWEB_RC": 417,
		"BIZWEB_BETA": 418,
		"BIZWEB_ALPHA": 419,
		"DUMMYPRIMARY": 432,
		"DUMMYPRIMARY_RC": 433,
		"DUMMYPRIMARY_BETA": 434,
		"DUMMYPRIMARY_ALPHA": 435,
		"SQUARE": 448,
		"SQUARE_RC": 449,
		"SQUARE_BETA": 450,
		"SQUARE_ALPHA": 451,
		"INTERNAL": 464,
		"INTERNAL_RC": 465,
		"INTERNAL_BETA": 466,
		"INTERNAL_ALPHA": 467,
		"CLOVAFRIENDS": 480,
		"CLOVAFRIENDS_RC": 481,
		"CLOVAFRIENDS_BETA": 482,
		"CLOVAFRIENDS_ALPHA": 483,
		"WATCHOS": 496,
		"WATCHOS_RC": 497,
		"WATCHOS_BETA": 498,
		"WATCHOS_ALPHA": 499,
		"OPENCHAT_PLUG": 512,
		"OPENCHAT_PLUG_RC": 513,
		"OPENCHAT_PLUG_BETA": 514,
		"OPENCHAT_PLUG_ALPHA": 515,
		"ANDROIDSECONDARY": 528,
		"ANDROIDSECONDARY_RC": 529,
		"ANDROIDSECONDARY_BETA": 530,
		"ANDROIDSECONDARY_ALPHA": 531,
		"WEAROS": 544,
		"WEAROS_RC": 545,
		"WEAROS_BETA": 546,
		"WEAROS_ALPHA": 547,
	},
	"BotType": {
		"RESERVED": 0,
		"OFFICIAL": 1,
		"LINE_AT_0": 2,
		"LINE_AT": 3,
	},
	"CarrierCode": {
		"NOT_SPECIFIED": 0,
		"JP_DOCOMO": 1,
		"JP_AU": 2,
		"JP_SOFTBANK": 3,
		"JP_DOCOMO_LINE": 4,
		"JP_SOFTBANK_LINE": 5,
		"JP_AU_LINE": 6,
		"JP_RAKUTEN": 7,
		"JP_MVNO": 8,
		"JP_USER_SELECTED_LINE": 9,
		"KR_SKT": 17,
		"KR_KT": 18,
		"KR_LGT": 19,
	},
	"ChannelErrorCode": {
		"ILLEGAL_ARGUMENT": 0,
		"INTERNAL_ERROR": 1,
		"CONNECTION_ERROR": 2,
		"AUTHENTICATIONI_FAILED": 3,
		"NEED_PERMISSION_APPROVAL": 4,
		"COIN_NOT_USABLE": 5,
		"WEBVIEW_NOT_ALLOWED": 6,
		"NOT_AVAILABLE_API": 7,
	},
	"ContactAttribute": {
		"CONTACT_ATTRIBUTE_CAPABLE_VOICE_CALL": 1,
		"CONTACT_ATTRIBUTE_CAPABLE_VIDEO_CALL": 2,
		"CONTACT_ATTRIBUTE_CAPABLE_MY_HOME": 16,
		"CONTACT_ATTRIBUTE_CAPABLE_BUDDY": 32,
	},
	"ContactSetting": {
		"CONTACT_SETTING_NOTIFICATION_DISABLE": 1,
		"CONTACT_SETTING_DISPLAY_NAME_OVERRIDE": 2,
		"CONTACT_SETTING_CONTACT_HIDE": 4,
		"CONTACT_SETTING_FAVORITE": 8,
		"CONTACT_SETTING_DELETE": 16,
		"CONTACT_SETTING_FRIEND_RINGTONE": 32,
		"CONTACT_SETTING_FRIEND_RINGBACK_TONE": 64,
	},
	"ContactStatus": {
		"UNSPECIFIED": 0,
		"FRIEND": 1,
		"FRIEND_BLOCKED": 2,
		"RECOMMEND": 3,
		"RECOMMEND_BLOCKED": 4,
		"DELETED": 5,
		"DELETED_BLOCKED": 6,
	},
	"ContactType": {
		"MID": 0,
		"PHONE": 1,
		"EMAIL": 2,
		"USERID": 3,
		"PROXIMITY": 4,
		"GROUP": 5,
		"USER": 6,
		"QRCODE": 7,
		"PROMOTION_BOT": 8,
		"CONTACT_MESSAGE": 9,
		"FRIEND_REQUEST": 10,
		"BEACON": 11,
		"REPAIR": 128,
		"FACEBOOK": 2305,
		"SINA": 2306,
		"RENREN": 2307,
		"FEIXIN": 2308,
		"BBM": 2309,
	},
	"ContentType": {
		"NONE": 0,
		"IMAGE": 1,
		"VIDEO": 2,
		"AUDIO": 3,
		"HTML": 4,
		"PDF": 5,
		"CALL": 6,
		"STICKER": 7,
		"PRESENCE": 8,
		"GIFT": 9,
		"GROUPBOARD": 10,
		"APPLINK": 11,
		"LINK": 12,
		"CONTACT": 13,
		"FILE": 14,
		"LOCATION": 15,
		"POSTNOTIFICATION": 16,
		"RICH": 17,
		"CHATEVENT": 18,
		"MUSIC": 19,
		"PAYMENT": 20,
		"EXTIMAGE": 21,
		"FLEX": 22,
	},
	"Eg_EnumC8927a": {
		"NEW": 1,
		"UPDATE": 2,
		"EVENT": 3,
	},
	"EmailConfirmationStatus": {
		"NOT_SPECIFIED": 0,
		"NOT_YET": 1,
		"DONE": 3,
		"NEED_ENFORCED_INPUT": 4,
	},
	"ErrorCode": {
		"ILLEGAL_ARGUMENT": 0,
		"AUTHENTICATION_FAILED": 1,
		"DB_FAILED": 2,
		"INVALID_STATE": 3,
		"EXCESSIVE_ACCESS": 4,
		"NOT_FOUND": 5,
		"INVALID_LENGTH": 6,
		"NOT_AVAILABLE_USER": 7,
		"NOT_AUTHORIZED_DEVICE": 8,
		"INVALID_MID": 9,
		"NOT_A_MEMBER": 10,
		"INCOMPATIBLE_APP_VERSION": 11,
		"NOT_READY": 12,
		"NOT_AVAILABLE_SESSION": 13,
		"NOT_AUTHORIZED_SESSION": 14,
		"SYSTEM_ERROR": 15,
		"NO_AVAILABLE_VERIFICATION_METHOD": 16,
		"NOT_AUTHENTICATED": 17,
		"INVALID_IDENTITY_CREDENTIAL": 18,
		"NOT_AVAILABLE_IDENTITY_IDENTIFIER": 19,
		"INTERNAL_ERROR": 20,
		"NO_SUCH_IDENTITY_IDENFIER": 21,
		"DEACTIVATED_ACCOUNT_BOUND_TO_THIS_IDENTITY": 22,
		"ILLEGAL_IDENTITY_CREDENTIAL": 23,
		"UNKNOWN_CHANNEL": 24,
		"NO_SUCH_MESSAGE_BOX": 25,
		"NOT_AVAILABLE_MESSAGE_BOX": 26,
		"CHANNEL_DOES_NOT_MATCH": 27,
		"NOT_YOUR_MESSAGE": 28,
		"MESSAGE_DEFINED_ERROR": 29,
		"USER_CANNOT_ACCEPT_PRESENTS": 30,
		"USER_NOT_STICKER_OWNER": 32,
		"MAINTENANCE_ERROR": 33,
		"ACCOUNT_NOT_MATCHED": 34,
		"ABUSE_BLOCK": 35,
		"NOT_FRIEND": 36,
		"NOT_ALLOWED_CALL": 37,
		"BLOCK_FRIEND": 38,
		"INCOMPATIBLE_VOIP_VERSION": 39,
		"INVALID_SNS_ACCESS_TOKEN": 40,
		"EXTERNAL_SERVICE_NOT_AVAILABLE": 41,
		"NOT_ALLOWED_ADD_CONTACT": 42,
		"NOT_CERTIFICATED": 43,
		"NOT_ALLOWED_SECONDARY_DEVICE": 44,
		"INVALID_PIN_CODE": 45,
		"EXCEED_FILE_MAX_SIZE": 47,
		"EXCEED_DAILY_QUOTA": 48,
		"NOT_SUPPORT_SEND_FILE": 49,
		"MUST_UPGRADE": 50,
		"NOT_AVAILABLE_PIN_CODE_SESSION": 51,
		"EXPIRED_REVISION": 52,
		"NOT_YET_PHONE_NUMBER": 54,
		"BAD_CALL_NUMBER": 55,
		"UNAVAILABLE_CALL_NUMBER": 56,
		"NOT_SUPPORT_CALL_SERVICE": 57,
		"CONGESTION_CONTROL": 58,
		"NO_BALANCE": 59,
		"NOT_PERMITTED_CALLER_ID": 60,
		"NO_CALLER_ID_LIMIT_EXCEEDED": 61,
		"CALLER_ID_VERIFICATION_REQUIRED": 62,
		"NO_CALLER_ID_LIMIT_EXCEEDED_AND_VERIFICATION_REQUIRED": 63,
		"MESSAGE_NOT_FOUND": 64,
		"INVALID_ACCOUNT_MIGRATION_PINCODE_FORMAT": 65,
		"ACCOUNT_MIGRATION_PINCODE_NOT_MATCHED": 66,
		"ACCOUNT_MIGRATION_PINCODE_BLOCKED": 67,
		"INVALID_PASSWORD_FORMAT": 69,
		"FEATURE_RESTRICTED": 70,
		"MESSAGE_NOT_DESTRUCTIBLE": 71,
		"PAID_CALL_REDEEM_FAILED": 72,
		"PREVENTED_JOIN_BY_TICKET": 73,
		"SEND_MESSAGE_NOT_PERMITTED_FROM_LINE_AT": 75,
		"SEND_MESSAGE_NOT_PERMITTED_WHILE_AUTO_REPLY": 76,
		"SECURITY_CENTER_NOT_VERIFIED": 77,
		"SECURITY_CENTER_BLOCKED_BY_SETTING": 78,
		"SECURITY_CENTER_BLOCKED": 79,
		"TALK_PROXY_EXCEPTION": 80,
		"E2EE_INVALID_PROTOCOL": 81,
		"E2EE_RETRY_ENCRYPT": 82,
		"E2EE_UPDATE_SENDER_KEY": 83,
		"E2EE_UPDATE_RECEIVER_KEY": 84,
		"E2EE_INVALID_ARGUMENT": 85,
		"E2EE_INVALID_VERSION": 86,
		"E2EE_SENDER_DISABLED": 87,
		"E2EE_RECEIVER_DISABLED": 88,
		"E2EE_SENDER_NOT_ALLOWED": 89,
		"E2EE_RECEIVER_NOT_ALLOWED": 90,
		"E2EE_RESEND_FAIL": 91,
		"E2EE_RESEND_OK": 92,
		"HITOKOTO_BACKUP_NO_AVAILABLE_DATA": 93,
		"E2EE_UPDATE_PRIMARY_DEVICE": 94,
		"SUCCESS": 95,
		"CANCEL": 96,
		"E2EE_PRIMARY_NOT_SUPPORT": 97,
		"E2EE_RETRY_PLAIN": 98,
		"E2EE_RECREATE_GROUP_KEY": 99,
		"E2EE_GROUP_TOO_MANY_MEMBERS": 100,
		"SERVER_BUSY": 101,
		"NOT_ALLOWED_ADD_FOLLOW": 102,
		"INCOMING_FRIEND_REQUEST_LIMIT": 103,
		"OUTGOING_FRIEND_REQUEST_LIMIT": 104,
		"OUTGOING_FRIEND_REQUEST_QUOTA": 105,
		"DUPLICATED": 106,
		"BANNED": 107,
		"NOT_AN_INVITEE": 108,
		"NOT_AN_OUTSIDER": 109,
		"EMPTY_GROUP": 111,
		"EXCEED_FOLLOW_LIMIT": 112,
		"UNSUPPORTED_ACCOUNT_TYPE": 113,
		"AGREEMENT_REQUIRED": 114,
		"SHOULD_RETRY": 115,
		"OVER_MAX_CHATS_PER_USER": 116,
		"NOT_AVAILABLE_API": 117,
		"INVALID_OTP": 118,
		"MUST_REFRESH_V3_TOKEN": 119,
		"ALREADY_EXPIRED": 120,
		"USER_NOT_STICON_OWNER": 121,
		"REFRESH_MEDIA_FLOW": 122,
		"EXCEED_FOLLOWER_LIMIT": 123,
		"INCOMPATIBLE_APP_TYPE": 124,
		"NOT_PREMIUM": 125,
		"BITMAX_ACCOUNT_EXIST": 126,
		"MESSAGE_NOT_EDITABLE": 127,
		"MESSAGE_NOT_EDITABLE_TIMELIMIT": 128,
		"SCHEDULED_MESSAGE_TIMELIMIT": 129,
		"SCHEDULED_MESSAGE_SERVER_TIMESLOT_LIMIT": 130,
		"SCHEDULED_MESSAGE_USER_TOTAL_LIMIT": 131,
		"SCHEDULED_MESSAGE_USER_TIMESLOT_LIMIT": 132,
		"SCHEDULED_MESSAGE_UPDATE_TIMELIMIT": 133,
		"SCHEDULED_MESSAGE_RESCHEDULE_TIMELIMIT": 134,
		"NOT_LAB_ENABLED": 135,
	},
	"Fg_a": {
		"INTERNAL_ERROR": 0,
		"ILLEGAL_ARGUMENT": 1,
		"VERIFICATION_FAILED": 2,
		"NOT_FOUND": 3,
		"RETRY_LATER": 4,
		"HUMAN_VERIFICATION_REQUIRED": 5,
		"NOT_ENABLED": 6,
		"INVALID_CONTEXT": 100,
		"APP_UPGRADE_REQUIRED": 101,
		"NO_CONTENT": 102,
	},
	"FriendRequestStatus": {
		"NONE": 0,
		"AVAILABLE": 1,
		"ALREADY_REQUESTED": 2,
		"UNAVAILABLE": 3,
	},
	"IdentityProvider": {
		"UNKNOWN": 0,
		"LINE": 1,
		"NAVER_KR": 2,
		"LINE_PHONE": 3,
	},
	"LN0_F0": {
		"UNKNOWN": 0,
		"INVALID_TARGET_USER": 1,
		"AGE_VALIDATION": 2,
		"TOO_MANY_FRIENDS": 3,
		"TOO_MANY_REQUESTS": 4,
		"MALFORMED_REQUEST": 5,
		"TRACKING_META_QRCODE_FAVORED": 6,
	},
	"LN0_X0": {
		"USER": 1,
		"BOT": 2,
	},
	"MIDType": {
		"USER": 0,
		"ROOM": 1,
		"GROUP": 2,
		"SQUARE": 3,
		"SQUARE_CHAT": 4,
		"SQUARE_MEMBER": 5,
		"BOT": 6,
		"SQUARE_THREAD": 7,
	},
	"NZ0_B0": {
		"PAY": 0,
		"POI": 1,
		"FX": 2,
		"SEC": 3,
		"BIT": 4,
		"LIN": 5,
		"SCO": 6,
		"POC": 7,
	},
	"NZ0_C0": {
		"OK": 0,
		"MAINTENANCE": 1,
		"TPS_EXCEEDED": 2,
		"NOT_FOUND": 3,
		"BLOCKED": 4,
		"INTERNAL_ERROR": 5,
		"WALLET_CMS_MAINTENANCE": 6,
	},
	"NZ0_EnumC12154b1": {
		"NORMAL": 0,
		"CAMERA": 1,
	},
	"NZ0_EnumC12169g1": {
		"WALLET": 101,
		"ASSET": 201,
		"SHOPPING": 301,
	},
	"NZ0_EnumC12170h": {
		"HIDE_BADGE": 0,
		"SHOW_BADGE": 1,
	},
	"NZ0_EnumC12188n": {
		"OK": 0,
		"UNAVAILABLE": 1,
		"DUPLICATAE_REGISTRATION": 2,
		"INTERNAL_ERROR": 3,
	},
	"NZ0_EnumC12192o0": {
		"LV1": 0,
		"LV2": 1,
		"LV3": 2,
		"LV9": 3,
	},
	"NZ0_EnumC12193o1": {
		"INVALID_PARAMETER": 400,
		"AUTHENTICATION_FAILED": 401,
		"INTERNAL_SERVER_ERROR": 500,
		"SERVICE_IN_MAINTENANCE_MODE": 503,
	},
	"NZ0_EnumC12195p0": {
		"ALIVE": 1,
		"SUSPENDED": 2,
		"UNREGISTERED": 3,
	},
	"NZ0_EnumC12197q": {
		"PREFIX": 0,
		"SUFFIX": 1,
	},
	"NZ0_EnumC12218x0": {
		"NO_CONTENT": 0,
		"OK": 1,
		"ERROR": 2,
	},
	"NZ0_I0": {
		"A": 0,
		"B": 1,
		"C": 2,
		"D": 3,
		"UNKNOWN": 4,
	},
	"NZ0_K0": {
		"POCKET_MONEY": 0,
		"REFINANCE": 1,
	},
	"NZ0_N0": {
		"COMPACT": 0,
		"EXPANDED": 1,
	},
	"NZ0_S0": {
		"CARD": 0,
		"ACTION": 1,
	},
	"NZ0_W0": {
		"OK": 0,
		"INTERNAL_ERROR": 1,
	},
	"NotificationStatus": {
		"NOTIFICATION_ITEM_EXIST": 1,
		"TIMELINE_ITEM_EXIST": 2,
		"NOTE_GROUP_NEW_ITEM_EXIST": 4,
		"TIMELINE_BUDDYGROUP_CHANGED": 8,
		"NOTE_ONE_TO_ONE_NEW_ITEM_EXIST": 16,
		"ALBUM_ITEM_EXIST": 32,
		"TIMELINE_ITEM_DELETED": 64,
		"OTOGROUP_ITEM_EXIST": 128,
		"GROUPHOME_NEW_ITEM_EXIST": 256,
		"GROUPHOME_HIDDEN_ITEM_CHANGED": 512,
		"NOTIFICATION_ITEM_CHANGED": 1024,
		"BEAD_ITEM_HIDE": 2048,
		"BEAD_ITEM_SHOW": 4096,
		"LINE_TICKET_UPDATED": 8192,
		"TIMELINE_STORY_UPDATED": 16384,
		"SMARTCH_UPDATED": 32768,
		"AVATAR_UPDATED": 65536,
		"HOME_NOTIFICATION_ITEM_EXIST": 131072,
		"TIMELINE_REBOOT_COMPLETED": 262144,
		"TIMELINE_GUIDE_STORY_UPDATED": 524288,
		"TIMELINE_F2F_COMPLETED": 1048576,
		"VOOM_LIVE_STATE_CHANGED": 2097152,
		"VOOM_ACTIVITY_REWARD_ITEM_EXIST": 4194304,
		"LINE_TODAY_PROFILE_UPDATED": 8388608,
		"AI_FRIENDS_EVENT_EXIST": 16777216,
		"CALENDAR_ITEM_EXIST": 33554432,
		"WALLET_NOTIFICATION_ITEM_EXIST": 67108864,
	},
	"NotificationType": {
		"APPLE_APNS": 1,
		"GOOGLE_C2DM": 2,
		"NHN_NNI": 3,
		"SKT_AOM": 4,
		"MS_MPNS": 5,
		"RIM_BIS": 6,
		"GOOGLE_GCM": 7,
		"NOKIA_NNAPI": 8,
		"TIZEN": 9,
		"MOZILLA_SIMPLE": 10,
		"LINE_BOT": 17,
		"LINE_WAP": 18,
		"APPLE_APNS_VOIP": 19,
		"MS_WNS": 20,
		"GOOGLE_FCM": 21,
		"CLOVA": 22,
		"CLOVA_VOIP": 23,
		"HUAWEI_HCM": 24,
	},
	"Ob1_B0": {
		"FOREGROUND": 0,
		"BACKGROUND": 1,
	},
	"Ob1_C1": {
		"NORMAL": 0,
		"BIG": 1,
	},
	"Ob1_D0": {
		"PURCHASE_ONLY": 0,
		"PURCHASE_OR_SUBSCRIPTION": 1,
		"SUBSCRIPTION_ONLY": 2,
	},
	"Ob1_EnumC12607a1": {
		"DEFAULT": 1,
		"VIEW_VIDEO": 2,
	},
	"Ob1_EnumC12610b1": {
		"NONE": 0,
		"BUDDY": 2,
		"INSTALL": 3,
		"MISSION": 4,
		"MUSTBUY": 5,
	},
	"Ob1_EnumC12631i1": {
		"UNKNOWN": 0,
		"PRODUCT": 1,
		"USER": 2,
		"PREMIUM_USER": 3,
	},
	"Ob1_EnumC12638l": {
		"VALID": 0,
		"INVALID": 1,
	},
	"Ob1_EnumC12641m": {
		"PREMIUM": 1,
		"VERIFIED": 2,
		"UNVERIFIED": 3,
	},
	"Ob1_EnumC12652p1": {
		"UNKNOWN": 0,
		"NONE": 1,
		"ILLEGAL_ARGUMENT": 16641,
		"NOT_FOUND": 16642,
		"NOT_AVAILABLE": 16643,
		"NOT_PAID_PRODUCT": 16644,
		"NOT_FREE_PRODUCT": 16645,
		"ALREADY_OWNED": 16646,
		"ERROR_WITH_CUSTOM_MESSAGE": 16647,
		"NOT_AVAILABLE_TO_RECIPIENT": 16648,
		"NOT_AVAILABLE_FOR_CHANNEL_ID": 16649,
		"NOT_SALE_FOR_COUNTRY": 16650,
		"NOT_SALES_PERIOD": 16651,
		"NOT_SALE_FOR_DEVICE": 16652,
		"NOT_SALE_FOR_VERSION": 16653,
		"ALREADY_EXPIRED": 16654,
		"LIMIT_EXCEEDED": 16655,
		"MISSING_CAPABILITY": 16656,
		"AUTHENTICATION_FAILED": 16897,
		"BALANCE_SHORTAGE": 17153,
		"INTERNAL_SERVER_ERROR": 20737,
		"SERVICE_IN_MAINTENANCE_MODE": 20738,
		"SERVICE_UNAVAILABLE": 20739,
	},
	"Ob1_EnumC12656r0": {
		"OK": 0,
		"PRODUCT_UNSUPPORTED": 1,
		"TEXT_NOT_SPECIFIED": 2,
		"TEXT_STYLE_UNAVAILABLE": 3,
		"CHARACTER_COUNT_LIMIT_EXCEEDED": 4,
		"CONTAINS_INVALID_WORD": 5,
	},
	"Ob1_EnumC12664u": {
		"UNKNOWN": 0,
		"NONE": 1,
		"ILLEGAL_ARGUMENT": 16641,
		"NOT_FOUND": 16642,
		"NOT_AVAILABLE": 16643,
		"MAX_AMOUNT_OF_PRODUCTS_REACHED": 16644,
		"PRODUCT_IS_NOT_PREMIUM": 16645,
		"PRODUCT_IS_NOT_AVAILABLE_FOR_USER": 16646,
		"USER_HAS_NO_VALID_SUBSCRIPTION": 16647,
		"USER_HAS_NO_PRODUCT_OWNERSHIP": 16648,
		"AUTHENTICATION_FAILED": 16897,
		"INTERNAL_SERVER_ERROR": 20737,
		"SERVICE_UNAVAILABLE": 20739,
	},
	"Ob1_EnumC12666u1": {
		"POPULAR": 0,
		"NEW_RELEASE": 1,
		"EVENT": 2,
		"RECOMMENDED": 3,
		"POPULAR_WEEKLY": 4,
		"POPULAR_MONTHLY": 5,
		"POPULAR_RECENTLY_PUBLISHED": 6,
		"BUDDY": 7,
		"EXTRA_EVENT": 8,
		"BROWSING_HISTORY": 9,
		"POPULAR_TOTAL_SALES": 10,
		"NEW_SUBSCRIPTION": 11,
		"POPULAR_SUBSCRIPTION_30D": 12,
		"CPD_STICKER": 13,
		"POPULAR_WITH_FREE": 14,
	},
	"Ob1_F1": {
		"STATIC": 1,
		"ANIMATION": 2,
	},
	"Ob1_I": {
		"STATIC": 0,
		"POPULAR": 1,
		"NEW_RELEASE": 2,
	},
	"Ob1_J0": {
		"ON_SALE": 0,
		"OUTDATED_VERSION": 1,
		"NOT_ON_SALE": 2,
	},
	"Ob1_J1": {
		"OK": 0,
		"INVALID_PARAMETER": 1,
		"NOT_FOUND": 2,
		"NOT_SUPPORTED": 3,
		"CONFLICT": 4,
		"NOT_ELIGIBLE": 5,
	},
	"Ob1_K1": {
		"GOOGLE": 0,
		"APPLE": 1,
		"WEBSTORE": 2,
		"LINEMO": 3,
		"LINE_MUSIC": 4,
		"LYP": 5,
		"TW_CHT": 6,
		"FREEMIUM": 7,
	},
	"Ob1_M1": {
		"OK": 0,
		"UNKNOWN": 1,
		"NOT_SUPPORTED": 2,
		"NO_SUBSCRIPTION": 3,
		"SUBSCRIPTION_EXISTS": 4,
		"NOT_AVAILABLE": 5,
		"CONFLICT": 6,
		"OUTDATED_VERSION": 7,
		"NO_STUDENT_INFORMATION": 8,
		"ACCOUNT_HOLD": 9,
		"RETRY_STATE": 10,
	},
	"Ob1_O0": {
		"STICKER": 1,
		"THEME": 2,
		"STICON": 3,
	},
	"Ob1_O1": {
		"AVAILABLE": 0,
		"DIFFERENT_STORE": 1,
		"NOT_STUDENT": 2,
		"ALREADY_PURCHASED": 3,
	},
	"Ob1_P1": {
		"GENERAL": 1,
		"STUDENT": 2,
	},
	"Ob1_Q1": {
		"BASIC": 1,
		"DELUXE": 2,
	},
	"Ob1_R1": {
		"MONTHLY": 1,
		"YEARLY": 2,
	},
	"Ob1_U1": {
		"OK": 0,
		"UNKNOWN": 1,
		"NO_SUBSCRIPTION": 2,
		"EXISTS": 3,
		"NOT_FOUND": 4,
		"EXCEEDS_LIMIT": 5,
		"NOT_AVAILABLE": 6,
	},
	"Ob1_V1": {
		"DATE_ASC": 1,
		"DATE_DESC": 2,
	},
	"Ob1_X1": {
		"GENERAL": 0,
		"CREATORS": 1,
		"STICON": 2,
	},
	"Ob1_a2": {
		"NOT_PURCHASED": 0,
		"SUBSCRIPTION": 1,
		"NOT_SUBSCRIBED": 2,
		"NOT_ACCEPTED": 3,
		"NOT_PURCHASED_U2I": 4,
		"BUDDY": 5,
		"TREND": 6,
	},
	"Ob1_c2": {
		"STATIC": 1,
		"ANIMATION": 2,
	},
	"OpType": {
		"END_OF_OPERATION": 0,
		"UPDATE_PROFILE": 1,
		"NOTIFIED_UPDATE_PROFILE": 2,
		"REGISTER_USERID": 3,
		"ADD_CONTACT": 4,
		"NOTIFIED_ADD_CONTACT": 5,
		"BLOCK_CONTACT": 6,
		"UNBLOCK_CONTACT": 7,
		"NOTIFIED_RECOMMEND_CONTACT": 8,
		"CREATE_GROUP": 9,
		"UPDATE_GROUP": 10,
		"NOTIFIED_UPDATE_GROUP": 11,
		"INVITE_INTO_GROUP": 12,
		"NOTIFIED_INVITE_INTO_GROUP": 13,
		"LEAVE_GROUP": 14,
		"NOTIFIED_LEAVE_GROUP": 15,
		"ACCEPT_GROUP_INVITATION": 16,
		"NOTIFIED_ACCEPT_GROUP_INVITATION": 17,
		"KICKOUT_FROM_GROUP": 18,
		"NOTIFIED_KICKOUT_FROM_GROUP": 19,
		"CREATE_ROOM": 20,
		"INVITE_INTO_ROOM": 21,
		"NOTIFIED_INVITE_INTO_ROOM": 22,
		"LEAVE_ROOM": 23,
		"NOTIFIED_LEAVE_ROOM": 24,
		"SEND_MESSAGE": 25,
		"RECEIVE_MESSAGE": 26,
		"SEND_MESSAGE_RECEIPT": 27,
		"RECEIVE_MESSAGE_RECEIPT": 28,
		"SEND_CONTENT_RECEIPT": 29,
		"RECEIVE_ANNOUNCEMENT": 30,
		"CANCEL_INVITATION_GROUP": 31,
		"NOTIFIED_CANCEL_INVITATION_GROUP": 32,
		"NOTIFIED_UNREGISTER_USER": 33,
		"REJECT_GROUP_INVITATION": 34,
		"NOTIFIED_REJECT_GROUP_INVITATION": 35,
		"UPDATE_SETTINGS": 36,
		"NOTIFIED_REGISTER_USER": 37,
		"INVITE_VIA_EMAIL": 38,
		"NOTIFIED_REQUEST_RECOVERY": 39,
		"SEND_CHAT_CHECKED": 40,
		"SEND_CHAT_REMOVED": 41,
		"NOTIFIED_FORCE_SYNC": 42,
		"SEND_CONTENT": 43,
		"SEND_MESSAGE_MYHOME": 44,
		"NOTIFIED_UPDATE_CONTENT_PREVIEW": 45,
		"REMOVE_ALL_MESSAGES": 46,
		"NOTIFIED_UPDATE_PURCHASES": 47,
		"DUMMY": 48,
		"UPDATE_CONTACT": 49,
		"NOTIFIED_RECEIVED_CALL": 50,
		"CANCEL_CALL": 51,
		"NOTIFIED_REDIRECT": 52,
		"NOTIFIED_CHANNEL_SYNC": 53,
		"FAILED_SEND_MESSAGE": 54,
		"NOTIFIED_READ_MESSAGE": 55,
		"FAILED_EMAIL_CONFIRMATION": 56,
		"NOTIFIED_CHAT_CONTENT": 58,
		"NOTIFIED_PUSH_NOTICENTER_ITEM": 59,
		"NOTIFIED_JOIN_CHAT": 60,
		"NOTIFIED_LEAVE_CHAT": 61,
		"NOTIFIED_TYPING": 62,
		"FRIEND_REQUEST_ACCEPTED": 63,
		"DESTROY_MESSAGE": 64,
		"NOTIFIED_DESTROY_MESSAGE": 65,
		"UPDATE_PUBLICKEYCHAIN": 66,
		"NOTIFIED_UPDATE_PUBLICKEYCHAIN": 67,
		"NOTIFIED_BLOCK_CONTACT": 68,
		"NOTIFIED_UNBLOCK_CONTACT": 69,
		"UPDATE_GROUPPREFERENCE": 70,
		"NOTIFIED_PAYMENT_EVENT": 71,
		"REGISTER_E2EE_PUBLICKEY": 72,
		"NOTIFIED_E2EE_KEY_EXCHANGE_REQ": 73,
		"NOTIFIED_E2EE_KEY_EXCHANGE_RESP": 74,
		"NOTIFIED_E2EE_MESSAGE_RESEND_REQ": 75,
		"NOTIFIED_E2EE_MESSAGE_RESEND_RESP": 76,
		"NOTIFIED_E2EE_KEY_UPDATE": 77,
		"NOTIFIED_BUDDY_UPDATE_PROFILE": 78,
		"NOTIFIED_UPDATE_LINEAT_TABS": 79,
		"UPDATE_ROOM": 80,
		"NOTIFIED_BEACON_DETECTED": 81,
		"UPDATE_EXTENDED_PROFILE": 82,
		"ADD_FOLLOW": 83,
		"NOTIFIED_ADD_FOLLOW": 84,
		"DELETE_FOLLOW": 85,
		"NOTIFIED_DELETE_FOLLOW": 86,
		"UPDATE_TIMELINE_SETTINGS": 87,
		"NOTIFIED_FRIEND_REQUEST": 88,
		"UPDATE_RINGBACK_TONE": 89,
		"NOTIFIED_POSTBACK": 90,
		"RECEIVE_READ_WATERMARK": 91,
		"NOTIFIED_MESSAGE_DELIVERED": 92,
		"NOTIFIED_UPDATE_CHAT_BAR": 93,
		"NOTIFIED_CHATAPP_INSTALLED": 94,
		"NOTIFIED_CHATAPP_UPDATED": 95,
		"NOTIFIED_CHATAPP_NEW_MARK": 96,
		"NOTIFIED_CHATAPP_DELETED": 97,
		"NOTIFIED_CHATAPP_SYNC": 98,
		"NOTIFIED_UPDATE_MESSAGE": 99,
		"UPDATE_CHATROOMBGM": 100,
		"NOTIFIED_UPDATE_CHATROOMBGM": 101,
		"UPDATE_RINGTONE": 102,
		"UPDATE_USER_SETTINGS": 118,
		"NOTIFIED_UPDATE_STATUS_BAR": 119,
		"CREATE_CHAT": 120,
		"UPDATE_CHAT": 121,
		"NOTIFIED_UPDATE_CHAT": 122,
		"INVITE_INTO_CHAT": 123,
		"NOTIFIED_INVITE_INTO_CHAT": 124,
		"CANCEL_CHAT_INVITATION": 125,
		"NOTIFIED_CANCEL_CHAT_INVITATION": 126,
		"DELETE_SELF_FROM_CHAT": 127,
		"NOTIFIED_DELETE_SELF_FROM_CHAT": 128,
		"ACCEPT_CHAT_INVITATION": 129,
		"NOTIFIED_ACCEPT_CHAT_INVITATION": 130,
		"REJECT_CHAT_INVITATION": 131,
		"DELETE_OTHER_FROM_CHAT": 132,
		"NOTIFIED_DELETE_OTHER_FROM_CHAT": 133,
		"NOTIFIED_CONTACT_CALENDAR_EVENT": 134,
		"NOTIFIED_CONTACT_CALENDAR_EVENT_ALL": 135,
		"UPDATE_THINGS_OPERATIONS": 136,
		"SEND_CHAT_HIDDEN": 137,
		"CHAT_META_SYNC_ALL": 138,
		"SEND_REACTION": 139,
		"NOTIFIED_SEND_REACTION": 140,
		"NOTIFIED_UPDATE_PROFILE_CONTENT": 141,
		"FAILED_DELIVERY_MESSAGE": 142,
		"SEND_ENCRYPTED_E2EE_KEY_REQUESTED": 143,
		"CHANNEL_PAAK_AUTHENTICATION_REQUESTED": 144,
		"UPDATE_PIN_STATE": 145,
		"NOTIFIED_PREMIUMBACKUP_STATE_CHANGED": 146,
		"CREATE_MULTI_PROFILE": 147,
		"MULTI_PROFILE_STATUS_CHANGED": 148,
		"DELETE_MULTI_PROFILE": 149,
		"UPDATE_PROFILE_MAPPING": 150,
		"DELETE_PROFILE_MAPPING": 151,
		"NOTIFIED_DESTROY_NOTICENTER_PUSH": 152,
		"FORCE_KEY_BACKUP_HEADER_VALIDATION": 153,
		"NOTIFIED_GCS_REACTION": 154,
		"UPDATE_MESSAGE_REQUEST_BOX": 155,
		"NOTIFIED_UPDATE_MESSAGE_REQUEST_BOX": 156,
		"NOTIFIED_GCS_REFRESH_CONTENT": 157,
		"EDIT_MESSAGE": 158,
		"NOTIFIED_EDIT_MESSAGE": 159,
		"ADD_SCHEDULED_MESSAGE": 160,
		"UPDATE_SCHEDULED_MESSAGE": 161,
		"DELETE_SCHEDULED_MESSAGE": 162,
		"E2EE_REENCRYPT_SCHEDULED_MESSAGE": 163,
		"SEND_FAILED_SCHEDULED_MESSAGE": 164,
		"SEND_SUCCEEDED_SCHEDULED_MESSAGE": 165,
		"UPDATE_SERVICE_CHAT": 166,
		"MARK_SERVICE_CHAT_AS_READ": 167,
		"UPDATE_SERVICE_CHAT_NOTIFICATION_TEXT": 168,
		"LINE_AUTH_NOTIFICATION": 169,
	},
	"P70_g": {
		"INVALID_REQUEST": 1000,
		"RETRY_REQUIRED": 1001,
	},
	"PaidCallType": {
		"OUT": 0,
		"IN": 1,
		"TOLLFREE": 2,
		"RECORD": 3,
		"AD": 4,
		"CS": 5,
		"OA": 6,
		"OAM": 7,
	},
	"PayloadType": {
		"PAYLOAD_BUY": 101,
		"PAYLOAD_CS": 111,
		"PAYLOAD_BONUS": 121,
		"PAYLOAD_EVENT": 131,
		"PAYLOAD_POINT_AUTO_EXCHANGED": 141,
		"PAYLOAD_POINT_MANUAL_EXCHANGED": 151,
	},
	"Pb1_A0": {
		"NORMAL": 0,
		"VIDEOCAM": 1,
		"VOIP": 2,
		"RECORD": 3,
	},
	"Pb1_A3": {
		"UNKNOWN": 0,
		"BACKGROUND_NEW_KEY_CREATED": 1,
		"BACKGROUND_PERIODICAL_VERIFICATION": 2,
		"FOREGROUND_NEW_PIN_REGISTERED": 3,
		"FOREGROUND_VERIFICATION": 4,
	},
	"Pb1_B": {
		"SIRI": 1,
		"GOOGLE_ASSISTANT": 2,
		"OS_SHARE": 3,
	},
	"Pb1_D0": {
		"RICH_MENU_ID": 0,
		"STATUS_BAR": 1,
		"BUDDY_CAUTION_NOTICE": 2,
	},
	"Pb1_D4": {
		"AUDIO": 1,
		"VIDEO": 2,
		"FACEPLAY": 3,
	},
	"Pb1_D6": {
		"GOOGLE": 0,
		"BAIDU": 1,
		"FOURSQUARE": 2,
		"YAHOOJAPAN": 3,
		"KINGWAY": 4,
	},
	"Pb1_E7": {
		"UNKNOWN": 0,
		"TALK": 1,
		"SQUARE": 2,
	},
	"Pb1_EnumC12917a6": {
		"UNKNOWN": 0,
		"APP_FOREGROUND": 1,
		"PERIODIC": 2,
		"MANUAL": 3,
	},
	"Pb1_EnumC12926b1": {
		"NOT_A_FRIEND": 0,
		"ALWAYS": 1,
	},
	"Pb1_EnumC12941c2": {
		"BLE_LCS_API_USABLE": 26,
		"PROHIBIT_MINIMIZE_CHANNEL_BROWSER": 27,
		"ALLOW_IOS_WEBKIT": 28,
		"PURCHASE_LCS_API_USABLE": 38,
		"ALLOW_ANDROID_ENABLE_ZOOM": 48,
	},
	"Pb1_EnumC12945c6": {
		"V1": 1,
		"V2": 2,
	},
	"Pb1_EnumC12970e3": {
		"USER_AGE_CHECKED": 1,
		"USER_APPROVAL_REQUIRED": 2,
	},
	"Pb1_EnumC12997g2": {
		"PROFILE": 0,
		"FRIENDS": 1,
		"GROUP": 2,
	},
	"Pb1_EnumC12998g3": {
		"UNKNOWN": 0,
		"WIFI": 1,
		"CELLULAR_NETWORK": 2,
	},
	"Pb1_EnumC13009h0": {
		"NORMAL": 1,
		"LOW_BATTERY": 2,
	},
	"Pb1_EnumC13010h1": {
		"NEW": 1,
		"PLANET": 2,
	},
	"Pb1_EnumC13015h6": {
		"FORWARD": 0,
		"AUTO_REPLY": 1,
		"SUBORDINATE": 2,
		"REPLY": 3,
	},
	"Pb1_EnumC13022i": {
		"SKIP": 0,
		"PINCODE": 1,
		"SECURITY_CENTER": 2,
	},
	"Pb1_EnumC13029i6": {
		"ADD": 0,
		"REMOVE": 1,
		"MODIFY": 2,
	},
	"Pb1_EnumC13037j0": {
		"UNSPECIFIED": 0,
		"INACTIVE": 1,
		"ACTIVE": 2,
		"DELETED": 3,
	},
	"Pb1_EnumC13050k": {
		"UNKNOWN": 0,
		"IOS_REDUCED_ACCURACY": 1,
		"IOS_FULL_ACCURACY": 2,
		"AOS_PRECISE_LOCATION": 3,
		"AOS_APPROXIMATE_LOCATION": 4,
	},
	"Pb1_EnumC13082m3": {
		"SHOW": 0,
		"HIDE": 1,
	},
	"Pb1_EnumC13093n0": {
		"NONE": 0,
		"TOP": 1,
	},
	"Pb1_EnumC13127p6": {
		"NORMAL": 0,
		"ALERT_DISABLED": 1,
		"ALWAYS": 2,
	},
	"Pb1_EnumC13128p7": {
		"UNKNOWN": 0,
		"DIRECT_INVITATION": 1,
		"DIRECT_CHAT": 2,
		"GROUP_INVITATION": 3,
		"GROUP_CHAT": 4,
		"ROOM_INVITATION": 5,
		"ROOM_CHAT": 6,
		"FRIEND_PROFILE": 7,
		"DIRECT_CHAT_SELECTED": 8,
		"GROUP_CHAT_SELECTED": 9,
		"ROOM_CHAT_SELECTED": 10,
		"DEPRECATED": 11,
	},
	"Pb1_EnumC13148r0": {
		"ALWAYS_HIDDEN": 1,
		"ALWAYS_SHOWN": 2,
		"SHOWN_BY_CONDITION": 3,
	},
	"Pb1_EnumC13151r3": {
		"ONEWAY": 0,
		"BOTH": 1,
		"NOT_REGISTERED": 2,
	},
	"Pb1_EnumC13162s0": {
		"NOT_SUSPICIOUS": 1,
		"SUSPICIOUS_00": 2,
		"SUSPICIOUS_01": 3,
	},
	"Pb1_EnumC13196u6": {
		"COIN": 0,
		"CREDIT": 1,
		"MONTHLY": 2,
		"OAM": 3,
	},
	"Pb1_EnumC13209v5": {
		"DUMMY": 0,
		"NOTICE": 1,
		"MORETAB": 2,
		"STICKERSHOP": 3,
		"CHANNEL": 4,
		"DENY_KEYWORD": 5,
		"CONNECTIONINFO": 6,
		"BUDDY": 7,
		"TIMELINEINFO": 8,
		"THEMESHOP": 9,
		"CALLRATE": 10,
		"CONFIGURATION": 11,
		"STICONSHOP": 12,
		"SUGGESTDICTIONARY": 13,
		"SUGGESTSETTINGS": 14,
		"USERSETTINGS": 15,
		"ANALYTICSINFO": 16,
		"SEARCHPOPULARKEYWORD": 17,
		"SEARCHNOTICE": 18,
		"TIMELINE": 19,
		"SEARCHPOPULARCATEGORY": 20,
		"EXTENDEDPROFILE": 21,
		"SEASONALMARKETING": 22,
		"NEWSTAB": 23,
		"SUGGESTDICTIONARYV2": 24,
		"CHATAPPSYNC": 25,
		"AGREEMENTS": 26,
		"INSTANTNEWS": 27,
		"EMOJI_MAPPING": 28,
		"SEARCHBARKEYWORDS": 29,
		"SHOPPING": 30,
		"CHAT_EFFECT_BACKGROUND": 31,
		"CHAT_EFFECT_KEYWORD": 32,
		"SEARCHINDEX": 33,
		"HUBTAB": 34,
		"PAY_RULE_UPDATED": 35,
		"SMARTCH": 36,
		"HOME_SERVICE_LIST": 37,
		"TIMELINESTORY": 38,
		"WALLET_TAB": 39,
		"POD_TAB": 40,
		"HOME_SAFETY_CHECK": 41,
		"HOME_SEASONAL_EFFECT": 42,
		"OPENCHAT_MAIN": 43,
		"CHAT_EFFECT_CONTENT_METADATA_TAG": 44,
		"VOOM_LIVE_STATE_CHANGED": 45,
		"PROFILE_STUDIO_N_BADGE": 46,
		"LYP_FONT": 47,
		"TIMELINESTORY_OA": 48,
		"TRAVEL": 49,
		"PORTALTAB_GNB_DOT": 50,
		"NEWS_ROW_TAB": 51,
		"GCS_REFRESH": 52,
		"GCS_REFRESH_ALL": 53,
		"ASSET_META_POPUP": 54,
		"AI_FRIENDS": 55,
		"COMMERCE_TW_TAB": 56,
		"PREMIUM_PRODUCT_DEFINITION": 57,
		"DATAMODE": 58,
	},
	"Pb1_EnumC13221w3": {
		"UNKNOWN": 0,
		"EUROPEAN_ECONOMIC_AREA": 1,
	},
	"Pb1_EnumC13222w4": {
		"OBS_VIDEO": 1,
		"OBS_GENERAL": 2,
		"OBS_RINGBACK_TONE": 3,
	},
	"Pb1_EnumC13237x5": {
		"AUDIO": 1,
		"VIDEO": 2,
		"LIVE": 3,
		"PHOTOBOOTH": 4,
	},
	"Pb1_EnumC13238x6": {
		"NOT_SPECIFIED": 0,
		"VALID": 1,
		"VERIFICATION_REQUIRED": 2,
		"NOT_PERMITTED": 3,
		"LIMIT_EXCEEDED": 4,
		"LIMIT_EXCEEDED_AND_VERIFICATION_REQUIRED": 5,
	},
	"Pb1_EnumC13251y5": {
		"STANDARD": 1,
		"CONSTELLA": 2,
	},
	"Pb1_EnumC13252y6": {
		"ALL": 0,
		"PROFILE": 1,
		"SETTINGS": 2,
		"CONFIGURATIONS": 3,
		"CONTACT": 4,
		"GROUP": 5,
		"E2EE": 6,
		"MESSAGE": 7,
		"MULTI_PROFILE": 8,
		"MESSAGE_REQUEST_BOX": 9,
		"SCHEDULED_MESSAGE": 10,
	},
	"Pb1_EnumC13260z0": {
		"ON_AIR": 0,
		"LIVE": 1,
		"GLP": 2,
	},
	"Pb1_EnumC13267z7": {
		"NOTIFICATION_SETTING": 1,
		"ALL": 255,
	},
	"Pb1_F0": {
		"NA": 0,
		"FRIEND_VIEW": 1,
		"OFFICIAL_ACCOUNT_VIEW": 2,
	},
	"Pb1_F4": {
		"INCOMING": 1,
		"OUTGOING": 2,
	},
	"Pb1_F5": {
		"UNKNOWN": 0,
		"SUCCESS": 1,
		"REQUIRE_SERVER_SIDE_EMAIL": 2,
		"REQUIRE_CLIENT_SIDE_EMAIL": 3,
	},
	"Pb1_F6": {
		"JBU": 0,
		"LIP": 1,
	},
	"Pb1_G3": {
		"PROMOTION_FRIENDS_INVITE": 1,
		"CAPABILITY_SERVER_SIDE_SMS": 2,
		"LINE_CLIENT_ANALYTICS_CONFIGURATION": 3,
	},
	"Pb1_G4": {
		"TIMELINE": 1,
		"NEARBY": 2,
		"SQUARE": 3,
	},
	"Pb1_G6": {
		"NICE": 2,
		"LOVE": 3,
		"FUN": 4,
		"AMAZING": 5,
		"SAD": 6,
		"OMG": 7,
	},
	"Pb1_H6": {
		"PUBLIC": 0,
		"PRIVATE": 1,
	},
	"Pb1_I6": {
		"NEVER_SHOW": 0,
		"ONE_WAY": 1,
		"MUTUAL": 2,
	},
	"Pb1_J4": {
		"OTHER": 0,
		"INITIALIZATION": 1,
		"PERIODIC_SYNC": 2,
		"MANUAL_SYNC": 3,
		"LOCAL_DB_CORRUPTED": 4,
	},
	"Pb1_K2": {
		"CHANNEL_INFO": 1,
		"CHANNEL_TOKEN": 2,
		"COMMON_DOMAIN": 4,
		"ALL": 255,
	},
	"Pb1_K6": {
		"EMAIL": 1,
		"DISPLAY_NAME": 2,
		"PHONETIC_NAME": 4,
		"PICTURE": 8,
		"STATUS_MESSAGE": 16,
		"ALLOW_SEARCH_BY_USERID": 32,
		"ALLOW_SEARCH_BY_EMAIL": 64,
		"BUDDY_STATUS": 128,
		"MUSIC_PROFILE": 256,
		"AVATAR_PROFILE": 512,
		"HIDDEN_FROM_LIST": 1024,
		"ALL": 2147483647,
	},
	"Pb1_L2": {
		"SYNC": 0,
		"REMOVE": 1,
		"REMOVE_ALL": 2,
	},
	"Pb1_L4": {
		"UNKNOWN": 0,
		"REVISION_GAP_TOO_LARGE_CLIENT": 1,
		"REVISION_GAP_TOO_LARGE_SERVER": 2,
		"OPERATION_EXPIRED": 3,
		"REVISION_HOLE": 4,
		"FORCE_TRIGGERED": 5,
	},
	"Pb1_M6": {
		"OWNER": 0,
		"FRIEND": 1,
	},
	"Pb1_N6": {
		"NFT": 1,
		"AVATAR": 2,
		"SNOW": 3,
		"ARCZ": 4,
		"FRENZ": 5,
	},
	"Pb1_O2": {
		"NAME": 1,
		"PICTURE_STATUS": 2,
		"PREVENTED_JOIN_BY_TICKET": 4,
		"NOTIFICATION_SETTING": 8,
		"INVITATION_TICKET": 16,
		"FAVORITE_TIMESTAMP": 32,
		"CHAT_TYPE": 64,
		"PENALTY": 128,
	},
	"Pb1_O6": {
		"DEFAULT": 1,
		"MULTI_PROFILE": 2,
	},
	"Pb1_P6": {
		"HIDDEN": 0,
		"PUBLIC": 1000,
	},
	"Pb1_Q2": {
		"BACKGROUND": 0,
		"KEYWORD": 1,
		"CONTENT_METADATA_TAG_BASED": 2,
	},
	"Pb1_R3": {
		"BEACON_AGREEMENT": 1,
		"BLUETOOTH": 2,
		"SHAKE_AGREEMENT": 3,
		"AUTO_SUGGEST": 4,
		"CHATROOM_CAPTURE": 5,
		"CHATROOM_MINIMIZEBROWSER": 6,
		"CHATROOM_MOBILESAFARI": 7,
		"VIDEO_HIGHTLIGHT_WIZARD": 8,
		"CHAT_FOLDER": 9,
		"BLUETOOTH_SCAN": 10,
		"AUTO_SUGGEST_FOLLOW_UP": 11,
		"PHISHING_SITE_DETECTION": 12,
		"SMART_STICKER_SUGGEST": 13,
	},
	"Pb1_S7": {
		"NONE": 1,
		"ALL": 2,
	},
	"Pb1_T3": {
		"LOCATION_OS": 1,
		"LOCATION_APP": 2,
		"VIDEO_AUTO_PLAY": 3,
		"HNI": 4,
		"AUTO_SUGGEST_LANG": 5,
		"CHAT_EFFECT_CACHED_CONTENT_LIST": 6,
		"IFA": 7,
		"ACCURACY_MODE": 8,
	},
	"Pb1_T7": {
		"SYNC": 0,
		"REPORT": 1,
	},
	"Pb1_V7": {
		"UNSPECIFIED": 0,
		"UNKNOWN": 1,
		"INITIALIZATION": 2,
		"OPERATION": 3,
		"FULL_SYNC": 4,
		"AUTO_REPAIR": 5,
		"MANUAL_REPAIR": 6,
		"INTERNAL": 7,
		"USER_INITIATED": 8,
		"PREMIUM_BACKUP_RESTORE": 9,
	},
	"Pb1_W2": {
		"ANYONE_IN_CHAT": 0,
		"CREATOR_ONLY": 1,
		"NO_ONE": 2,
	},
	"Pb1_W3": {
		"ILLEGAL_ARGUMENT": 0,
		"AUTHENTICATION_FAILED": 1,
		"INTERNAL_ERROR": 2,
		"RESTORE_KEY_FIRST": 3,
		"NO_BACKUP": 4,
		"INVALID_PIN": 6,
		"PERMANENTLY_LOCKED": 7,
		"INVALID_PASSWORD": 8,
		"MASTER_KEY_CONFLICT": 9,
		"KEY_BACKUP_HEADER_MISMATCH": 10,
	},
	"Pb1_X1": {
		"MESSAGE": 0,
		"MESSAGE_NOTIFICATION": 1,
		"NOTIFICATION_CENTER": 2,
	},
	"Pb1_X2": {
		"MESSAGE": 0,
		"NOTE": 1,
		"CHANNEL": 2,
	},
	"Pb1_Z2": {
		"GROUP": 0,
		"ROOM": 1,
		"PEER": 2,
	},
	"Pb1_gd": {
		"OVER": 1,
		"UNDER": 2,
		"UNDEFINED": 3,
	},
	"Pb1_od": {
		"UNKNOWN": 0,
		"LOCATION": 1,
	},
	"PointErrorCode": {
		"REQUEST_DUPLICATION": 3001,
		"INVALID_PARAMETER": 3002,
		"NOT_ENOUGH_BALANCE": 3003,
		"AUTHENTICATION_FAIL": 3004,
		"API_ACCESS_FORBIDDEN": 3005,
		"MEMBER_ACCOUNT_NOT_FOUND": 3006,
		"SERVICE_ACCOUNT_NOT_FOUND": 3007,
		"TRANSACTION_NOT_FOUND": 3008,
		"ALREADY_REVERSED_TRANSACTION": 3009,
		"MESSAGE_NOT_READABLE": 3010,
		"HTTP_REQUEST_METHOD_NOT_SUPPORTED": 3011,
		"HTTP_MEDIA_TYPE_NOT_SUPPORTED": 3012,
		"NOT_ALLOWED_TO_DEPOSIT": 3013,
		"NOT_ALLOWED_TO_PAY": 3014,
		"TRANSACTION_ACCESS_FORBIDDEN": 3015,
		"INVALID_SERVICE_CONFIGURATION": 4001,
		"DCS_COMMUNICATION_FAIL": 5004,
		"UPDATE_BALANCE_FAIL": 5007,
		"SYSTEM_MAINTENANCE": 5888,
		"SYSTEM_ERROR": 5999,
	},
	"Q70_q": {
		"UNKNOWN": 0,
		"FACEBOOK": 1,
		"APPLE": 2,
		"GOOGLE": 3,
	},
	"Q70_r": {
		"INTERNAL_ERROR": 0,
		"ILLEGAL_ARGUMENT": 1,
		"VERIFICATION_FAILED": 2,
		"RETRY_LATER": 4,
		"HUMAN_VERIFICATION_REQUIRED": 5,
		"APP_UPGRADE_REQUIRED": 101,
	},
	"Qj_EnumC13584a": {
		"NOT_DETERMINED": 0,
		"RESTRICTED": 1,
		"DENIED": 2,
		"AUTHORIZED": 3,
	},
	"Qj_EnumC13585b": {
		"WHITE": 1,
		"BLACK": 2,
	},
	"Qj_EnumC13588e": {
		"LIGHT": 1,
		"DARK": 2,
	},
	"Qj_EnumC13592i": {
		"ILLEGAL_ARGUMENT": 0,
		"INTERNAL_ERROR": 1,
		"CONNECTION_ERROR": 2,
		"AUTHENTICATION_FAILED": 3,
		"NEED_PERMISSION_APPROVAL": 4,
		"COIN_NOT_USABLE": 5,
		"WEBVIEW_NOT_ALLOWED": 6,
	},
	"Qj_EnumC13597n": {
		"INVALID_REQUEST": 1,
		"UNAUTHORIZED": 2,
		"CONSENT_REQUIRED": 3,
		"VERSION_UPDATE_REQUIRED": 4,
		"COMPREHENSIVE_AGREEMENT_REQUIRED": 5,
		"SPLASH_SCREEN_REQUIRED": 6,
		"PERMANENT_LINK_INVALID_REQUEST": 7,
		"NO_DESTINATION_URL": 8,
		"SERVICE_ALREADY_TERMINATED": 9,
		"ID_FEDERATION_REQUIRED": 10,
		"SERVER_ERROR": 100,
	},
	"Qj_EnumC13604v": {
		"GEOLOCATION": 1,
		"ADVERTISING_ID": 2,
		"BLUETOOTH_LE": 3,
		"QR_CODE": 4,
		"ADVERTISING_SDK": 5,
		"ADD_TO_HOME": 6,
		"SHARE_TARGET_MESSAGE": 7,
		"VIDEO_AUTO_PLAY": 8,
		"PROFILE_PLUS": 9,
		"SUBWINDOW_OPEN": 10,
		"SUBWINDOW_COMMON_MODULE": 11,
		"NO_LIFF_REFERRER": 12,
		"SKIP_CHANNEL_VERIFICATION_SCREEN": 13,
		"PROVIDER_PAGE": 14,
		"BASIC_AUTH": 15,
		"SIRI_DONATION": 16,
	},
	"Qj_EnumC13605w": {
		"ALLOW_DIRECT_LINK": 1,
		"ALLOW_DIRECT_LINK_V2": 2,
	},
	"Qj_EnumC13606x": {
		"LIGHT": 1,
		"LIGHT_TRANSLUCENT": 2,
		"DARK_TRANSLUCENT": 3,
		"LIGHT_ICON": 4,
		"DARK_ICON": 5,
	},
	"Qj_a0": {
		"CONCAT": 1,
		"REPLACE": 2,
	},
	"Qj_e0": {
		"SUCCESS": 0,
		"FAILURE": 1,
		"CANCEL": 2,
	},
	"Qj_h0": {
		"RIGHT": 1,
		"LEFT": 2,
	},
	"Qj_i0": {
		"FULL": 1,
		"TALL": 2,
		"COMPACT": 3,
	},
	"R70_e": {
		"INTERNAL_ERROR": 0,
		"ILLEGAL_ARGUMENT": 1,
		"VERIFICATION_FAILED": 2,
		"EXTERNAL_SERVICE_UNAVAILABLE": 3,
		"RETRY_LATER": 4,
		"INVALID_CONTEXT": 100,
		"NOT_SUPPORTED": 101,
		"FORBIDDEN": 102,
		"FIDO_RETRY_WITH_ANOTHER_AUTHENTICATOR": 201,
	},
	"RegistrationType": {
		"PHONE": 0,
		"EMAIL_WAP": 1,
		"FACEBOOK": 2305,
		"SINA": 2306,
		"RENREN": 2307,
		"FEIXIN": 2308,
		"APPLE": 2309,
		"YAHOOJAPAN": 2310,
		"GOOGLE": 2311,
	},
	"ReportType": {
		"ADVERTISING": 1,
		"GENDER_HARASSMENT": 2,
		"HARASSMENT": 3,
		"OTHER": 4,
		"IRRELEVANT_CONTENT": 5,
		"IMPERSONATION": 6,
		"SCAM": 7,
	},
	"S70_a": {
		"INTERNAL_ERROR": 0,
		"ILLEGAL_ARGUMENT": 1,
		"VERIFICATION_FAILED": 2,
		"RETRY_LATER": 3,
		"INVALID_CONTEXT": 100,
		"APP_UPGRADE_REQUIRED": 101,
	},
	"SettingsAttributeEx": {
		"NOTIFICATION_ENABLE": 0,
		"NOTIFICATION_MUTE_EXPIRATION": 1,
		"NOTIFICATION_NEW_MESSAGE": 2,
		"NOTIFICATION_GROUP_INVITATION": 3,
		"NOTIFICATION_SHOW_MESSAGE": 4,
		"NOTIFICATION_INCOMING_CALL": 5,
		"PRIVACY_SYNC_CONTACTS": 6,
		"PRIVACY_SEARCH_BY_PHONE_NUMBER": 7,
		"NOTIFICATION_SOUND_MESSAGE": 8,
		"NOTIFICATION_SOUND_GROUP": 9,
		"CONTACT_MY_TICKET": 10,
		"IDENTITY_PROVIDER": 11,
		"IDENTITY_IDENTIFIER": 12,
		"PRIVACY_SEARCH_BY_USERID": 13,
		"PRIVACY_SEARCH_BY_EMAIL": 14,
		"PREFERENCE_LOCALE": 15,
		"NOTIFICATION_DISABLED_WITH_SUB": 16,
		"NOTIFICATION_PAYMENT": 17,
		"SECURITY_CENTER_SETTINGS": 18,
		"SNS_ACCOUNT": 19,
		"PHONE_REGISTRATION": 20,
		"PRIVACY_ALLOW_SECONDARY_DEVICE_LOGIN": 21,
		"CUSTOM_MODE": 22,
		"PRIVACY_PROFILE_IMAGE_POST_TO_MYHOME": 23,
		"EMAIL_CONFIRMATION_STATUS": 24,
		"PRIVACY_RECV_MESSAGES_FROM_NOT_FRIEND": 25,
		"PRIVACY_AGREE_USE_LINECOIN_TO_PAIDCALL": 26,
		"PRIVACY_AGREE_USE_PAIDCALL": 27,
		"ACCOUNT_MIGRATION_PINCODE": 28,
		"ENFORCED_INPUT_ACCOUNT_MIGRATION_PINCODE": 29,
		"PRIVACY_ALLOW_FRIEND_REQUEST": 30,
		"PWLESS_PRIMARY_CREDENTIAL_REGISTRATION": 31,
		"ALLOWED_TO_CONNECT_EAP_ACCOUNT": 32,
		"E2EE_ENABLE": 33,
		"HITOKOTO_BACKUP_REQUESTED": 34,
		"PRIVACY_PROFILE_MUSIC_POST_TO_MYHOME": 35,
		"CONTACT_ALLOW_FOLLOWING": 36,
		"PRIVACY_ALLOW_NEARBY": 37,
		"AGREEMENT_NEARBY": 38,
		"AGREEMENT_SQUARE": 39,
		"NOTIFICATION_MENTION": 40,
		"ALLOW_UNREGISTRATION_SECONDARY_DEVICE": 41,
		"AGREEMENT_BOT_USE": 42,
		"AGREEMENT_SHAKE_FUNCTION": 43,
		"AGREEMENT_MOBILE_CONTACT_NAME": 44,
		"NOTIFICATION_THUMBNAIL": 45,
		"AGREEMENT_SOUND_TO_TEXT": 46,
		"AGREEMENT_PRIVACY_POLICY_VERSION": 47,
		"AGREEMENT_AD_BY_WEB_ACCESS": 48,
		"AGREEMENT_PHONE_NUMBER_MATCHING": 49,
		"AGREEMENT_COMMUNICATION_INFO": 50,
		"PRIVACY_SHARE_PERSONAL_INFO_TO_FRIENDS": 51,
		"AGREEMENT_THINGS_WIRELESS_COMMUNICATION": 52,
		"AGREEMENT_GDPR": 53,
		"PRIVACY_STATUS_MESSAGE_HISTORY": 54,
		"AGREEMENT_PROVIDE_LOCATION": 55,
		"AGREEMENT_BEACON": 56,
		"PRIVACY_PROFILE_HISTORY": 57,
		"AGREEMENT_CONTENTS_SUGGEST": 58,
		"AGREEMENT_CONTENTS_SUGGEST_DATA_COLLECTION": 59,
		"PRIVACY_AGE_RESULT": 60,
		"PRIVACY_AGE_RESULT_RECEIVED": 61,
		"AGREEMENT_OCR_IMAGE_COLLECTION": 62,
		"PRIVACY_ALLOW_FOLLOW": 63,
		"PRIVACY_SHOW_FOLLOW_LIST": 64,
		"NOTIFICATION_BADGE_TALK_ONLY": 65,
		"AGREEMENT_ICNA": 66,
		"NOTIFICATION_REACTION": 67,
		"AGREEMENT_MID": 68,
		"HOME_NOTIFICATION_NEW_FRIEND": 69,
		"HOME_NOTIFICATION_FAVORITE_FRIEND_UPDATE": 70,
		"HOME_NOTIFICATION_GROUP_MEMBER_UPDATE": 71,
		"HOME_NOTIFICATION_BIRTHDAY": 72,
		"AGREEMENT_LINE_OUT_USE": 73,
		"AGREEMENT_LINE_OUT_PROVIDE_INFO": 74,
		"NOTIFICATION_SHOW_PROFILE_IMAGE": 75,
		"AGREEMENT_PDPA": 76,
		"AGREEMENT_LOCATION_VERSION": 77,
		"ALLOWED_TO_SHOW_ZHD_PAGE": 78,
		"AGREEMENT_SNOW_AI_AVATAR": 79,
		"EAP_ONLY_ACCOUNT_TARGET_COUNTRY": 80,
		"AGREEMENT_LYP_PREMIUM_ALBUM": 81,
		"AGREEMENT_LYP_PREMIUM_ALBUM_VERSION": 82,
		"AGREEMENT_ALBUM_USAGE_DATA": 83,
		"AGREEMENT_ALBUM_USAGE_DATA_VERSION": 84,
		"AGREEMENT_LYP_PREMIUM_BACKUP": 85,
		"AGREEMENT_LYP_PREMIUM_BACKUP_VERSION": 86,
		"AGREEMENT_OA_AI_ASSISTANT": 87,
		"AGREEMENT_OA_AI_ASSISTANT_VERSION": 88,
		"AGREEMENT_LYP_PREMIUM_MULTI_PROFILE": 89,
		"AGREEMENT_LYP_PREMIUM_MULTI_PROFILE_VERSION": 90,
		"AGREEMENT_PREMIUM_BACKUP_PREMIUM_TYPE": 91,
		"AGREEMENT_PDP": 92,
		"AGREEMENT_PREMIUM_ALBUM_PREMIUM_TYPE": 93,
		"HOME_NOTIFICATION_NOTE_NOTE_LIKE": 94,
		"HOME_NOTIFICATION_NOTE_COMMENT": 95,
		"HOME_NOTIFICATION_NOTE_COMMENT_LIKE": 96,
		"HOME_NOTIFICATION_NOTE_MENTION": 97,
		"AGREEMENT_IN_APP_PURCHASE": 98,
		"AGREEMENT_IN_APP_PURCHASE_VERSION": 99,
		"HOME_NOTIFICATION_ALBUM_LIKE": 100,
		"AGREEMENT_TRIGGER_MESSAGE": 101,
		"AGREEMENT_LYP_PREMIUM_UNSEND": 102,
		"AGREEMENT_LYP_PREMIUM_UNSEND_VERSION": 103,
		"AGREEMENT_LYP_PREMIUM_MESSAGE_EDIT": 104,
		"AGREEMENT_LYP_PREMIUM_MESSAGE_EDIT_VERSION": 105,
		"NOTIFICATION_NOTE_REACTION": 106,
		"NOTIFICATION_NOTE_COMMENT": 107,
		"NOTIFICATION_NOTE_COMMENT_LIKE": 108,
		"NOTIFICATION_NOTE_MENTION": 109,
		"NOTIFICATION_ALBUM_LIKE": 110,
		"PHONE_NUMBER_DELETE_ENABLE": 111,
		"AGREEMENT_LYP_PREMIUM_MESSAGE_SCHEDULING": 112,
		"AGREEMENT_LYP_PREMIUM_MESSAGE_SCHEDULING_VERSION": 113,
		"SECURITY_CARD_REQUIRED": 114,
		"AGREEMENT_LYP_PREMIUM_MESSAGE_SCHEDULING_PREMIUM_TYPE": 115,
		"LAB_MESSAGE_EDIT": 116,
		"LAB_FRIENDS_MANAGEMENT": 117,
		"AGREEMENT_LYP_PREMIUM_MUTE_MESSAGE": 118,
		"AGREEMENT_LYP_PREMIUM_MUTE_MESSAGE_VERSION": 119,
		"AGREEMENT_LYP_PREMIUM_MUTE_MESSAGE_PREMIUM_TYPE": 120,
	},
	"SnsIdType": {
		"FACEBOOK": 1,
		"SINA": 2,
		"RENREN": 3,
		"FEIXIN": 4,
		"BBM": 5,
		"APPLE": 6,
		"YAHOOJAPAN": 7,
		"GOOGLE": 8,
	},
	"SpammerReason": {
		"OTHER": 0,
		"ADVERTISING": 1,
		"GENDER_HARASSMENT": 2,
		"HARASSMENT": 3,
		"IMPERSONATION": 4,
		"SCAM": 5,
	},
	"SpotCategory": {
		"UNKNOWN": 0,
		"GOURMET": 1,
		"BEAUTY": 2,
		"TRAVEL": 3,
		"SHOPPING": 4,
		"ENTERTAINMENT": 5,
		"SPORTS": 6,
		"TRANSPORT": 7,
		"LIFE": 8,
		"HOSPITAL": 9,
		"FINANCE": 10,
		"EDUCATION": 11,
		"OTHER": 12,
		"ALL": 10000,
	},
	"SquareAttribute": {
		"NAME": 1,
		"WELCOME_MESSAGE": 2,
		"PROFILE_IMAGE": 3,
		"DESCRIPTION": 4,
		"SEARCHABLE": 6,
		"CATEGORY": 7,
		"INVITATION_URL": 8,
		"ABLE_TO_USE_INVITATION_URL": 9,
		"STATE": 10,
		"EMBLEMS": 11,
		"JOIN_METHOD": 12,
		"CHANNEL_ID": 13,
		"SVC_TAGS": 14,
		"BENEFIT_KEYWORDS": 15,
		"SNEAK_PEEK_CONTENTS": 16,
		"EXPIRE_AT": 17,
		"PROVIDER": 18,
	},
	"SquareAuthorityAttribute": {
		"UPDATE_SQUARE_PROFILE": 1,
		"INVITE_NEW_MEMBER": 2,
		"APPROVE_JOIN_REQUEST": 3,
		"CREATE_POST": 4,
		"CREATE_OPEN_SQUARE_CHAT": 5,
		"DELETE_SQUARE_CHAT_OR_POST": 6,
		"REMOVE_SQUARE_MEMBER": 7,
		"GRANT_ROLE": 8,
		"ENABLE_INVITATION_TICKET": 9,
		"CREATE_CHAT_ANNOUNCEMENT": 10,
		"UPDATE_MAX_CHAT_MEMBER_COUNT": 11,
		"USE_READONLY_DEFAULT_CHAT": 12,
		"SEND_ALL_MENTION": 13,
	},
	"SquareChatType": {
		"OPEN": 1,
		"SECRET": 2,
		"ONE_ON_ONE": 3,
		"SQUARE_DEFAULT": 4,
	},
	"SquareMemberAttribute": {
		"DISPLAY_NAME": 1,
		"PROFILE_IMAGE": 2,
		"ABLE_TO_RECEIVE_MESSAGE": 3,
		"MEMBERSHIP_STATE": 5,
		"ROLE": 6,
		"PREFERENCE": 7,
		"SELF_INTRODUCTION": 8,
		"SOCIAL_MEDIA_ACCOUNT_URLS": 9,
	},
	"SquareMembershipState": {
		"JOIN_REQUESTED": 1,
		"JOINED": 2,
		"REJECTED": 3,
		"LEFT": 4,
		"KICK_OUT": 5,
		"BANNED": 6,
		"DELETED": 7,
		"JOIN_REQUEST_WITHDREW": 8,
		"JOIN_RESERVED": 9,
		"JOIN_RESERVATION_EXPIRED": 10,
	},
	"StickerResourceType": {
		"STATIC": 1,
		"ANIMATION": 2,
		"SOUND": 3,
		"ANIMATION_SOUND": 4,
		"POPUP": 5,
		"POPUP_SOUND": 6,
		"NAME_TEXT": 7,
		"PER_STICKER_TEXT": 8,
	},
	"SyncCategory": {
		"PROFILE": 0,
		"SETTINGS": 1,
		"OPS": 2,
		"CONTACT": 3,
		"RECOMMEND": 4,
		"BLOCK": 5,
		"GROUP": 6,
		"ROOM": 7,
		"NOTIFICATION": 8,
		"ADDRESS_BOOK": 9,
		"MULTI_PROFILE": 10,
	},
	"T70_C": {
		"INITIAL_BACKUP_STATE_UNSPECIFIED": 0,
		"INITIAL_BACKUP_STATE_READY": 1,
		"INITIAL_BACKUP_STATE_MESSAGE_ONGOING": 2,
		"INITIAL_BACKUP_STATE_FINISHED": 3,
		"INITIAL_BACKUP_STATE_ABORTED": 4,
		"INITIAL_BACKUP_STATE_MEDIA_ONGOING": 5,
	},
	"T70_EnumC14390b": {
		"UNKNOWN": 0,
		"PHONE_NUMBER": 1,
		"EMAIL": 2,
	},
	"T70_EnumC14392c": {
		"UNKNOWN": 0,
		"SKIP": 1,
		"PASSWORD": 2,
		"WEB_BASED": 3,
		"EMAIL_BASED": 4,
		"NONE": 11,
	},
	"T70_EnumC14406j": {
		"INTERNAL_ERROR": 0,
		"ILLEGAL_ARGUMENT": 1,
		"VERIFICATION_FAILED": 2,
		"NOT_FOUND": 3,
		"RETRY_LATER": 4,
		"HUMAN_VERIFICATION_REQUIRED": 5,
		"INVALID_CONTEXT": 100,
		"APP_UPGRADE_REQUIRED": 101,
	},
	"T70_K": {
		"UNKNOWN": 0,
		"SMS": 1,
		"IVR": 2,
		"SMSPULL": 3,
	},
	"T70_L": {
		"PREMIUM_TYPE_UNSPECIFIED": 0,
		"PREMIUM_TYPE_LYP": 1,
		"PREMIUM_TYPE_LINE": 2,
	},
	"T70_Z0": {
		"PHONE_VERIF": 1,
		"EAP_VERIF": 2,
	},
	"T70_e1": {
		"UNKNOWN": 0,
		"SKIP": 1,
		"WEB_BASED": 2,
	},
	"T70_j1": {
		"UNKNOWN": 0,
		"FACEBOOK": 1,
		"APPLE": 2,
		"GOOGLE": 3,
	},
	"U70_c": {
		"INTERNAL_ERROR": 0,
		"FORBIDDEN": 1,
		"INVALID_CONTEXT": 100,
	},
	"Uf_EnumC14873o": {
		"ANDROID": 1,
		"IOS": 2,
	},
	"VR0_l": {
		"DEFAULT": 1,
		"UEN": 2,
	},
	"VerificationMethod": {
		"NO_AVAILABLE": 0,
		"PIN_VIA_SMS": 1,
		"CALLERID_INDIGO": 2,
		"PIN_VIA_TTS": 4,
		"SKIP": 10,
	},
	"VerificationResult": {
		"FAILED": 0,
		"OK_NOT_REGISTERED_YET": 1,
		"OK_REGISTERED_WITH_SAME_DEVICE": 2,
		"OK_REGISTERED_WITH_ANOTHER_DEVICE": 3,
	},
	"WR0_a": {
		"FREE": 1,
		"PREMIUM": 2,
	},
	"a80_EnumC16644b": {
		"UNKNOWN": 0,
		"FACEBOOK": 1,
		"APPLE": 2,
		"GOOGLE": 3,
	},
	"FetchDirection": {
		"FORWARD": 1,
		"BACKWARD": 2,
	},
	"LiveTalkEventType": {
		"NOTIFIED_UPDATE_LIVE_TALK_TITLE": 1,
		"NOTIFIED_UPDATE_LIVE_TALK_ANNOUNCEMENT": 2,
		"NOTIFIED_UPDATE_SQUARE_MEMBER_ROLE": 3,
		"NOTIFIED_UPDATE_LIVE_TALK_ALLOW_REQUEST_TO_SPEAK": 4,
		"NOTIFIED_UPDATE_SQUARE_MEMBER": 5,
	},
	"LiveTalkReportType": {
		"ADVERTISING": 1,
		"GENDER_HARASSMENT": 2,
		"HARASSMENT": 3,
		"IRRELEVANT_CONTENT": 4,
		"OTHER": 5,
		"IMPERSONATION": 6,
		"SCAM": 7,
	},
	"MessageSummaryReportType": {
		"LEGAL_VIOLATION": 1,
		"HARASSMENT": 2,
		"PERSONAL_IDENTIFIER": 3,
		"FALSE_INFORMATION": 4,
		"GENDER_HARASSMENT": 5,
		"OTHER": 6,
	},
	"NotificationPostType": {
		"POST_MENTION": 2,
		"POST_LIKE": 3,
		"POST_COMMENT": 4,
		"POST_COMMENT_MENTION": 5,
		"POST_COMMENT_LIKE": 6,
		"POST_RELAY_JOIN": 7,
	},
	"SquareEventStatus": {
		"NORMAL": 1,
		"ALERT_DISABLED": 2,
	},
	"SquareEventType": {
		"RECEIVE_MESSAGE": 0,
		"SEND_MESSAGE": 1,
		"NOTIFIED_JOIN_SQUARE_CHAT": 2,
		"NOTIFIED_INVITE_INTO_SQUARE_CHAT": 3,
		"NOTIFIED_LEAVE_SQUARE_CHAT": 4,
		"NOTIFIED_DESTROY_MESSAGE": 5,
		"NOTIFIED_MARK_AS_READ": 6,
		"NOTIFIED_UPDATE_SQUARE_MEMBER_PROFILE": 7,
		"NOTIFIED_UPDATE_SQUARE": 8,
		"NOTIFIED_UPDATE_SQUARE_STATUS": 9,
		"NOTIFIED_UPDATE_SQUARE_AUTHORITY": 10,
		"NOTIFIED_UPDATE_SQUARE_MEMBER": 11,
		"NOTIFIED_UPDATE_SQUARE_CHAT": 12,
		"NOTIFIED_UPDATE_SQUARE_CHAT_STATUS": 13,
		"NOTIFIED_UPDATE_SQUARE_CHAT_MEMBER": 14,
		"NOTIFIED_CREATE_SQUARE_MEMBER": 15,
		"NOTIFIED_CREATE_SQUARE_CHAT_MEMBER": 16,
		"NOTIFIED_UPDATE_SQUARE_MEMBER_RELATION": 17,
		"NOTIFIED_SHUTDOWN_SQUARE": 18,
		"NOTIFIED_KICKOUT_FROM_SQUARE": 19,
		"NOTIFIED_DELETE_SQUARE_CHAT": 20,
		"NOTIFICATION_JOIN_REQUEST": 21,
		"NOTIFICATION_JOINED": 22,
		"NOTIFICATION_PROMOTED_COADMIN": 23,
		"NOTIFICATION_PROMOTED_ADMIN": 24,
		"NOTIFICATION_DEMOTED_MEMBER": 25,
		"NOTIFICATION_KICKED_OUT": 26,
		"NOTIFICATION_SQUARE_DELETE": 27,
		"NOTIFICATION_SQUARE_CHAT_DELETE": 28,
		"NOTIFICATION_MESSAGE": 29,
		"NOTIFIED_UPDATE_SQUARE_CHAT_PROFILE_NAME": 30,
		"NOTIFIED_UPDATE_SQUARE_CHAT_PROFILE_IMAGE": 31,
		"NOTIFIED_UPDATE_SQUARE_FEATURE_SET": 32,
		"NOTIFIED_ADD_BOT": 33,
		"NOTIFIED_REMOVE_BOT": 34,
		"NOTIFIED_UPDATE_SQUARE_NOTE_STATUS": 36,
		"NOTIFIED_UPDATE_SQUARE_CHAT_ANNOUNCEMENT": 37,
		"NOTIFIED_UPDATE_SQUARE_CHAT_MAX_MEMBER_COUNT": 38,
		"NOTIFICATION_POST_ANNOUNCEMENT": 39,
		"NOTIFICATION_POST": 40,
		"MUTATE_MESSAGE": 41,
		"NOTIFICATION_NEW_CHAT_MEMBER": 42,
		"NOTIFIED_UPDATE_READONLY_CHAT": 43,
		"NOTIFIED_UPDATE_MESSAGE_STATUS": 46,
		"NOTIFICATION_MESSAGE_REACTION": 47,
		"NOTIFIED_CHAT_POPUP": 48,
		"NOTIFIED_SYSTEM_MESSAGE": 49,
		"NOTIFIED_UPDATE_SQUARE_CHAT_FEATURE_SET": 50,
		"NOTIFIED_UPDATE_LIVE_TALK": 51,
		"NOTIFICATION_LIVE_TALK": 52,
		"NOTIFIED_UPDATE_LIVE_TALK_INFO": 53,
		"NOTIFICATION_THREAD_MESSAGE": 54,
		"NOTIFICATION_THREAD_MESSAGE_REACTION": 55,
		"NOTIFIED_UPDATE_THREAD": 56,
		"NOTIFIED_UPDATE_THREAD_STATUS": 57,
		"NOTIFIED_UPDATE_THREAD_MEMBER": 58,
		"NOTIFIED_UPDATE_THREAD_ROOT_MESSAGE": 59,
		"NOTIFIED_UPDATE_THREAD_ROOT_MESSAGE_STATUS": 60,
		"NOTIFIED_CREATE_SQUARE_SUBSCRIPTION": 61,
		"NOTIFIED_UPDATE_SQUARE_SUBSCRIPTION": 62,
	},
	"AdScreen": {
		"CHATROOM": 1,
		"THREAD_SPACE": 2,
		"YOUR_THREADS": 3,
		"NOTE_LIST": 4,
		"NOTE_END": 5,
		"WEB_MAIN": 6,
		"WEB_SEARCH_RESULT": 7,
	},
	"BooleanState": {
		"NONE": 0,
		"OFF": 1,
		"ON": 2,
	},
	"ChatroomPopupType": {
		"IMG_TEXT": 1,
		"TEXT_ONLY": 2,
		"IMG_ONLY": 3,
	},
	"ContentsAttribute": {
		"NONE": 1,
		"CONTENTS_HIDDEN": 2,
	},
	"FetchType": {
		"DEFAULT": 1,
		"PREFETCH_BY_SERVER": 2,
		"PREFETCH_BY_CLIENT": 3,
	},
	"LiveTalkAttribute": {
		"TITLE": 1,
		"ALLOW_REQUEST_TO_SPEAK": 2,
	},
	"LiveTalkRole": {
		"HOST": 1,
		"CO_HOST": 2,
		"GUEST": 3,
	},
	"LiveTalkSpeakerSetting": {
		"APPROVAL": 1,
		"ALL": 2,
	},
	"LiveTalkType": {
		"PUBLIC": 1,
		"PRIVATE": 2,
	},
	"MessageReactionType": {
		"ALL": 0,
		"UNDO": 1,
		"NICE": 2,
		"LOVE": 3,
		"FUN": 4,
		"AMAZING": 5,
		"SAD": 6,
		"OMG": 7,
	},
	"NotifiedMessageType": {
		"MENTION": 1,
		"REPLY": 2,
	},
	"PopupAttribute": {
		"NAME": 1,
		"ACTIVATED": 2,
		"STARTS_AT": 3,
		"ENDS_AT": 4,
		"CONTENT": 5,
	},
	"PopupType": {
		"MAIN": 1,
		"CHATROOM": 2,
	},
	"SquareChatAttribute": {
		"NAME": 2,
		"SQUARE_CHAT_IMAGE": 3,
		"STATE": 4,
		"TYPE": 5,
		"MAX_MEMBER_COUNT": 6,
		"MESSAGE_VISIBILITY": 7,
		"ABLE_TO_SEARCH_MESSAGE": 8,
	},
	"SquareChatFeatureControlState": {
		"DISABLED": 1,
		"ENABLED": 2,
	},
	"SquareChatMemberAttribute": {
		"MEMBERSHIP_STATE": 4,
		"NOTIFICATION_MESSAGE": 6,
		"NOTIFICATION_NEW_MEMBER": 7,
		"LEFT_BY_KICK_MESSAGE_LOCAL_ID": 8,
		"MESSAGE_LOCAL_ID_WHEN_BLOCK": 9,
	},
	"SquareChatMembershipState": {
		"JOINED": 1,
		"LEFT": 2,
		"JOIN_RESERVED": 3,
		"JOIN_RESERVATION_EXPIRED": 4,
	},
	"SquareChatState": {
		"ALIVE": 0,
		"DELETED": 1,
		"SUSPENDED": 2,
	},
	"SquareEmblem": {
		"SUPER": 1,
		"OFFICIAL": 2,
	},
	"SquareErrorCode": {
		"UNKNOWN": 0,
		"ILLEGAL_ARGUMENT": 400,
		"AUTHENTICATION_FAILURE": 401,
		"FORBIDDEN": 403,
		"NOT_FOUND": 404,
		"REVISION_MISMATCH": 409,
		"PRECONDITION_FAILED": 410,
		"INTERNAL_ERROR": 500,
		"NOT_IMPLEMENTED": 501,
		"TRY_AGAIN_LATER": 503,
		"MAINTENANCE": 505,
		"NO_PRESENCE_EXISTS": 506,
	},
	"SquareFeatureControlState": {
		"DISABLED": 1,
		"ENABLED": 2,
	},
	"SquareFeatureSetAttribute": {
		"CREATING_SECRET_SQUARE_CHAT": 1,
		"INVITING_INTO_OPEN_SQUARE_CHAT": 2,
		"CREATING_SQUARE_CHAT": 3,
		"READONLY_DEFAULT_CHAT": 4,
		"SHOWING_ADVERTISEMENT": 5,
		"DELEGATE_JOIN_TO_PLUG": 6,
		"DELEGATE_KICK_OUT_TO_PLUG": 7,
		"DISABLE_UPDATE_JOIN_METHOD": 8,
		"DISABLE_TRANSFER_ADMIN": 9,
		"CREATING_LIVE_TALK": 10,
		"DISABLE_UPDATE_SEARCHABLE": 11,
		"SUMMARIZING_MESSAGES": 12,
		"CREATING_SQUARE_THREAD": 13,
		"ENABLE_SQUARE_THREAD": 14,
		"DISABLE_CHANGE_ROLE_CO_ADMIN": 15,
	},
	"SquareJoinMethodType": {
		"NONE": 0,
		"APPROVAL": 1,
		"CODE": 2,
	},
	"SquareMemberRelationState": {
		"NONE": 1,
		"BLOCKED": 2,
	},
	"SquareMemberRole": {
		"ADMIN": 1,
		"CO_ADMIN": 2,
		"MEMBER": 10,
	},
	"SquareMessageState": {
		"SENT": 1,
		"DELETED": 2,
		"FORBIDDEN": 3,
		"UNSENT": 4,
	},
	"SquareMetadataAttribute": {
		"EXCLUDED": 1,
		"NO_AD": 2,
	},
	"SquarePreferenceAttribute": {
		"FAVORITE": 1,
		"NOTI_FOR_NEW_JOIN_REQUEST": 2,
	},
	"SquareProviderType": {
		"NONE": 0,
		"UNKNOWN": 1,
		"YOUTUBE": 2,
		"OA_FANSPACE": 3,
		"OA_SHOP": 4,
	},
	"SquareState": {
		"ALIVE": 0,
		"DELETED": 1,
		"SUSPENDED": 2,
	},
	"SquareThreadAttribute": {
		"STATE": 1,
		"EXPIRES_AT": 2,
		"READ_ONLY_AT": 3,
	},
	"SquareThreadMembershipState": {
		"JOINED": 1,
		"LEFT": 2,
	},
	"SquareThreadState": {
		"ALIVE": 1,
		"DELETED": 2,
	},
	"SquareType": {
		"CLOSED": 0,
		"OPEN": 1,
	},
	"TargetChatType": {
		"ALL": 0,
		"MIDS": 1,
		"CATEGORIES": 2,
		"CHANNEL_ID": 3,
	},
	"TargetUserType": {
		"ALL": 0,
		"MIDS": 1,
	},
	"do0_EnumC23139B": {
		"CLOUD": 1,
		"BLE": 2,
		"BEACON": 3,
	},
	"do0_EnumC23147e": {
		"SUCCESS": 0,
		"UNKNOWN_ERROR": 1,
		"BLUETOOTH_NOT_AVAILABLE": 2,
		"CONNECTION_TIMEOUT": 3,
		"CONNECTION_ERROR": 4,
		"CONNECTION_IN_PROGRESS": 5,
	},
	"do0_EnumC23148f": {
		"ONETIME": 0,
		"AUTOMATIC": 1,
		"BEACON": 2,
	},
	"do0_G": {
		"SUCCESS": 0,
		"UNKNOWN_ERROR": 1,
		"GATT_ERROR": 2,
		"GATT_OPERATION_NOT_SUPPORTED": 3,
		"GATT_SERVICE_NOT_FOUND": 4,
		"GATT_CHARACTERISTIC_NOT_FOUND": 5,
		"GATT_CONNECTION_CLOSED": 6,
		"CONNECTION_INVALID": 7,
	},
	"do0_M": {
		"INTERNAL_SERVER_ERROR": 0,
		"UNAUTHORIZED": 1,
		"INVALID_REQUEST": 2,
		"INVALID_STATE": 3,
		"DEVICE_LIMIT_EXCEEDED": 4096,
		"UNSUPPORTED_REGION": 4097,
	},
	"fN0_EnumC24466B": {
		"LINE_PREMIUM": 0,
		"LYP_PREMIUM": 1,
	},
	"fN0_EnumC24467C": {
		"LINE": 1,
		"YAHOO_JAPAN": 2,
	},
	"fN0_EnumC24469a": {
		"OK": 1,
		"NOT_SUPPORTED": 2,
		"UNDEFINED": 3,
		"NOT_ENOUGH_TICKETS": 4,
		"NOT_FRIENDS": 5,
		"NO_AGREEMENT": 6,
	},
	"fN0_F": {
		"OK": 1,
		"NOT_SUPPORTED": 2,
		"UNDEFINED": 3,
		"CONFLICT": 4,
		"NOT_AVAILABLE": 5,
		"INVALID_INVITATION": 6,
		"IN_PAYMENT_FAILURE_STATE": 7,
	},
	"fN0_G": {
		"APPLE": 1,
		"GOOGLE": 2,
	},
	"fN0_H": {
		"INACTIVE": 1,
		"ACTIVE_FINITE": 2,
		"ACTIVE_INFINITE": 3,
	},
	"fN0_o": {
		"AVAILABLE": 1,
		"ALREADY_SUBSCRIBED": 2,
	},
	"fN0_p": {
		"UNKNOWN": 0,
		"SOFTBANK_BUNDLE": 1,
		"YBB_BUNDLE": 2,
		"YAHOO_MOBILE_BUNDLE": 3,
		"PPCG_BUNDLE": 4,
		"ENJOY_BUNDLE": 5,
		"YAHOO_TRIAL_BUNDLE": 6,
		"YAHOO_APPLE": 7,
		"YAHOO_GOOGLE": 8,
		"LINE_APPLE": 9,
		"LINE_GOOGLE": 10,
		"YAHOO_WALLET": 11,
	},
	"fN0_q": {
		"UNKNOWN": 0,
		"NONE": 1,
		"ILLEGAL_ARGUMENT": 16641,
		"NOT_FOUND": 16642,
		"NOT_AVAILABLE": 16643,
		"INTERNAL_SERVER_ERROR": 16644,
		"AUTHENTICATION_FAILED": 16645,
	},
	"g80_EnumC24993a": {
		"INTERNAL_ERROR": 0,
		"ILLEGAL_ARGUMENT": 1,
		"INVALID_CONTEXT": 2,
		"TOO_MANY_REQUESTS": 3,
	},
	"h80_EnumC25645e": {
		"INTERNAL_ERROR": 0,
		"ILLEGAL_ARGUMENT": 1,
		"NOT_FOUND": 2,
		"RETRY_LATER": 3,
		"INVALID_CONTEXT": 100,
		"NOT_SUPPORTED": 101,
	},
	"I80_EnumC26392b": {
		"UNKNOWN": 0,
		"SKIP": 1,
		"PASSWORD": 2,
		"EMAIL_BASED": 4,
		"NONE": 11,
	},
	"I80_EnumC26394c": {
		"PHONE_NUMBER": 0,
		"APPLE": 1,
		"GOOGLE": 2,
	},
	"I80_EnumC26408j": {
		"INTERNAL_ERROR": 0,
		"ILLEGAL_ARGUMENT": 1,
		"VERIFICATION_FAILED": 2,
		"NOT_FOUND": 3,
		"RETRY_LATER": 4,
		"HUMAN_VERIFICATION_REQUIRED": 5,
		"INVALID_CONTEXT": 100,
		"APP_UPGRADE_REQUIRED": 101,
	},
	"I80_EnumC26425y": {
		"UNKNOWN": 0,
		"SMS": 1,
		"IVR": 2,
	},
	"j80_EnumC27228a": {
		"AUTHENTICATION_FAILED": 1,
		"INVALID_STATE": 2,
		"NOT_AUTHORIZED_DEVICE": 3,
		"MUST_REFRESH_V3_TOKEN": 4,
	},
	"jO0_EnumC27533B": {
		"PAYMENT_APPLE": 1,
		"PAYMENT_GOOGLE": 2,
	},
	"jO0_EnumC27535b": {
		"ILLEGAL_ARGUMENT": 0,
		"AUTHENTICATION_FAILED": 1,
		"INTERNAL_ERROR": 20,
		"MESSAGE_DEFINED_ERROR": 29,
		"MAINTENANCE_ERROR": 33,
	},
	"jO0_EnumC27559z": {
		"PAYMENT_PG_NONE": 0,
		"PAYMENT_PG_AU": 1,
		"PAYMENT_PG_AL": 2,
	},
	"jf_EnumC27712a": {
		"NONE": 1,
		"DOES_NOT_RESPOND": 2,
		"RESPOND_MANUALLY": 3,
		"RESPOND_AUTOMATICALLY": 4,
	},
	"jf_EnumC27717f": {
		"UNKNOWN": 0,
		"BAD_REQUEST": 1,
		"NOT_FOUND": 2,
		"FORBIDDEN": 3,
		"INTERNAL_SERVER_ERROR": 4,
	},
	"kf_EnumC28766a": {
		"ILLEGAL_ARGUMENT": 0,
		"INTERNAL_ERROR": 1,
		"UNAUTHORIZED": 2,
	},
	"kf_o": {
		"ANDROID": 0,
		"IOS": 1,
	},
	"kf_p": {
		"RICHMENU": 0,
		"TALK_ROOM": 1,
	},
	"kf_r": {
		"WEB": 0,
		"POSTBACK": 1,
		"SEND_MESSAGE": 2,
	},
	"kf_u": {
		"CLICK": 0,
		"IMPRESSION": 1,
	},
	"kf_x": {
		"UNKNOWN": 0,
		"PROFILE": 1,
		"TALK_LIST": 2,
		"OA_CALL": 3,
	},
	"n80_o": {
		"INTERNAL_ERROR": 0,
		"INVALID_CONTEXT": 100,
		"FIDO_UNKNOWN_CREDENTIAL_ID": 200,
		"FIDO_RETRY_WITH_ANOTHER_AUTHENTICATOR": 201,
		"FIDO_UNACCEPTABLE_CONTENT": 202,
		"FIDO_INVALID_REQUEST": 203,
	},
	"o80_e": {
		"INTERNAL_ERROR": 0,
		"VERIFICATION_FAILED": 1,
		"LOGIN_NOT_ALLOWED": 2,
		"EXTERNAL_SERVICE_UNAVAILABLE": 3,
		"RETRY_LATER": 4,
		"NOT_SUPPORTED": 100,
		"ILLEGAL_ARGUMENT": 101,
		"INVALID_CONTEXT": 102,
		"FORBIDDEN": 103,
		"FIDO_UNKNOWN_CREDENTIAL_ID": 200,
		"FIDO_RETRY_WITH_ANOTHER_AUTHENTICATOR": 201,
		"FIDO_UNACCEPTABLE_CONTENT": 202,
		"FIDO_INVALID_REQUEST": 203,
	},
	"og_E": {
		"RUNNING": 1,
		"CLOSING": 2,
		"CLOSED": 3,
		"SUSPEND": 4,
	},
	"og_EnumC32661b": {
		"INACTIVE": 0,
		"ACTIVE": 1,
	},
	"og_EnumC32663d": {
		"PREMIUM": 0,
		"VERIFIED": 1,
		"UNVERIFIED": 2,
	},
	"og_EnumC32671l": {
		"ILLEGAL_ARGUMENT": 0,
		"AUTHENTICATION_FAILED": 1,
		"INVALID_STATE": 3,
		"NOT_FOUND": 5,
		"INTERNAL_ERROR": 20,
		"MAINTENANCE_ERROR": 33,
	},
	"og_G": {
		"FREE": 0,
		"MONTHLY": 1,
		"PER_PAYMENT": 2,
	},
	"og_I": {
		"OK": 0,
		"REACHED_TIER_LIMIT": 1,
		"REACHED_MEMBER_LIMIT": 2,
		"ALREADY_JOINED": 3,
		"NOT_SUPPORTED_LINE_VERSION": 4,
		"BOT_USER_REGION_IS_NOT_MATCH": 5,
	},
	"q80_EnumC33651c": {
		"INTERNAL_ERROR": 0,
		"ILLEGAL_ARGUMENT": 1,
		"VERIFICATION_FAILED": 2,
		"NOT_ALLOWED_QR_CODE_LOGIN": 3,
		"VERIFICATION_NOTICE_FAILED": 4,
		"RETRY_LATER": 5,
		"INVALID_CONTEXT": 100,
		"APP_UPGRADE_REQUIRED": 101,
	},
	"qm_EnumC34112e": {
		"BUTTON": 1,
		"ENTRY_SELECTED": 2,
		"BROADCAST_ENTER": 3,
		"BROADCAST_LEAVE": 4,
		"BROADCAST_STAY": 5,
	},
	"qm_s": {
		"ILLEGAL_ARGUMENT": 0,
		"NOT_FOUND": 5,
		"INTERNAL_ERROR": 20,
	},
	"r80_EnumC34361a": {
		"PERSONAL_ACCOUNT": 1,
		"CURRENT_ACCOUNT": 2,
	},
	"r80_EnumC34362b": {
		"BANK_ALL": 1,
		"BANK_DEPOSIT": 2,
		"BANK_WITHDRAWAL": 3,
	},
	"r80_EnumC34365e": {
		"BANK": 1,
		"ATM": 2,
		"CONVENIENCE_STORE": 3,
		"DEBIT_CARD": 4,
		"E_CHANNEL": 5,
		"VIRTUAL_BANK_ACCOUNT": 6,
		"AUTO": 7,
		"CVS_LAWSON": 8,
		"SEVEN_BANK_DEPOSIT": 9,
		"CODE_DEPOSIT": 10,
	},
	"r80_EnumC34367g": {
		"AVAILABLE": 0,
		"DIFFERENT_REGION": 1,
		"UNSUPPORTED_DEVICE": 2,
		"PHONE_NUMBER_UNREGISTERED": 3,
		"UNAVAILABLE_FROM_LINE_PAY": 4,
		"INVALID_USER": 5,
	},
	"r80_EnumC34368h": {
		"CHARGE": 1,
		"WITHDRAW": 2,
	},
	"r80_EnumC34370j": {
		"UNKNOWN": 0,
		"VISA": 1,
		"MASTER": 2,
		"AMEX": 3,
		"DINERS": 4,
		"JCB": 5,
	},
	"r80_EnumC34371k": {
		"NULL": 0,
		"ATM": 1,
		"CONVENIENCE_STORE": 2,
	},
	"r80_EnumC34372l": {
		"SCALE2": 1,
		"SCALE3": 2,
		"HDPI": 3,
		"XHDPI": 4,
	},
	"r80_EnumC34374n": {
		"SUCCESS": 0,
		"GENERAL_USER_ERROR": 1000,
		"ACCOUNT_NOT_EXISTS": 1101,
		"ACCOUNT_INVALID_STATUS": 1102,
		"ACCOUNT_ALREADY_EXISTS": 1103,
		"MERCHANT_NOT_EXISTS": 1104,
		"MERCHANT_INVALID_STATUS": 1105,
		"AGREEMENT_REQUIRED": 1107,
		"BLACKLISTED": 1108,
		"WRONG_PASSWORD": 1109,
		"INVALID_CREDIT_CARD": 1110,
		"LIMIT_EXCEEDED": 1111,
		"CANNOT_PROCEED": 1115,
		"TOO_WEAK_PASSWORD": 1120,
		"CANNOT_CREATE_ACCOUNT": 1125,
		"TEMPORARY_PASSWORD_ERROR": 1130,
		"MISSING_PARAMETERS": 1140,
		"NO_VALID_MYCODE_ACCOUNT": 1141,
		"INSUFFICIENT_BALANCE": 1142,
		"TRANSACTION_NOT_FOUND": 1150,
		"TRANSACTION_FINISHED": 1152,
		"PAYMENT_AMOUNT_WRONG": 1153,
		"BALANCE_ACCOUNT_NOT_EXISTS": 1157,
		"DUPLICATED_CITIZEN_ID": 1158,
		"PAYMENT_REQUEST_NOT_FOUND": 1159,
		"AUTH_FAILED": 1169,
		"PASSWORD_SETTING_REQUIRED": 1171,
		"TRANSACTION_ALREADY_PROCESSED": 1172,
		"CURRENCY_NOT_SUPPORTED": 1178,
		"PAYMENT_NOT_AVAILABLE": 1180,
		"TRANSFER_REQUEST_NOT_FOUND": 1181,
		"INVALID_PAYMENT_AMOUNT": 1183,
		"INSUFFICIENT_PAYMENT_AMOUNT": 1184,
		"EXTERNAL_SYSTEM_MAINTENANCE": 1185,
		"EXTERNAL_SYSTEM_INOPERATIONAL": 1186,
		"SESSION_EXPIRED": 1192,
		"UPGRADE_REQUIRED": 1195,
		"REQUEST_TOKEN_EXPIRED": 1196,
		"OPERATION_FINISHED": 1198,
		"EXTERNAL_SYSTEM_ERROR": 1199,
		"PARTIAL_AMOUNT_APPROVED": 1299,
		"PINCODE_AUTH_REQUIRED": 1600,
		"ADDITIONAL_AUTH_REQUIRED": 1601,
		"NOT_BOUND": 1603,
		"OTP_USER_REGISTRATION_ERROR": 1610,
		"OTP_CARD_REGISTRATION_ERROR": 1611,
		"NO_AUTH_METHOD": 1612,
		"GENERAL_USER_ERROR_RESTART": 1696,
		"GENERAL_USER_ERROR_REFRESH": 1697,
		"GENERAL_USER_ERROR_CLOSE": 1698,
		"INTERNAL_SERVER_ERROR": 9000,
		"INTERNAL_SYSTEM_MAINTENANCE": 9999,
		"UNKNOWN_ERROR": 10000,
	},
	"r80_EnumC34376p": {
		"TRANSFER": 1,
		"TRANSFER_REQUEST": 2,
		"DUTCH": 3,
		"INVITATION": 4,
	},
	"r80_EnumC34377q": {
		"NULL": 0,
		"UNIDEN": 1,
		"WAIT": 2,
		"IDENTIFIED": 3,
		"CHECKING": 4,
	},
	"r80_EnumC34378s": {
		"UNKNOWN": 0,
		"MORE_TAB": 1,
		"CHAT_ROOM_PLUS_MENU": 2,
		"TRANSFER": 3,
		"PAYMENT": 4,
		"LINECARD": 5,
		"INVITATION": 6,
	},
	"r80_e0": {
		"NONE": 0,
		"ONE_TIME_PAYMENT_AGREEMENT": 1,
		"SIMPLE_JOINING_AGREEMENT": 2,
		"LINE_CARD_CASH_AGREEMENT": 3,
		"LINE_CARD_MONEY_AGREEMENT": 4,
		"JOINING_WITH_LINE_CARD_AGREEMENT": 5,
		"LINE_CARD_AGREEMENT": 6,
	},
	"r80_g0": {
		"NULL": 0,
		"ATM": 1,
		"CONVENIENCE_STORE": 2,
		"ALL": 3,
	},
	"r80_h0": {
		"READY": 1,
		"COMPLETE": 2,
		"WAIT": 3,
		"CANCEL": 4,
		"FAIL": 5,
		"EXPIRE": 6,
		"ALL": 7,
	},
	"r80_i0": {
		"TRANSFER_ACCEPTABLE": 1,
		"REMOVE_INVOICE": 2,
		"INVOICE_CODE": 3,
		"SHOW_ALWAYS_INVOICE": 4,
	},
	"r80_m0": {
		"OK": 1,
		"NOT_ALIVE_USER": 2,
		"NEED_BALANCE_DISCLAIMER": 3,
		"ECONTEXT_CHARGING_IN_PROGRESS": 4,
		"TRANSFER_IN_PROGRESS": 6,
		"OK_REMAINING_BALANCE": 7,
		"ADVERSE_BALANCE": 8,
		"CONFIRM_REQUIRED": 9,
	},
	"r80_n0": {
		"LINE": 1,
		"LINEPAY": 2,
	},
	"r80_r": {
		"CITIZEN_ID": 1,
		"PASSPORT": 2,
		"WORK_PERMIT": 3,
		"ALIEN_CARD": 4,
	},
	"t80_h": {
		"CLIENT": 1,
		"SERVER": 2,
	},
	"t80_i": {
		"APP_INSTANCE_LOCAL": 1,
		"APP_TYPE_LOCAL": 2,
		"GLOBAL": 3,
	},
	"t80_n": {
		"UNKNOWN": 0,
		"NONE": 1,
		"ILLEGAL_ARGUMENT": 16641,
		"NOT_FOUND": 16642,
		"NOT_AVAILABLE": 16643,
		"TOO_LARGE_VALUE": 16644,
		"CLOCK_DRIFT_DETECTED": 16645,
		"UNSUPPORTED_APPLICATION_TYPE": 16646,
		"DUPLICATED_ENTRY": 16647,
		"AUTHENTICATION_FAILED": 16897,
		"INTERNAL_SERVER_ERROR": 20737,
		"SERVICE_IN_MAINTENANCE_MODE": 20738,
		"SERVICE_UNAVAILABLE": 20739,
	},
	"t80_r": {
		"USER_ACTION": 1,
		"DATA_OUTDATED": 2,
		"APP_MIGRATION": 3,
		"OTHER": 100,
	},
	"vh_EnumC37632c": {
		"ACTIVE": 1,
		"INACTIVE": 2,
	},
	"vh_m": {
		"SAFE": 1,
		"NOT_SAFE": 2,
	},
	"wm_EnumC38497a": {
		"UNKNOWN": 0,
		"BOT_NOT_FOUND": 1,
		"BOT_NOT_AVAILABLE": 2,
		"NOT_A_MEMBER": 3,
		"SQUARECHAT_NOT_FOUND": 4,
		"FORBIDDEN": 5,
		"ILLEGAL_ARGUMENT": 400,
		"AUTHENTICATION_FAILED": 401,
		"INTERNAL_ERROR": 500,
	},
	"zR0_EnumC40578c": {
		"FOREGROUND": 0,
		"BACKGROUND": 1,
	},
	"zR0_EnumC40579d": {
		"STICKER": 1,
		"THEME": 2,
		"STICON": 3,
	},
	"zR0_h": {
		"NORMAL": 0,
		"BIG": 1,
	},
	"zR0_j": {
		"UNKNOWN": 0,
		"NONE": 1,
		"ILLEGAL_ARGUMENT": 16641,
		"NOT_FOUND": 16642,
		"NOT_AVAILABLE": 16643,
		"AUTHENTICATION_FAILED": 16897,
		"INTERNAL_SERVER_ERROR": 20737,
		"SERVICE_UNAVAILABLE": 20739,
	},
	"zf_EnumC40713a": {
		"PERSONAL": 1,
		"ROOM": 2,
		"GROUP": 3,
		"SQUARE_CHAT": 4,
	},
	"zf_EnumC40715c": {
		"REGULAR": 1,
		"PRIORITY": 2,
		"MORE": 3,
	},
	"zf_EnumC40716d": {
		"INVALID_REQUEST": 1,
		"UNAUTHORIZED": 2,
		"SERVER_ERROR": 100,
	},
	"LoginResultType": {
		"SUCCESS": 1,
		"REQUIRE_QRCODE": 2,
		"REQUIRE_DEVICE_CONFIRM": 3,
		"REQUIRE_SMS_CONFIRM": 4,
	},
	"F61_EnumC10204a0": {
		"ALL": 0,
		"BLOCK": 1,
		"NOT_BLOCK": 2,
	},
	"ForbiddenWordsGroup": {
		"SQUARE_NAME": 1,
		"SQUARE_DESCRIPTION": 2,
		"MEMBER_NAME": 3,
	},
	"LMPCode": {
		"PR01": 1,
		"PR02": 2,
		"PR03": 3,
		"PR04": 4,
		"PR05": 5,
		"PR06": 6,
		"PR07": 7,
		"PR08": 8,
		"PR12": 12,
		"PR13": 13,
		"PR14": 14,
		"PR15": 15,
		"PR16": 16,
		"PR17": 17,
		"PR18": 18,
		"PR60": 60,
		"PR61": 61,
		"PR88": 88,
		"PR99": 99,
		"PRAUTO00": 100,
		"PRAUTO01": 101,
		"PRAUTO99": 199,
		"NOT_PENALIZED": 500,
	},
	"PaidSquareFormState": {
		"UNDER_REVIEW": 1,
		"APPROVED": 2,
		"REJECTED": 3,
		"REGISTRATION_COMPLETE": 4,
		"REGISTRATION_FAILED": 5,
	},
	"SquareSubscriptionProductRegistrationStatus": {
		"IN_REVIEW": 1,
		"APPROVED": 2,
		"REJECTED": 3,
		"PENDING": 4,
	},
	"SquareSubscriptionStatus": {
		"ACTIVE": 1,
		"CANCELLED": 2,
		"ON_HOLD": 3,
		"EXPIRED": 4,
		"REVOKED": 5,
	},
	"TermsType": {
		"AI_QNA_BOT": 1,
		"PAID_SQUARE_SUBSCRIPTION": 2,
		"PAID_SQUARE_CREATION": 3,
	},
};
/** LINE Thrift enum AR0_g; values are protocol-level identifiers. */
export type AR0_g =
	| 16641
	| "ILLEGAL_ARGUMENT"
	| 16642
	| "MAJOR_VERSION_NOT_SUPPORTED"
	| 16897
	| "AUTHENTICATION_FAILED"
	| 20737
	| "INTERNAL_SERVER_ERROR"
	| 20739
	| "SERVICE_UNAVAILABLE";

/** LINE Thrift enum AR0_q; values are protocol-level identifiers. */
export type AR0_q = 0 | "NOT_PURCHASED" | 1 | "SUBSCRIPTION";

/** LINE Thrift enum AccountMigrationPincodeType; values are protocol-level identifiers. */
export type AccountMigrationPincodeType =
	| 0
	| "NOT_APPLICABLE"
	| 1
	| "NOT_SET"
	| 2
	| "SET"
	| 3
	| "NEED_ENFORCED_INPUT";

/** LINE Thrift enum ApplicationType; values are protocol-level identifiers. */
export type ApplicationType =
	| 16
	| "IOS"
	| 17
	| "IOS_RC"
	| 18
	| "IOS_BETA"
	| 19
	| "IOS_ALPHA"
	| 32
	| "ANDROID"
	| 33
	| "ANDROID_RC"
	| 34
	| "ANDROID_BETA"
	| 35
	| "ANDROID_ALPHA"
	| 48
	| "WAP"
	| 49
	| "WAP_RC"
	| 50
	| "WAP_BETA"
	| 51
	| "WAP_ALPHA"
	| 64
	| "BOT"
	| 65
	| "BOT_RC"
	| 66
	| "BOT_BETA"
	| 67
	| "BOT_ALPHA"
	| 80
	| "WEB"
	| 81
	| "WEB_RC"
	| 82
	| "WEB_BETA"
	| 83
	| "WEB_ALPHA"
	| 96
	| "DESKTOPWIN"
	| 97
	| "DESKTOPWIN_RC"
	| 98
	| "DESKTOPWIN_BETA"
	| 99
	| "DESKTOPWIN_ALPHA"
	| 112
	| "DESKTOPMAC"
	| 113
	| "DESKTOPMAC_RC"
	| 114
	| "DESKTOPMAC_BETA"
	| 115
	| "DESKTOPMAC_ALPHA"
	| 128
	| "CHANNELGW"
	| 129
	| "CHANNELGW_RC"
	| 130
	| "CHANNELGW_BETA"
	| 131
	| "CHANNELGW_ALPHA"
	| 144
	| "CHANNELCP"
	| 145
	| "CHANNELCP_RC"
	| 146
	| "CHANNELCP_BETA"
	| 147
	| "CHANNELCP_ALPHA"
	| 160
	| "WINPHONE"
	| 161
	| "WINPHONE_RC"
	| 162
	| "WINPHONE_BETA"
	| 163
	| "WINPHONE_ALPHA"
	| 176
	| "BLACKBERRY"
	| 177
	| "BLACKBERRY_RC"
	| 178
	| "BLACKBERRY_BETA"
	| 179
	| "BLACKBERRY_ALPHA"
	| 192
	| "WINMETRO"
	| 193
	| "WINMETRO_RC"
	| 194
	| "WINMETRO_BETA"
	| 195
	| "WINMETRO_ALPHA"
	| 200
	| "S40"
	| 209
	| "S40_RC"
	| 210
	| "S40_BETA"
	| 211
	| "S40_ALPHA"
	| 224
	| "CHRONO"
	| 225
	| "CHRONO_RC"
	| 226
	| "CHRONO_BETA"
	| 227
	| "CHRONO_ALPHA"
	| 256
	| "TIZEN"
	| 257
	| "TIZEN_RC"
	| 258
	| "TIZEN_BETA"
	| 259
	| "TIZEN_ALPHA"
	| 272
	| "VIRTUAL"
	| 288
	| "FIREFOXOS"
	| 289
	| "FIREFOXOS_RC"
	| 290
	| "FIREFOXOS_BETA"
	| 291
	| "FIREFOXOS_ALPHA"
	| 304
	| "IOSIPAD"
	| 305
	| "IOSIPAD_RC"
	| 306
	| "IOSIPAD_BETA"
	| 307
	| "IOSIPAD_ALPHA"
	| 320
	| "BIZIOS"
	| 321
	| "BIZIOS_RC"
	| 322
	| "BIZIOS_BETA"
	| 323
	| "BIZIOS_ALPHA"
	| 336
	| "BIZANDROID"
	| 337
	| "BIZANDROID_RC"
	| 338
	| "BIZANDROID_BETA"
	| 339
	| "BIZANDROID_ALPHA"
	| 352
	| "BIZBOT"
	| 353
	| "BIZBOT_RC"
	| 354
	| "BIZBOT_BETA"
	| 355
	| "BIZBOT_ALPHA"
	| 368
	| "CHROMEOS"
	| 369
	| "CHROMEOS_RC"
	| 370
	| "CHROMEOS_BETA"
	| 371
	| "CHROMEOS_ALPHA"
	| 384
	| "ANDROIDLITE"
	| 385
	| "ANDROIDLITE_RC"
	| 386
	| "ANDROIDLITE_BETA"
	| 387
	| "ANDROIDLITE_ALPHA"
	| 400
	| "WIN10"
	| 401
	| "WIN10_RC"
	| 402
	| "WIN10_BETA"
	| 403
	| "WIN10_ALPHA"
	| 416
	| "BIZWEB"
	| 417
	| "BIZWEB_RC"
	| 418
	| "BIZWEB_BETA"
	| 419
	| "BIZWEB_ALPHA"
	| 432
	| "DUMMYPRIMARY"
	| 433
	| "DUMMYPRIMARY_RC"
	| 434
	| "DUMMYPRIMARY_BETA"
	| 435
	| "DUMMYPRIMARY_ALPHA"
	| 448
	| "SQUARE"
	| 449
	| "SQUARE_RC"
	| 450
	| "SQUARE_BETA"
	| 451
	| "SQUARE_ALPHA"
	| 464
	| "INTERNAL"
	| 465
	| "INTERNAL_RC"
	| 466
	| "INTERNAL_BETA"
	| 467
	| "INTERNAL_ALPHA"
	| 480
	| "CLOVAFRIENDS"
	| 481
	| "CLOVAFRIENDS_RC"
	| 482
	| "CLOVAFRIENDS_BETA"
	| 483
	| "CLOVAFRIENDS_ALPHA"
	| 496
	| "WATCHOS"
	| 497
	| "WATCHOS_RC"
	| 498
	| "WATCHOS_BETA"
	| 499
	| "WATCHOS_ALPHA"
	| 512
	| "OPENCHAT_PLUG"
	| 513
	| "OPENCHAT_PLUG_RC"
	| 514
	| "OPENCHAT_PLUG_BETA"
	| 515
	| "OPENCHAT_PLUG_ALPHA"
	| 528
	| "ANDROIDSECONDARY"
	| 529
	| "ANDROIDSECONDARY_RC"
	| 530
	| "ANDROIDSECONDARY_BETA"
	| 531
	| "ANDROIDSECONDARY_ALPHA"
	| 544
	| "WEAROS"
	| 545
	| "WEAROS_RC"
	| 546
	| "WEAROS_BETA"
	| 547
	| "WEAROS_ALPHA";

/** LINE Thrift enum BotType; values are protocol-level identifiers. */
export type BotType =
	| 0
	| "RESERVED"
	| 1
	| "OFFICIAL"
	| 2
	| "LINE_AT_0"
	| 3
	| "LINE_AT";

/** LINE Thrift enum CarrierCode; values are protocol-level identifiers. */
export type CarrierCode =
	| 0
	| "NOT_SPECIFIED"
	| 1
	| "JP_DOCOMO"
	| 2
	| "JP_AU"
	| 3
	| "JP_SOFTBANK"
	| 4
	| "JP_DOCOMO_LINE"
	| 5
	| "JP_SOFTBANK_LINE"
	| 6
	| "JP_AU_LINE"
	| 7
	| "JP_RAKUTEN"
	| 8
	| "JP_MVNO"
	| 9
	| "JP_USER_SELECTED_LINE"
	| 17
	| "KR_SKT"
	| 18
	| "KR_KT"
	| 19
	| "KR_LGT";

/** LINE Thrift enum ChannelErrorCode; values are protocol-level identifiers. */
export type ChannelErrorCode =
	| 0
	| "ILLEGAL_ARGUMENT"
	| 1
	| "INTERNAL_ERROR"
	| 2
	| "CONNECTION_ERROR"
	| 3
	| "AUTHENTICATIONI_FAILED"
	| 4
	| "NEED_PERMISSION_APPROVAL"
	| 5
	| "COIN_NOT_USABLE"
	| 6
	| "WEBVIEW_NOT_ALLOWED"
	| 7
	| "NOT_AVAILABLE_API";

/** LINE Thrift enum ContactAttribute; values are protocol-level identifiers. */
export type ContactAttribute =
	| 1
	| "CONTACT_ATTRIBUTE_CAPABLE_VOICE_CALL"
	| 2
	| "CONTACT_ATTRIBUTE_CAPABLE_VIDEO_CALL"
	| 16
	| "CONTACT_ATTRIBUTE_CAPABLE_MY_HOME"
	| 32
	| "CONTACT_ATTRIBUTE_CAPABLE_BUDDY";

/** LINE Thrift enum ContactSetting; values are protocol-level identifiers. */
export type ContactSetting =
	| 1
	| "CONTACT_SETTING_NOTIFICATION_DISABLE"
	| 2
	| "CONTACT_SETTING_DISPLAY_NAME_OVERRIDE"
	| 4
	| "CONTACT_SETTING_CONTACT_HIDE"
	| 8
	| "CONTACT_SETTING_FAVORITE"
	| 16
	| "CONTACT_SETTING_DELETE"
	| 32
	| "CONTACT_SETTING_FRIEND_RINGTONE"
	| 64
	| "CONTACT_SETTING_FRIEND_RINGBACK_TONE";

/** LINE Thrift enum ContactStatus; values are protocol-level identifiers. */
export type ContactStatus =
	| 0
	| "UNSPECIFIED"
	| 1
	| "FRIEND"
	| 2
	| "FRIEND_BLOCKED"
	| 3
	| "RECOMMEND"
	| 4
	| "RECOMMEND_BLOCKED"
	| 5
	| "DELETED"
	| 6
	| "DELETED_BLOCKED";

/** LINE Thrift enum ContactType; values are protocol-level identifiers. */
export type ContactType =
	| 0
	| "MID"
	| 1
	| "PHONE"
	| 2
	| "EMAIL"
	| 3
	| "USERID"
	| 4
	| "PROXIMITY"
	| 5
	| "GROUP"
	| 6
	| "USER"
	| 7
	| "QRCODE"
	| 8
	| "PROMOTION_BOT"
	| 9
	| "CONTACT_MESSAGE"
	| 10
	| "FRIEND_REQUEST"
	| 11
	| "BEACON"
	| 128
	| "REPAIR"
	| 2305
	| "FACEBOOK"
	| 2306
	| "SINA"
	| 2307
	| "RENREN"
	| 2308
	| "FEIXIN"
	| 2309
	| "BBM";

/** LINE Thrift enum ContentType; values are protocol-level identifiers. */
export type ContentType =
	| 0
	| "NONE"
	| 1
	| "IMAGE"
	| 2
	| "VIDEO"
	| 3
	| "AUDIO"
	| 4
	| "HTML"
	| 5
	| "PDF"
	| 6
	| "CALL"
	| 7
	| "STICKER"
	| 8
	| "PRESENCE"
	| 9
	| "GIFT"
	| 10
	| "GROUPBOARD"
	| 11
	| "APPLINK"
	| 12
	| "LINK"
	| 13
	| "CONTACT"
	| 14
	| "FILE"
	| 15
	| "LOCATION"
	| 16
	| "POSTNOTIFICATION"
	| 17
	| "RICH"
	| 18
	| "CHATEVENT"
	| 19
	| "MUSIC"
	| 20
	| "PAYMENT"
	| 21
	| "EXTIMAGE"
	| 22
	| "FLEX";

/** LINE Thrift enum Eg_EnumC8927a; values are protocol-level identifiers. */
export type Eg_EnumC8927a = 1 | "NEW" | 2 | "UPDATE" | 3 | "EVENT";

/** LINE Thrift enum EmailConfirmationStatus; values are protocol-level identifiers. */
export type EmailConfirmationStatus =
	| 0
	| "NOT_SPECIFIED"
	| 1
	| "NOT_YET"
	| 3
	| "DONE"
	| 4
	| "NEED_ENFORCED_INPUT";

/** LINE Thrift enum ErrorCode; values are protocol-level identifiers. */
export type ErrorCode =
	| 0
	| "ILLEGAL_ARGUMENT"
	| 1
	| "AUTHENTICATION_FAILED"
	| 2
	| "DB_FAILED"
	| 3
	| "INVALID_STATE"
	| 4
	| "EXCESSIVE_ACCESS"
	| 5
	| "NOT_FOUND"
	| 6
	| "INVALID_LENGTH"
	| 7
	| "NOT_AVAILABLE_USER"
	| 8
	| "NOT_AUTHORIZED_DEVICE"
	| 9
	| "INVALID_MID"
	| 10
	| "NOT_A_MEMBER"
	| 11
	| "INCOMPATIBLE_APP_VERSION"
	| 12
	| "NOT_READY"
	| 13
	| "NOT_AVAILABLE_SESSION"
	| 14
	| "NOT_AUTHORIZED_SESSION"
	| 15
	| "SYSTEM_ERROR"
	| 16
	| "NO_AVAILABLE_VERIFICATION_METHOD"
	| 17
	| "NOT_AUTHENTICATED"
	| 18
	| "INVALID_IDENTITY_CREDENTIAL"
	| 19
	| "NOT_AVAILABLE_IDENTITY_IDENTIFIER"
	| 20
	| "INTERNAL_ERROR"
	| 21
	| "NO_SUCH_IDENTITY_IDENFIER"
	| 22
	| "DEACTIVATED_ACCOUNT_BOUND_TO_THIS_IDENTITY"
	| 23
	| "ILLEGAL_IDENTITY_CREDENTIAL"
	| 24
	| "UNKNOWN_CHANNEL"
	| 25
	| "NO_SUCH_MESSAGE_BOX"
	| 26
	| "NOT_AVAILABLE_MESSAGE_BOX"
	| 27
	| "CHANNEL_DOES_NOT_MATCH"
	| 28
	| "NOT_YOUR_MESSAGE"
	| 29
	| "MESSAGE_DEFINED_ERROR"
	| 30
	| "USER_CANNOT_ACCEPT_PRESENTS"
	| 32
	| "USER_NOT_STICKER_OWNER"
	| 33
	| "MAINTENANCE_ERROR"
	| 34
	| "ACCOUNT_NOT_MATCHED"
	| 35
	| "ABUSE_BLOCK"
	| 36
	| "NOT_FRIEND"
	| 37
	| "NOT_ALLOWED_CALL"
	| 38
	| "BLOCK_FRIEND"
	| 39
	| "INCOMPATIBLE_VOIP_VERSION"
	| 40
	| "INVALID_SNS_ACCESS_TOKEN"
	| 41
	| "EXTERNAL_SERVICE_NOT_AVAILABLE"
	| 42
	| "NOT_ALLOWED_ADD_CONTACT"
	| 43
	| "NOT_CERTIFICATED"
	| 44
	| "NOT_ALLOWED_SECONDARY_DEVICE"
	| 45
	| "INVALID_PIN_CODE"
	| 47
	| "EXCEED_FILE_MAX_SIZE"
	| 48
	| "EXCEED_DAILY_QUOTA"
	| 49
	| "NOT_SUPPORT_SEND_FILE"
	| 50
	| "MUST_UPGRADE"
	| 51
	| "NOT_AVAILABLE_PIN_CODE_SESSION"
	| 52
	| "EXPIRED_REVISION"
	| 54
	| "NOT_YET_PHONE_NUMBER"
	| 55
	| "BAD_CALL_NUMBER"
	| 56
	| "UNAVAILABLE_CALL_NUMBER"
	| 57
	| "NOT_SUPPORT_CALL_SERVICE"
	| 58
	| "CONGESTION_CONTROL"
	| 59
	| "NO_BALANCE"
	| 60
	| "NOT_PERMITTED_CALLER_ID"
	| 61
	| "NO_CALLER_ID_LIMIT_EXCEEDED"
	| 62
	| "CALLER_ID_VERIFICATION_REQUIRED"
	| 63
	| "NO_CALLER_ID_LIMIT_EXCEEDED_AND_VERIFICATION_REQUIRED"
	| 64
	| "MESSAGE_NOT_FOUND"
	| 65
	| "INVALID_ACCOUNT_MIGRATION_PINCODE_FORMAT"
	| 66
	| "ACCOUNT_MIGRATION_PINCODE_NOT_MATCHED"
	| 67
	| "ACCOUNT_MIGRATION_PINCODE_BLOCKED"
	| 69
	| "INVALID_PASSWORD_FORMAT"
	| 70
	| "FEATURE_RESTRICTED"
	| 71
	| "MESSAGE_NOT_DESTRUCTIBLE"
	| 72
	| "PAID_CALL_REDEEM_FAILED"
	| 73
	| "PREVENTED_JOIN_BY_TICKET"
	| 75
	| "SEND_MESSAGE_NOT_PERMITTED_FROM_LINE_AT"
	| 76
	| "SEND_MESSAGE_NOT_PERMITTED_WHILE_AUTO_REPLY"
	| 77
	| "SECURITY_CENTER_NOT_VERIFIED"
	| 78
	| "SECURITY_CENTER_BLOCKED_BY_SETTING"
	| 79
	| "SECURITY_CENTER_BLOCKED"
	| 80
	| "TALK_PROXY_EXCEPTION"
	| 81
	| "E2EE_INVALID_PROTOCOL"
	| 82
	| "E2EE_RETRY_ENCRYPT"
	| 83
	| "E2EE_UPDATE_SENDER_KEY"
	| 84
	| "E2EE_UPDATE_RECEIVER_KEY"
	| 85
	| "E2EE_INVALID_ARGUMENT"
	| 86
	| "E2EE_INVALID_VERSION"
	| 87
	| "E2EE_SENDER_DISABLED"
	| 88
	| "E2EE_RECEIVER_DISABLED"
	| 89
	| "E2EE_SENDER_NOT_ALLOWED"
	| 90
	| "E2EE_RECEIVER_NOT_ALLOWED"
	| 91
	| "E2EE_RESEND_FAIL"
	| 92
	| "E2EE_RESEND_OK"
	| 93
	| "HITOKOTO_BACKUP_NO_AVAILABLE_DATA"
	| 94
	| "E2EE_UPDATE_PRIMARY_DEVICE"
	| 95
	| "SUCCESS"
	| 96
	| "CANCEL"
	| 97
	| "E2EE_PRIMARY_NOT_SUPPORT"
	| 98
	| "E2EE_RETRY_PLAIN"
	| 99
	| "E2EE_RECREATE_GROUP_KEY"
	| 100
	| "E2EE_GROUP_TOO_MANY_MEMBERS"
	| 101
	| "SERVER_BUSY"
	| 102
	| "NOT_ALLOWED_ADD_FOLLOW"
	| 103
	| "INCOMING_FRIEND_REQUEST_LIMIT"
	| 104
	| "OUTGOING_FRIEND_REQUEST_LIMIT"
	| 105
	| "OUTGOING_FRIEND_REQUEST_QUOTA"
	| 106
	| "DUPLICATED"
	| 107
	| "BANNED"
	| 108
	| "NOT_AN_INVITEE"
	| 109
	| "NOT_AN_OUTSIDER"
	| 111
	| "EMPTY_GROUP"
	| 112
	| "EXCEED_FOLLOW_LIMIT"
	| 113
	| "UNSUPPORTED_ACCOUNT_TYPE"
	| 114
	| "AGREEMENT_REQUIRED"
	| 115
	| "SHOULD_RETRY"
	| 116
	| "OVER_MAX_CHATS_PER_USER"
	| 117
	| "NOT_AVAILABLE_API"
	| 118
	| "INVALID_OTP"
	| 119
	| "MUST_REFRESH_V3_TOKEN"
	| 120
	| "ALREADY_EXPIRED"
	| 121
	| "USER_NOT_STICON_OWNER"
	| 122
	| "REFRESH_MEDIA_FLOW"
	| 123
	| "EXCEED_FOLLOWER_LIMIT"
	| 124
	| "INCOMPATIBLE_APP_TYPE"
	| 125
	| "NOT_PREMIUM"
	| 126
	| "BITMAX_ACCOUNT_EXIST"
	| 127
	| "MESSAGE_NOT_EDITABLE"
	| 128
	| "MESSAGE_NOT_EDITABLE_TIMELIMIT"
	| 129
	| "SCHEDULED_MESSAGE_TIMELIMIT"
	| 130
	| "SCHEDULED_MESSAGE_SERVER_TIMESLOT_LIMIT"
	| 131
	| "SCHEDULED_MESSAGE_USER_TOTAL_LIMIT"
	| 132
	| "SCHEDULED_MESSAGE_USER_TIMESLOT_LIMIT"
	| 133
	| "SCHEDULED_MESSAGE_UPDATE_TIMELIMIT"
	| 134
	| "SCHEDULED_MESSAGE_RESCHEDULE_TIMELIMIT"
	| 135
	| "NOT_LAB_ENABLED";

/** LINE Thrift enum Fg_a; values are protocol-level identifiers. */
export type Fg_a =
	| 0
	| "INTERNAL_ERROR"
	| 1
	| "ILLEGAL_ARGUMENT"
	| 2
	| "VERIFICATION_FAILED"
	| 3
	| "NOT_FOUND"
	| 4
	| "RETRY_LATER"
	| 5
	| "HUMAN_VERIFICATION_REQUIRED"
	| 6
	| "NOT_ENABLED"
	| 100
	| "INVALID_CONTEXT"
	| 101
	| "APP_UPGRADE_REQUIRED"
	| 102
	| "NO_CONTENT";

/** LINE Thrift enum FriendRequestStatus; values are protocol-level identifiers. */
export type FriendRequestStatus =
	| 0
	| "NONE"
	| 1
	| "AVAILABLE"
	| 2
	| "ALREADY_REQUESTED"
	| 3
	| "UNAVAILABLE";

/** LINE Thrift enum IdentityProvider; values are protocol-level identifiers. */
export type IdentityProvider =
	| 0
	| "UNKNOWN"
	| 1
	| "LINE"
	| 2
	| "NAVER_KR"
	| 3
	| "LINE_PHONE";

/** LINE Thrift enum LN0_F0; values are protocol-level identifiers. */
export type LN0_F0 =
	| 0
	| "UNKNOWN"
	| 1
	| "INVALID_TARGET_USER"
	| 2
	| "AGE_VALIDATION"
	| 3
	| "TOO_MANY_FRIENDS"
	| 4
	| "TOO_MANY_REQUESTS"
	| 5
	| "MALFORMED_REQUEST"
	| 6
	| "TRACKING_META_QRCODE_FAVORED";

/** LINE Thrift enum LN0_X0; values are protocol-level identifiers. */
export type LN0_X0 = 1 | "USER" | 2 | "BOT";

/** LINE Thrift enum MIDType; values are protocol-level identifiers. */
export type MIDType =
	| 0
	| "USER"
	| 1
	| "ROOM"
	| 2
	| "GROUP"
	| 3
	| "SQUARE"
	| 4
	| "SQUARE_CHAT"
	| 5
	| "SQUARE_MEMBER"
	| 6
	| "BOT"
	| 7
	| "SQUARE_THREAD";

/** LINE Thrift enum NZ0_B0; values are protocol-level identifiers. */
export type NZ0_B0 =
	| 0
	| "PAY"
	| 1
	| "POI"
	| 2
	| "FX"
	| 3
	| "SEC"
	| 4
	| "BIT"
	| 5
	| "LIN"
	| 6
	| "SCO"
	| 7
	| "POC";

/** LINE Thrift enum NZ0_C0; values are protocol-level identifiers. */
export type NZ0_C0 =
	| 0
	| "OK"
	| 1
	| "MAINTENANCE"
	| 2
	| "TPS_EXCEEDED"
	| 3
	| "NOT_FOUND"
	| 4
	| "BLOCKED"
	| 5
	| "INTERNAL_ERROR"
	| 6
	| "WALLET_CMS_MAINTENANCE";

/** LINE Thrift enum NZ0_EnumC12154b1; values are protocol-level identifiers. */
export type NZ0_EnumC12154b1 = 0 | "NORMAL" | 1 | "CAMERA";

/** LINE Thrift enum NZ0_EnumC12169g1; values are protocol-level identifiers. */
export type NZ0_EnumC12169g1 =
	| 101
	| "WALLET"
	| 201
	| "ASSET"
	| 301
	| "SHOPPING";

/** LINE Thrift enum NZ0_EnumC12170h; values are protocol-level identifiers. */
export type NZ0_EnumC12170h = 0 | "HIDE_BADGE" | 1 | "SHOW_BADGE";

/** LINE Thrift enum NZ0_EnumC12188n; values are protocol-level identifiers. */
export type NZ0_EnumC12188n =
	| 0
	| "OK"
	| 1
	| "UNAVAILABLE"
	| 2
	| "DUPLICATAE_REGISTRATION"
	| 3
	| "INTERNAL_ERROR";

/** LINE Thrift enum NZ0_EnumC12192o0; values are protocol-level identifiers. */
export type NZ0_EnumC12192o0 = 0 | "LV1" | 1 | "LV2" | 2 | "LV3" | 3 | "LV9";

/** LINE Thrift enum NZ0_EnumC12193o1; values are protocol-level identifiers. */
export type NZ0_EnumC12193o1 =
	| 400
	| "INVALID_PARAMETER"
	| 401
	| "AUTHENTICATION_FAILED"
	| 500
	| "INTERNAL_SERVER_ERROR"
	| 503
	| "SERVICE_IN_MAINTENANCE_MODE";

/** LINE Thrift enum NZ0_EnumC12195p0; values are protocol-level identifiers. */
export type NZ0_EnumC12195p0 =
	| 1
	| "ALIVE"
	| 2
	| "SUSPENDED"
	| 3
	| "UNREGISTERED";

/** LINE Thrift enum NZ0_EnumC12197q; values are protocol-level identifiers. */
export type NZ0_EnumC12197q = 0 | "PREFIX" | 1 | "SUFFIX";

/** LINE Thrift enum NZ0_EnumC12218x0; values are protocol-level identifiers. */
export type NZ0_EnumC12218x0 = 0 | "NO_CONTENT" | 1 | "OK" | 2 | "ERROR";

/** LINE Thrift enum NZ0_I0; values are protocol-level identifiers. */
export type NZ0_I0 = 0 | "A" | 1 | "B" | 2 | "C" | 3 | "D" | 4 | "UNKNOWN";

/** LINE Thrift enum NZ0_K0; values are protocol-level identifiers. */
export type NZ0_K0 = 0 | "POCKET_MONEY" | 1 | "REFINANCE";

/** LINE Thrift enum NZ0_N0; values are protocol-level identifiers. */
export type NZ0_N0 = 0 | "COMPACT" | 1 | "EXPANDED";

/** LINE Thrift enum NZ0_S0; values are protocol-level identifiers. */
export type NZ0_S0 = 0 | "CARD" | 1 | "ACTION";

/** LINE Thrift enum NZ0_W0; values are protocol-level identifiers. */
export type NZ0_W0 = 0 | "OK" | 1 | "INTERNAL_ERROR";

/** LINE Thrift enum NotificationStatus; values are protocol-level identifiers. */
export type NotificationStatus =
	| 1
	| "NOTIFICATION_ITEM_EXIST"
	| 2
	| "TIMELINE_ITEM_EXIST"
	| 4
	| "NOTE_GROUP_NEW_ITEM_EXIST"
	| 8
	| "TIMELINE_BUDDYGROUP_CHANGED"
	| 16
	| "NOTE_ONE_TO_ONE_NEW_ITEM_EXIST"
	| 32
	| "ALBUM_ITEM_EXIST"
	| 64
	| "TIMELINE_ITEM_DELETED"
	| 128
	| "OTOGROUP_ITEM_EXIST"
	| 256
	| "GROUPHOME_NEW_ITEM_EXIST"
	| 512
	| "GROUPHOME_HIDDEN_ITEM_CHANGED"
	| 1024
	| "NOTIFICATION_ITEM_CHANGED"
	| 2048
	| "BEAD_ITEM_HIDE"
	| 4096
	| "BEAD_ITEM_SHOW"
	| 8192
	| "LINE_TICKET_UPDATED"
	| 16384
	| "TIMELINE_STORY_UPDATED"
	| 32768
	| "SMARTCH_UPDATED"
	| 65536
	| "AVATAR_UPDATED"
	| 131072
	| "HOME_NOTIFICATION_ITEM_EXIST"
	| 262144
	| "TIMELINE_REBOOT_COMPLETED"
	| 524288
	| "TIMELINE_GUIDE_STORY_UPDATED"
	| 1048576
	| "TIMELINE_F2F_COMPLETED"
	| 2097152
	| "VOOM_LIVE_STATE_CHANGED"
	| 4194304
	| "VOOM_ACTIVITY_REWARD_ITEM_EXIST"
	| 8388608
	| "LINE_TODAY_PROFILE_UPDATED"
	| 16777216
	| "AI_FRIENDS_EVENT_EXIST"
	| 33554432
	| "CALENDAR_ITEM_EXIST"
	| 67108864
	| "WALLET_NOTIFICATION_ITEM_EXIST";

/** LINE Thrift enum NotificationType; values are protocol-level identifiers. */
export type NotificationType =
	| 1
	| "APPLE_APNS"
	| 2
	| "GOOGLE_C2DM"
	| 3
	| "NHN_NNI"
	| 4
	| "SKT_AOM"
	| 5
	| "MS_MPNS"
	| 6
	| "RIM_BIS"
	| 7
	| "GOOGLE_GCM"
	| 8
	| "NOKIA_NNAPI"
	| 9
	| "TIZEN"
	| 10
	| "MOZILLA_SIMPLE"
	| 17
	| "LINE_BOT"
	| 18
	| "LINE_WAP"
	| 19
	| "APPLE_APNS_VOIP"
	| 20
	| "MS_WNS"
	| 21
	| "GOOGLE_FCM"
	| 22
	| "CLOVA"
	| 23
	| "CLOVA_VOIP"
	| 24
	| "HUAWEI_HCM";

/** LINE Thrift enum Ob1_B0; values are protocol-level identifiers. */
export type Ob1_B0 = 0 | "FOREGROUND" | 1 | "BACKGROUND";

/** LINE Thrift enum Ob1_C1; values are protocol-level identifiers. */
export type Ob1_C1 = 0 | "NORMAL" | 1 | "BIG";

/** LINE Thrift enum Ob1_D0; values are protocol-level identifiers. */
export type Ob1_D0 =
	| 0
	| "PURCHASE_ONLY"
	| 1
	| "PURCHASE_OR_SUBSCRIPTION"
	| 2
	| "SUBSCRIPTION_ONLY";

/** LINE Thrift enum Ob1_EnumC12607a1; values are protocol-level identifiers. */
export type Ob1_EnumC12607a1 = 1 | "DEFAULT" | 2 | "VIEW_VIDEO";

/** LINE Thrift enum Ob1_EnumC12610b1; values are protocol-level identifiers. */
export type Ob1_EnumC12610b1 =
	| 0
	| "NONE"
	| 2
	| "BUDDY"
	| 3
	| "INSTALL"
	| 4
	| "MISSION"
	| 5
	| "MUSTBUY";

/** LINE Thrift enum Ob1_EnumC12631i1; values are protocol-level identifiers. */
export type Ob1_EnumC12631i1 =
	| 0
	| "UNKNOWN"
	| 1
	| "PRODUCT"
	| 2
	| "USER"
	| 3
	| "PREMIUM_USER";

/** LINE Thrift enum Ob1_EnumC12638l; values are protocol-level identifiers. */
export type Ob1_EnumC12638l = 0 | "VALID" | 1 | "INVALID";

/** LINE Thrift enum Ob1_EnumC12641m; values are protocol-level identifiers. */
export type Ob1_EnumC12641m = 1 | "PREMIUM" | 2 | "VERIFIED" | 3 | "UNVERIFIED";

/** LINE Thrift enum Ob1_EnumC12652p1; values are protocol-level identifiers. */
export type Ob1_EnumC12652p1 =
	| 0
	| "UNKNOWN"
	| 1
	| "NONE"
	| 16641
	| "ILLEGAL_ARGUMENT"
	| 16642
	| "NOT_FOUND"
	| 16643
	| "NOT_AVAILABLE"
	| 16644
	| "NOT_PAID_PRODUCT"
	| 16645
	| "NOT_FREE_PRODUCT"
	| 16646
	| "ALREADY_OWNED"
	| 16647
	| "ERROR_WITH_CUSTOM_MESSAGE"
	| 16648
	| "NOT_AVAILABLE_TO_RECIPIENT"
	| 16649
	| "NOT_AVAILABLE_FOR_CHANNEL_ID"
	| 16650
	| "NOT_SALE_FOR_COUNTRY"
	| 16651
	| "NOT_SALES_PERIOD"
	| 16652
	| "NOT_SALE_FOR_DEVICE"
	| 16653
	| "NOT_SALE_FOR_VERSION"
	| 16654
	| "ALREADY_EXPIRED"
	| 16655
	| "LIMIT_EXCEEDED"
	| 16656
	| "MISSING_CAPABILITY"
	| 16897
	| "AUTHENTICATION_FAILED"
	| 17153
	| "BALANCE_SHORTAGE"
	| 20737
	| "INTERNAL_SERVER_ERROR"
	| 20738
	| "SERVICE_IN_MAINTENANCE_MODE"
	| 20739
	| "SERVICE_UNAVAILABLE";

/** LINE Thrift enum Ob1_EnumC12656r0; values are protocol-level identifiers. */
export type Ob1_EnumC12656r0 =
	| 0
	| "OK"
	| 1
	| "PRODUCT_UNSUPPORTED"
	| 2
	| "TEXT_NOT_SPECIFIED"
	| 3
	| "TEXT_STYLE_UNAVAILABLE"
	| 4
	| "CHARACTER_COUNT_LIMIT_EXCEEDED"
	| 5
	| "CONTAINS_INVALID_WORD";

/** LINE Thrift enum Ob1_EnumC12664u; values are protocol-level identifiers. */
export type Ob1_EnumC12664u =
	| 0
	| "UNKNOWN"
	| 1
	| "NONE"
	| 16641
	| "ILLEGAL_ARGUMENT"
	| 16642
	| "NOT_FOUND"
	| 16643
	| "NOT_AVAILABLE"
	| 16644
	| "MAX_AMOUNT_OF_PRODUCTS_REACHED"
	| 16645
	| "PRODUCT_IS_NOT_PREMIUM"
	| 16646
	| "PRODUCT_IS_NOT_AVAILABLE_FOR_USER"
	| 16647
	| "USER_HAS_NO_VALID_SUBSCRIPTION"
	| 16648
	| "USER_HAS_NO_PRODUCT_OWNERSHIP"
	| 16897
	| "AUTHENTICATION_FAILED"
	| 20737
	| "INTERNAL_SERVER_ERROR"
	| 20739
	| "SERVICE_UNAVAILABLE";

/** LINE Thrift enum Ob1_EnumC12666u1; values are protocol-level identifiers. */
export type Ob1_EnumC12666u1 =
	| 0
	| "POPULAR"
	| 1
	| "NEW_RELEASE"
	| 2
	| "EVENT"
	| 3
	| "RECOMMENDED"
	| 4
	| "POPULAR_WEEKLY"
	| 5
	| "POPULAR_MONTHLY"
	| 6
	| "POPULAR_RECENTLY_PUBLISHED"
	| 7
	| "BUDDY"
	| 8
	| "EXTRA_EVENT"
	| 9
	| "BROWSING_HISTORY"
	| 10
	| "POPULAR_TOTAL_SALES"
	| 11
	| "NEW_SUBSCRIPTION"
	| 12
	| "POPULAR_SUBSCRIPTION_30D"
	| 13
	| "CPD_STICKER"
	| 14
	| "POPULAR_WITH_FREE";

/** LINE Thrift enum Ob1_F1; values are protocol-level identifiers. */
export type Ob1_F1 = 1 | "STATIC" | 2 | "ANIMATION";

/** LINE Thrift enum Ob1_I; values are protocol-level identifiers. */
export type Ob1_I = 0 | "STATIC" | 1 | "POPULAR" | 2 | "NEW_RELEASE";

/** LINE Thrift enum Ob1_J0; values are protocol-level identifiers. */
export type Ob1_J0 = 0 | "ON_SALE" | 1 | "OUTDATED_VERSION" | 2 | "NOT_ON_SALE";

/** LINE Thrift enum Ob1_J1; values are protocol-level identifiers. */
export type Ob1_J1 =
	| 0
	| "OK"
	| 1
	| "INVALID_PARAMETER"
	| 2
	| "NOT_FOUND"
	| 3
	| "NOT_SUPPORTED"
	| 4
	| "CONFLICT"
	| 5
	| "NOT_ELIGIBLE";

/** LINE Thrift enum Ob1_K1; values are protocol-level identifiers. */
export type Ob1_K1 =
	| 0
	| "GOOGLE"
	| 1
	| "APPLE"
	| 2
	| "WEBSTORE"
	| 3
	| "LINEMO"
	| 4
	| "LINE_MUSIC"
	| 5
	| "LYP"
	| 6
	| "TW_CHT"
	| 7
	| "FREEMIUM";

/** LINE Thrift enum Ob1_M1; values are protocol-level identifiers. */
export type Ob1_M1 =
	| 0
	| "OK"
	| 1
	| "UNKNOWN"
	| 2
	| "NOT_SUPPORTED"
	| 3
	| "NO_SUBSCRIPTION"
	| 4
	| "SUBSCRIPTION_EXISTS"
	| 5
	| "NOT_AVAILABLE"
	| 6
	| "CONFLICT"
	| 7
	| "OUTDATED_VERSION"
	| 8
	| "NO_STUDENT_INFORMATION"
	| 9
	| "ACCOUNT_HOLD"
	| 10
	| "RETRY_STATE";

/** LINE Thrift enum Ob1_O0; values are protocol-level identifiers. */
export type Ob1_O0 = 1 | "STICKER" | 2 | "THEME" | 3 | "STICON";

/** LINE Thrift enum Ob1_O1; values are protocol-level identifiers. */
export type Ob1_O1 =
	| 0
	| "AVAILABLE"
	| 1
	| "DIFFERENT_STORE"
	| 2
	| "NOT_STUDENT"
	| 3
	| "ALREADY_PURCHASED";

/** LINE Thrift enum Ob1_P1; values are protocol-level identifiers. */
export type Ob1_P1 = 1 | "GENERAL" | 2 | "STUDENT";

/** LINE Thrift enum Ob1_Q1; values are protocol-level identifiers. */
export type Ob1_Q1 = 1 | "BASIC" | 2 | "DELUXE";

/** LINE Thrift enum Ob1_R1; values are protocol-level identifiers. */
export type Ob1_R1 = 1 | "MONTHLY" | 2 | "YEARLY";

/** LINE Thrift enum Ob1_U1; values are protocol-level identifiers. */
export type Ob1_U1 =
	| 0
	| "OK"
	| 1
	| "UNKNOWN"
	| 2
	| "NO_SUBSCRIPTION"
	| 3
	| "EXISTS"
	| 4
	| "NOT_FOUND"
	| 5
	| "EXCEEDS_LIMIT"
	| 6
	| "NOT_AVAILABLE";

/** LINE Thrift enum Ob1_V1; values are protocol-level identifiers. */
export type Ob1_V1 = 1 | "DATE_ASC" | 2 | "DATE_DESC";

/** LINE Thrift enum Ob1_X1; values are protocol-level identifiers. */
export type Ob1_X1 = 0 | "GENERAL" | 1 | "CREATORS" | 2 | "STICON";

/** LINE Thrift enum Ob1_a2; values are protocol-level identifiers. */
export type Ob1_a2 =
	| 0
	| "NOT_PURCHASED"
	| 1
	| "SUBSCRIPTION"
	| 2
	| "NOT_SUBSCRIBED"
	| 3
	| "NOT_ACCEPTED"
	| 4
	| "NOT_PURCHASED_U2I"
	| 5
	| "BUDDY"
	| 6
	| "TREND";

/** LINE Thrift enum Ob1_c2; values are protocol-level identifiers. */
export type Ob1_c2 = 1 | "STATIC" | 2 | "ANIMATION";

/** LINE Thrift enum OpType; values are protocol-level identifiers. */
export type OpType =
	| 0
	| "END_OF_OPERATION"
	| 1
	| "UPDATE_PROFILE"
	| 2
	| "NOTIFIED_UPDATE_PROFILE"
	| 3
	| "REGISTER_USERID"
	| 4
	| "ADD_CONTACT"
	| 5
	| "NOTIFIED_ADD_CONTACT"
	| 6
	| "BLOCK_CONTACT"
	| 7
	| "UNBLOCK_CONTACT"
	| 8
	| "NOTIFIED_RECOMMEND_CONTACT"
	| 9
	| "CREATE_GROUP"
	| 10
	| "UPDATE_GROUP"
	| 11
	| "NOTIFIED_UPDATE_GROUP"
	| 12
	| "INVITE_INTO_GROUP"
	| 13
	| "NOTIFIED_INVITE_INTO_GROUP"
	| 14
	| "LEAVE_GROUP"
	| 15
	| "NOTIFIED_LEAVE_GROUP"
	| 16
	| "ACCEPT_GROUP_INVITATION"
	| 17
	| "NOTIFIED_ACCEPT_GROUP_INVITATION"
	| 18
	| "KICKOUT_FROM_GROUP"
	| 19
	| "NOTIFIED_KICKOUT_FROM_GROUP"
	| 20
	| "CREATE_ROOM"
	| 21
	| "INVITE_INTO_ROOM"
	| 22
	| "NOTIFIED_INVITE_INTO_ROOM"
	| 23
	| "LEAVE_ROOM"
	| 24
	| "NOTIFIED_LEAVE_ROOM"
	| 25
	| "SEND_MESSAGE"
	| 26
	| "RECEIVE_MESSAGE"
	| 27
	| "SEND_MESSAGE_RECEIPT"
	| 28
	| "RECEIVE_MESSAGE_RECEIPT"
	| 29
	| "SEND_CONTENT_RECEIPT"
	| 30
	| "RECEIVE_ANNOUNCEMENT"
	| 31
	| "CANCEL_INVITATION_GROUP"
	| 32
	| "NOTIFIED_CANCEL_INVITATION_GROUP"
	| 33
	| "NOTIFIED_UNREGISTER_USER"
	| 34
	| "REJECT_GROUP_INVITATION"
	| 35
	| "NOTIFIED_REJECT_GROUP_INVITATION"
	| 36
	| "UPDATE_SETTINGS"
	| 37
	| "NOTIFIED_REGISTER_USER"
	| 38
	| "INVITE_VIA_EMAIL"
	| 39
	| "NOTIFIED_REQUEST_RECOVERY"
	| 40
	| "SEND_CHAT_CHECKED"
	| 41
	| "SEND_CHAT_REMOVED"
	| 42
	| "NOTIFIED_FORCE_SYNC"
	| 43
	| "SEND_CONTENT"
	| 44
	| "SEND_MESSAGE_MYHOME"
	| 45
	| "NOTIFIED_UPDATE_CONTENT_PREVIEW"
	| 46
	| "REMOVE_ALL_MESSAGES"
	| 47
	| "NOTIFIED_UPDATE_PURCHASES"
	| 48
	| "DUMMY"
	| 49
	| "UPDATE_CONTACT"
	| 50
	| "NOTIFIED_RECEIVED_CALL"
	| 51
	| "CANCEL_CALL"
	| 52
	| "NOTIFIED_REDIRECT"
	| 53
	| "NOTIFIED_CHANNEL_SYNC"
	| 54
	| "FAILED_SEND_MESSAGE"
	| 55
	| "NOTIFIED_READ_MESSAGE"
	| 56
	| "FAILED_EMAIL_CONFIRMATION"
	| 58
	| "NOTIFIED_CHAT_CONTENT"
	| 59
	| "NOTIFIED_PUSH_NOTICENTER_ITEM"
	| 60
	| "NOTIFIED_JOIN_CHAT"
	| 61
	| "NOTIFIED_LEAVE_CHAT"
	| 62
	| "NOTIFIED_TYPING"
	| 63
	| "FRIEND_REQUEST_ACCEPTED"
	| 64
	| "DESTROY_MESSAGE"
	| 65
	| "NOTIFIED_DESTROY_MESSAGE"
	| 66
	| "UPDATE_PUBLICKEYCHAIN"
	| 67
	| "NOTIFIED_UPDATE_PUBLICKEYCHAIN"
	| 68
	| "NOTIFIED_BLOCK_CONTACT"
	| 69
	| "NOTIFIED_UNBLOCK_CONTACT"
	| 70
	| "UPDATE_GROUPPREFERENCE"
	| 71
	| "NOTIFIED_PAYMENT_EVENT"
	| 72
	| "REGISTER_E2EE_PUBLICKEY"
	| 73
	| "NOTIFIED_E2EE_KEY_EXCHANGE_REQ"
	| 74
	| "NOTIFIED_E2EE_KEY_EXCHANGE_RESP"
	| 75
	| "NOTIFIED_E2EE_MESSAGE_RESEND_REQ"
	| 76
	| "NOTIFIED_E2EE_MESSAGE_RESEND_RESP"
	| 77
	| "NOTIFIED_E2EE_KEY_UPDATE"
	| 78
	| "NOTIFIED_BUDDY_UPDATE_PROFILE"
	| 79
	| "NOTIFIED_UPDATE_LINEAT_TABS"
	| 80
	| "UPDATE_ROOM"
	| 81
	| "NOTIFIED_BEACON_DETECTED"
	| 82
	| "UPDATE_EXTENDED_PROFILE"
	| 83
	| "ADD_FOLLOW"
	| 84
	| "NOTIFIED_ADD_FOLLOW"
	| 85
	| "DELETE_FOLLOW"
	| 86
	| "NOTIFIED_DELETE_FOLLOW"
	| 87
	| "UPDATE_TIMELINE_SETTINGS"
	| 88
	| "NOTIFIED_FRIEND_REQUEST"
	| 89
	| "UPDATE_RINGBACK_TONE"
	| 90
	| "NOTIFIED_POSTBACK"
	| 91
	| "RECEIVE_READ_WATERMARK"
	| 92
	| "NOTIFIED_MESSAGE_DELIVERED"
	| 93
	| "NOTIFIED_UPDATE_CHAT_BAR"
	| 94
	| "NOTIFIED_CHATAPP_INSTALLED"
	| 95
	| "NOTIFIED_CHATAPP_UPDATED"
	| 96
	| "NOTIFIED_CHATAPP_NEW_MARK"
	| 97
	| "NOTIFIED_CHATAPP_DELETED"
	| 98
	| "NOTIFIED_CHATAPP_SYNC"
	| 99
	| "NOTIFIED_UPDATE_MESSAGE"
	| 100
	| "UPDATE_CHATROOMBGM"
	| 101
	| "NOTIFIED_UPDATE_CHATROOMBGM"
	| 102
	| "UPDATE_RINGTONE"
	| 118
	| "UPDATE_USER_SETTINGS"
	| 119
	| "NOTIFIED_UPDATE_STATUS_BAR"
	| 120
	| "CREATE_CHAT"
	| 121
	| "UPDATE_CHAT"
	| 122
	| "NOTIFIED_UPDATE_CHAT"
	| 123
	| "INVITE_INTO_CHAT"
	| 124
	| "NOTIFIED_INVITE_INTO_CHAT"
	| 125
	| "CANCEL_CHAT_INVITATION"
	| 126
	| "NOTIFIED_CANCEL_CHAT_INVITATION"
	| 127
	| "DELETE_SELF_FROM_CHAT"
	| 128
	| "NOTIFIED_DELETE_SELF_FROM_CHAT"
	| 129
	| "ACCEPT_CHAT_INVITATION"
	| 130
	| "NOTIFIED_ACCEPT_CHAT_INVITATION"
	| 131
	| "REJECT_CHAT_INVITATION"
	| 132
	| "DELETE_OTHER_FROM_CHAT"
	| 133
	| "NOTIFIED_DELETE_OTHER_FROM_CHAT"
	| 134
	| "NOTIFIED_CONTACT_CALENDAR_EVENT"
	| 135
	| "NOTIFIED_CONTACT_CALENDAR_EVENT_ALL"
	| 136
	| "UPDATE_THINGS_OPERATIONS"
	| 137
	| "SEND_CHAT_HIDDEN"
	| 138
	| "CHAT_META_SYNC_ALL"
	| 139
	| "SEND_REACTION"
	| 140
	| "NOTIFIED_SEND_REACTION"
	| 141
	| "NOTIFIED_UPDATE_PROFILE_CONTENT"
	| 142
	| "FAILED_DELIVERY_MESSAGE"
	| 143
	| "SEND_ENCRYPTED_E2EE_KEY_REQUESTED"
	| 144
	| "CHANNEL_PAAK_AUTHENTICATION_REQUESTED"
	| 145
	| "UPDATE_PIN_STATE"
	| 146
	| "NOTIFIED_PREMIUMBACKUP_STATE_CHANGED"
	| 147
	| "CREATE_MULTI_PROFILE"
	| 148
	| "MULTI_PROFILE_STATUS_CHANGED"
	| 149
	| "DELETE_MULTI_PROFILE"
	| 150
	| "UPDATE_PROFILE_MAPPING"
	| 151
	| "DELETE_PROFILE_MAPPING"
	| 152
	| "NOTIFIED_DESTROY_NOTICENTER_PUSH"
	| 153
	| "FORCE_KEY_BACKUP_HEADER_VALIDATION"
	| 154
	| "NOTIFIED_GCS_REACTION"
	| 155
	| "UPDATE_MESSAGE_REQUEST_BOX"
	| 156
	| "NOTIFIED_UPDATE_MESSAGE_REQUEST_BOX"
	| 157
	| "NOTIFIED_GCS_REFRESH_CONTENT"
	| 158
	| "EDIT_MESSAGE"
	| 159
	| "NOTIFIED_EDIT_MESSAGE"
	| 160
	| "ADD_SCHEDULED_MESSAGE"
	| 161
	| "UPDATE_SCHEDULED_MESSAGE"
	| 162
	| "DELETE_SCHEDULED_MESSAGE"
	| 163
	| "E2EE_REENCRYPT_SCHEDULED_MESSAGE"
	| 164
	| "SEND_FAILED_SCHEDULED_MESSAGE"
	| 165
	| "SEND_SUCCEEDED_SCHEDULED_MESSAGE"
	| 166
	| "UPDATE_SERVICE_CHAT"
	| 167
	| "MARK_SERVICE_CHAT_AS_READ"
	| 168
	| "UPDATE_SERVICE_CHAT_NOTIFICATION_TEXT"
	| 169
	| "LINE_AUTH_NOTIFICATION";

/** LINE Thrift enum P70_g; values are protocol-level identifiers. */
export type P70_g = 1000 | "INVALID_REQUEST" | 1001 | "RETRY_REQUIRED";

/** LINE Thrift enum PaidCallType; values are protocol-level identifiers. */
export type PaidCallType =
	| 0
	| "OUT"
	| 1
	| "IN"
	| 2
	| "TOLLFREE"
	| 3
	| "RECORD"
	| 4
	| "AD"
	| 5
	| "CS"
	| 6
	| "OA"
	| 7
	| "OAM";

/** LINE Thrift enum PayloadType; values are protocol-level identifiers. */
export type PayloadType =
	| 101
	| "PAYLOAD_BUY"
	| 111
	| "PAYLOAD_CS"
	| 121
	| "PAYLOAD_BONUS"
	| 131
	| "PAYLOAD_EVENT"
	| 141
	| "PAYLOAD_POINT_AUTO_EXCHANGED"
	| 151
	| "PAYLOAD_POINT_MANUAL_EXCHANGED";

/** LINE Thrift enum Pb1_A0; values are protocol-level identifiers. */
export type Pb1_A0 = 0 | "NORMAL" | 1 | "VIDEOCAM" | 2 | "VOIP" | 3 | "RECORD";

/** LINE Thrift enum Pb1_A3; values are protocol-level identifiers. */
export type Pb1_A3 =
	| 0
	| "UNKNOWN"
	| 1
	| "BACKGROUND_NEW_KEY_CREATED"
	| 2
	| "BACKGROUND_PERIODICAL_VERIFICATION"
	| 3
	| "FOREGROUND_NEW_PIN_REGISTERED"
	| 4
	| "FOREGROUND_VERIFICATION";

/** LINE Thrift enum Pb1_B; values are protocol-level identifiers. */
export type Pb1_B = 1 | "SIRI" | 2 | "GOOGLE_ASSISTANT" | 3 | "OS_SHARE";

/** LINE Thrift enum Pb1_D0; values are protocol-level identifiers. */
export type Pb1_D0 =
	| 0
	| "RICH_MENU_ID"
	| 1
	| "STATUS_BAR"
	| 2
	| "BUDDY_CAUTION_NOTICE";

/** LINE Thrift enum Pb1_D4; values are protocol-level identifiers. */
export type Pb1_D4 = 1 | "AUDIO" | 2 | "VIDEO" | 3 | "FACEPLAY";

/** LINE Thrift enum Pb1_D6; values are protocol-level identifiers. */
export type Pb1_D6 =
	| 0
	| "GOOGLE"
	| 1
	| "BAIDU"
	| 2
	| "FOURSQUARE"
	| 3
	| "YAHOOJAPAN"
	| 4
	| "KINGWAY";

/** LINE Thrift enum Pb1_E7; values are protocol-level identifiers. */
export type Pb1_E7 = 0 | "UNKNOWN" | 1 | "TALK" | 2 | "SQUARE";

/** LINE Thrift enum Pb1_EnumC12917a6; values are protocol-level identifiers. */
export type Pb1_EnumC12917a6 =
	| 0
	| "UNKNOWN"
	| 1
	| "APP_FOREGROUND"
	| 2
	| "PERIODIC"
	| 3
	| "MANUAL";

/** LINE Thrift enum Pb1_EnumC12926b1; values are protocol-level identifiers. */
export type Pb1_EnumC12926b1 = 0 | "NOT_A_FRIEND" | 1 | "ALWAYS";

/** LINE Thrift enum Pb1_EnumC12941c2; values are protocol-level identifiers. */
export type Pb1_EnumC12941c2 =
	| 26
	| "BLE_LCS_API_USABLE"
	| 27
	| "PROHIBIT_MINIMIZE_CHANNEL_BROWSER"
	| 28
	| "ALLOW_IOS_WEBKIT"
	| 38
	| "PURCHASE_LCS_API_USABLE"
	| 48
	| "ALLOW_ANDROID_ENABLE_ZOOM";

/** LINE Thrift enum Pb1_EnumC12945c6; values are protocol-level identifiers. */
export type Pb1_EnumC12945c6 = 1 | "V1" | 2 | "V2";

/** LINE Thrift enum Pb1_EnumC12970e3; values are protocol-level identifiers. */
export type Pb1_EnumC12970e3 =
	| 1
	| "USER_AGE_CHECKED"
	| 2
	| "USER_APPROVAL_REQUIRED";

/** LINE Thrift enum Pb1_EnumC12997g2; values are protocol-level identifiers. */
export type Pb1_EnumC12997g2 = 0 | "PROFILE" | 1 | "FRIENDS" | 2 | "GROUP";

/** LINE Thrift enum Pb1_EnumC12998g3; values are protocol-level identifiers. */
export type Pb1_EnumC12998g3 =
	| 0
	| "UNKNOWN"
	| 1
	| "WIFI"
	| 2
	| "CELLULAR_NETWORK";

/** LINE Thrift enum Pb1_EnumC13009h0; values are protocol-level identifiers. */
export type Pb1_EnumC13009h0 = 1 | "NORMAL" | 2 | "LOW_BATTERY";

/** LINE Thrift enum Pb1_EnumC13010h1; values are protocol-level identifiers. */
export type Pb1_EnumC13010h1 = 1 | "NEW" | 2 | "PLANET";

/** LINE Thrift enum Pb1_EnumC13015h6; values are protocol-level identifiers. */
export type Pb1_EnumC13015h6 =
	| 0
	| "FORWARD"
	| 1
	| "AUTO_REPLY"
	| 2
	| "SUBORDINATE"
	| 3
	| "REPLY";

/** LINE Thrift enum Pb1_EnumC13022i; values are protocol-level identifiers. */
export type Pb1_EnumC13022i =
	| 0
	| "SKIP"
	| 1
	| "PINCODE"
	| 2
	| "SECURITY_CENTER";

/** LINE Thrift enum Pb1_EnumC13029i6; values are protocol-level identifiers. */
export type Pb1_EnumC13029i6 = 0 | "ADD" | 1 | "REMOVE" | 2 | "MODIFY";

/** LINE Thrift enum Pb1_EnumC13037j0; values are protocol-level identifiers. */
export type Pb1_EnumC13037j0 =
	| 0
	| "UNSPECIFIED"
	| 1
	| "INACTIVE"
	| 2
	| "ACTIVE"
	| 3
	| "DELETED";

/** LINE Thrift enum Pb1_EnumC13050k; values are protocol-level identifiers. */
export type Pb1_EnumC13050k =
	| 0
	| "UNKNOWN"
	| 1
	| "IOS_REDUCED_ACCURACY"
	| 2
	| "IOS_FULL_ACCURACY"
	| 3
	| "AOS_PRECISE_LOCATION"
	| 4
	| "AOS_APPROXIMATE_LOCATION";

/** LINE Thrift enum Pb1_EnumC13082m3; values are protocol-level identifiers. */
export type Pb1_EnumC13082m3 = 0 | "SHOW" | 1 | "HIDE";

/** LINE Thrift enum Pb1_EnumC13093n0; values are protocol-level identifiers. */
export type Pb1_EnumC13093n0 = 0 | "NONE" | 1 | "TOP";

/** LINE Thrift enum Pb1_EnumC13127p6; values are protocol-level identifiers. */
export type Pb1_EnumC13127p6 =
	| 0
	| "NORMAL"
	| 1
	| "ALERT_DISABLED"
	| 2
	| "ALWAYS";

/** LINE Thrift enum Pb1_EnumC13128p7; values are protocol-level identifiers. */
export type Pb1_EnumC13128p7 =
	| 0
	| "UNKNOWN"
	| 1
	| "DIRECT_INVITATION"
	| 2
	| "DIRECT_CHAT"
	| 3
	| "GROUP_INVITATION"
	| 4
	| "GROUP_CHAT"
	| 5
	| "ROOM_INVITATION"
	| 6
	| "ROOM_CHAT"
	| 7
	| "FRIEND_PROFILE"
	| 8
	| "DIRECT_CHAT_SELECTED"
	| 9
	| "GROUP_CHAT_SELECTED"
	| 10
	| "ROOM_CHAT_SELECTED"
	| 11
	| "DEPRECATED";

/** LINE Thrift enum Pb1_EnumC13148r0; values are protocol-level identifiers. */
export type Pb1_EnumC13148r0 =
	| 1
	| "ALWAYS_HIDDEN"
	| 2
	| "ALWAYS_SHOWN"
	| 3
	| "SHOWN_BY_CONDITION";

/** LINE Thrift enum Pb1_EnumC13151r3; values are protocol-level identifiers. */
export type Pb1_EnumC13151r3 = 0 | "ONEWAY" | 1 | "BOTH" | 2 | "NOT_REGISTERED";

/** LINE Thrift enum Pb1_EnumC13162s0; values are protocol-level identifiers. */
export type Pb1_EnumC13162s0 =
	| 1
	| "NOT_SUSPICIOUS"
	| 2
	| "SUSPICIOUS_00"
	| 3
	| "SUSPICIOUS_01";

/** LINE Thrift enum Pb1_EnumC13196u6; values are protocol-level identifiers. */
export type Pb1_EnumC13196u6 =
	| 0
	| "COIN"
	| 1
	| "CREDIT"
	| 2
	| "MONTHLY"
	| 3
	| "OAM";

/** LINE Thrift enum Pb1_EnumC13209v5; values are protocol-level identifiers. */
export type Pb1_EnumC13209v5 =
	| 0
	| "DUMMY"
	| 1
	| "NOTICE"
	| 2
	| "MORETAB"
	| 3
	| "STICKERSHOP"
	| 4
	| "CHANNEL"
	| 5
	| "DENY_KEYWORD"
	| 6
	| "CONNECTIONINFO"
	| 7
	| "BUDDY"
	| 8
	| "TIMELINEINFO"
	| 9
	| "THEMESHOP"
	| 10
	| "CALLRATE"
	| 11
	| "CONFIGURATION"
	| 12
	| "STICONSHOP"
	| 13
	| "SUGGESTDICTIONARY"
	| 14
	| "SUGGESTSETTINGS"
	| 15
	| "USERSETTINGS"
	| 16
	| "ANALYTICSINFO"
	| 17
	| "SEARCHPOPULARKEYWORD"
	| 18
	| "SEARCHNOTICE"
	| 19
	| "TIMELINE"
	| 20
	| "SEARCHPOPULARCATEGORY"
	| 21
	| "EXTENDEDPROFILE"
	| 22
	| "SEASONALMARKETING"
	| 23
	| "NEWSTAB"
	| 24
	| "SUGGESTDICTIONARYV2"
	| 25
	| "CHATAPPSYNC"
	| 26
	| "AGREEMENTS"
	| 27
	| "INSTANTNEWS"
	| 28
	| "EMOJI_MAPPING"
	| 29
	| "SEARCHBARKEYWORDS"
	| 30
	| "SHOPPING"
	| 31
	| "CHAT_EFFECT_BACKGROUND"
	| 32
	| "CHAT_EFFECT_KEYWORD"
	| 33
	| "SEARCHINDEX"
	| 34
	| "HUBTAB"
	| 35
	| "PAY_RULE_UPDATED"
	| 36
	| "SMARTCH"
	| 37
	| "HOME_SERVICE_LIST"
	| 38
	| "TIMELINESTORY"
	| 39
	| "WALLET_TAB"
	| 40
	| "POD_TAB"
	| 41
	| "HOME_SAFETY_CHECK"
	| 42
	| "HOME_SEASONAL_EFFECT"
	| 43
	| "OPENCHAT_MAIN"
	| 44
	| "CHAT_EFFECT_CONTENT_METADATA_TAG"
	| 45
	| "VOOM_LIVE_STATE_CHANGED"
	| 46
	| "PROFILE_STUDIO_N_BADGE"
	| 47
	| "LYP_FONT"
	| 48
	| "TIMELINESTORY_OA"
	| 49
	| "TRAVEL"
	| 50
	| "PORTALTAB_GNB_DOT"
	| 51
	| "NEWS_ROW_TAB"
	| 52
	| "GCS_REFRESH"
	| 53
	| "GCS_REFRESH_ALL"
	| 54
	| "ASSET_META_POPUP"
	| 55
	| "AI_FRIENDS"
	| 56
	| "COMMERCE_TW_TAB"
	| 57
	| "PREMIUM_PRODUCT_DEFINITION"
	| 58
	| "DATAMODE";

/** LINE Thrift enum Pb1_EnumC13221w3; values are protocol-level identifiers. */
export type Pb1_EnumC13221w3 = 0 | "UNKNOWN" | 1 | "EUROPEAN_ECONOMIC_AREA";

/** LINE Thrift enum Pb1_EnumC13222w4; values are protocol-level identifiers. */
export type Pb1_EnumC13222w4 =
	| 1
	| "OBS_VIDEO"
	| 2
	| "OBS_GENERAL"
	| 3
	| "OBS_RINGBACK_TONE";

/** LINE Thrift enum Pb1_EnumC13237x5; values are protocol-level identifiers. */
export type Pb1_EnumC13237x5 =
	| 1
	| "AUDIO"
	| 2
	| "VIDEO"
	| 3
	| "LIVE"
	| 4
	| "PHOTOBOOTH";

/** LINE Thrift enum Pb1_EnumC13238x6; values are protocol-level identifiers. */
export type Pb1_EnumC13238x6 =
	| 0
	| "NOT_SPECIFIED"
	| 1
	| "VALID"
	| 2
	| "VERIFICATION_REQUIRED"
	| 3
	| "NOT_PERMITTED"
	| 4
	| "LIMIT_EXCEEDED"
	| 5
	| "LIMIT_EXCEEDED_AND_VERIFICATION_REQUIRED";

/** LINE Thrift enum Pb1_EnumC13251y5; values are protocol-level identifiers. */
export type Pb1_EnumC13251y5 = 1 | "STANDARD" | 2 | "CONSTELLA";

/** LINE Thrift enum Pb1_EnumC13252y6; values are protocol-level identifiers. */
export type Pb1_EnumC13252y6 =
	| 0
	| "ALL"
	| 1
	| "PROFILE"
	| 2
	| "SETTINGS"
	| 3
	| "CONFIGURATIONS"
	| 4
	| "CONTACT"
	| 5
	| "GROUP"
	| 6
	| "E2EE"
	| 7
	| "MESSAGE"
	| 8
	| "MULTI_PROFILE"
	| 9
	| "MESSAGE_REQUEST_BOX"
	| 10
	| "SCHEDULED_MESSAGE";

/** LINE Thrift enum Pb1_EnumC13260z0; values are protocol-level identifiers. */
export type Pb1_EnumC13260z0 = 0 | "ON_AIR" | 1 | "LIVE" | 2 | "GLP";

/** LINE Thrift enum Pb1_EnumC13267z7; values are protocol-level identifiers. */
export type Pb1_EnumC13267z7 = 1 | "NOTIFICATION_SETTING" | 255 | "ALL";

/** LINE Thrift enum Pb1_F0; values are protocol-level identifiers. */
export type Pb1_F0 = 0 | "NA" | 1 | "FRIEND_VIEW" | 2 | "OFFICIAL_ACCOUNT_VIEW";

/** LINE Thrift enum Pb1_F4; values are protocol-level identifiers. */
export type Pb1_F4 = 1 | "INCOMING" | 2 | "OUTGOING";

/** LINE Thrift enum Pb1_F5; values are protocol-level identifiers. */
export type Pb1_F5 =
	| 0
	| "UNKNOWN"
	| 1
	| "SUCCESS"
	| 2
	| "REQUIRE_SERVER_SIDE_EMAIL"
	| 3
	| "REQUIRE_CLIENT_SIDE_EMAIL";

/** LINE Thrift enum Pb1_F6; values are protocol-level identifiers. */
export type Pb1_F6 = 0 | "JBU" | 1 | "LIP";

/** LINE Thrift enum Pb1_G3; values are protocol-level identifiers. */
export type Pb1_G3 =
	| 1
	| "PROMOTION_FRIENDS_INVITE"
	| 2
	| "CAPABILITY_SERVER_SIDE_SMS"
	| 3
	| "LINE_CLIENT_ANALYTICS_CONFIGURATION";

/** LINE Thrift enum Pb1_G4; values are protocol-level identifiers. */
export type Pb1_G4 = 1 | "TIMELINE" | 2 | "NEARBY" | 3 | "SQUARE";

/** LINE Thrift enum Pb1_G6; values are protocol-level identifiers. */
export type Pb1_G6 =
	| 2
	| "NICE"
	| 3
	| "LOVE"
	| 4
	| "FUN"
	| 5
	| "AMAZING"
	| 6
	| "SAD"
	| 7
	| "OMG";

/** LINE Thrift enum Pb1_H6; values are protocol-level identifiers. */
export type Pb1_H6 = 0 | "PUBLIC" | 1 | "PRIVATE";

/** LINE Thrift enum Pb1_I6; values are protocol-level identifiers. */
export type Pb1_I6 = 0 | "NEVER_SHOW" | 1 | "ONE_WAY" | 2 | "MUTUAL";

/** LINE Thrift enum Pb1_J4; values are protocol-level identifiers. */
export type Pb1_J4 =
	| 0
	| "OTHER"
	| 1
	| "INITIALIZATION"
	| 2
	| "PERIODIC_SYNC"
	| 3
	| "MANUAL_SYNC"
	| 4
	| "LOCAL_DB_CORRUPTED";

/** LINE Thrift enum Pb1_K2; values are protocol-level identifiers. */
export type Pb1_K2 =
	| 1
	| "CHANNEL_INFO"
	| 2
	| "CHANNEL_TOKEN"
	| 4
	| "COMMON_DOMAIN"
	| 255
	| "ALL";

/** LINE Thrift enum Pb1_K6; values are protocol-level identifiers. */
export type Pb1_K6 =
	| 1
	| "EMAIL"
	| 2
	| "DISPLAY_NAME"
	| 4
	| "PHONETIC_NAME"
	| 8
	| "PICTURE"
	| 16
	| "STATUS_MESSAGE"
	| 32
	| "ALLOW_SEARCH_BY_USERID"
	| 64
	| "ALLOW_SEARCH_BY_EMAIL"
	| 128
	| "BUDDY_STATUS"
	| 256
	| "MUSIC_PROFILE"
	| 512
	| "AVATAR_PROFILE"
	| 1024
	| "HIDDEN_FROM_LIST"
	| 2147483647
	| "ALL";

/** LINE Thrift enum Pb1_L2; values are protocol-level identifiers. */
export type Pb1_L2 = 0 | "SYNC" | 1 | "REMOVE" | 2 | "REMOVE_ALL";

/** LINE Thrift enum Pb1_L4; values are protocol-level identifiers. */
export type Pb1_L4 =
	| 0
	| "UNKNOWN"
	| 1
	| "REVISION_GAP_TOO_LARGE_CLIENT"
	| 2
	| "REVISION_GAP_TOO_LARGE_SERVER"
	| 3
	| "OPERATION_EXPIRED"
	| 4
	| "REVISION_HOLE"
	| 5
	| "FORCE_TRIGGERED";

/** LINE Thrift enum Pb1_M6; values are protocol-level identifiers. */
export type Pb1_M6 = 0 | "OWNER" | 1 | "FRIEND";

/** LINE Thrift enum Pb1_N6; values are protocol-level identifiers. */
export type Pb1_N6 =
	| 1
	| "NFT"
	| 2
	| "AVATAR"
	| 3
	| "SNOW"
	| 4
	| "ARCZ"
	| 5
	| "FRENZ";

/** LINE Thrift enum Pb1_O2; values are protocol-level identifiers. */
export type Pb1_O2 =
	| 1
	| "NAME"
	| 2
	| "PICTURE_STATUS"
	| 4
	| "PREVENTED_JOIN_BY_TICKET"
	| 8
	| "NOTIFICATION_SETTING"
	| 16
	| "INVITATION_TICKET"
	| 32
	| "FAVORITE_TIMESTAMP"
	| 64
	| "CHAT_TYPE"
	| 128
	| "PENALTY";

/** LINE Thrift enum Pb1_O6; values are protocol-level identifiers. */
export type Pb1_O6 = 1 | "DEFAULT" | 2 | "MULTI_PROFILE";

/** LINE Thrift enum Pb1_P6; values are protocol-level identifiers. */
export type Pb1_P6 = 0 | "HIDDEN" | 1000 | "PUBLIC";

/** LINE Thrift enum Pb1_Q2; values are protocol-level identifiers. */
export type Pb1_Q2 =
	| 0
	| "BACKGROUND"
	| 1
	| "KEYWORD"
	| 2
	| "CONTENT_METADATA_TAG_BASED";

/** LINE Thrift enum Pb1_R3; values are protocol-level identifiers. */
export type Pb1_R3 =
	| 1
	| "BEACON_AGREEMENT"
	| 2
	| "BLUETOOTH"
	| 3
	| "SHAKE_AGREEMENT"
	| 4
	| "AUTO_SUGGEST"
	| 5
	| "CHATROOM_CAPTURE"
	| 6
	| "CHATROOM_MINIMIZEBROWSER"
	| 7
	| "CHATROOM_MOBILESAFARI"
	| 8
	| "VIDEO_HIGHTLIGHT_WIZARD"
	| 9
	| "CHAT_FOLDER"
	| 10
	| "BLUETOOTH_SCAN"
	| 11
	| "AUTO_SUGGEST_FOLLOW_UP"
	| 12
	| "PHISHING_SITE_DETECTION"
	| 13
	| "SMART_STICKER_SUGGEST";

/** LINE Thrift enum Pb1_S7; values are protocol-level identifiers. */
export type Pb1_S7 = 1 | "NONE" | 2 | "ALL";

/** LINE Thrift enum Pb1_T3; values are protocol-level identifiers. */
export type Pb1_T3 =
	| 1
	| "LOCATION_OS"
	| 2
	| "LOCATION_APP"
	| 3
	| "VIDEO_AUTO_PLAY"
	| 4
	| "HNI"
	| 5
	| "AUTO_SUGGEST_LANG"
	| 6
	| "CHAT_EFFECT_CACHED_CONTENT_LIST"
	| 7
	| "IFA"
	| 8
	| "ACCURACY_MODE";

/** LINE Thrift enum Pb1_T7; values are protocol-level identifiers. */
export type Pb1_T7 = 0 | "SYNC" | 1 | "REPORT";

/** LINE Thrift enum Pb1_V7; values are protocol-level identifiers. */
export type Pb1_V7 =
	| 0
	| "UNSPECIFIED"
	| 1
	| "UNKNOWN"
	| 2
	| "INITIALIZATION"
	| 3
	| "OPERATION"
	| 4
	| "FULL_SYNC"
	| 5
	| "AUTO_REPAIR"
	| 6
	| "MANUAL_REPAIR"
	| 7
	| "INTERNAL"
	| 8
	| "USER_INITIATED"
	| 9
	| "PREMIUM_BACKUP_RESTORE";

/** LINE Thrift enum Pb1_W2; values are protocol-level identifiers. */
export type Pb1_W2 = 0 | "ANYONE_IN_CHAT" | 1 | "CREATOR_ONLY" | 2 | "NO_ONE";

/** LINE Thrift enum Pb1_W3; values are protocol-level identifiers. */
export type Pb1_W3 =
	| 0
	| "ILLEGAL_ARGUMENT"
	| 1
	| "AUTHENTICATION_FAILED"
	| 2
	| "INTERNAL_ERROR"
	| 3
	| "RESTORE_KEY_FIRST"
	| 4
	| "NO_BACKUP"
	| 6
	| "INVALID_PIN"
	| 7
	| "PERMANENTLY_LOCKED"
	| 8
	| "INVALID_PASSWORD"
	| 9
	| "MASTER_KEY_CONFLICT"
	| 10
	| "KEY_BACKUP_HEADER_MISMATCH";

/** LINE Thrift enum Pb1_X1; values are protocol-level identifiers. */
export type Pb1_X1 =
	| 0
	| "MESSAGE"
	| 1
	| "MESSAGE_NOTIFICATION"
	| 2
	| "NOTIFICATION_CENTER";

/** LINE Thrift enum Pb1_X2; values are protocol-level identifiers. */
export type Pb1_X2 = 0 | "MESSAGE" | 1 | "NOTE" | 2 | "CHANNEL";

/** LINE Thrift enum Pb1_Z2; values are protocol-level identifiers. */
export type Pb1_Z2 = 0 | "GROUP" | 1 | "ROOM" | 2 | "PEER";

/** LINE Thrift enum Pb1_gd; values are protocol-level identifiers. */
export type Pb1_gd = 1 | "OVER" | 2 | "UNDER" | 3 | "UNDEFINED";

/** LINE Thrift enum Pb1_od; values are protocol-level identifiers. */
export type Pb1_od = 0 | "UNKNOWN" | 1 | "LOCATION";

/** LINE Thrift enum PointErrorCode; values are protocol-level identifiers. */
export type PointErrorCode =
	| 3001
	| "REQUEST_DUPLICATION"
	| 3002
	| "INVALID_PARAMETER"
	| 3003
	| "NOT_ENOUGH_BALANCE"
	| 3004
	| "AUTHENTICATION_FAIL"
	| 3005
	| "API_ACCESS_FORBIDDEN"
	| 3006
	| "MEMBER_ACCOUNT_NOT_FOUND"
	| 3007
	| "SERVICE_ACCOUNT_NOT_FOUND"
	| 3008
	| "TRANSACTION_NOT_FOUND"
	| 3009
	| "ALREADY_REVERSED_TRANSACTION"
	| 3010
	| "MESSAGE_NOT_READABLE"
	| 3011
	| "HTTP_REQUEST_METHOD_NOT_SUPPORTED"
	| 3012
	| "HTTP_MEDIA_TYPE_NOT_SUPPORTED"
	| 3013
	| "NOT_ALLOWED_TO_DEPOSIT"
	| 3014
	| "NOT_ALLOWED_TO_PAY"
	| 3015
	| "TRANSACTION_ACCESS_FORBIDDEN"
	| 4001
	| "INVALID_SERVICE_CONFIGURATION"
	| 5004
	| "DCS_COMMUNICATION_FAIL"
	| 5007
	| "UPDATE_BALANCE_FAIL"
	| 5888
	| "SYSTEM_MAINTENANCE"
	| 5999
	| "SYSTEM_ERROR";

/** LINE Thrift enum Q70_q; values are protocol-level identifiers. */
export type Q70_q = 0 | "UNKNOWN" | 1 | "FACEBOOK" | 2 | "APPLE" | 3 | "GOOGLE";

/** LINE Thrift enum Q70_r; values are protocol-level identifiers. */
export type Q70_r =
	| 0
	| "INTERNAL_ERROR"
	| 1
	| "ILLEGAL_ARGUMENT"
	| 2
	| "VERIFICATION_FAILED"
	| 4
	| "RETRY_LATER"
	| 5
	| "HUMAN_VERIFICATION_REQUIRED"
	| 101
	| "APP_UPGRADE_REQUIRED";

/** LINE Thrift enum Qj_EnumC13584a; values are protocol-level identifiers. */
export type Qj_EnumC13584a =
	| 0
	| "NOT_DETERMINED"
	| 1
	| "RESTRICTED"
	| 2
	| "DENIED"
	| 3
	| "AUTHORIZED";

/** LINE Thrift enum Qj_EnumC13585b; values are protocol-level identifiers. */
export type Qj_EnumC13585b = 1 | "WHITE" | 2 | "BLACK";

/** LINE Thrift enum Qj_EnumC13588e; values are protocol-level identifiers. */
export type Qj_EnumC13588e = 1 | "LIGHT" | 2 | "DARK";

/** LINE Thrift enum Qj_EnumC13592i; values are protocol-level identifiers. */
export type Qj_EnumC13592i =
	| 0
	| "ILLEGAL_ARGUMENT"
	| 1
	| "INTERNAL_ERROR"
	| 2
	| "CONNECTION_ERROR"
	| 3
	| "AUTHENTICATION_FAILED"
	| 4
	| "NEED_PERMISSION_APPROVAL"
	| 5
	| "COIN_NOT_USABLE"
	| 6
	| "WEBVIEW_NOT_ALLOWED";

/** LINE Thrift enum Qj_EnumC13597n; values are protocol-level identifiers. */
export type Qj_EnumC13597n =
	| 1
	| "INVALID_REQUEST"
	| 2
	| "UNAUTHORIZED"
	| 3
	| "CONSENT_REQUIRED"
	| 4
	| "VERSION_UPDATE_REQUIRED"
	| 5
	| "COMPREHENSIVE_AGREEMENT_REQUIRED"
	| 6
	| "SPLASH_SCREEN_REQUIRED"
	| 7
	| "PERMANENT_LINK_INVALID_REQUEST"
	| 8
	| "NO_DESTINATION_URL"
	| 9
	| "SERVICE_ALREADY_TERMINATED"
	| 10
	| "ID_FEDERATION_REQUIRED"
	| 100
	| "SERVER_ERROR";

/** LINE Thrift enum Qj_EnumC13604v; values are protocol-level identifiers. */
export type Qj_EnumC13604v =
	| 1
	| "GEOLOCATION"
	| 2
	| "ADVERTISING_ID"
	| 3
	| "BLUETOOTH_LE"
	| 4
	| "QR_CODE"
	| 5
	| "ADVERTISING_SDK"
	| 6
	| "ADD_TO_HOME"
	| 7
	| "SHARE_TARGET_MESSAGE"
	| 8
	| "VIDEO_AUTO_PLAY"
	| 9
	| "PROFILE_PLUS"
	| 10
	| "SUBWINDOW_OPEN"
	| 11
	| "SUBWINDOW_COMMON_MODULE"
	| 12
	| "NO_LIFF_REFERRER"
	| 13
	| "SKIP_CHANNEL_VERIFICATION_SCREEN"
	| 14
	| "PROVIDER_PAGE"
	| 15
	| "BASIC_AUTH"
	| 16
	| "SIRI_DONATION";

/** LINE Thrift enum Qj_EnumC13605w; values are protocol-level identifiers. */
export type Qj_EnumC13605w =
	| 1
	| "ALLOW_DIRECT_LINK"
	| 2
	| "ALLOW_DIRECT_LINK_V2";

/** LINE Thrift enum Qj_EnumC13606x; values are protocol-level identifiers. */
export type Qj_EnumC13606x =
	| 1
	| "LIGHT"
	| 2
	| "LIGHT_TRANSLUCENT"
	| 3
	| "DARK_TRANSLUCENT"
	| 4
	| "LIGHT_ICON"
	| 5
	| "DARK_ICON";

/** LINE Thrift enum Qj_a0; values are protocol-level identifiers. */
export type Qj_a0 = 1 | "CONCAT" | 2 | "REPLACE";

/** LINE Thrift enum Qj_e0; values are protocol-level identifiers. */
export type Qj_e0 = 0 | "SUCCESS" | 1 | "FAILURE" | 2 | "CANCEL";

/** LINE Thrift enum Qj_h0; values are protocol-level identifiers. */
export type Qj_h0 = 1 | "RIGHT" | 2 | "LEFT";

/** LINE Thrift enum Qj_i0; values are protocol-level identifiers. */
export type Qj_i0 = 1 | "FULL" | 2 | "TALL" | 3 | "COMPACT";

/** LINE Thrift enum R70_e; values are protocol-level identifiers. */
export type R70_e =
	| 0
	| "INTERNAL_ERROR"
	| 1
	| "ILLEGAL_ARGUMENT"
	| 2
	| "VERIFICATION_FAILED"
	| 3
	| "EXTERNAL_SERVICE_UNAVAILABLE"
	| 4
	| "RETRY_LATER"
	| 100
	| "INVALID_CONTEXT"
	| 101
	| "NOT_SUPPORTED"
	| 102
	| "FORBIDDEN"
	| 201
	| "FIDO_RETRY_WITH_ANOTHER_AUTHENTICATOR";

/** LINE Thrift enum RegistrationType; values are protocol-level identifiers. */
export type RegistrationType =
	| 0
	| "PHONE"
	| 1
	| "EMAIL_WAP"
	| 2305
	| "FACEBOOK"
	| 2306
	| "SINA"
	| 2307
	| "RENREN"
	| 2308
	| "FEIXIN"
	| 2309
	| "APPLE"
	| 2310
	| "YAHOOJAPAN"
	| 2311
	| "GOOGLE";

/** LINE Thrift enum ReportType; values are protocol-level identifiers. */
export type ReportType =
	| 1
	| "ADVERTISING"
	| 2
	| "GENDER_HARASSMENT"
	| 3
	| "HARASSMENT"
	| 4
	| "OTHER"
	| 5
	| "IRRELEVANT_CONTENT"
	| 6
	| "IMPERSONATION"
	| 7
	| "SCAM";

/** LINE Thrift enum S70_a; values are protocol-level identifiers. */
export type S70_a =
	| 0
	| "INTERNAL_ERROR"
	| 1
	| "ILLEGAL_ARGUMENT"
	| 2
	| "VERIFICATION_FAILED"
	| 3
	| "RETRY_LATER"
	| 100
	| "INVALID_CONTEXT"
	| 101
	| "APP_UPGRADE_REQUIRED";

/** LINE Thrift enum SettingsAttributeEx; values are protocol-level identifiers. */
export type SettingsAttributeEx =
	| 0
	| "NOTIFICATION_ENABLE"
	| 1
	| "NOTIFICATION_MUTE_EXPIRATION"
	| 2
	| "NOTIFICATION_NEW_MESSAGE"
	| 3
	| "NOTIFICATION_GROUP_INVITATION"
	| 4
	| "NOTIFICATION_SHOW_MESSAGE"
	| 5
	| "NOTIFICATION_INCOMING_CALL"
	| 6
	| "PRIVACY_SYNC_CONTACTS"
	| 7
	| "PRIVACY_SEARCH_BY_PHONE_NUMBER"
	| 8
	| "NOTIFICATION_SOUND_MESSAGE"
	| 9
	| "NOTIFICATION_SOUND_GROUP"
	| 10
	| "CONTACT_MY_TICKET"
	| 11
	| "IDENTITY_PROVIDER"
	| 12
	| "IDENTITY_IDENTIFIER"
	| 13
	| "PRIVACY_SEARCH_BY_USERID"
	| 14
	| "PRIVACY_SEARCH_BY_EMAIL"
	| 15
	| "PREFERENCE_LOCALE"
	| 16
	| "NOTIFICATION_DISABLED_WITH_SUB"
	| 17
	| "NOTIFICATION_PAYMENT"
	| 18
	| "SECURITY_CENTER_SETTINGS"
	| 19
	| "SNS_ACCOUNT"
	| 20
	| "PHONE_REGISTRATION"
	| 21
	| "PRIVACY_ALLOW_SECONDARY_DEVICE_LOGIN"
	| 22
	| "CUSTOM_MODE"
	| 23
	| "PRIVACY_PROFILE_IMAGE_POST_TO_MYHOME"
	| 24
	| "EMAIL_CONFIRMATION_STATUS"
	| 25
	| "PRIVACY_RECV_MESSAGES_FROM_NOT_FRIEND"
	| 26
	| "PRIVACY_AGREE_USE_LINECOIN_TO_PAIDCALL"
	| 27
	| "PRIVACY_AGREE_USE_PAIDCALL"
	| 28
	| "ACCOUNT_MIGRATION_PINCODE"
	| 29
	| "ENFORCED_INPUT_ACCOUNT_MIGRATION_PINCODE"
	| 30
	| "PRIVACY_ALLOW_FRIEND_REQUEST"
	| 31
	| "PWLESS_PRIMARY_CREDENTIAL_REGISTRATION"
	| 32
	| "ALLOWED_TO_CONNECT_EAP_ACCOUNT"
	| 33
	| "E2EE_ENABLE"
	| 34
	| "HITOKOTO_BACKUP_REQUESTED"
	| 35
	| "PRIVACY_PROFILE_MUSIC_POST_TO_MYHOME"
	| 36
	| "CONTACT_ALLOW_FOLLOWING"
	| 37
	| "PRIVACY_ALLOW_NEARBY"
	| 38
	| "AGREEMENT_NEARBY"
	| 39
	| "AGREEMENT_SQUARE"
	| 40
	| "NOTIFICATION_MENTION"
	| 41
	| "ALLOW_UNREGISTRATION_SECONDARY_DEVICE"
	| 42
	| "AGREEMENT_BOT_USE"
	| 43
	| "AGREEMENT_SHAKE_FUNCTION"
	| 44
	| "AGREEMENT_MOBILE_CONTACT_NAME"
	| 45
	| "NOTIFICATION_THUMBNAIL"
	| 46
	| "AGREEMENT_SOUND_TO_TEXT"
	| 47
	| "AGREEMENT_PRIVACY_POLICY_VERSION"
	| 48
	| "AGREEMENT_AD_BY_WEB_ACCESS"
	| 49
	| "AGREEMENT_PHONE_NUMBER_MATCHING"
	| 50
	| "AGREEMENT_COMMUNICATION_INFO"
	| 51
	| "PRIVACY_SHARE_PERSONAL_INFO_TO_FRIENDS"
	| 52
	| "AGREEMENT_THINGS_WIRELESS_COMMUNICATION"
	| 53
	| "AGREEMENT_GDPR"
	| 54
	| "PRIVACY_STATUS_MESSAGE_HISTORY"
	| 55
	| "AGREEMENT_PROVIDE_LOCATION"
	| 56
	| "AGREEMENT_BEACON"
	| 57
	| "PRIVACY_PROFILE_HISTORY"
	| 58
	| "AGREEMENT_CONTENTS_SUGGEST"
	| 59
	| "AGREEMENT_CONTENTS_SUGGEST_DATA_COLLECTION"
	| 60
	| "PRIVACY_AGE_RESULT"
	| 61
	| "PRIVACY_AGE_RESULT_RECEIVED"
	| 62
	| "AGREEMENT_OCR_IMAGE_COLLECTION"
	| 63
	| "PRIVACY_ALLOW_FOLLOW"
	| 64
	| "PRIVACY_SHOW_FOLLOW_LIST"
	| 65
	| "NOTIFICATION_BADGE_TALK_ONLY"
	| 66
	| "AGREEMENT_ICNA"
	| 67
	| "NOTIFICATION_REACTION"
	| 68
	| "AGREEMENT_MID"
	| 69
	| "HOME_NOTIFICATION_NEW_FRIEND"
	| 70
	| "HOME_NOTIFICATION_FAVORITE_FRIEND_UPDATE"
	| 71
	| "HOME_NOTIFICATION_GROUP_MEMBER_UPDATE"
	| 72
	| "HOME_NOTIFICATION_BIRTHDAY"
	| 73
	| "AGREEMENT_LINE_OUT_USE"
	| 74
	| "AGREEMENT_LINE_OUT_PROVIDE_INFO"
	| 75
	| "NOTIFICATION_SHOW_PROFILE_IMAGE"
	| 76
	| "AGREEMENT_PDPA"
	| 77
	| "AGREEMENT_LOCATION_VERSION"
	| 78
	| "ALLOWED_TO_SHOW_ZHD_PAGE"
	| 79
	| "AGREEMENT_SNOW_AI_AVATAR"
	| 80
	| "EAP_ONLY_ACCOUNT_TARGET_COUNTRY"
	| 81
	| "AGREEMENT_LYP_PREMIUM_ALBUM"
	| 82
	| "AGREEMENT_LYP_PREMIUM_ALBUM_VERSION"
	| 83
	| "AGREEMENT_ALBUM_USAGE_DATA"
	| 84
	| "AGREEMENT_ALBUM_USAGE_DATA_VERSION"
	| 85
	| "AGREEMENT_LYP_PREMIUM_BACKUP"
	| 86
	| "AGREEMENT_LYP_PREMIUM_BACKUP_VERSION"
	| 87
	| "AGREEMENT_OA_AI_ASSISTANT"
	| 88
	| "AGREEMENT_OA_AI_ASSISTANT_VERSION"
	| 89
	| "AGREEMENT_LYP_PREMIUM_MULTI_PROFILE"
	| 90
	| "AGREEMENT_LYP_PREMIUM_MULTI_PROFILE_VERSION"
	| 91
	| "AGREEMENT_PREMIUM_BACKUP_PREMIUM_TYPE"
	| 92
	| "AGREEMENT_PDP"
	| 93
	| "AGREEMENT_PREMIUM_ALBUM_PREMIUM_TYPE"
	| 94
	| "HOME_NOTIFICATION_NOTE_NOTE_LIKE"
	| 95
	| "HOME_NOTIFICATION_NOTE_COMMENT"
	| 96
	| "HOME_NOTIFICATION_NOTE_COMMENT_LIKE"
	| 97
	| "HOME_NOTIFICATION_NOTE_MENTION"
	| 98
	| "AGREEMENT_IN_APP_PURCHASE"
	| 99
	| "AGREEMENT_IN_APP_PURCHASE_VERSION"
	| 100
	| "HOME_NOTIFICATION_ALBUM_LIKE"
	| 101
	| "AGREEMENT_TRIGGER_MESSAGE"
	| 102
	| "AGREEMENT_LYP_PREMIUM_UNSEND"
	| 103
	| "AGREEMENT_LYP_PREMIUM_UNSEND_VERSION"
	| 104
	| "AGREEMENT_LYP_PREMIUM_MESSAGE_EDIT"
	| 105
	| "AGREEMENT_LYP_PREMIUM_MESSAGE_EDIT_VERSION"
	| 106
	| "NOTIFICATION_NOTE_REACTION"
	| 107
	| "NOTIFICATION_NOTE_COMMENT"
	| 108
	| "NOTIFICATION_NOTE_COMMENT_LIKE"
	| 109
	| "NOTIFICATION_NOTE_MENTION"
	| 110
	| "NOTIFICATION_ALBUM_LIKE"
	| 111
	| "PHONE_NUMBER_DELETE_ENABLE"
	| 112
	| "AGREEMENT_LYP_PREMIUM_MESSAGE_SCHEDULING"
	| 113
	| "AGREEMENT_LYP_PREMIUM_MESSAGE_SCHEDULING_VERSION"
	| 114
	| "SECURITY_CARD_REQUIRED"
	| 115
	| "AGREEMENT_LYP_PREMIUM_MESSAGE_SCHEDULING_PREMIUM_TYPE"
	| 116
	| "LAB_MESSAGE_EDIT"
	| 117
	| "LAB_FRIENDS_MANAGEMENT"
	| 118
	| "AGREEMENT_LYP_PREMIUM_MUTE_MESSAGE"
	| 119
	| "AGREEMENT_LYP_PREMIUM_MUTE_MESSAGE_VERSION"
	| 120
	| "AGREEMENT_LYP_PREMIUM_MUTE_MESSAGE_PREMIUM_TYPE";

/** LINE Thrift enum SnsIdType; values are protocol-level identifiers. */
export type SnsIdType =
	| 1
	| "FACEBOOK"
	| 2
	| "SINA"
	| 3
	| "RENREN"
	| 4
	| "FEIXIN"
	| 5
	| "BBM"
	| 6
	| "APPLE"
	| 7
	| "YAHOOJAPAN"
	| 8
	| "GOOGLE";

/** LINE Thrift enum SpammerReason; values are protocol-level identifiers. */
export type SpammerReason =
	| 0
	| "OTHER"
	| 1
	| "ADVERTISING"
	| 2
	| "GENDER_HARASSMENT"
	| 3
	| "HARASSMENT"
	| 4
	| "IMPERSONATION"
	| 5
	| "SCAM";

/** LINE Thrift enum SpotCategory; values are protocol-level identifiers. */
export type SpotCategory =
	| 0
	| "UNKNOWN"
	| 1
	| "GOURMET"
	| 2
	| "BEAUTY"
	| 3
	| "TRAVEL"
	| 4
	| "SHOPPING"
	| 5
	| "ENTERTAINMENT"
	| 6
	| "SPORTS"
	| 7
	| "TRANSPORT"
	| 8
	| "LIFE"
	| 9
	| "HOSPITAL"
	| 10
	| "FINANCE"
	| 11
	| "EDUCATION"
	| 12
	| "OTHER"
	| 10000
	| "ALL";

/** LINE Thrift enum SquareAttribute; values are protocol-level identifiers. */
export type SquareAttribute =
	| 1
	| "NAME"
	| 2
	| "WELCOME_MESSAGE"
	| 3
	| "PROFILE_IMAGE"
	| 4
	| "DESCRIPTION"
	| 6
	| "SEARCHABLE"
	| 7
	| "CATEGORY"
	| 8
	| "INVITATION_URL"
	| 9
	| "ABLE_TO_USE_INVITATION_URL"
	| 10
	| "STATE"
	| 11
	| "EMBLEMS"
	| 12
	| "JOIN_METHOD"
	| 13
	| "CHANNEL_ID"
	| 14
	| "SVC_TAGS"
	| 15
	| "BENEFIT_KEYWORDS"
	| 16
	| "SNEAK_PEEK_CONTENTS"
	| 17
	| "EXPIRE_AT"
	| 18
	| "PROVIDER";

/** LINE Thrift enum SquareAuthorityAttribute; values are protocol-level identifiers. */
export type SquareAuthorityAttribute =
	| 1
	| "UPDATE_SQUARE_PROFILE"
	| 2
	| "INVITE_NEW_MEMBER"
	| 3
	| "APPROVE_JOIN_REQUEST"
	| 4
	| "CREATE_POST"
	| 5
	| "CREATE_OPEN_SQUARE_CHAT"
	| 6
	| "DELETE_SQUARE_CHAT_OR_POST"
	| 7
	| "REMOVE_SQUARE_MEMBER"
	| 8
	| "GRANT_ROLE"
	| 9
	| "ENABLE_INVITATION_TICKET"
	| 10
	| "CREATE_CHAT_ANNOUNCEMENT"
	| 11
	| "UPDATE_MAX_CHAT_MEMBER_COUNT"
	| 12
	| "USE_READONLY_DEFAULT_CHAT"
	| 13
	| "SEND_ALL_MENTION";

/** LINE Thrift enum SquareChatType; values are protocol-level identifiers. */
export type SquareChatType =
	| 1
	| "OPEN"
	| 2
	| "SECRET"
	| 3
	| "ONE_ON_ONE"
	| 4
	| "SQUARE_DEFAULT";

/** LINE Thrift enum SquareMemberAttribute; values are protocol-level identifiers. */
export type SquareMemberAttribute =
	| 1
	| "DISPLAY_NAME"
	| 2
	| "PROFILE_IMAGE"
	| 3
	| "ABLE_TO_RECEIVE_MESSAGE"
	| 5
	| "MEMBERSHIP_STATE"
	| 6
	| "ROLE"
	| 7
	| "PREFERENCE"
	| 8
	| "SELF_INTRODUCTION"
	| 9
	| "SOCIAL_MEDIA_ACCOUNT_URLS";

/** LINE Thrift enum SquareMembershipState; values are protocol-level identifiers. */
export type SquareMembershipState =
	| 1
	| "JOIN_REQUESTED"
	| 2
	| "JOINED"
	| 3
	| "REJECTED"
	| 4
	| "LEFT"
	| 5
	| "KICK_OUT"
	| 6
	| "BANNED"
	| 7
	| "DELETED"
	| 8
	| "JOIN_REQUEST_WITHDREW"
	| 9
	| "JOIN_RESERVED"
	| 10
	| "JOIN_RESERVATION_EXPIRED";

/** LINE Thrift enum StickerResourceType; values are protocol-level identifiers. */
export type StickerResourceType =
	| 1
	| "STATIC"
	| 2
	| "ANIMATION"
	| 3
	| "SOUND"
	| 4
	| "ANIMATION_SOUND"
	| 5
	| "POPUP"
	| 6
	| "POPUP_SOUND"
	| 7
	| "NAME_TEXT"
	| 8
	| "PER_STICKER_TEXT";

/** LINE Thrift enum SyncCategory; values are protocol-level identifiers. */
export type SyncCategory =
	| 0
	| "PROFILE"
	| 1
	| "SETTINGS"
	| 2
	| "OPS"
	| 3
	| "CONTACT"
	| 4
	| "RECOMMEND"
	| 5
	| "BLOCK"
	| 6
	| "GROUP"
	| 7
	| "ROOM"
	| 8
	| "NOTIFICATION"
	| 9
	| "ADDRESS_BOOK"
	| 10
	| "MULTI_PROFILE";

/** LINE Thrift enum T70_C; values are protocol-level identifiers. */
export type T70_C =
	| 0
	| "INITIAL_BACKUP_STATE_UNSPECIFIED"
	| 1
	| "INITIAL_BACKUP_STATE_READY"
	| 2
	| "INITIAL_BACKUP_STATE_MESSAGE_ONGOING"
	| 3
	| "INITIAL_BACKUP_STATE_FINISHED"
	| 4
	| "INITIAL_BACKUP_STATE_ABORTED"
	| 5
	| "INITIAL_BACKUP_STATE_MEDIA_ONGOING";

/** LINE Thrift enum T70_EnumC14390b; values are protocol-level identifiers. */
export type T70_EnumC14390b = 0 | "UNKNOWN" | 1 | "PHONE_NUMBER" | 2 | "EMAIL";

/** LINE Thrift enum T70_EnumC14392c; values are protocol-level identifiers. */
export type T70_EnumC14392c =
	| 0
	| "UNKNOWN"
	| 1
	| "SKIP"
	| 2
	| "PASSWORD"
	| 3
	| "WEB_BASED"
	| 4
	| "EMAIL_BASED"
	| 11
	| "NONE";

/** LINE Thrift enum T70_EnumC14406j; values are protocol-level identifiers. */
export type T70_EnumC14406j =
	| 0
	| "INTERNAL_ERROR"
	| 1
	| "ILLEGAL_ARGUMENT"
	| 2
	| "VERIFICATION_FAILED"
	| 3
	| "NOT_FOUND"
	| 4
	| "RETRY_LATER"
	| 5
	| "HUMAN_VERIFICATION_REQUIRED"
	| 100
	| "INVALID_CONTEXT"
	| 101
	| "APP_UPGRADE_REQUIRED";

/** LINE Thrift enum T70_K; values are protocol-level identifiers. */
export type T70_K = 0 | "UNKNOWN" | 1 | "SMS" | 2 | "IVR" | 3 | "SMSPULL";

/** LINE Thrift enum T70_L; values are protocol-level identifiers. */
export type T70_L =
	| 0
	| "PREMIUM_TYPE_UNSPECIFIED"
	| 1
	| "PREMIUM_TYPE_LYP"
	| 2
	| "PREMIUM_TYPE_LINE";

/** LINE Thrift enum T70_Z0; values are protocol-level identifiers. */
export type T70_Z0 = 1 | "PHONE_VERIF" | 2 | "EAP_VERIF";

/** LINE Thrift enum T70_e1; values are protocol-level identifiers. */
export type T70_e1 = 0 | "UNKNOWN" | 1 | "SKIP" | 2 | "WEB_BASED";

/** LINE Thrift enum T70_j1; values are protocol-level identifiers. */
export type T70_j1 =
	| 0
	| "UNKNOWN"
	| 1
	| "FACEBOOK"
	| 2
	| "APPLE"
	| 3
	| "GOOGLE";

/** LINE Thrift enum U70_c; values are protocol-level identifiers. */
export type U70_c =
	| 0
	| "INTERNAL_ERROR"
	| 1
	| "FORBIDDEN"
	| 100
	| "INVALID_CONTEXT";

/** LINE Thrift enum Uf_EnumC14873o; values are protocol-level identifiers. */
export type Uf_EnumC14873o = 1 | "ANDROID" | 2 | "IOS";

/** LINE Thrift enum VR0_l; values are protocol-level identifiers. */
export type VR0_l = 1 | "DEFAULT" | 2 | "UEN";

/** LINE Thrift enum VerificationMethod; values are protocol-level identifiers. */
export type VerificationMethod =
	| 0
	| "NO_AVAILABLE"
	| 1
	| "PIN_VIA_SMS"
	| 2
	| "CALLERID_INDIGO"
	| 4
	| "PIN_VIA_TTS"
	| 10
	| "SKIP";

/** LINE Thrift enum VerificationResult; values are protocol-level identifiers. */
export type VerificationResult =
	| 0
	| "FAILED"
	| 1
	| "OK_NOT_REGISTERED_YET"
	| 2
	| "OK_REGISTERED_WITH_SAME_DEVICE"
	| 3
	| "OK_REGISTERED_WITH_ANOTHER_DEVICE";

/** LINE Thrift enum WR0_a; values are protocol-level identifiers. */
export type WR0_a = 1 | "FREE" | 2 | "PREMIUM";

/** LINE Thrift enum a80_EnumC16644b; values are protocol-level identifiers. */
export type a80_EnumC16644b =
	| 0
	| "UNKNOWN"
	| 1
	| "FACEBOOK"
	| 2
	| "APPLE"
	| 3
	| "GOOGLE";

/** LINE Thrift enum FetchDirection; values are protocol-level identifiers. */
export type FetchDirection = 1 | "FORWARD" | 2 | "BACKWARD";

/** LINE Thrift enum LiveTalkEventType; values are protocol-level identifiers. */
export type LiveTalkEventType =
	| 1
	| "NOTIFIED_UPDATE_LIVE_TALK_TITLE"
	| 2
	| "NOTIFIED_UPDATE_LIVE_TALK_ANNOUNCEMENT"
	| 3
	| "NOTIFIED_UPDATE_SQUARE_MEMBER_ROLE"
	| 4
	| "NOTIFIED_UPDATE_LIVE_TALK_ALLOW_REQUEST_TO_SPEAK"
	| 5
	| "NOTIFIED_UPDATE_SQUARE_MEMBER";

/** LINE Thrift enum LiveTalkReportType; values are protocol-level identifiers. */
export type LiveTalkReportType =
	| 1
	| "ADVERTISING"
	| 2
	| "GENDER_HARASSMENT"
	| 3
	| "HARASSMENT"
	| 4
	| "IRRELEVANT_CONTENT"
	| 5
	| "OTHER"
	| 6
	| "IMPERSONATION"
	| 7
	| "SCAM";

/** LINE Thrift enum MessageSummaryReportType; values are protocol-level identifiers. */
export type MessageSummaryReportType =
	| 1
	| "LEGAL_VIOLATION"
	| 2
	| "HARASSMENT"
	| 3
	| "PERSONAL_IDENTIFIER"
	| 4
	| "FALSE_INFORMATION"
	| 5
	| "GENDER_HARASSMENT"
	| 6
	| "OTHER";

/** LINE Thrift enum NotificationPostType; values are protocol-level identifiers. */
export type NotificationPostType =
	| 2
	| "POST_MENTION"
	| 3
	| "POST_LIKE"
	| 4
	| "POST_COMMENT"
	| 5
	| "POST_COMMENT_MENTION"
	| 6
	| "POST_COMMENT_LIKE"
	| 7
	| "POST_RELAY_JOIN";

/** LINE Thrift enum SquareEventStatus; values are protocol-level identifiers. */
export type SquareEventStatus = 1 | "NORMAL" | 2 | "ALERT_DISABLED";

/** LINE Thrift enum SquareEventType; values are protocol-level identifiers. */
export type SquareEventType =
	| 0
	| "RECEIVE_MESSAGE"
	| 1
	| "SEND_MESSAGE"
	| 2
	| "NOTIFIED_JOIN_SQUARE_CHAT"
	| 3
	| "NOTIFIED_INVITE_INTO_SQUARE_CHAT"
	| 4
	| "NOTIFIED_LEAVE_SQUARE_CHAT"
	| 5
	| "NOTIFIED_DESTROY_MESSAGE"
	| 6
	| "NOTIFIED_MARK_AS_READ"
	| 7
	| "NOTIFIED_UPDATE_SQUARE_MEMBER_PROFILE"
	| 8
	| "NOTIFIED_UPDATE_SQUARE"
	| 9
	| "NOTIFIED_UPDATE_SQUARE_STATUS"
	| 10
	| "NOTIFIED_UPDATE_SQUARE_AUTHORITY"
	| 11
	| "NOTIFIED_UPDATE_SQUARE_MEMBER"
	| 12
	| "NOTIFIED_UPDATE_SQUARE_CHAT"
	| 13
	| "NOTIFIED_UPDATE_SQUARE_CHAT_STATUS"
	| 14
	| "NOTIFIED_UPDATE_SQUARE_CHAT_MEMBER"
	| 15
	| "NOTIFIED_CREATE_SQUARE_MEMBER"
	| 16
	| "NOTIFIED_CREATE_SQUARE_CHAT_MEMBER"
	| 17
	| "NOTIFIED_UPDATE_SQUARE_MEMBER_RELATION"
	| 18
	| "NOTIFIED_SHUTDOWN_SQUARE"
	| 19
	| "NOTIFIED_KICKOUT_FROM_SQUARE"
	| 20
	| "NOTIFIED_DELETE_SQUARE_CHAT"
	| 21
	| "NOTIFICATION_JOIN_REQUEST"
	| 22
	| "NOTIFICATION_JOINED"
	| 23
	| "NOTIFICATION_PROMOTED_COADMIN"
	| 24
	| "NOTIFICATION_PROMOTED_ADMIN"
	| 25
	| "NOTIFICATION_DEMOTED_MEMBER"
	| 26
	| "NOTIFICATION_KICKED_OUT"
	| 27
	| "NOTIFICATION_SQUARE_DELETE"
	| 28
	| "NOTIFICATION_SQUARE_CHAT_DELETE"
	| 29
	| "NOTIFICATION_MESSAGE"
	| 30
	| "NOTIFIED_UPDATE_SQUARE_CHAT_PROFILE_NAME"
	| 31
	| "NOTIFIED_UPDATE_SQUARE_CHAT_PROFILE_IMAGE"
	| 32
	| "NOTIFIED_UPDATE_SQUARE_FEATURE_SET"
	| 33
	| "NOTIFIED_ADD_BOT"
	| 34
	| "NOTIFIED_REMOVE_BOT"
	| 36
	| "NOTIFIED_UPDATE_SQUARE_NOTE_STATUS"
	| 37
	| "NOTIFIED_UPDATE_SQUARE_CHAT_ANNOUNCEMENT"
	| 38
	| "NOTIFIED_UPDATE_SQUARE_CHAT_MAX_MEMBER_COUNT"
	| 39
	| "NOTIFICATION_POST_ANNOUNCEMENT"
	| 40
	| "NOTIFICATION_POST"
	| 41
	| "MUTATE_MESSAGE"
	| 42
	| "NOTIFICATION_NEW_CHAT_MEMBER"
	| 43
	| "NOTIFIED_UPDATE_READONLY_CHAT"
	| 46
	| "NOTIFIED_UPDATE_MESSAGE_STATUS"
	| 47
	| "NOTIFICATION_MESSAGE_REACTION"
	| 48
	| "NOTIFIED_CHAT_POPUP"
	| 49
	| "NOTIFIED_SYSTEM_MESSAGE"
	| 50
	| "NOTIFIED_UPDATE_SQUARE_CHAT_FEATURE_SET"
	| 51
	| "NOTIFIED_UPDATE_LIVE_TALK"
	| 52
	| "NOTIFICATION_LIVE_TALK"
	| 53
	| "NOTIFIED_UPDATE_LIVE_TALK_INFO"
	| 54
	| "NOTIFICATION_THREAD_MESSAGE"
	| 55
	| "NOTIFICATION_THREAD_MESSAGE_REACTION"
	| 56
	| "NOTIFIED_UPDATE_THREAD"
	| 57
	| "NOTIFIED_UPDATE_THREAD_STATUS"
	| 58
	| "NOTIFIED_UPDATE_THREAD_MEMBER"
	| 59
	| "NOTIFIED_UPDATE_THREAD_ROOT_MESSAGE"
	| 60
	| "NOTIFIED_UPDATE_THREAD_ROOT_MESSAGE_STATUS"
	| 61
	| "NOTIFIED_CREATE_SQUARE_SUBSCRIPTION"
	| 62
	| "NOTIFIED_UPDATE_SQUARE_SUBSCRIPTION";

/** LINE Thrift enum AdScreen; values are protocol-level identifiers. */
export type AdScreen =
	| 1
	| "CHATROOM"
	| 2
	| "THREAD_SPACE"
	| 3
	| "YOUR_THREADS"
	| 4
	| "NOTE_LIST"
	| 5
	| "NOTE_END"
	| 6
	| "WEB_MAIN"
	| 7
	| "WEB_SEARCH_RESULT";

/** LINE Thrift enum BooleanState; values are protocol-level identifiers. */
export type BooleanState = 0 | "NONE" | 1 | "OFF" | 2 | "ON";

/** LINE Thrift enum ChatroomPopupType; values are protocol-level identifiers. */
export type ChatroomPopupType =
	| 1
	| "IMG_TEXT"
	| 2
	| "TEXT_ONLY"
	| 3
	| "IMG_ONLY";

/** LINE Thrift enum ContentsAttribute; values are protocol-level identifiers. */
export type ContentsAttribute = 1 | "NONE" | 2 | "CONTENTS_HIDDEN";

/** LINE Thrift enum FetchType; values are protocol-level identifiers. */
export type FetchType =
	| 1
	| "DEFAULT"
	| 2
	| "PREFETCH_BY_SERVER"
	| 3
	| "PREFETCH_BY_CLIENT";

/** LINE Thrift enum LiveTalkAttribute; values are protocol-level identifiers. */
export type LiveTalkAttribute = 1 | "TITLE" | 2 | "ALLOW_REQUEST_TO_SPEAK";

/** LINE Thrift enum LiveTalkRole; values are protocol-level identifiers. */
export type LiveTalkRole = 1 | "HOST" | 2 | "CO_HOST" | 3 | "GUEST";

/** LINE Thrift enum LiveTalkSpeakerSetting; values are protocol-level identifiers. */
export type LiveTalkSpeakerSetting = 1 | "APPROVAL" | 2 | "ALL";

/** LINE Thrift enum LiveTalkType; values are protocol-level identifiers. */
export type LiveTalkType = 1 | "PUBLIC" | 2 | "PRIVATE";

/** LINE Thrift enum MessageReactionType; values are protocol-level identifiers. */
export type MessageReactionType =
	| 0
	| "ALL"
	| 1
	| "UNDO"
	| 2
	| "NICE"
	| 3
	| "LOVE"
	| 4
	| "FUN"
	| 5
	| "AMAZING"
	| 6
	| "SAD"
	| 7
	| "OMG";

/** LINE Thrift enum NotifiedMessageType; values are protocol-level identifiers. */
export type NotifiedMessageType = 1 | "MENTION" | 2 | "REPLY";

/** LINE Thrift enum PopupAttribute; values are protocol-level identifiers. */
export type PopupAttribute =
	| 1
	| "NAME"
	| 2
	| "ACTIVATED"
	| 3
	| "STARTS_AT"
	| 4
	| "ENDS_AT"
	| 5
	| "CONTENT";

/** LINE Thrift enum PopupType; values are protocol-level identifiers. */
export type PopupType = 1 | "MAIN" | 2 | "CHATROOM";

/** LINE Thrift enum SquareChatAttribute; values are protocol-level identifiers. */
export type SquareChatAttribute =
	| 2
	| "NAME"
	| 3
	| "SQUARE_CHAT_IMAGE"
	| 4
	| "STATE"
	| 5
	| "TYPE"
	| 6
	| "MAX_MEMBER_COUNT"
	| 7
	| "MESSAGE_VISIBILITY"
	| 8
	| "ABLE_TO_SEARCH_MESSAGE";

/** LINE Thrift enum SquareChatFeatureControlState; values are protocol-level identifiers. */
export type SquareChatFeatureControlState = 1 | "DISABLED" | 2 | "ENABLED";

/** LINE Thrift enum SquareChatMemberAttribute; values are protocol-level identifiers. */
export type SquareChatMemberAttribute =
	| 4
	| "MEMBERSHIP_STATE"
	| 6
	| "NOTIFICATION_MESSAGE"
	| 7
	| "NOTIFICATION_NEW_MEMBER"
	| 8
	| "LEFT_BY_KICK_MESSAGE_LOCAL_ID"
	| 9
	| "MESSAGE_LOCAL_ID_WHEN_BLOCK";

/** LINE Thrift enum SquareChatMembershipState; values are protocol-level identifiers. */
export type SquareChatMembershipState =
	| 1
	| "JOINED"
	| 2
	| "LEFT"
	| 3
	| "JOIN_RESERVED"
	| 4
	| "JOIN_RESERVATION_EXPIRED";

/** LINE Thrift enum SquareChatState; values are protocol-level identifiers. */
export type SquareChatState = 0 | "ALIVE" | 1 | "DELETED" | 2 | "SUSPENDED";

/** LINE Thrift enum SquareEmblem; values are protocol-level identifiers. */
export type SquareEmblem = 1 | "SUPER" | 2 | "OFFICIAL";

/** LINE Thrift enum SquareErrorCode; values are protocol-level identifiers. */
export type SquareErrorCode =
	| 0
	| "UNKNOWN"
	| 400
	| "ILLEGAL_ARGUMENT"
	| 401
	| "AUTHENTICATION_FAILURE"
	| 403
	| "FORBIDDEN"
	| 404
	| "NOT_FOUND"
	| 409
	| "REVISION_MISMATCH"
	| 410
	| "PRECONDITION_FAILED"
	| 500
	| "INTERNAL_ERROR"
	| 501
	| "NOT_IMPLEMENTED"
	| 503
	| "TRY_AGAIN_LATER"
	| 505
	| "MAINTENANCE"
	| 506
	| "NO_PRESENCE_EXISTS";

/** LINE Thrift enum SquareFeatureControlState; values are protocol-level identifiers. */
export type SquareFeatureControlState = 1 | "DISABLED" | 2 | "ENABLED";

/** LINE Thrift enum SquareFeatureSetAttribute; values are protocol-level identifiers. */
export type SquareFeatureSetAttribute =
	| 1
	| "CREATING_SECRET_SQUARE_CHAT"
	| 2
	| "INVITING_INTO_OPEN_SQUARE_CHAT"
	| 3
	| "CREATING_SQUARE_CHAT"
	| 4
	| "READONLY_DEFAULT_CHAT"
	| 5
	| "SHOWING_ADVERTISEMENT"
	| 6
	| "DELEGATE_JOIN_TO_PLUG"
	| 7
	| "DELEGATE_KICK_OUT_TO_PLUG"
	| 8
	| "DISABLE_UPDATE_JOIN_METHOD"
	| 9
	| "DISABLE_TRANSFER_ADMIN"
	| 10
	| "CREATING_LIVE_TALK"
	| 11
	| "DISABLE_UPDATE_SEARCHABLE"
	| 12
	| "SUMMARIZING_MESSAGES"
	| 13
	| "CREATING_SQUARE_THREAD"
	| 14
	| "ENABLE_SQUARE_THREAD"
	| 15
	| "DISABLE_CHANGE_ROLE_CO_ADMIN";

/** LINE Thrift enum SquareJoinMethodType; values are protocol-level identifiers. */
export type SquareJoinMethodType = 0 | "NONE" | 1 | "APPROVAL" | 2 | "CODE";

/** LINE Thrift enum SquareMemberRelationState; values are protocol-level identifiers. */
export type SquareMemberRelationState = 1 | "NONE" | 2 | "BLOCKED";

/** LINE Thrift enum SquareMemberRole; values are protocol-level identifiers. */
export type SquareMemberRole = 1 | "ADMIN" | 2 | "CO_ADMIN" | 10 | "MEMBER";

/** LINE Thrift enum SquareMessageState; values are protocol-level identifiers. */
export type SquareMessageState =
	| 1
	| "SENT"
	| 2
	| "DELETED"
	| 3
	| "FORBIDDEN"
	| 4
	| "UNSENT";

/** LINE Thrift enum SquareMetadataAttribute; values are protocol-level identifiers. */
export type SquareMetadataAttribute = 1 | "EXCLUDED" | 2 | "NO_AD";

/** LINE Thrift enum SquarePreferenceAttribute; values are protocol-level identifiers. */
export type SquarePreferenceAttribute =
	| 1
	| "FAVORITE"
	| 2
	| "NOTI_FOR_NEW_JOIN_REQUEST";

/** LINE Thrift enum SquareProviderType; values are protocol-level identifiers. */
export type SquareProviderType =
	| 0
	| "NONE"
	| 1
	| "UNKNOWN"
	| 2
	| "YOUTUBE"
	| 3
	| "OA_FANSPACE"
	| 4
	| "OA_SHOP";

/** LINE Thrift enum SquareState; values are protocol-level identifiers. */
export type SquareState = 0 | "ALIVE" | 1 | "DELETED" | 2 | "SUSPENDED";

/** LINE Thrift enum SquareThreadAttribute; values are protocol-level identifiers. */
export type SquareThreadAttribute =
	| 1
	| "STATE"
	| 2
	| "EXPIRES_AT"
	| 3
	| "READ_ONLY_AT";

/** LINE Thrift enum SquareThreadMembershipState; values are protocol-level identifiers. */
export type SquareThreadMembershipState = 1 | "JOINED" | 2 | "LEFT";

/** LINE Thrift enum SquareThreadState; values are protocol-level identifiers. */
export type SquareThreadState = 1 | "ALIVE" | 2 | "DELETED";

/** LINE Thrift enum SquareType; values are protocol-level identifiers. */
export type SquareType = 0 | "CLOSED" | 1 | "OPEN";

/** LINE Thrift enum TargetChatType; values are protocol-level identifiers. */
export type TargetChatType =
	| 0
	| "ALL"
	| 1
	| "MIDS"
	| 2
	| "CATEGORIES"
	| 3
	| "CHANNEL_ID";

/** LINE Thrift enum TargetUserType; values are protocol-level identifiers. */
export type TargetUserType = 0 | "ALL" | 1 | "MIDS";

/** LINE Thrift enum do0_EnumC23139B; values are protocol-level identifiers. */
export type do0_EnumC23139B = 1 | "CLOUD" | 2 | "BLE" | 3 | "BEACON";

/** LINE Thrift enum do0_EnumC23147e; values are protocol-level identifiers. */
export type do0_EnumC23147e =
	| 0
	| "SUCCESS"
	| 1
	| "UNKNOWN_ERROR"
	| 2
	| "BLUETOOTH_NOT_AVAILABLE"
	| 3
	| "CONNECTION_TIMEOUT"
	| 4
	| "CONNECTION_ERROR"
	| 5
	| "CONNECTION_IN_PROGRESS";

/** LINE Thrift enum do0_EnumC23148f; values are protocol-level identifiers. */
export type do0_EnumC23148f = 0 | "ONETIME" | 1 | "AUTOMATIC" | 2 | "BEACON";

/** LINE Thrift enum do0_G; values are protocol-level identifiers. */
export type do0_G =
	| 0
	| "SUCCESS"
	| 1
	| "UNKNOWN_ERROR"
	| 2
	| "GATT_ERROR"
	| 3
	| "GATT_OPERATION_NOT_SUPPORTED"
	| 4
	| "GATT_SERVICE_NOT_FOUND"
	| 5
	| "GATT_CHARACTERISTIC_NOT_FOUND"
	| 6
	| "GATT_CONNECTION_CLOSED"
	| 7
	| "CONNECTION_INVALID";

/** LINE Thrift enum do0_M; values are protocol-level identifiers. */
export type do0_M =
	| 0
	| "INTERNAL_SERVER_ERROR"
	| 1
	| "UNAUTHORIZED"
	| 2
	| "INVALID_REQUEST"
	| 3
	| "INVALID_STATE"
	| 4096
	| "DEVICE_LIMIT_EXCEEDED"
	| 4097
	| "UNSUPPORTED_REGION";

/** LINE Thrift enum fN0_EnumC24466B; values are protocol-level identifiers. */
export type fN0_EnumC24466B = 0 | "LINE_PREMIUM" | 1 | "LYP_PREMIUM";

/** LINE Thrift enum fN0_EnumC24467C; values are protocol-level identifiers. */
export type fN0_EnumC24467C = 1 | "LINE" | 2 | "YAHOO_JAPAN";

/** LINE Thrift enum fN0_EnumC24469a; values are protocol-level identifiers. */
export type fN0_EnumC24469a =
	| 1
	| "OK"
	| 2
	| "NOT_SUPPORTED"
	| 3
	| "UNDEFINED"
	| 4
	| "NOT_ENOUGH_TICKETS"
	| 5
	| "NOT_FRIENDS"
	| 6
	| "NO_AGREEMENT";

/** LINE Thrift enum fN0_F; values are protocol-level identifiers. */
export type fN0_F =
	| 1
	| "OK"
	| 2
	| "NOT_SUPPORTED"
	| 3
	| "UNDEFINED"
	| 4
	| "CONFLICT"
	| 5
	| "NOT_AVAILABLE"
	| 6
	| "INVALID_INVITATION"
	| 7
	| "IN_PAYMENT_FAILURE_STATE";

/** LINE Thrift enum fN0_G; values are protocol-level identifiers. */
export type fN0_G = 1 | "APPLE" | 2 | "GOOGLE";

/** LINE Thrift enum fN0_H; values are protocol-level identifiers. */
export type fN0_H =
	| 1
	| "INACTIVE"
	| 2
	| "ACTIVE_FINITE"
	| 3
	| "ACTIVE_INFINITE";

/** LINE Thrift enum fN0_o; values are protocol-level identifiers. */
export type fN0_o = 1 | "AVAILABLE" | 2 | "ALREADY_SUBSCRIBED";

/** LINE Thrift enum fN0_p; values are protocol-level identifiers. */
export type fN0_p =
	| 0
	| "UNKNOWN"
	| 1
	| "SOFTBANK_BUNDLE"
	| 2
	| "YBB_BUNDLE"
	| 3
	| "YAHOO_MOBILE_BUNDLE"
	| 4
	| "PPCG_BUNDLE"
	| 5
	| "ENJOY_BUNDLE"
	| 6
	| "YAHOO_TRIAL_BUNDLE"
	| 7
	| "YAHOO_APPLE"
	| 8
	| "YAHOO_GOOGLE"
	| 9
	| "LINE_APPLE"
	| 10
	| "LINE_GOOGLE"
	| 11
	| "YAHOO_WALLET";

/** LINE Thrift enum fN0_q; values are protocol-level identifiers. */
export type fN0_q =
	| 0
	| "UNKNOWN"
	| 1
	| "NONE"
	| 16641
	| "ILLEGAL_ARGUMENT"
	| 16642
	| "NOT_FOUND"
	| 16643
	| "NOT_AVAILABLE"
	| 16644
	| "INTERNAL_SERVER_ERROR"
	| 16645
	| "AUTHENTICATION_FAILED";

/** LINE Thrift enum g80_EnumC24993a; values are protocol-level identifiers. */
export type g80_EnumC24993a =
	| 0
	| "INTERNAL_ERROR"
	| 1
	| "ILLEGAL_ARGUMENT"
	| 2
	| "INVALID_CONTEXT"
	| 3
	| "TOO_MANY_REQUESTS";

/** LINE Thrift enum h80_EnumC25645e; values are protocol-level identifiers. */
export type h80_EnumC25645e =
	| 0
	| "INTERNAL_ERROR"
	| 1
	| "ILLEGAL_ARGUMENT"
	| 2
	| "NOT_FOUND"
	| 3
	| "RETRY_LATER"
	| 100
	| "INVALID_CONTEXT"
	| 101
	| "NOT_SUPPORTED";

/** LINE Thrift enum I80_EnumC26392b; values are protocol-level identifiers. */
export type I80_EnumC26392b =
	| 0
	| "UNKNOWN"
	| 1
	| "SKIP"
	| 2
	| "PASSWORD"
	| 4
	| "EMAIL_BASED"
	| 11
	| "NONE";

/** LINE Thrift enum I80_EnumC26394c; values are protocol-level identifiers. */
export type I80_EnumC26394c = 0 | "PHONE_NUMBER" | 1 | "APPLE" | 2 | "GOOGLE";

/** LINE Thrift enum I80_EnumC26408j; values are protocol-level identifiers. */
export type I80_EnumC26408j =
	| 0
	| "INTERNAL_ERROR"
	| 1
	| "ILLEGAL_ARGUMENT"
	| 2
	| "VERIFICATION_FAILED"
	| 3
	| "NOT_FOUND"
	| 4
	| "RETRY_LATER"
	| 5
	| "HUMAN_VERIFICATION_REQUIRED"
	| 100
	| "INVALID_CONTEXT"
	| 101
	| "APP_UPGRADE_REQUIRED";

/** LINE Thrift enum I80_EnumC26425y; values are protocol-level identifiers. */
export type I80_EnumC26425y = 0 | "UNKNOWN" | 1 | "SMS" | 2 | "IVR";

/** LINE Thrift enum j80_EnumC27228a; values are protocol-level identifiers. */
export type j80_EnumC27228a =
	| 1
	| "AUTHENTICATION_FAILED"
	| 2
	| "INVALID_STATE"
	| 3
	| "NOT_AUTHORIZED_DEVICE"
	| 4
	| "MUST_REFRESH_V3_TOKEN";

/** LINE Thrift enum jO0_EnumC27533B; values are protocol-level identifiers. */
export type jO0_EnumC27533B = 1 | "PAYMENT_APPLE" | 2 | "PAYMENT_GOOGLE";

/** LINE Thrift enum jO0_EnumC27535b; values are protocol-level identifiers. */
export type jO0_EnumC27535b =
	| 0
	| "ILLEGAL_ARGUMENT"
	| 1
	| "AUTHENTICATION_FAILED"
	| 20
	| "INTERNAL_ERROR"
	| 29
	| "MESSAGE_DEFINED_ERROR"
	| 33
	| "MAINTENANCE_ERROR";

/** LINE Thrift enum jO0_EnumC27559z; values are protocol-level identifiers. */
export type jO0_EnumC27559z =
	| 0
	| "PAYMENT_PG_NONE"
	| 1
	| "PAYMENT_PG_AU"
	| 2
	| "PAYMENT_PG_AL";

/** LINE Thrift enum jf_EnumC27712a; values are protocol-level identifiers. */
export type jf_EnumC27712a =
	| 1
	| "NONE"
	| 2
	| "DOES_NOT_RESPOND"
	| 3
	| "RESPOND_MANUALLY"
	| 4
	| "RESPOND_AUTOMATICALLY";

/** LINE Thrift enum jf_EnumC27717f; values are protocol-level identifiers. */
export type jf_EnumC27717f =
	| 0
	| "UNKNOWN"
	| 1
	| "BAD_REQUEST"
	| 2
	| "NOT_FOUND"
	| 3
	| "FORBIDDEN"
	| 4
	| "INTERNAL_SERVER_ERROR";

/** LINE Thrift enum kf_EnumC28766a; values are protocol-level identifiers. */
export type kf_EnumC28766a =
	| 0
	| "ILLEGAL_ARGUMENT"
	| 1
	| "INTERNAL_ERROR"
	| 2
	| "UNAUTHORIZED";

/** LINE Thrift enum kf_o; values are protocol-level identifiers. */
export type kf_o = 0 | "ANDROID" | 1 | "IOS";

/** LINE Thrift enum kf_p; values are protocol-level identifiers. */
export type kf_p = 0 | "RICHMENU" | 1 | "TALK_ROOM";

/** LINE Thrift enum kf_r; values are protocol-level identifiers. */
export type kf_r = 0 | "WEB" | 1 | "POSTBACK" | 2 | "SEND_MESSAGE";

/** LINE Thrift enum kf_u; values are protocol-level identifiers. */
export type kf_u = 0 | "CLICK" | 1 | "IMPRESSION";

/** LINE Thrift enum kf_x; values are protocol-level identifiers. */
export type kf_x =
	| 0
	| "UNKNOWN"
	| 1
	| "PROFILE"
	| 2
	| "TALK_LIST"
	| 3
	| "OA_CALL";

/** LINE Thrift enum n80_o; values are protocol-level identifiers. */
export type n80_o =
	| 0
	| "INTERNAL_ERROR"
	| 100
	| "INVALID_CONTEXT"
	| 200
	| "FIDO_UNKNOWN_CREDENTIAL_ID"
	| 201
	| "FIDO_RETRY_WITH_ANOTHER_AUTHENTICATOR"
	| 202
	| "FIDO_UNACCEPTABLE_CONTENT"
	| 203
	| "FIDO_INVALID_REQUEST";

/** LINE Thrift enum o80_e; values are protocol-level identifiers. */
export type o80_e =
	| 0
	| "INTERNAL_ERROR"
	| 1
	| "VERIFICATION_FAILED"
	| 2
	| "LOGIN_NOT_ALLOWED"
	| 3
	| "EXTERNAL_SERVICE_UNAVAILABLE"
	| 4
	| "RETRY_LATER"
	| 100
	| "NOT_SUPPORTED"
	| 101
	| "ILLEGAL_ARGUMENT"
	| 102
	| "INVALID_CONTEXT"
	| 103
	| "FORBIDDEN"
	| 200
	| "FIDO_UNKNOWN_CREDENTIAL_ID"
	| 201
	| "FIDO_RETRY_WITH_ANOTHER_AUTHENTICATOR"
	| 202
	| "FIDO_UNACCEPTABLE_CONTENT"
	| 203
	| "FIDO_INVALID_REQUEST";

/** LINE Thrift enum og_E; values are protocol-level identifiers. */
export type og_E = 1 | "RUNNING" | 2 | "CLOSING" | 3 | "CLOSED" | 4 | "SUSPEND";

/** LINE Thrift enum og_EnumC32661b; values are protocol-level identifiers. */
export type og_EnumC32661b = 0 | "INACTIVE" | 1 | "ACTIVE";

/** LINE Thrift enum og_EnumC32663d; values are protocol-level identifiers. */
export type og_EnumC32663d = 0 | "PREMIUM" | 1 | "VERIFIED" | 2 | "UNVERIFIED";

/** LINE Thrift enum og_EnumC32671l; values are protocol-level identifiers. */
export type og_EnumC32671l =
	| 0
	| "ILLEGAL_ARGUMENT"
	| 1
	| "AUTHENTICATION_FAILED"
	| 3
	| "INVALID_STATE"
	| 5
	| "NOT_FOUND"
	| 20
	| "INTERNAL_ERROR"
	| 33
	| "MAINTENANCE_ERROR";

/** LINE Thrift enum og_G; values are protocol-level identifiers. */
export type og_G = 0 | "FREE" | 1 | "MONTHLY" | 2 | "PER_PAYMENT";

/** LINE Thrift enum og_I; values are protocol-level identifiers. */
export type og_I =
	| 0
	| "OK"
	| 1
	| "REACHED_TIER_LIMIT"
	| 2
	| "REACHED_MEMBER_LIMIT"
	| 3
	| "ALREADY_JOINED"
	| 4
	| "NOT_SUPPORTED_LINE_VERSION"
	| 5
	| "BOT_USER_REGION_IS_NOT_MATCH";

/** LINE Thrift enum q80_EnumC33651c; values are protocol-level identifiers. */
export type q80_EnumC33651c =
	| 0
	| "INTERNAL_ERROR"
	| 1
	| "ILLEGAL_ARGUMENT"
	| 2
	| "VERIFICATION_FAILED"
	| 3
	| "NOT_ALLOWED_QR_CODE_LOGIN"
	| 4
	| "VERIFICATION_NOTICE_FAILED"
	| 5
	| "RETRY_LATER"
	| 100
	| "INVALID_CONTEXT"
	| 101
	| "APP_UPGRADE_REQUIRED";

/** LINE Thrift enum qm_EnumC34112e; values are protocol-level identifiers. */
export type qm_EnumC34112e =
	| 1
	| "BUTTON"
	| 2
	| "ENTRY_SELECTED"
	| 3
	| "BROADCAST_ENTER"
	| 4
	| "BROADCAST_LEAVE"
	| 5
	| "BROADCAST_STAY";

/** LINE Thrift enum qm_s; values are protocol-level identifiers. */
export type qm_s =
	| 0
	| "ILLEGAL_ARGUMENT"
	| 5
	| "NOT_FOUND"
	| 20
	| "INTERNAL_ERROR";

/** LINE Thrift enum r80_EnumC34361a; values are protocol-level identifiers. */
export type r80_EnumC34361a = 1 | "PERSONAL_ACCOUNT" | 2 | "CURRENT_ACCOUNT";

/** LINE Thrift enum r80_EnumC34362b; values are protocol-level identifiers. */
export type r80_EnumC34362b =
	| 1
	| "BANK_ALL"
	| 2
	| "BANK_DEPOSIT"
	| 3
	| "BANK_WITHDRAWAL";

/** LINE Thrift enum r80_EnumC34365e; values are protocol-level identifiers. */
export type r80_EnumC34365e =
	| 1
	| "BANK"
	| 2
	| "ATM"
	| 3
	| "CONVENIENCE_STORE"
	| 4
	| "DEBIT_CARD"
	| 5
	| "E_CHANNEL"
	| 6
	| "VIRTUAL_BANK_ACCOUNT"
	| 7
	| "AUTO"
	| 8
	| "CVS_LAWSON"
	| 9
	| "SEVEN_BANK_DEPOSIT"
	| 10
	| "CODE_DEPOSIT";

/** LINE Thrift enum r80_EnumC34367g; values are protocol-level identifiers. */
export type r80_EnumC34367g =
	| 0
	| "AVAILABLE"
	| 1
	| "DIFFERENT_REGION"
	| 2
	| "UNSUPPORTED_DEVICE"
	| 3
	| "PHONE_NUMBER_UNREGISTERED"
	| 4
	| "UNAVAILABLE_FROM_LINE_PAY"
	| 5
	| "INVALID_USER";

/** LINE Thrift enum r80_EnumC34368h; values are protocol-level identifiers. */
export type r80_EnumC34368h = 1 | "CHARGE" | 2 | "WITHDRAW";

/** LINE Thrift enum r80_EnumC34370j; values are protocol-level identifiers. */
export type r80_EnumC34370j =
	| 0
	| "UNKNOWN"
	| 1
	| "VISA"
	| 2
	| "MASTER"
	| 3
	| "AMEX"
	| 4
	| "DINERS"
	| 5
	| "JCB";

/** LINE Thrift enum r80_EnumC34371k; values are protocol-level identifiers. */
export type r80_EnumC34371k = 0 | "NULL" | 1 | "ATM" | 2 | "CONVENIENCE_STORE";

/** LINE Thrift enum r80_EnumC34372l; values are protocol-level identifiers. */
export type r80_EnumC34372l =
	| 1
	| "SCALE2"
	| 2
	| "SCALE3"
	| 3
	| "HDPI"
	| 4
	| "XHDPI";

/** LINE Thrift enum r80_EnumC34374n; values are protocol-level identifiers. */
export type r80_EnumC34374n =
	| 0
	| "SUCCESS"
	| 1000
	| "GENERAL_USER_ERROR"
	| 1101
	| "ACCOUNT_NOT_EXISTS"
	| 1102
	| "ACCOUNT_INVALID_STATUS"
	| 1103
	| "ACCOUNT_ALREADY_EXISTS"
	| 1104
	| "MERCHANT_NOT_EXISTS"
	| 1105
	| "MERCHANT_INVALID_STATUS"
	| 1107
	| "AGREEMENT_REQUIRED"
	| 1108
	| "BLACKLISTED"
	| 1109
	| "WRONG_PASSWORD"
	| 1110
	| "INVALID_CREDIT_CARD"
	| 1111
	| "LIMIT_EXCEEDED"
	| 1115
	| "CANNOT_PROCEED"
	| 1120
	| "TOO_WEAK_PASSWORD"
	| 1125
	| "CANNOT_CREATE_ACCOUNT"
	| 1130
	| "TEMPORARY_PASSWORD_ERROR"
	| 1140
	| "MISSING_PARAMETERS"
	| 1141
	| "NO_VALID_MYCODE_ACCOUNT"
	| 1142
	| "INSUFFICIENT_BALANCE"
	| 1150
	| "TRANSACTION_NOT_FOUND"
	| 1152
	| "TRANSACTION_FINISHED"
	| 1153
	| "PAYMENT_AMOUNT_WRONG"
	| 1157
	| "BALANCE_ACCOUNT_NOT_EXISTS"
	| 1158
	| "DUPLICATED_CITIZEN_ID"
	| 1159
	| "PAYMENT_REQUEST_NOT_FOUND"
	| 1169
	| "AUTH_FAILED"
	| 1171
	| "PASSWORD_SETTING_REQUIRED"
	| 1172
	| "TRANSACTION_ALREADY_PROCESSED"
	| 1178
	| "CURRENCY_NOT_SUPPORTED"
	| 1180
	| "PAYMENT_NOT_AVAILABLE"
	| 1181
	| "TRANSFER_REQUEST_NOT_FOUND"
	| 1183
	| "INVALID_PAYMENT_AMOUNT"
	| 1184
	| "INSUFFICIENT_PAYMENT_AMOUNT"
	| 1185
	| "EXTERNAL_SYSTEM_MAINTENANCE"
	| 1186
	| "EXTERNAL_SYSTEM_INOPERATIONAL"
	| 1192
	| "SESSION_EXPIRED"
	| 1195
	| "UPGRADE_REQUIRED"
	| 1196
	| "REQUEST_TOKEN_EXPIRED"
	| 1198
	| "OPERATION_FINISHED"
	| 1199
	| "EXTERNAL_SYSTEM_ERROR"
	| 1299
	| "PARTIAL_AMOUNT_APPROVED"
	| 1600
	| "PINCODE_AUTH_REQUIRED"
	| 1601
	| "ADDITIONAL_AUTH_REQUIRED"
	| 1603
	| "NOT_BOUND"
	| 1610
	| "OTP_USER_REGISTRATION_ERROR"
	| 1611
	| "OTP_CARD_REGISTRATION_ERROR"
	| 1612
	| "NO_AUTH_METHOD"
	| 1696
	| "GENERAL_USER_ERROR_RESTART"
	| 1697
	| "GENERAL_USER_ERROR_REFRESH"
	| 1698
	| "GENERAL_USER_ERROR_CLOSE"
	| 9000
	| "INTERNAL_SERVER_ERROR"
	| 9999
	| "INTERNAL_SYSTEM_MAINTENANCE"
	| 10000
	| "UNKNOWN_ERROR";

/** LINE Thrift enum r80_EnumC34376p; values are protocol-level identifiers. */
export type r80_EnumC34376p =
	| 1
	| "TRANSFER"
	| 2
	| "TRANSFER_REQUEST"
	| 3
	| "DUTCH"
	| 4
	| "INVITATION";

/** LINE Thrift enum r80_EnumC34377q; values are protocol-level identifiers. */
export type r80_EnumC34377q =
	| 0
	| "NULL"
	| 1
	| "UNIDEN"
	| 2
	| "WAIT"
	| 3
	| "IDENTIFIED"
	| 4
	| "CHECKING";

/** LINE Thrift enum r80_EnumC34378s; values are protocol-level identifiers. */
export type r80_EnumC34378s =
	| 0
	| "UNKNOWN"
	| 1
	| "MORE_TAB"
	| 2
	| "CHAT_ROOM_PLUS_MENU"
	| 3
	| "TRANSFER"
	| 4
	| "PAYMENT"
	| 5
	| "LINECARD"
	| 6
	| "INVITATION";

/** LINE Thrift enum r80_e0; values are protocol-level identifiers. */
export type r80_e0 =
	| 0
	| "NONE"
	| 1
	| "ONE_TIME_PAYMENT_AGREEMENT"
	| 2
	| "SIMPLE_JOINING_AGREEMENT"
	| 3
	| "LINE_CARD_CASH_AGREEMENT"
	| 4
	| "LINE_CARD_MONEY_AGREEMENT"
	| 5
	| "JOINING_WITH_LINE_CARD_AGREEMENT"
	| 6
	| "LINE_CARD_AGREEMENT";

/** LINE Thrift enum r80_g0; values are protocol-level identifiers. */
export type r80_g0 =
	| 0
	| "NULL"
	| 1
	| "ATM"
	| 2
	| "CONVENIENCE_STORE"
	| 3
	| "ALL";

/** LINE Thrift enum r80_h0; values are protocol-level identifiers. */
export type r80_h0 =
	| 1
	| "READY"
	| 2
	| "COMPLETE"
	| 3
	| "WAIT"
	| 4
	| "CANCEL"
	| 5
	| "FAIL"
	| 6
	| "EXPIRE"
	| 7
	| "ALL";

/** LINE Thrift enum r80_i0; values are protocol-level identifiers. */
export type r80_i0 =
	| 1
	| "TRANSFER_ACCEPTABLE"
	| 2
	| "REMOVE_INVOICE"
	| 3
	| "INVOICE_CODE"
	| 4
	| "SHOW_ALWAYS_INVOICE";

/** LINE Thrift enum r80_m0; values are protocol-level identifiers. */
export type r80_m0 =
	| 1
	| "OK"
	| 2
	| "NOT_ALIVE_USER"
	| 3
	| "NEED_BALANCE_DISCLAIMER"
	| 4
	| "ECONTEXT_CHARGING_IN_PROGRESS"
	| 6
	| "TRANSFER_IN_PROGRESS"
	| 7
	| "OK_REMAINING_BALANCE"
	| 8
	| "ADVERSE_BALANCE"
	| 9
	| "CONFIRM_REQUIRED";

/** LINE Thrift enum r80_n0; values are protocol-level identifiers. */
export type r80_n0 = 1 | "LINE" | 2 | "LINEPAY";

/** LINE Thrift enum r80_r; values are protocol-level identifiers. */
export type r80_r =
	| 1
	| "CITIZEN_ID"
	| 2
	| "PASSPORT"
	| 3
	| "WORK_PERMIT"
	| 4
	| "ALIEN_CARD";

/** LINE Thrift enum t80_h; values are protocol-level identifiers. */
export type t80_h = 1 | "CLIENT" | 2 | "SERVER";

/** LINE Thrift enum t80_i; values are protocol-level identifiers. */
export type t80_i =
	| 1
	| "APP_INSTANCE_LOCAL"
	| 2
	| "APP_TYPE_LOCAL"
	| 3
	| "GLOBAL";

/** LINE Thrift enum t80_n; values are protocol-level identifiers. */
export type t80_n =
	| 0
	| "UNKNOWN"
	| 1
	| "NONE"
	| 16641
	| "ILLEGAL_ARGUMENT"
	| 16642
	| "NOT_FOUND"
	| 16643
	| "NOT_AVAILABLE"
	| 16644
	| "TOO_LARGE_VALUE"
	| 16645
	| "CLOCK_DRIFT_DETECTED"
	| 16646
	| "UNSUPPORTED_APPLICATION_TYPE"
	| 16647
	| "DUPLICATED_ENTRY"
	| 16897
	| "AUTHENTICATION_FAILED"
	| 20737
	| "INTERNAL_SERVER_ERROR"
	| 20738
	| "SERVICE_IN_MAINTENANCE_MODE"
	| 20739
	| "SERVICE_UNAVAILABLE";

/** LINE Thrift enum t80_r; values are protocol-level identifiers. */
export type t80_r =
	| 1
	| "USER_ACTION"
	| 2
	| "DATA_OUTDATED"
	| 3
	| "APP_MIGRATION"
	| 100
	| "OTHER";

/** LINE Thrift enum vh_EnumC37632c; values are protocol-level identifiers. */
export type vh_EnumC37632c = 1 | "ACTIVE" | 2 | "INACTIVE";

/** LINE Thrift enum vh_m; values are protocol-level identifiers. */
export type vh_m = 1 | "SAFE" | 2 | "NOT_SAFE";

/** LINE Thrift enum wm_EnumC38497a; values are protocol-level identifiers. */
export type wm_EnumC38497a =
	| 0
	| "UNKNOWN"
	| 1
	| "BOT_NOT_FOUND"
	| 2
	| "BOT_NOT_AVAILABLE"
	| 3
	| "NOT_A_MEMBER"
	| 4
	| "SQUARECHAT_NOT_FOUND"
	| 5
	| "FORBIDDEN"
	| 400
	| "ILLEGAL_ARGUMENT"
	| 401
	| "AUTHENTICATION_FAILED"
	| 500
	| "INTERNAL_ERROR";

/** LINE Thrift enum zR0_EnumC40578c; values are protocol-level identifiers. */
export type zR0_EnumC40578c = 0 | "FOREGROUND" | 1 | "BACKGROUND";

/** LINE Thrift enum zR0_EnumC40579d; values are protocol-level identifiers. */
export type zR0_EnumC40579d = 1 | "STICKER" | 2 | "THEME" | 3 | "STICON";

/** LINE Thrift enum zR0_h; values are protocol-level identifiers. */
export type zR0_h = 0 | "NORMAL" | 1 | "BIG";

/** LINE Thrift enum zR0_j; values are protocol-level identifiers. */
export type zR0_j =
	| 0
	| "UNKNOWN"
	| 1
	| "NONE"
	| 16641
	| "ILLEGAL_ARGUMENT"
	| 16642
	| "NOT_FOUND"
	| 16643
	| "NOT_AVAILABLE"
	| 16897
	| "AUTHENTICATION_FAILED"
	| 20737
	| "INTERNAL_SERVER_ERROR"
	| 20739
	| "SERVICE_UNAVAILABLE";

/** LINE Thrift enum zf_EnumC40713a; values are protocol-level identifiers. */
export type zf_EnumC40713a =
	| 1
	| "PERSONAL"
	| 2
	| "ROOM"
	| 3
	| "GROUP"
	| 4
	| "SQUARE_CHAT";

/** LINE Thrift enum zf_EnumC40715c; values are protocol-level identifiers. */
export type zf_EnumC40715c = 1 | "REGULAR" | 2 | "PRIORITY" | 3 | "MORE";

/** LINE Thrift enum zf_EnumC40716d; values are protocol-level identifiers. */
export type zf_EnumC40716d =
	| 1
	| "INVALID_REQUEST"
	| 2
	| "UNAUTHORIZED"
	| 100
	| "SERVER_ERROR";

/** Wire-format fields for the LINE Thrift struct AccessTokenRefreshException. */
export interface AccessTokenRefreshException {
	errorCode: P70_g;
	reasonCode: Int64;
}

/** Wire-format fields for the LINE Thrift struct AccountEapConnectException. */
export interface AccountEapConnectException {
	code: Q70_r;
	alertMessage: string;
	webAuthDetails: WebAuthDetails;
}

/** Wire-format fields for the LINE Thrift struct I80_C26390a. */
export interface I80_C26390a {
	code: I80_EnumC26408j;
	alertMessage: string;
	webAuthDetails: I80_K0;
}

/** Wire-format fields for the LINE Thrift struct AuthException. */
export interface AuthException {
	code: T70_EnumC14406j;
	alertMessage: string;
	webAuthDetails: WebAuthDetails;
}

/** Wire-format fields for the LINE Thrift struct BotException. */
export interface BotException {
	errorCode: wm_EnumC38497a;
	reason: string;
	parameterMap: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct BotExternalException. */
export interface BotExternalException {
	errorCode: kf_EnumC28766a;
	reason: string;
}

/** Wire-format fields for the LINE Thrift struct ChannelException. */
export interface ChannelException {
	code: ChannelErrorCode;
	reason: string;
	parameterMap: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct ChannelPaakAuthnException. */
export interface ChannelPaakAuthnException {
	code: n80_o;
	errorMessage: string;
}

/** Wire-format fields for the LINE Thrift struct ChatappException. */
export interface ChatappException {
	code: zf_EnumC40716d;
	reason: string;
}

/** Wire-format fields for the LINE Thrift struct CoinException. */
export interface CoinException {
	code: jO0_EnumC27535b;
	reason: string;
	parameterMap: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct CollectionException. */
export interface CollectionException {
	code: Ob1_EnumC12664u;
	reason: string;
	parameterMap: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct E2EEKeyBackupException. */
export interface E2EEKeyBackupException {
	code: Pb1_W3;
	reason: string;
	parameterMap: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct ExcessiveRequestItemException. */
export interface ExcessiveRequestItemException {
	max_size: number;
	hint: string;
}

/** Wire-format fields for the LINE Thrift struct HomeException. */
export interface HomeException {
	exceptionCode: Fg_a;
	message: string;
	retryTimeMillis: Int64;
}

/** Wire-format fields for the LINE Thrift struct LFLPremiumException. */
export interface LFLPremiumException {
	code: AR0_g;
}

/** Wire-format fields for the LINE Thrift struct LiffChannelException. */
export interface LiffChannelException {
	code: Qj_EnumC13592i;
	reason: string;
	parameterMap: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct LiffException. */
export interface LiffException {
	code: Qj_EnumC13597n;
	message: string;
	payload: Qj_C13599p;
}

/** Wire-format fields for the LINE Thrift struct MembershipException. */
export interface MembershipException {
	code: og_EnumC32671l;
	reason: string;
	parameterMap: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct OaChatException. */
export interface OaChatException {
	code: jf_EnumC27717f;
	reason: string;
	parameterMap: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct PasswordUpdateException. */
export interface PasswordUpdateException {
	errorCode: U70_c;
	errorMessage: string;
}

/** Wire-format fields for the LINE Thrift struct PaymentException. */
export interface PaymentException {
	errorCode: r80_EnumC34374n;
	debugReason: string;
	serverDefinedMessage: string;
	errorDetailMap: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct PointException. */
export interface PointException {
	code: PointErrorCode;
	reason: string;
	extra: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct PremiumException. */
export interface PremiumException {
	code: fN0_q;
	reason: string;
}

/** Wire-format fields for the LINE Thrift struct PrimaryQrCodeMigrationException. */
export interface PrimaryQrCodeMigrationException {
	code: h80_EnumC25645e;
	errorMessage: string;
}

/** Wire-format fields for the LINE Thrift struct PwlessCredentialException. */
export interface PwlessCredentialException {
	code: R70_e;
	alertMessage: string;
}

/** Wire-format fields for the LINE Thrift struct RejectedException. */
export interface RejectedException {
	rejectionReason: LN0_F0;
	hint: string;
}

/** Wire-format fields for the LINE Thrift struct SeamlessLoginException. */
export interface SeamlessLoginException {
	code: g80_EnumC24993a;
	errorMessage: string;
	errorTitle: string;
}

/** Wire-format fields for the LINE Thrift struct SecondAuthFactorPinCodeException. */
export interface SecondAuthFactorPinCodeException {
	code: S70_a;
	alertMessage: string;
}

/** Wire-format fields for the LINE Thrift struct SecondaryPwlessLoginException. */
export interface SecondaryPwlessLoginException {
	code: o80_e;
	alertMessage: string;
}

/** Wire-format fields for the LINE Thrift struct SecondaryQrCodeException. */
export interface SecondaryQrCodeException {
	code: q80_EnumC33651c;
	alertMessage: string;
}

/** Wire-format fields for the LINE Thrift struct ServerFailureException. */
export interface ServerFailureException {
	hint: string;
}

/** Wire-format fields for the LINE Thrift struct SettingsException. */
export interface SettingsException {
	code: t80_n;
	reason: string;
	parameters: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct ShopException. */
export interface ShopException {
	code: Ob1_EnumC12652p1;
	reason: string;
	parameterMap: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct SquareException. */
export interface SquareException {
	errorCode: SquareErrorCode;
	errorExtraInfo: ErrorExtraInfo;
	reason: string;
}

/** Wire-format fields for the LINE Thrift struct SuggestTrialException. */
export interface SuggestTrialException {
	code: zR0_j;
	reason: string;
	parameterMap: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct TalkException. */
export interface TalkException {
	code: ErrorCode;
	reason: string;
	parameterMap: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct ThingsException. */
export interface ThingsException {
	code: do0_M;
	reason: string;
}

/** Wire-format fields for the LINE Thrift struct TokenAuthException. */
export interface TokenAuthException {
	code: j80_EnumC27228a;
	reason: string;
}

/** Wire-format fields for the LINE Thrift struct WalletException. */
export interface WalletException {
	code: NZ0_EnumC12193o1;
	reason: string;
	attributes: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct m80_C30146a. */
export interface m80_C30146a {
}

/** Wire-format fields for the LINE Thrift struct m80_b. */
export interface m80_b {
}

/** Wire-format fields for the LINE Thrift struct AD. */
export interface AD {
	body: string;
	priority: Priority;
	lossUrl: string;
}

/** Wire-format fields for the LINE Thrift struct AR0_o. */
export interface AR0_o {
	sticker: any;
}

/** Wire-format fields for the LINE Thrift struct AbuseMessage. */
export interface AbuseMessage {
	messageId: Int64;
	message: string;
	senderMid: string;
	contentType: ContentType;
	createdTime: Int64;
	metadata: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct AbuseReport. */
export interface AbuseReport {
	reportSource: Pb1_EnumC13128p7;
	applicationType: ApplicationType;
	spammerReasons: number[];
	abuseMessages: AbuseMessage[];
	metadata: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct AbuseReportLineMeeting. */
export interface AbuseReportLineMeeting {
	reporteeMid: string;
	spammerReasons: number[];
	evidenceIds: EvidenceId[];
	chatMid: string;
}

/** Wire-format fields for the LINE Thrift struct AcceptChatInvitationByTicketRequest. */
export interface AcceptChatInvitationByTicketRequest {
	reqSeq: number;
	chatMid: string;
	ticketId: string;
}

/** Wire-format fields for the LINE Thrift struct AcceptChatInvitationRequest. */
export interface AcceptChatInvitationRequest {
	reqSeq: number;
	chatMid: string;
}

/** Wire-format fields for the LINE Thrift struct AcceptSpeakersRequest. */
export interface AcceptSpeakersRequest {
	squareChatMid: string;
	sessionId: string;
	targetMids: string[];
}

/** Wire-format fields for the LINE Thrift struct AcceptToChangeRoleRequest. */
export interface AcceptToChangeRoleRequest {
	squareChatMid: string;
	sessionId: string;
	inviteRequestId: string;
}

/** Wire-format fields for the LINE Thrift struct AcceptToListenRequest. */
export interface AcceptToListenRequest {
	squareChatMid: string;
	sessionId: string;
	inviteRequestId: string;
}

/** Wire-format fields for the LINE Thrift struct AcceptToSpeakRequest. */
export interface AcceptToSpeakRequest {
	squareChatMid: string;
	sessionId: string;
	inviteRequestId: string;
}

/** Wire-format fields for the LINE Thrift struct AccountIdentifier. */
export interface AccountIdentifier {
	type: T70_EnumC14390b;
	identifier: string;
	countryCode: string;
}

/** Wire-format fields for the LINE Thrift struct AcquireLiveTalkRequest. */
export interface AcquireLiveTalkRequest {
	squareChatMid: string;
	title: string;
	type: LiveTalkType;
	speakerSetting: LiveTalkSpeakerSetting;
}

/** Wire-format fields for the LINE Thrift struct AcquireLiveTalkResponse. */
export interface AcquireLiveTalkResponse {
	liveTalk: LiveTalk;
}

/** Wire-format fields for the LINE Thrift struct AcquireOACallRouteRequest. */
export interface AcquireOACallRouteRequest {
	searchId: string;
	fromEnvInfo: Record<string, string>;
	otp: string;
}

/** Wire-format fields for the LINE Thrift struct AcquireOACallRouteResponse. */
export interface AcquireOACallRouteResponse {
	oaCallRoute: Pb1_C13113o6;
}

/** Wire-format fields for the LINE Thrift struct ActionButton. */
export interface ActionButton {
	label: string;
}

/** Wire-format fields for the LINE Thrift struct ActivateSubscriptionRequest. */
export interface ActivateSubscriptionRequest {
	uniqueKey: string;
	activeStatus: og_EnumC32661b;
}

/** Wire-format fields for the LINE Thrift struct AdRequest. */
export interface AdRequest {
	headers: Record<string, string>;
	queryParams: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct AdTypeOptOutClickEventRequest. */
export interface AdTypeOptOutClickEventRequest {
	moduleAdId: string;
	targetId: string;
}

/** Wire-format fields for the LINE Thrift struct AddFriendByMidRequest. */
export interface AddFriendByMidRequest {
	reqSeq: number;
	userMid: string;
	tracking: AddFriendTracking;
}

/** Wire-format fields for the LINE Thrift struct AddFriendTracking. */
export interface AddFriendTracking {
	reference: string;
	trackingMeta: LN0_C11274d;
}

/** Wire-format fields for the LINE Thrift struct AddItemToCollectionRequest. */
export interface AddItemToCollectionRequest {
	collectionId: string;
	productType: Ob1_O0;
	productId: string;
	itemId: string;
}

/** Wire-format fields for the LINE Thrift struct AddMetaByPhone. */
export interface AddMetaByPhone {
	phone: string;
}

/** Wire-format fields for the LINE Thrift struct AddMetaBySearchId. */
export interface AddMetaBySearchId {
	searchId: string;
}

/** Wire-format fields for the LINE Thrift struct AddMetaByUserTicket. */
export interface AddMetaByUserTicket {
	ticket: string;
}

/** Wire-format fields for the LINE Thrift struct AddMetaChatNote. */
export interface AddMetaChatNote {
	chatMid: string;
}

/** Wire-format fields for the LINE Thrift struct AddMetaChatNoteMenu. */
export interface AddMetaChatNoteMenu {
	chatMid: string;
}

/** Wire-format fields for the LINE Thrift struct AddMetaGroupMemberList. */
export interface AddMetaGroupMemberList {
	chatMid: string;
}

/** Wire-format fields for the LINE Thrift struct AddMetaGroupVideoCall. */
export interface AddMetaGroupVideoCall {
	chatMid: string;
}

/** Wire-format fields for the LINE Thrift struct AddMetaInvalid. */
export interface AddMetaInvalid {
	hint: string;
}

/** Wire-format fields for the LINE Thrift struct AddMetaMentionInChat. */
export interface AddMetaMentionInChat {
	chatMid: string;
	messageId: string;
}

/** Wire-format fields for the LINE Thrift struct AddMetaProfileUndefined. */
export interface AddMetaProfileUndefined {
	hint: string;
}

/** Wire-format fields for the LINE Thrift struct AddMetaSearchIdInUnifiedSearch. */
export interface AddMetaSearchIdInUnifiedSearch {
	searchId: string;
}

/** Wire-format fields for the LINE Thrift struct AddMetaShareContact. */
export interface AddMetaShareContact {
	messageId: string;
	chatMid: string;
	senderMid: string;
}

/** Wire-format fields for the LINE Thrift struct AddMetaStrangerCall. */
export interface AddMetaStrangerCall {
	messageId: string;
}

/** Wire-format fields for the LINE Thrift struct AddMetaStrangerMessage. */
export interface AddMetaStrangerMessage {
	messageId: string;
	chatMid: string;
}

/** Wire-format fields for the LINE Thrift struct AddOaFriendResponse. */
export interface AddOaFriendResponse {
	status: string;
}

/** Wire-format fields for the LINE Thrift struct AddProductToSubscriptionSlotRequest. */
export interface AddProductToSubscriptionSlotRequest {
	productType: Ob1_O0;
	productId: string;
	oldProductId: string;
	subscriptionService: any;
}

/** Wire-format fields for the LINE Thrift struct AddProductToSubscriptionSlotResponse. */
export interface AddProductToSubscriptionSlotResponse {
	result: Ob1_U1;
}

/** Wire-format fields for the LINE Thrift struct AddThemeToSubscriptionSlotRequest. */
export interface AddThemeToSubscriptionSlotRequest {
	productId: string;
	currentlyAppliedProductId: string;
	subscriptionService: any;
}

/** Wire-format fields for the LINE Thrift struct AddThemeToSubscriptionSlotResponse. */
export interface AddThemeToSubscriptionSlotResponse {
	result: Ob1_U1;
}

/** Wire-format fields for the LINE Thrift struct AddToFollowBlacklistRequest. */
export interface AddToFollowBlacklistRequest {
	followMid: Pb1_A4;
}

/** Wire-format fields for the LINE Thrift struct AgeCheckRequestResult. */
export interface AgeCheckRequestResult {
	authUrl: string;
	sessionId: string;
}

/** Wire-format fields for the LINE Thrift struct AgreeToTermsRequest. */
export interface AgreeToTermsRequest {
	termsType: number;
	termsAgreement: TermsAgreement;
}

/** Wire-format fields for the LINE Thrift struct AiQnABotTermsAgreement. */
export interface AiQnABotTermsAgreement {
	termsVersion: number;
}

/** Wire-format fields for the LINE Thrift struct AnalyticsInfo. */
export interface AnalyticsInfo {
	gaSamplingRate: number;
	tmid: string;
}

/** Wire-format fields for the LINE Thrift struct AnimationEffectContent. */
export interface AnimationEffectContent {
	animationImageUrl: string;
}

/** Wire-format fields for the LINE Thrift struct AnimationLayer. */
export interface AnimationLayer {
	initialImage: RichImage;
	frontImage: RichImage;
	backgroundImage: RichImage;
}

/** Wire-format fields for the LINE Thrift struct ApplicationVersionRange. */
export interface ApplicationVersionRange {
	lowerBound: string;
	lowerBoundInclusive: boolean;
	upperBound: string;
	upperBoundInclusive: boolean;
}

/** Wire-format fields for the LINE Thrift struct ApprovalValue. */
export interface ApprovalValue {
	message: string;
}

/** Wire-format fields for the LINE Thrift struct ApproveSquareMembersRequest. */
export interface ApproveSquareMembersRequest {
	squareMid: string;
	requestedMemberMids: string[];
}

/** Wire-format fields for the LINE Thrift struct ApproveSquareMembersResponse. */
export interface ApproveSquareMembersResponse {
	approvedMembers: SquareMember[];
	status: SquareStatus;
}

/** Wire-format fields for the LINE Thrift struct ApprovedChannelInfo. */
export interface ApprovedChannelInfo {
	channelInfo: ChannelInfo;
	approvedAt: Int64;
}

/** Wire-format fields for the LINE Thrift struct ApprovedChannelInfos. */
export interface ApprovedChannelInfos {
	approvedChannelInfos: ApprovedChannelInfo[];
	revision: Int64;
}

/** Wire-format fields for the LINE Thrift struct AssetServiceInfo. */
export interface AssetServiceInfo {
	status: NZ0_C0;
	myAssetServiceCode: NZ0_B0;
	name: string;
	signupText: string;
	iconUrl: string;
	landingUrl: string;
	currencyProperty: CurrencyProperty;
	balance: string;
	profit: string;
	maintenanceText: string;
	availableBalanceString: string;
	availableBalance: string;
}

/** Wire-format fields for the LINE Thrift struct AuthPublicKeyCredential. */
export interface AuthPublicKeyCredential {
	id: string;
	type: string;
	response: AuthenticatorAssertionResponse;
	extensionResults: AuthenticationExtensionsClientOutputs;
}

/** Wire-format fields for the LINE Thrift struct AuthSessionRequest. */
export interface AuthSessionRequest {
	metaData: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct AuthenticateWithPaakRequest. */
export interface AuthenticateWithPaakRequest {
	sessionId: string;
	credential: AuthPublicKeyCredential;
}

/** Wire-format fields for the LINE Thrift struct AuthenticationExtensionsClientInputs. */
export interface AuthenticationExtensionsClientInputs {
	lineAuthenSel: string[];
}

/** Wire-format fields for the LINE Thrift struct AuthenticationExtensionsClientOutputs. */
export interface AuthenticationExtensionsClientOutputs {
	lineAuthenSel: boolean;
}

/** Wire-format fields for the LINE Thrift struct AuthenticatorAssertionResponse. */
export interface AuthenticatorAssertionResponse {
	clientDataJSON: string;
	authenticatorData: string;
	signature: string;
	userHandle: string;
}

/** Wire-format fields for the LINE Thrift struct AuthenticatorAttestationResponse. */
export interface AuthenticatorAttestationResponse {
	clientDataJSON: string;
	attestationObject: string;
	transports: string[];
}

/** Wire-format fields for the LINE Thrift struct AuthenticatorSelectionCriteria. */
export interface AuthenticatorSelectionCriteria {
	authenticatorAttachment: string;
	requireResidentKey: boolean;
	userVerification: string;
}

/** Wire-format fields for the LINE Thrift struct AutoSuggestionShowcaseRequest. */
export interface AutoSuggestionShowcaseRequest {
	productType: Ob1_O0;
	suggestionType: Ob1_a2;
}

/** Wire-format fields for the LINE Thrift struct AutoSuggestionShowcaseResponse. */
export interface AutoSuggestionShowcaseResponse {
	productList: ProductSummaryForAutoSuggest[];
	totalSize: Int64;
}

/** Wire-format fields for the LINE Thrift struct AvatarProfile. */
export interface AvatarProfile {
	version: string;
	updatedMillis: Int64;
	thumbnail: string;
	usablePublicly: boolean;
}

/** Wire-format fields for the LINE Thrift struct BadgeInfo. */
export interface BadgeInfo {
	enabled: boolean;
	badgeRevision: Int64;
}

/** Wire-format fields for the LINE Thrift struct Balance. */
export interface Balance {
	currentPointsFixedPointDecimal: string;
}

/** Wire-format fields for the LINE Thrift struct BalanceShortcut. */
export interface BalanceShortcut {
	osPayment: boolean;
	iconPosition: number;
	iconUrl: string;
	iconText: string;
	iconAltText: string;
	linkUrl: string;
	tsTargetId: string;
	iconType: NZ0_EnumC12154b1;
	iconUrlDarkMode: string;
	toolTip: Tooltip;
}

/** Wire-format fields for the LINE Thrift struct BalanceShortcutInfo. */
export interface BalanceShortcutInfo {
	balanceShortcuts: BalanceShortcut[];
	osPaymentFallbackShortcut: BalanceShortcut;
}

/** Wire-format fields for the LINE Thrift struct BalanceShortcutInfoV4. */
export interface BalanceShortcutInfoV4 {
	compactShortcuts: CompactShortcut[];
	balanceShortcuts: BalanceShortcut[];
	defaultExpand: boolean;
}

/** Wire-format fields for the LINE Thrift struct BankBranchInfo. */
export interface BankBranchInfo {
	branchId: string;
	branchCode: string;
	name: string;
	name2: string;
}

/** Wire-format fields for the LINE Thrift struct BannerRequest. */
export interface BannerRequest {
	test: boolean;
	trigger: Uf_C14856C;
	ad: AdRequest;
	content: ContentRequest;
}

/** Wire-format fields for the LINE Thrift struct BannerResponse. */
export interface BannerResponse {
	rid: string;
	timestamp: Int64;
	minInterval: Int64;
	lang: string;
	trigger: Uf_C14856C;
	payloads: Uf_p[];
}

/** Wire-format fields for the LINE Thrift struct Beacon. */
export interface Beacon {
	hardwareId: string;
}

/** Wire-format fields for the LINE Thrift struct BeaconBackgroundNotification. */
export interface BeaconBackgroundNotification {
	actionInterval: Int64;
	actionAndConditions: qm_C34110c[];
	actionDelay: Int64;
}

/** Wire-format fields for the LINE Thrift struct BeaconData. */
export interface BeaconData {
	hwid: string;
	rssi: number;
	txPower: number;
	scannedTimestampMs: Int64;
}

/** Wire-format fields for the LINE Thrift struct BeaconLayerInfoAndActions. */
export interface BeaconLayerInfoAndActions {
	pictureUrl: string;
	label: string;
	text: string;
	actions: string[];
	showOrConditions: qm_C34110c[];
	showConditions: string[];
	timeToHide: Int64;
	showAdLabel: boolean;
}

/** Wire-format fields for the LINE Thrift struct BeaconQueryResponse. */
export interface BeaconQueryResponse {
	deprecated_actionUrls: string[];
	cacheTtl: Int64;
	touchActions: BeaconTouchActions;
	layerInfoAndActions: BeaconLayerInfoAndActions;
	backgroundEnteringNotification: BeaconBackgroundNotification;
	backgroundLeavingNotification: BeaconBackgroundNotification;
	group: string;
	major: string;
	minor: string;
	effectiveRange: number;
	channelWhiteList: string[];
	actionId: Int64;
	stayReportInterval: Int64;
	leaveThresholdTime: Int64;
	touchThreshold: number;
	cutoffThreshold: number;
	dataUserBots: DataUserBot[];
	deviceId: string;
	deviceDisplayName: string;
	botMid: string;
	pop: boolean;
}

/** Wire-format fields for the LINE Thrift struct BeaconTouchActions. */
export interface BeaconTouchActions {
	actions: string[];
}

/** Wire-format fields for the LINE Thrift struct BirthdayGiftAssociationVerifyRequest. */
export interface BirthdayGiftAssociationVerifyRequest {
	associationToken: string;
}

/** Wire-format fields for the LINE Thrift struct BirthdayGiftAssociationVerifyResponse. */
export interface BirthdayGiftAssociationVerifyResponse {
	tokenStatus: Ob1_EnumC12638l;
	recipientUserMid: string;
}

/** Wire-format fields for the LINE Thrift struct BleNotificationReceivedTrigger. */
export interface BleNotificationReceivedTrigger {
	serviceUuid: string;
	characteristicUuid: string;
}

/** Wire-format fields for the LINE Thrift struct BleProduct. */
export interface BleProduct {
	serviceUuid: string;
	psdiServiceUuid: string;
	psdiCharacteristicUuid: string;
	name: string;
	profileImageLocation: string;
	bondingRequired: boolean;
}

/** Wire-format fields for the LINE Thrift struct Bot. */
export interface Bot {
	mid: string;
	basicSearchId: string;
	region: string;
	displayName: string;
	pictureUrl: string;
	brandType: og_EnumC32663d;
}

/** Wire-format fields for the LINE Thrift struct BotBlockDetail. */
export interface BotBlockDetail {
	deletedFromBlockList: boolean;
}

/** Wire-format fields for the LINE Thrift struct BotFriendDetail. */
export interface BotFriendDetail {
	createdTime: Int64;
	favoriteTime: Int64;
	hidden: boolean;
}

/** Wire-format fields for the LINE Thrift struct BotOaCallDetail. */
export interface BotOaCallDetail {
	oaCallUrl: string;
}

/** Wire-format fields for the LINE Thrift struct BotTalkroomAds. */
export interface BotTalkroomAds {
	talkroomAdsEnabled: boolean;
	botTalkroomAdsInventoryKeys: BotTalkroomAdsInventoryKey[];
	displayTalkroomAdsToMembershipUser: boolean;
}

/** Wire-format fields for the LINE Thrift struct BotTalkroomAdsInventoryKey. */
export interface BotTalkroomAdsInventoryKey {
	talkroomAdsPosition: Pb1_EnumC13093n0;
	talkroomAdsIosInventoryKey: string;
	talkroomAdsAndroidInventoryKey: string;
}

/** Wire-format fields for the LINE Thrift struct BrowsingHistory. */
export interface BrowsingHistory {
	productSearchSummary: ProductSearchSummary;
	browsingTime: Int64;
}

/** Wire-format fields for the LINE Thrift struct BuddyCautionNotice. */
export interface BuddyCautionNotice {
	type: Pb1_EnumC13162s0;
}

/** Wire-format fields for the LINE Thrift struct BuddyCautionNoticeFromCMS. */
export interface BuddyCautionNoticeFromCMS {
	visibility: Pb1_EnumC13148r0;
}

/** Wire-format fields for the LINE Thrift struct BuddyChatBar. */
export interface BuddyChatBar {
	barItems: Pb1_C13190u0[];
}

/** Wire-format fields for the LINE Thrift struct BuddyDetail. */
export interface BuddyDetail {
	mid: string;
	memberCount: Int64;
	onAir: boolean;
	businessAccount: boolean;
	addable: boolean;
	acceptableContentTypes: number[];
	capableMyhome: boolean;
	freePhoneCallable: boolean;
	phoneNumberToDial: string;
	needPermissionApproval: boolean;
	channelId: number;
	channelProviderName: string;
	iconType: number;
	botType: BotType;
	showRichMenu: boolean;
	richMenuRevision: Int64;
	onAirLabel: Pb1_EnumC13260z0;
	useTheme: boolean;
	themeId: string;
	useBar: boolean;
	barRevision: Int64;
	useBackground: boolean;
	backgroundId: string;
	statusBarEnabled: boolean;
	statusBarRevision: Int64;
	searchId: string;
	onAirVersion: number;
	blockable: boolean;
	botActiveStatus: Pb1_EnumC13037j0;
	membershipEnabled: boolean;
	legalCountryCode: string;
	botTalkroomAds: BotTalkroomAds;
	botOaCallDetail: BotOaCallDetail;
	aiChatBot: boolean;
	supportSpeechToText: boolean;
	voomEnabled: boolean;
	buddyCautionNoticeFromCMS: BuddyCautionNoticeFromCMS;
	region: string;
}

/** Wire-format fields for the LINE Thrift struct BuddyDetailWithPersonal. */
export interface BuddyDetailWithPersonal {
	buddyDetail: BuddyDetail;
	personalDetail: BuddyPersonalDetail;
}

/** Wire-format fields for the LINE Thrift struct BuddyLive. */
export interface BuddyLive {
	mid: string;
	onLive: boolean;
	title: string;
	viewerCount: Int64;
	liveUrl: string;
}

/** Wire-format fields for the LINE Thrift struct BuddyOnAir. */
export interface BuddyOnAir {
	mid: string;
	freshnessLifetime: Int64;
	onAirId: string;
	onAir: boolean;
	text: string;
	viewerCount: Int64;
	targetCount: Int64;
	livePlayTime: Int64;
	screenAspectRate: string;
	onAirType: Pb1_A0;
	onAirUrls: BuddyOnAirUrls;
	aspectRatioOfSource: string;
	useFadingOut: boolean;
	fadingOutIn: Int64;
	urlAfterFadingOut: string;
	labelAfterFadingOut: string;
	useLowerBanner: boolean;
	lowerBannerUrl: string;
	lowerBannerLabel: string;
}

/** Wire-format fields for the LINE Thrift struct BuddyOnAirUrls. */
export interface BuddyOnAirUrls {
	hls: Record<string, string>;
	smoothStreaming: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct BuddyPersonalDetail. */
export interface BuddyPersonalDetail {
	richMenuId: string;
	statusBarRevision: Int64;
	buddyCautionNotice: BuddyCautionNotice;
}

/** Wire-format fields for the LINE Thrift struct BuddyRichMenuChatBarItem. */
export interface BuddyRichMenuChatBarItem {
	label: string;
	body: string;
	selected: boolean;
}

/** Wire-format fields for the LINE Thrift struct BuddySearchResult. */
export interface BuddySearchResult {
	mid: string;
	displayName: string;
	pictureStatus: string;
	picturePath: string;
	statusMessage: string;
	businessAccount: boolean;
	iconType: number;
	botType: BotType;
}

/** Wire-format fields for the LINE Thrift struct BuddyStatusBar. */
export interface BuddyStatusBar {
	label: string;
	displayType: Pb1_EnumC12926b1;
	title: string;
	iconUrl: string;
	linkUrl: string;
}

/** Wire-format fields for the LINE Thrift struct BuddyWebChatBarItem. */
export interface BuddyWebChatBarItem {
	label: string;
	url: string;
}

/** Wire-format fields for the LINE Thrift struct BuddyWidget. */
export interface BuddyWidget {
	icon: string;
	label: string;
	url: string;
}

/** Wire-format fields for the LINE Thrift struct BuddyWidgetListCharBarItem. */
export interface BuddyWidgetListCharBarItem {
	label: string;
	widgets: BuddyWidget[];
	selected: boolean;
}

/** Wire-format fields for the LINE Thrift struct BulkFollowRequest. */
export interface BulkFollowRequest {
	followTargetMids: string[];
	unfollowTargetMids: string[];
	hasNext: boolean;
}

/** Wire-format fields for the LINE Thrift struct BulkGetRequest. */
export interface BulkGetRequest {
	requests: GetRequest[];
}

/** Wire-format fields for the LINE Thrift struct BulkGetResponse. */
export interface BulkGetResponse {
	values: Record<string, t80_g>;
}

/** Wire-format fields for the LINE Thrift struct BulkSetRequest. */
export interface BulkSetRequest {
	requests: SetRequest[];
}

/** Wire-format fields for the LINE Thrift struct BulkSetResponse. */
export interface BulkSetResponse {
	values: Record<string, t80_l>;
}

/** Wire-format fields for the LINE Thrift struct Button. */
export interface Button {
	content: ButtonContent;
	style: ButtonStyle;
}

/** Wire-format fields for the LINE Thrift struct ButtonStyle. */
export interface ButtonStyle {
	textColorHexCode: string;
	bgColor: ButtonBGColor;
}

/** Wire-format fields for the LINE Thrift struct BuyMustbuyRequest. */
export interface BuyMustbuyRequest {
	productType: Ob1_O0;
	productId: string;
	serialNumber: string;
}

/** Wire-format fields for the LINE Thrift struct CallHost. */
export interface CallHost {
	host: string;
	port: number;
	zone: string;
}

/** Wire-format fields for the LINE Thrift struct CallRoute. */
export interface CallRoute {
	fromToken: string;
	callFlowType: Pb1_EnumC13010h1;
	voipAddress: string;
	voipUdpPort: number;
	voipTcpPort: number;
	fromZone: string;
	toZone: string;
	fakeCall: boolean;
	ringbackTone: string;
	toMid: string;
	tunneling: string;
	commParam: string;
	stid: string;
	encFromMid: string;
	encToMid: string;
	switchableToVideo: boolean;
	voipAddress6: string;
	w2pGw: string;
	drCall: boolean;
	stnpk: string;
	capabilities: string[];
}

/** Wire-format fields for the LINE Thrift struct Callback. */
export interface Callback {
	impEventUrl: string;
	clickEventUrl: string;
	muteEventUrl: string;
	upvoteEventUrl: string;
	downvoteEventUrl: string;
	bounceEventUrl: string;
	undeliveredEventUrl: string;
}

/** Wire-format fields for the LINE Thrift struct CampaignContent. */
export interface CampaignContent {
	iconUrl: string;
	iconAltText: string;
	iconDisplayRule: IconDisplayRule;
	animationEffectContent: AnimationEffectContent;
}

/** Wire-format fields for the LINE Thrift struct CampaignProperty. */
export interface CampaignProperty {
	id: string;
	name: string;
	type: string;
	headerContent: HeaderContent;
	campaignContent: CampaignContent;
}

/** Wire-format fields for the LINE Thrift struct CanCreateCombinationStickerRequest. */
export interface CanCreateCombinationStickerRequest {
	packageIds: string[];
}

/** Wire-format fields for the LINE Thrift struct CanCreateCombinationStickerResponse. */
export interface CanCreateCombinationStickerResponse {
	canCreate: boolean;
	usablePackageIds: string[];
}

/** Wire-format fields for the LINE Thrift struct CancelChatInvitationRequest. */
export interface CancelChatInvitationRequest {
	reqSeq: number;
	chatMid: string;
	targetUserMids: string[];
}

/** Wire-format fields for the LINE Thrift struct CancelPaakAuthRequest. */
export interface CancelPaakAuthRequest {
	sessionId: string;
}

/** Wire-format fields for the LINE Thrift struct CancelPaakAuthenticationRequest. */
export interface CancelPaakAuthenticationRequest {
	authSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct CancelPinCodeRequest. */
export interface CancelPinCodeRequest {
	authSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct CancelReactionRequest. */
export interface CancelReactionRequest {
	reqSeq: number;
	messageId: Int64;
}

/** Wire-format fields for the LINE Thrift struct CancelToSpeakRequest. */
export interface CancelToSpeakRequest {
	squareChatMid: string;
	sessionId: string;
}

/** Wire-format fields for the LINE Thrift struct Candidate. */
export interface Candidate {
	type: zR0_EnumC40579d;
	productId: string;
	itemId: string;
}

/** Wire-format fields for the LINE Thrift struct Category. */
export interface Category {
	id: number;
	name: string;
	iconObsHash: string;
}

/** Wire-format fields for the LINE Thrift struct CategoryName. */
export interface CategoryName {
	categoryId: number;
	names: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct ChangeSubscriptionRequest. */
export interface ChangeSubscriptionRequest {
	billingItemId: string;
	subscriptionService: any;
	storeCode: Ob1_K1;
}

/** Wire-format fields for the LINE Thrift struct ChangeSubscriptionResponse. */
export interface ChangeSubscriptionResponse {
	result: Ob1_M1;
	orderId: string;
	confirmUrl: string;
}

/** Wire-format fields for the LINE Thrift struct ChannelContext. */
export interface ChannelContext {
	channelName: string;
}

/** Wire-format fields for the LINE Thrift struct ChannelDomain. */
export interface ChannelDomain {
	host: string;
	removed: boolean;
}

/** Wire-format fields for the LINE Thrift struct ChannelDomains. */
export interface ChannelDomains {
	channelDomains: ChannelDomain[];
	revision: Int64;
}

/** Wire-format fields for the LINE Thrift struct ChannelIdWithLastUpdated. */
export interface ChannelIdWithLastUpdated {
	channelId: string;
	lastUpdated: Int64;
}

/** Wire-format fields for the LINE Thrift struct ChannelInfo. */
export interface ChannelInfo {
	channelId: string;
	name: string;
	entryPageUrl: string;
	descriptionText: string;
	provider: ChannelProvider;
	publicType: Pb1_P6;
	iconImage: string;
	permissions: string[];
	iconThumbnailImage: string;
	channelConfigurations: number[];
	lcsAllApiUsable: boolean;
	allowedPermissions: Pb1_EnumC12997g2[];
	channelDomains: ChannelDomain[];
	updatedTimestamp: Int64;
	featureLicenses: Pb1_EnumC12941c2[];
}

/** Wire-format fields for the LINE Thrift struct ChannelNotificationSetting. */
export interface ChannelNotificationSetting {
	channelId: string;
	name: string;
	notificationReceivable: boolean;
	messageReceivable: boolean;
	showDefault: boolean;
}

/** Wire-format fields for the LINE Thrift struct ChannelProvider. */
export interface ChannelProvider {
	name: string;
	certified: boolean;
}

/** Wire-format fields for the LINE Thrift struct ChannelSettings. */
export interface ChannelSettings {
	unapprovedMessageReceivable: boolean;
}

/** Wire-format fields for the LINE Thrift struct ChannelToken. */
export interface ChannelToken {
	token: string;
	obsToken: string;
	expiration: Int64;
	refreshToken: string;
	channelAccessToken: string;
}

/** Wire-format fields for the LINE Thrift struct Chat. */
export interface Chat {
	type: Pb1_Z2;
	chatMid: string;
	createdTime: Int64;
	notificationDisabled: boolean;
	favoriteTimestamp: Int64;
	chatName: string;
	picturePath: string;
	extra: Pb1_C13208v4;
}

/** Wire-format fields for the LINE Thrift struct ChatEffectMeta. */
export interface ChatEffectMeta {
	contentId: Int64;
	category: Pb1_Q2;
	name: string;
	defaultContent: ChatEffectMetaContent;
	optionalContents: Record<number, ChatEffectMetaContent>;
	keywords: string[];
	beginTimeMillis: Int64;
	endTimeMillis: Int64;
	createdTimeMillis: Int64;
	updatedTimeMillis: Int64;
	contentMetadataTag: string;
}

/** Wire-format fields for the LINE Thrift struct ChatEffectMetaContent. */
export interface ChatEffectMetaContent {
	url: string;
	checksum: string;
}

/** Wire-format fields for the LINE Thrift struct ChatRoomAnnouncement. */
export interface ChatRoomAnnouncement {
	announcementSeq: Int64;
	type: Pb1_X2;
	contents: ChatRoomAnnouncementContents;
	creatorMid: string;
	createdTime: Int64;
	deletePermission: Pb1_W2;
}

/** Wire-format fields for the LINE Thrift struct ChatRoomAnnouncementContentMetadata. */
export interface ChatRoomAnnouncementContentMetadata {
	replace: string;
	sticonOwnership: string;
	postNotificationMetadata: string;
}

/** Wire-format fields for the LINE Thrift struct ChatRoomAnnouncementContents. */
export interface ChatRoomAnnouncementContents {
	displayFields: number;
	text: string;
	link: string;
	thumbnail: string;
	contentMetadata: ChatRoomAnnouncementContentMetadata;
}

/** Wire-format fields for the LINE Thrift struct ChatRoomBGM. */
export interface ChatRoomBGM {
	creatorMid: string;
	createdTime: Int64;
	chatRoomBGMInfo: string;
}

/** Wire-format fields for the LINE Thrift struct Chatapp. */
export interface Chatapp {
	chatappId: string;
	name: string;
	icon: string;
	url: string;
	availableChatTypes: number[];
}

/** Wire-format fields for the LINE Thrift struct ChatroomPopup. */
export interface ChatroomPopup {
	imageObsHash: string;
	title: string;
	content: string;
	targetRoles: number[];
	button: Button;
	type: ChatroomPopupType;
	animatedImage: boolean;
	targetChatType: TargetChatType;
	targetChats: TargetChats;
	targetUserType: TargetUserType;
	targetUsers: TargetUsers;
}

/** Wire-format fields for the LINE Thrift struct I80_C26396d. */
export interface I80_C26396d {
	authSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct CheckEmailAssignedResponse. */
export interface CheckEmailAssignedResponse {
	sameAccountFromPhone: boolean;
}

/** Wire-format fields for the LINE Thrift struct CheckIfEncryptedE2EEKeyReceivedRequest. */
export interface CheckIfEncryptedE2EEKeyReceivedRequest {
	sessionId: string;
	secureChannelData: h80_t;
}

/** Wire-format fields for the LINE Thrift struct CheckIfEncryptedE2EEKeyReceivedResponse. */
export interface CheckIfEncryptedE2EEKeyReceivedResponse {
	nonce: string;
	encryptedSecureChannelPayload: any;
	userProfile: any;
	appTypeDifferentFromPrevDevice: boolean;
	e2eeKeyBackupServiceConfig: boolean;
}

/** Wire-format fields for the LINE Thrift struct I80_C26400f. */
export interface I80_C26400f {
	authSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct I80_C26402g. */
export interface I80_C26402g {
	verified: boolean;
}

/** Wire-format fields for the LINE Thrift struct CheckIfPhonePinCodeMsgVerifiedRequest. */
export interface CheckIfPhonePinCodeMsgVerifiedRequest {
	authSessionId: string;
	userPhoneNumber: UserPhoneNumber;
}

/** Wire-format fields for the LINE Thrift struct CheckIfPhonePinCodeMsgVerifiedResponse. */
export interface CheckIfPhonePinCodeMsgVerifiedResponse {
	accountExist: boolean;
	sameUdidFromAccount: boolean;
	allowedToRegister: boolean;
	userProfile: UserProfile;
}

/** Wire-format fields for the LINE Thrift struct CheckJoinCodeRequest. */
export interface CheckJoinCodeRequest {
	squareMid: string;
	joinCode: string;
}

/** Wire-format fields for the LINE Thrift struct CheckJoinCodeResponse. */
export interface CheckJoinCodeResponse {
	joinToken: string;
}

/** Wire-format fields for the LINE Thrift struct CheckOperationResult. */
export interface CheckOperationResult {
	tradable: boolean;
	reason: string;
	detailMessage: string;
}

/** Wire-format fields for the LINE Thrift struct CheckUserAgeAfterApprovalWithDocomoV2Request. */
export interface CheckUserAgeAfterApprovalWithDocomoV2Request {
	accessToken: string;
	agprm: string;
}

/** Wire-format fields for the LINE Thrift struct CheckUserAgeAfterApprovalWithDocomoV2Response. */
export interface CheckUserAgeAfterApprovalWithDocomoV2Response {
	userAgeType: Pb1_gd;
}

/** Wire-format fields for the LINE Thrift struct CheckUserAgeWithDocomoV2Request. */
export interface CheckUserAgeWithDocomoV2Request {
	authCode: string;
}

/** Wire-format fields for the LINE Thrift struct CheckUserAgeWithDocomoV2Response. */
export interface CheckUserAgeWithDocomoV2Response {
	responseType: Pb1_EnumC12970e3;
	userAgeType: Pb1_gd;
	approvalRedirectUrl: string;
	accessToken: string;
}

/** Wire-format fields for the LINE Thrift struct ClientNetworkStatus. */
export interface ClientNetworkStatus {
	networkType: Pb1_EnumC12998g3;
	wifiSignals: WifiSignal[];
}

/** Wire-format fields for the LINE Thrift struct CodeValue. */
export interface CodeValue {
	code: string;
}

/** Wire-format fields for the LINE Thrift struct Coin. */
export interface Coin {
	freeCoinBalance: number;
	payedCoinBalance: number;
	totalCoinBalance: number;
	rewardCoinBalance: number;
}

/** Wire-format fields for the LINE Thrift struct CoinHistory. */
export interface CoinHistory {
	payDate: Int64;
	coinBalance: number;
	coin: number;
	price: string;
	title: string;
	refund: boolean;
	paySeq: string;
	currency: string;
	currencySign: string;
	displayPrice: string;
	payload: CoinPayLoad;
	channelId: string;
}

/** Wire-format fields for the LINE Thrift struct CoinPayLoad. */
export interface CoinPayLoad {
	payCoin: number;
	freeCoin: number;
	type: PayloadType;
	rewardCoin: number;
}

/** Wire-format fields for the LINE Thrift struct CoinProductItem. */
export interface CoinProductItem {
	itemId: string;
	coin: number;
	freeCoin: number;
	currency: string;
	price: string;
	displayPrice: string;
	name: string;
	desc: string;
}

/** Wire-format fields for the LINE Thrift struct CoinPurchaseReservation. */
export interface CoinPurchaseReservation {
	productId: string;
	country: string;
	currency: string;
	price: string;
	appStoreCode: jO0_EnumC27533B;
	language: string;
	pgCode: jO0_EnumC27559z;
	redirectUrl: string;
}

/** Wire-format fields for the LINE Thrift struct Collection. */
export interface Collection {
	collectionId: string;
	items: CollectionItem[];
	productType: Ob1_O0;
	createdTimeMillis: Int64;
	updatedTimeMillis: Int64;
}

/** Wire-format fields for the LINE Thrift struct CollectionItem. */
export interface CollectionItem {
	itemId: string;
	productId: string;
	displayData: Ob1_E;
	sortId: number;
}

/** Wire-format fields for the LINE Thrift struct CombinationStickerMetadata. */
export interface CombinationStickerMetadata {
	version: Int64;
	canvasWidth: number;
	canvasHeight: number;
	stickerLayouts: StickerLayout[];
}

/** Wire-format fields for the LINE Thrift struct CombinationStickerStickerData. */
export interface CombinationStickerStickerData {
	packageId: string;
	stickerId: string;
	version: Int64;
}

/** Wire-format fields for the LINE Thrift struct CompactShortcut. */
export interface CompactShortcut {
	iconPosition: number;
	iconUrl: string;
	iconAltText: string;
	iconType: NZ0_EnumC12154b1;
	linkUrl: string;
	tsTargetId: string;
}

/** Wire-format fields for the LINE Thrift struct Configurations. */
export interface Configurations {
	revision: Int64;
	configMap: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct ConfigurationsParams. */
export interface ConfigurationsParams {
	regionOfUsim: string;
	regionOfTelephone: string;
	regionOfLocale: string;
	carrier: string;
}

/** Wire-format fields for the LINE Thrift struct ConnectDeviceOperation. */
export interface ConnectDeviceOperation {
	connectionTimeoutMillis: Int64;
}

/** Wire-format fields for the LINE Thrift struct ConnectEapAccountRequest. */
export interface ConnectEapAccountRequest {
	authSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct Contact. */
export interface Contact {
	mid: string;
	createdTime: Int64;
	type: ContactType;
	status: ContactStatus;
	relation: Pb1_EnumC13151r3;
	displayName: string;
	phoneticName: string;
	pictureStatus: string;
	thumbnailUrl: string;
	statusMessage: string;
	displayNameOverridden: string;
	favoriteTime: Int64;
	capableVoiceCall: boolean;
	capableVideoCall: boolean;
	capableMyhome: boolean;
	capableBuddy: boolean;
	attributes: number;
	settings: Int64;
	picturePath: string;
	recommendParams: string;
	friendRequestStatus: FriendRequestStatus;
	musicProfile: string;
	videoProfile: string;
	statusMessageContentMetadata: Record<string, string>;
	avatarProfile: AvatarProfile;
	friendRingtone: string;
	friendRingbackTone: string;
	nftProfile: boolean;
	pictureSource: Pb1_N6;
	profileId: string;
	premiumBlocked: boolean;
	hiddenFromList: boolean;
}

/** Wire-format fields for the LINE Thrift struct ContactCalendarEvent. */
export interface ContactCalendarEvent {
	id: string;
	state: Pb1_EnumC13082m3;
	year: number;
	month: number;
	day: number;
}

/** Wire-format fields for the LINE Thrift struct ContactCalendarEvents. */
export interface ContactCalendarEvents {
	events: Record<number, ContactCalendarEvent>;
}

/** Wire-format fields for the LINE Thrift struct ContactModification. */
export interface ContactModification {
	type: Pb1_EnumC13029i6;
	luid: string;
	phones: string[];
	emails: string[];
	userids: string[];
	mobileContactName: string;
	phoneticName: string;
}

/** Wire-format fields for the LINE Thrift struct ContactRegistration. */
export interface ContactRegistration {
	contact: Contact;
	luid: string;
	contactType: ContactType;
	contactKey: string;
}

/** Wire-format fields for the LINE Thrift struct Content. */
export interface Content {
	title: string;
	desc: string;
	linkUrl: string;
	fallbackUrl: string;
	badge: Uf_C14864f;
	image: Image;
	button: ActionButton;
	callback: Callback;
	noBidCallback: NoBidCallback;
	ttl: Int64;
	muteSupported: boolean;
	voteSupported: boolean;
	priority: Priority;
}

/** Wire-format fields for the LINE Thrift struct ContentRequest. */
export interface ContentRequest {
	os: Uf_EnumC14873o;
	appv: string;
	lineAcceptableLanguage: string;
	countryCode: string;
}

/** Wire-format fields for the LINE Thrift struct CountryCode. */
export interface CountryCode {
	code: string;
}

/** Wire-format fields for the LINE Thrift struct CreateChatRequest. */
export interface CreateChatRequest {
	reqSeq: number;
	type: Pb1_Z2;
	name: string;
	targetUserMids: string[];
	picturePath: string;
}

/** Wire-format fields for the LINE Thrift struct CreateChatResponse. */
export interface CreateChatResponse {
	chat: Chat;
}

/** Wire-format fields for the LINE Thrift struct CreateCollectionForUserRequest. */
export interface CreateCollectionForUserRequest {
	productType: Ob1_O0;
}

/** Wire-format fields for the LINE Thrift struct CreateCollectionForUserResponse. */
export interface CreateCollectionForUserResponse {
	collection: Collection;
}

/** Wire-format fields for the LINE Thrift struct CreateCombinationStickerRequest. */
export interface CreateCombinationStickerRequest {
	metadata: CombinationStickerMetadata;
	stickers: CombinationStickerStickerData[];
	idOfPreviousVersionOfCombinationSticker: string;
}

/** Wire-format fields for the LINE Thrift struct CreateCombinationStickerResponse. */
export interface CreateCombinationStickerResponse {
	id: string;
}

/** Wire-format fields for the LINE Thrift struct CreateGroupCallUrlRequest. */
export interface CreateGroupCallUrlRequest {
	title: string;
}

/** Wire-format fields for the LINE Thrift struct CreateGroupCallUrlResponse. */
export interface CreateGroupCallUrlResponse {
	url: GroupCallUrl;
}

/** Wire-format fields for the LINE Thrift struct CreateMultiProfileRequest. */
export interface CreateMultiProfileRequest {
	displayName: string;
}

/** Wire-format fields for the LINE Thrift struct CreateMultiProfileResponse. */
export interface CreateMultiProfileResponse {
	profileId: string;
}

/** Wire-format fields for the LINE Thrift struct I80_C26406i. */
export interface I80_C26406i {
	authSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct CreateSessionResponse. */
export interface CreateSessionResponse {
	sessionId: string;
}

/** Wire-format fields for the LINE Thrift struct CreateSquareChatAnnouncementRequest. */
export interface CreateSquareChatAnnouncementRequest {
	reqSeq: number;
	squareChatMid: string;
	squareChatAnnouncement: SquareChatAnnouncement;
}

/** Wire-format fields for the LINE Thrift struct CreateSquareChatAnnouncementResponse. */
export interface CreateSquareChatAnnouncementResponse {
	announcement: SquareChatAnnouncement;
}

/** Wire-format fields for the LINE Thrift struct CreateSquareChatRequest. */
export interface CreateSquareChatRequest {
	reqSeq: number;
	squareChat: SquareChat;
	squareMemberMids: string[];
}

/** Wire-format fields for the LINE Thrift struct CreateSquareChatResponse. */
export interface CreateSquareChatResponse {
	squareChat: SquareChat;
	squareChatStatus: SquareChatStatus;
	squareChatMember: SquareChatMember;
	squareChatFeatureSet: SquareChatFeatureSet;
}

/** Wire-format fields for the LINE Thrift struct CreateSquareRequest. */
export interface CreateSquareRequest {
	reqSeq: number;
	square: Square;
	creator: SquareMember;
}

/** Wire-format fields for the LINE Thrift struct CreateSquareResponse. */
export interface CreateSquareResponse {
	square: Square;
	creator: SquareMember;
	authority: SquareAuthority;
	status: SquareStatus;
	featureSet: SquareFeatureSet;
	noteStatus: NoteStatus;
	squareChat: SquareChat;
	squareChatStatus: SquareChatStatus;
	squareChatMember: SquareChatMember;
	squareChatFeatureSet: SquareChatFeatureSet;
}

/** Wire-format fields for the LINE Thrift struct CurrencyProperty. */
export interface CurrencyProperty {
	code: string;
	symbol: string;
	position: NZ0_EnumC12197q;
	scale: number;
}

/** Wire-format fields for the LINE Thrift struct CustomBadgeLabel. */
export interface CustomBadgeLabel {
	text: string;
	backgroundColorCode: string;
}

/** Wire-format fields for the LINE Thrift struct CustomColor. */
export interface CustomColor {
	hexColorCode: string;
}

/** Wire-format fields for the LINE Thrift struct DataRetention. */
export interface DataRetention {
	productId: string;
	productRegion: string;
	productType: fN0_EnumC24466B;
	inDataRetention: boolean;
	dataRetentionEndTime: Int64;
}

/** Wire-format fields for the LINE Thrift struct DataUserBot. */
export interface DataUserBot {
	mid: string;
	placeName: string;
}

/** Wire-format fields for the LINE Thrift struct DeleteGroupCallUrlRequest. */
export interface DeleteGroupCallUrlRequest {
	urlId: string;
}

/** Wire-format fields for the LINE Thrift struct DeleteMultiProfileRequest. */
export interface DeleteMultiProfileRequest {
	profileId: string;
}

/** Wire-format fields for the LINE Thrift struct DeleteOtherFromChatRequest. */
export interface DeleteOtherFromChatRequest {
	reqSeq: number;
	chatMid: string;
	targetUserMids: string[];
}

/** Wire-format fields for the LINE Thrift struct DeleteSafetyStatusRequest. */
export interface DeleteSafetyStatusRequest {
	disasterId: string;
}

/** Wire-format fields for the LINE Thrift struct DeleteSelfFromChatRequest. */
export interface DeleteSelfFromChatRequest {
	reqSeq: number;
	chatMid: string;
	lastSeenMessageDeliveredTime: Int64;
	lastSeenMessageId: string;
	lastMessageDeliveredTime: Int64;
	lastMessageId: string;
}

/** Wire-format fields for the LINE Thrift struct DeleteSquareChatAnnouncementRequest. */
export interface DeleteSquareChatAnnouncementRequest {
	squareChatMid: string;
	announcementSeq: Int64;
}

/** Wire-format fields for the LINE Thrift struct DeleteSquareChatRequest. */
export interface DeleteSquareChatRequest {
	squareChatMid: string;
	revision: Int64;
}

/** Wire-format fields for the LINE Thrift struct DeleteSquareRequest. */
export interface DeleteSquareRequest {
	mid: string;
	revision: Int64;
}

/** Wire-format fields for the LINE Thrift struct DestinationLIFFRequest. */
export interface DestinationLIFFRequest {
	originalUrl: string;
}

/** Wire-format fields for the LINE Thrift struct DestinationLIFFResponse. */
export interface DestinationLIFFResponse {
	destinationUrl: string;
}

/** Wire-format fields for the LINE Thrift struct DestroyMessageRequest. */
export interface DestroyMessageRequest {
	squareChatMid: string;
	messageId: string;
	threadMid: string;
}

/** Wire-format fields for the LINE Thrift struct DestroyMessagesRequest. */
export interface DestroyMessagesRequest {
	squareChatMid: string;
	messageIds: string[];
	threadMid: string;
}

/** Wire-format fields for the LINE Thrift struct DetermineMediaMessageFlowRequest. */
export interface DetermineMediaMessageFlowRequest {
	chatMid: string;
}

/** Wire-format fields for the LINE Thrift struct DetermineMediaMessageFlowResponse. */
export interface DetermineMediaMessageFlowResponse {
	flowMap: Record<number, number>;
	cacheTtlMillis: Int64;
}

/** Wire-format fields for the LINE Thrift struct Device. */
export interface Device {
	udid: string;
	deviceModel: string;
}

/** Wire-format fields for the LINE Thrift struct DeviceInfo. */
export interface DeviceInfo {
	deviceName: string;
	systemName: string;
	systemVersion: string;
	model: string;
	webViewVersion: string;
	carrierCode: CarrierCode;
	carrierName: string;
	applicationType: ApplicationType;
}

/** Wire-format fields for the LINE Thrift struct DeviceLinkRequest. */
export interface DeviceLinkRequest {
	deviceId: string;
}

/** Wire-format fields for the LINE Thrift struct DeviceLinkResponse. */
export interface DeviceLinkResponse {
	latestOffset: Int64;
}

/** Wire-format fields for the LINE Thrift struct DeviceUnlinkRequest. */
export interface DeviceUnlinkRequest {
	deviceId: string;
}

/** Wire-format fields for the LINE Thrift struct DisasterInfo. */
export interface DisasterInfo {
	disasterId: string;
	title: string;
	region: string;
	disasterDescription: string;
	seeMoreUrl: string;
	status: vh_EnumC37632c;
	highImpact: boolean;
}

/** Wire-format fields for the LINE Thrift struct DisconnectEapAccountRequest. */
export interface DisconnectEapAccountRequest {
	eapType: Q70_q;
}

/** Wire-format fields for the LINE Thrift struct DisplayMoney. */
export interface DisplayMoney {
	amount: string;
	amountString: string;
	currency: string;
}

/** Wire-format fields for the LINE Thrift struct E2EEKeyChain. */
export interface E2EEKeyChain {
	keychain: Pb1_V3[];
}

/** Wire-format fields for the LINE Thrift struct E2EEMessageInfo. */
export interface E2EEMessageInfo {
	contentType: ContentType;
	contentMetadata: Record<string, string>;
	chunks: (string | Buffer)[];
}

/** Wire-format fields for the LINE Thrift struct E2EEMetadata. */
export interface E2EEMetadata {
	e2EEPublicKeyId: Int64;
}

/** Wire-format fields for the LINE Thrift struct E2EENegotiationResult. */
export interface E2EENegotiationResult {
	allowedTypes: number[];
	publicKey: Pb1_C13097n4;
	specVersion: number;
}

/** Wire-format fields for the LINE Thrift struct EapLogin. */
export interface EapLogin {
	type: a80_EnumC16644b;
	accessToken: string;
	countryCode: string;
}

/** Wire-format fields for the LINE Thrift struct EditItemsInCollectionRequest. */
export interface EditItemsInCollectionRequest {
	collectionId: string;
	items: CollectionItem[];
}

/** Wire-format fields for the LINE Thrift struct EditorsPickBannerForClient. */
export interface EditorsPickBannerForClient {
	id: Int64;
	endPageBannerImageUrl: string;
	defaulteditorsPickShowcaseType: Ob1_I;
	showNewBadge: boolean;
	name: string;
	description: string;
}

/** Wire-format fields for the LINE Thrift struct Eg_C8928b. */
export interface Eg_C8928b {
}

/** Wire-format fields for the LINE Thrift struct Eh_C8933a. */
export interface Eh_C8933a {
}

/** Wire-format fields for the LINE Thrift struct Eh_C8935c. */
export interface Eh_C8935c {
}

/** Wire-format fields for the LINE Thrift struct EstablishE2EESessionRequest. */
export interface EstablishE2EESessionRequest {
	clientPublicKey: string;
}

/** Wire-format fields for the LINE Thrift struct EstablishE2EESessionResponse. */
export interface EstablishE2EESessionResponse {
	sessionId: string;
	serverPublicKey: string;
	expireAt: Int64;
}

/** Wire-format fields for the LINE Thrift struct EventButton. */
export interface EventButton {
	text: string;
	linkUrl: string;
}

/** Wire-format fields for the LINE Thrift struct EvidenceId. */
export interface EvidenceId {
	spaceId: string;
	objectId: string;
}

/** Wire-format fields for the LINE Thrift struct ExecuteOnetimeScenarioOperation. */
export interface ExecuteOnetimeScenarioOperation {
	connectionId: string;
	scenario: Scenario;
}

/** Wire-format fields for the LINE Thrift struct ExistPinCodeResponse. */
export interface ExistPinCodeResponse {
	exists: boolean;
}

/** Wire-format fields for the LINE Thrift struct ExtendedMessageBox. */
export interface ExtendedMessageBox {
	id: string;
	midType: MIDType;
	lastDeliveredMessageId: MessageBoxV2MessageId;
	lastSeenMessageId: Int64;
	unreadCount: Int64;
	lastMessages: Message[];
	lastRemovedMessageId: Int64;
	lastRemovedTime: Int64;
	hiddenAtMessageId: Int64;
}

/** Wire-format fields for the LINE Thrift struct ExtendedProfile. */
export interface ExtendedProfile {
	birthday: ExtendedProfileBirthday;
}

/** Wire-format fields for the LINE Thrift struct ExtendedProfileBirthday. */
export interface ExtendedProfileBirthday {
	year: string;
	yearPrivacyLevelType: Pb1_H6;
	yearEnabled: boolean;
	day: string;
	dayPrivacyLevelType: Pb1_H6;
	dayEnabled: boolean;
}

/** Wire-format fields for the LINE Thrift struct FetchLiveTalkEventsRequest. */
export interface FetchLiveTalkEventsRequest {
	squareChatMid: string;
	sessionId: string;
	syncToken: string;
	limit: number;
}

/** Wire-format fields for the LINE Thrift struct FetchLiveTalkEventsResponse. */
export interface FetchLiveTalkEventsResponse {
	events: LiveTalkEvent[];
	syncToken: string;
	hasMore: boolean;
}

/** Wire-format fields for the LINE Thrift struct FetchMyEventsRequest. */
export interface FetchMyEventsRequest {
	subscriptionId: Int64;
	syncToken: string;
	limit: number;
	continuationToken: string;
}

/** Wire-format fields for the LINE Thrift struct FetchMyEventsResponse. */
export interface FetchMyEventsResponse {
	subscription: SubscriptionState;
	events: SquareEvent[];
	syncToken: string;
	continuationToken: string;
}

/** Wire-format fields for the LINE Thrift struct FetchOperationsRequest. */
export interface FetchOperationsRequest {
	deviceId: string;
	offsetFrom: Int64;
}

/** Wire-format fields for the LINE Thrift struct FetchOperationsResponse. */
export interface FetchOperationsResponse {
	operations: ThingsOperation[];
	hasNext: boolean;
}

/** Wire-format fields for the LINE Thrift struct FetchPhonePinCodeMsgRequest. */
export interface FetchPhonePinCodeMsgRequest {
	authSessionId: string;
	userPhoneNumber: UserPhoneNumber;
}

/** Wire-format fields for the LINE Thrift struct FetchPhonePinCodeMsgResponse. */
export interface FetchPhonePinCodeMsgResponse {
	pinCodeMessage: string;
	destinationPhoneNumber: string;
}

/** Wire-format fields for the LINE Thrift struct FetchSquareChatEventsRequest. */
export interface FetchSquareChatEventsRequest {
	subscriptionId: Int64;
	squareChatMid: string;
	syncToken: string;
	limit: number;
	direction: FetchDirection;
	inclusive: BooleanState;
	continuationToken: string;
	fetchType: FetchType;
	threadMid: string;
}

/** Wire-format fields for the LINE Thrift struct FetchSquareChatEventsResponse. */
export interface FetchSquareChatEventsResponse {
	subscription: SubscriptionState;
	events: SquareEvent[];
	syncToken: string;
	continuationToken: string;
}

/** Wire-format fields for the LINE Thrift struct FileMeta. */
export interface FileMeta {
	url: string;
	hash: string;
}

/** Wire-format fields for the LINE Thrift struct FindChatByTicketRequest. */
export interface FindChatByTicketRequest {
	ticketId: string;
}

/** Wire-format fields for the LINE Thrift struct FindChatByTicketResponse. */
export interface FindChatByTicketResponse {
	chat: Chat;
}

/** Wire-format fields for the LINE Thrift struct FindLiveTalkByInvitationTicketRequest. */
export interface FindLiveTalkByInvitationTicketRequest {
	invitationTicket: string;
}

/** Wire-format fields for the LINE Thrift struct FindLiveTalkByInvitationTicketResponse. */
export interface FindLiveTalkByInvitationTicketResponse {
	chatInvitationTicket: string;
	liveTalk: LiveTalk;
	chat: SquareChat;
	squareMember: SquareMember;
	chatMembershipState: SquareChatMembershipState;
	squareAdultOnly: BooleanState;
}

/** Wire-format fields for the LINE Thrift struct FindSquareByEmidRequest. */
export interface FindSquareByEmidRequest {
	emid: string;
}

/** Wire-format fields for the LINE Thrift struct FindSquareByEmidResponse. */
export interface FindSquareByEmidResponse {
	square: Square;
	myMembership: SquareMember;
	squareAuthority: SquareAuthority;
	squareStatus: SquareStatus;
	squareFeatureSet: SquareFeatureSet;
	noteStatus: NoteStatus;
	squareSubscriptionProduct: SquareSubscriptionProduct;
	freeTrialEligible: boolean;
	paidSquareAdmin: SquareMember;
}

/** Wire-format fields for the LINE Thrift struct FindSquareByInvitationTicketRequest. */
export interface FindSquareByInvitationTicketRequest {
	invitationTicket: string;
}

/** Wire-format fields for the LINE Thrift struct FindSquareByInvitationTicketResponse. */
export interface FindSquareByInvitationTicketResponse {
	square: Square;
	myMembership: SquareMember;
	squareAuthority: SquareAuthority;
	squareStatus: SquareStatus;
	squareFeatureSet: SquareFeatureSet;
	noteStatus: NoteStatus;
	chat: SquareChat;
	chatStatus: SquareChatStatus;
}

/** Wire-format fields for the LINE Thrift struct FindSquareByInvitationTicketV2Request. */
export interface FindSquareByInvitationTicketV2Request {
	invitationTicket: string;
}

/** Wire-format fields for the LINE Thrift struct FindSquareByInvitationTicketV2Response. */
export interface FindSquareByInvitationTicketV2Response {
	square: Square;
	myMembership: SquareMember;
	squareAuthority: SquareAuthority;
	squareStatus: SquareStatus;
	squareFeatureSet: SquareFeatureSet;
	noteStatus: NoteStatus;
	chat: SquareChat;
	chatStatus: SquareChatStatusWithoutMessage;
	squareSubscriptionProduct: SquareSubscriptionProduct;
	freeTrialEligible: boolean;
	paidSquareAdmin: SquareMember;
}

/** Wire-format fields for the LINE Thrift struct FollowBuddyDetail. */
export interface FollowBuddyDetail {
	iconType: number;
}

/** Wire-format fields for the LINE Thrift struct FollowProfile. */
export interface FollowProfile {
	followMid: Pb1_A4;
	displayName: string;
	picturePath: string;
	following: boolean;
	allowFollow: boolean;
	followBuddyDetail: FollowBuddyDetail;
}

/** Wire-format fields for the LINE Thrift struct FollowRequest. */
export interface FollowRequest {
	followMid: Pb1_A4;
}

/** Wire-format fields for the LINE Thrift struct FontMeta. */
export interface FontMeta {
	id: string;
	name: string;
	displayName: string;
	type: any;
	font: FileMeta;
	fontSubset: FileMeta;
	expiresAtMillis: Int64;
}

/** Wire-format fields for the LINE Thrift struct ForceEndLiveTalkRequest. */
export interface ForceEndLiveTalkRequest {
	squareChatMid: string;
	sessionId: string;
}

/** Wire-format fields for the LINE Thrift struct ForceSelectedSubTabInfo. */
export interface ForceSelectedSubTabInfo {
	subTabId: string;
	forceSelectedSubTabRevision: Int64;
	wrsDefaultTabModelId: string;
}

/** Wire-format fields for the LINE Thrift struct FormattedPhoneNumbers. */
export interface FormattedPhoneNumbers {
	localFormatPhoneNumber: string;
	prettifiedFormatPhoneNumber: string;
}

/** Wire-format fields for the LINE Thrift struct FriendRequest. */
export interface FriendRequest {
	eMid: string;
	mid: string;
	direction: Pb1_F4;
	method: Pb1_G4;
	param: string;
	timestamp: Int64;
	seqId: Int64;
	displayName: string;
	picturePath: string;
	pictureStatus: string;
}

/** Wire-format fields for the LINE Thrift struct FriendRequestsInfo. */
export interface FriendRequestsInfo {
	totalIncomingCount: number;
	totalOutgoingCount: number;
	recentIncomings: FriendRequest[];
	recentOutgoings: FriendRequest[];
	totalIncomingLimit: number;
	totalOutgoingLimit: number;
}

/** Wire-format fields for the LINE Thrift struct FullSyncResponse. */
export interface FullSyncResponse {
	reasons: number[];
	nextRevision: Int64;
}

/** Wire-format fields for the LINE Thrift struct GattReadAction. */
export interface GattReadAction {
	serviceUuid: string;
	characteristicUuid: string;
}

/** Wire-format fields for the LINE Thrift struct Geolocation. */
export interface Geolocation {
	longitude: number;
	latitude: number;
	accuracy: GeolocationAccuracy;
	altitudeMeters: number;
	velocityMetersPerSecond: number;
	bearingDegrees: number;
	beaconData: BeaconData[];
}

/** Wire-format fields for the LINE Thrift struct GeolocationAccuracy. */
export interface GeolocationAccuracy {
	radiusMeters: number;
	radiusConfidence: number;
	altitudeAccuracy: number;
	velocityAccuracy: number;
	bearingAccuracy: number;
	accuracyMode: Pb1_EnumC13050k;
}

/** Wire-format fields for the LINE Thrift struct GetAccessTokenRequest. */
export interface GetAccessTokenRequest {
	fontId: string;
}

/** Wire-format fields for the LINE Thrift struct GetAccessTokenResponse. */
export interface GetAccessTokenResponse {
	expiresAtMillis: Int64;
}

/** Wire-format fields for the LINE Thrift struct I80_C26410k. */
export interface I80_C26410k {
	authSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct GetAcctVerifMethodResponse. */
export interface GetAcctVerifMethodResponse {
	availableMethod: T70_EnumC14392c;
	sameAccountFromAuthFactor: boolean;
}

/** Wire-format fields for the LINE Thrift struct I80_C26412l. */
export interface I80_C26412l {
	availableMethod: I80_EnumC26392b;
}

/** Wire-format fields for the LINE Thrift struct GetAllChatMidsRequest. */
export interface GetAllChatMidsRequest {
	withMemberChats: boolean;
	withInvitedChats: boolean;
}

/** Wire-format fields for the LINE Thrift struct GetAllChatMidsResponse. */
export interface GetAllChatMidsResponse {
	memberChatMids: string[];
	invitedChatMids: string[];
}

/** Wire-format fields for the LINE Thrift struct GetAllowedRegistrationMethodResponse. */
export interface GetAllowedRegistrationMethodResponse {
	registrationMethod: T70_Z0;
}

/** Wire-format fields for the LINE Thrift struct GetAssertionChallengeResponse. */
export interface GetAssertionChallengeResponse {
	sessionId: string;
	challenge: string;
}

/** Wire-format fields for the LINE Thrift struct GetAttestationChallengeResponse. */
export interface GetAttestationChallengeResponse {
	sessionId: string;
	challenge: string;
}

/** Wire-format fields for the LINE Thrift struct GetBalanceResponse. */
export interface GetBalanceResponse {
	balance: Balance;
}

/** Wire-format fields for the LINE Thrift struct GetBalanceSummaryResponseV2. */
export interface GetBalanceSummaryResponseV2 {
	payInfo: LinePayInfo;
	payPromotions: LinePayPromotion[];
	pointInfo: LinePointInfo;
	balanceShortcutInfo: BalanceShortcutInfo;
}

/** Wire-format fields for the LINE Thrift struct GetBalanceSummaryV4WithPayV3Response. */
export interface GetBalanceSummaryV4WithPayV3Response {
	payInfo: LinePayInfoV3;
	payPromotions: LinePayPromotion[];
	balanceShortcutInfo: BalanceShortcutInfoV4;
	pointInfo: LinePointInfo;
}

/** Wire-format fields for the LINE Thrift struct GetBirthdayEffectResponse. */
export interface GetBirthdayEffectResponse {
	effect: HomeEffect;
}

/** Wire-format fields for the LINE Thrift struct GetBleDeviceRequest. */
export interface GetBleDeviceRequest {
	serviceUuid: string;
	psdi: string;
}

/** Wire-format fields for the LINE Thrift struct GetBuddyChatBarRequest. */
export interface GetBuddyChatBarRequest {
	buddyMid: string;
	chatBarRevision: Int64;
	richMenuId: string;
}

/** Wire-format fields for the LINE Thrift struct GetBuddyLiveRequest. */
export interface GetBuddyLiveRequest {
	mid: string;
}

/** Wire-format fields for the LINE Thrift struct GetBuddyLiveResponse. */
export interface GetBuddyLiveResponse {
	info: BuddyLive;
	refreshedIn: Int64;
}

/** Wire-format fields for the LINE Thrift struct GetBuddyStatusBarV2Request. */
export interface GetBuddyStatusBarV2Request {
	botMid: string;
	revision: Int64;
}

/** Wire-format fields for the LINE Thrift struct GetCallStatusRequest. */
export interface GetCallStatusRequest {
	basicSearchId: string;
	otp: string;
}

/** Wire-format fields for the LINE Thrift struct GetCallStatusResponse. */
export interface GetCallStatusResponse {
	isInsideBusinessHours: boolean;
	displayName: string;
	isCallSettingEnabled: boolean;
	isExpiredOtp: boolean;
	requireOtpInCallUrl: boolean;
}

/** Wire-format fields for the LINE Thrift struct GetCampaignRequest. */
export interface GetCampaignRequest {
	campaignType: string;
}

/** Wire-format fields for the LINE Thrift struct GetCampaignResponse. */
export interface GetCampaignResponse {
	campaignStatus: NZ0_EnumC12188n;
	campaignProperty: CampaignProperty;
	intervalDateTimeMillis: Int64;
}

/** Wire-format fields for the LINE Thrift struct GetChallengeForPaakAuthRequest. */
export interface GetChallengeForPaakAuthRequest {
	sessionId: string;
}

/** Wire-format fields for the LINE Thrift struct GetChallengeForPaakAuthResponse. */
export interface GetChallengeForPaakAuthResponse {
	options: any;
}

/** Wire-format fields for the LINE Thrift struct GetChallengeForPrimaryRegRequest. */
export interface GetChallengeForPrimaryRegRequest {
	sessionId: string;
}

/** Wire-format fields for the LINE Thrift struct GetChallengeForPrimaryRegResponse. */
export interface GetChallengeForPrimaryRegResponse {
	options: PublicKeyCredentialCreationOptions;
}

/** Wire-format fields for the LINE Thrift struct GetChannelContextRequest. */
export interface GetChannelContextRequest {
	authSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct GetChannelContextResponse. */
export interface GetChannelContextResponse {
	channelContext: any;
}

/** Wire-format fields for the LINE Thrift struct GetChatappRequest. */
export interface GetChatappRequest {
	chatappId: string;
	language: string;
}

/** Wire-format fields for the LINE Thrift struct GetChatappResponse. */
export interface GetChatappResponse {
	app: Chatapp;
}

/** Wire-format fields for the LINE Thrift struct GetChatsRequest. */
export interface GetChatsRequest {
	chatMids: string[];
	withMembers: boolean;
	withInvitees: boolean;
}

/** Wire-format fields for the LINE Thrift struct GetChatsResponse. */
export interface GetChatsResponse {
	chats: Chat[];
}

/** Wire-format fields for the LINE Thrift struct GetCoinHistoryRequest. */
export interface GetCoinHistoryRequest {
	appStoreCode: jO0_EnumC27533B;
	country: string;
	language: string;
	searchEndDate: string;
	offset: number;
	limit: number;
}

/** Wire-format fields for the LINE Thrift struct GetCoinHistoryResponse. */
export interface GetCoinHistoryResponse {
	histories: CoinHistory[];
	balance: Coin;
	offset: number;
	hasNext: boolean;
}

/** Wire-format fields for the LINE Thrift struct GetCoinProductsRequest. */
export interface GetCoinProductsRequest {
	appStoreCode: jO0_EnumC27533B;
	country: string;
	language: string;
	pgCode: jO0_EnumC27559z;
}

/** Wire-format fields for the LINE Thrift struct GetCoinProductsResponse. */
export interface GetCoinProductsResponse {
	items: CoinProductItem[];
}

/** Wire-format fields for the LINE Thrift struct GetContactCalendarEventResponse. */
export interface GetContactCalendarEventResponse {
	targetUserMid: string;
	userType: LN0_X0;
	ContactCalendarEvents: ContactCalendarEvents;
	snapshotTimeMillis: Int64;
}

/** Wire-format fields for the LINE Thrift struct GetContactCalendarEventTarget. */
export interface GetContactCalendarEventTarget {
	targetUserMid: string;
}

/** Wire-format fields for the LINE Thrift struct GetContactCalendarEventsRequest. */
export interface GetContactCalendarEventsRequest {
	targetUsers: GetContactCalendarEventTarget[];
	syncReason: Pb1_V7;
	requiredContactCalendarEvents: any[];
}

/** Wire-format fields for the LINE Thrift struct GetContactCalendarEventsResponse. */
export interface GetContactCalendarEventsResponse {
	responses: GetContactCalendarEventResponse[];
}

/** Wire-format fields for the LINE Thrift struct GetContactV3Response. */
export interface GetContactV3Response {
	targetUserMid: string;
	userType: LN0_X0;
	targetProfileDetail: TargetProfileDetail;
	friendDetail: LN0_Z;
	blockDetail: LN0_V;
	recommendationDetail: LN0_y0;
	notificationSettingEntry: NotificationSettingEntry;
}

/** Wire-format fields for the LINE Thrift struct GetContactV3Target. */
export interface GetContactV3Target {
	targetUserMid: string;
}

/** Wire-format fields for the LINE Thrift struct GetContactsV3Request. */
export interface GetContactsV3Request {
	targetUsers: GetContactV3Target[];
	syncReason: Pb1_V7;
	checkUserStatusStrictly: boolean;
}

/** Wire-format fields for the LINE Thrift struct GetContactsV3Response. */
export interface GetContactsV3Response {
	responses: GetContactV3Response[];
}

/** Wire-format fields for the LINE Thrift struct I80_C26413m. */
export interface I80_C26413m {
	authSessionId: string;
	simCard: I80_B0;
}

/** Wire-format fields for the LINE Thrift struct I80_C26414n. */
export interface I80_C26414n {
	countryCode: string;
	countryInEEA: boolean;
	countrySetOfEEA: string[];
}

/** Wire-format fields for the LINE Thrift struct GetCountryInfoResponse. */
export interface GetCountryInfoResponse {
	countryCode: string;
	countryInEEA: boolean;
	countrySetOfEEA: string[];
}

/** Wire-format fields for the LINE Thrift struct GetDisasterCasesResponse. */
export interface GetDisasterCasesResponse {
	disasters: DisasterInfo[];
	messageTemplate: string[];
	ttlInMillis: Int64;
}

/** Wire-format fields for the LINE Thrift struct GetE2EEKeyBackupCertificatesResponse. */
export interface GetE2EEKeyBackupCertificatesResponse {
	urlHashList: string[];
}

/** Wire-format fields for the LINE Thrift struct GetE2EEKeyBackupInfoResponse. */
export interface GetE2EEKeyBackupInfoResponse {
	blobHeaderHash: string;
	blobPayloadHash: string;
	missingKeyIds: number[];
	startTimeMillis: Int64;
	endTimeMillis: Int64;
}

/** Wire-format fields for the LINE Thrift struct GetExchangeKeyRequest. */
export interface GetExchangeKeyRequest {
	sessionId: string;
}

/** Wire-format fields for the LINE Thrift struct GetExchangeKeyResponse. */
export interface GetExchangeKeyResponse {
	exchangeKey: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct GetFollowBlacklistRequest. */
export interface GetFollowBlacklistRequest {
	cursor: string;
}

/** Wire-format fields for the LINE Thrift struct GetFollowBlacklistResponse. */
export interface GetFollowBlacklistResponse {
	profiles: FollowProfile[];
	cursor: string;
}

/** Wire-format fields for the LINE Thrift struct GetFollowersRequest. */
export interface GetFollowersRequest {
	followMid: Pb1_A4;
	cursor: string;
}

/** Wire-format fields for the LINE Thrift struct GetFollowersResponse. */
export interface GetFollowersResponse {
	profiles: FollowProfile[];
	cursor: string;
	followingCount: Int64;
	followerCount: Int64;
}

/** Wire-format fields for the LINE Thrift struct GetFollowingsRequest. */
export interface GetFollowingsRequest {
	followMid: Pb1_A4;
	cursor: string;
}

/** Wire-format fields for the LINE Thrift struct GetFollowingsResponse. */
export interface GetFollowingsResponse {
	profiles: FollowProfile[];
	cursor: string;
	followingCount: Int64;
	followerCount: Int64;
}

/** Wire-format fields for the LINE Thrift struct GetFontMetasRequest. */
export interface GetFontMetasRequest {
	requestCause: VR0_l;
}

/** Wire-format fields for the LINE Thrift struct GetFontMetasResponse. */
export interface GetFontMetasResponse {
	fontMetas: FontMeta[];
	ttlInSeconds: number;
}

/** Wire-format fields for the LINE Thrift struct GetFriendDetailResponse. */
export interface GetFriendDetailResponse {
	targetUserMid: string;
	friendDetail: LN0_Z;
}

/** Wire-format fields for the LINE Thrift struct GetFriendDetailTarget. */
export interface GetFriendDetailTarget {
	targetUserMid: string;
}

/** Wire-format fields for the LINE Thrift struct GetFriendDetailsRequest. */
export interface GetFriendDetailsRequest {
	targetUsers: GetFriendDetailTarget[];
	syncReason: Pb1_V7;
}

/** Wire-format fields for the LINE Thrift struct GetFriendDetailsResponse. */
export interface GetFriendDetailsResponse {
	responses: GetFriendDetailResponse[];
}

/** Wire-format fields for the LINE Thrift struct GetGnbBadgeStatusRequest. */
export interface GetGnbBadgeStatusRequest {
	uenRevision: string;
}

/** Wire-format fields for the LINE Thrift struct GetGnbBadgeStatusResponse. */
export interface GetGnbBadgeStatusResponse {
	uenRevision: string;
	badgeStatus: NZ0_EnumC12170h;
}

/** Wire-format fields for the LINE Thrift struct GetGoogleAdOptionsRequest. */
export interface GetGoogleAdOptionsRequest {
	squareMid: string;
	chatMid: string;
	adScreen: AdScreen;
}

/** Wire-format fields for the LINE Thrift struct GetGoogleAdOptionsResponse. */
export interface GetGoogleAdOptionsResponse {
	showAd: boolean;
	contentUrls: string[];
	customTargeting: Record<string, string>;
	clientCacheTtlSeconds: number;
}

/** Wire-format fields for the LINE Thrift struct GetGroupCallUrlInfoRequest. */
export interface GetGroupCallUrlInfoRequest {
	urlId: string;
}

/** Wire-format fields for the LINE Thrift struct GetGroupCallUrlInfoResponse. */
export interface GetGroupCallUrlInfoResponse {
	title: string;
	createdTimeMillis: Int64;
}

/** Wire-format fields for the LINE Thrift struct GetGroupCallUrlsResponse. */
export interface GetGroupCallUrlsResponse {
	urls: GroupCallUrl[];
}

/** Wire-format fields for the LINE Thrift struct GetHomeFlexContentRequest. */
export interface GetHomeFlexContentRequest {
	supportedFlexVersion: number;
}

/** Wire-format fields for the LINE Thrift struct GetHomeFlexContentResponse. */
export interface GetHomeFlexContentResponse {
	placements: HomeTabPlacement[];
	expireTimeMillis: Int64;
	gnbBadgeId: string;
	gnbBadgeExpireTimeMillis: Int64;
}

/** Wire-format fields for the LINE Thrift struct GetHomeServiceListResponse. */
export interface GetHomeServiceListResponse {
	services: HomeService[];
	fixedServiceIds: number[];
	pinnedServiceCandidateIds: number[];
	categories: HomeCategory[];
	fixedServiceIdsV3: number[];
	specificServiceId: number;
}

/** Wire-format fields for the LINE Thrift struct GetHomeServicesRequest. */
export interface GetHomeServicesRequest {
	ids: number[];
}

/** Wire-format fields for the LINE Thrift struct GetHomeServicesResponse. */
export interface GetHomeServicesResponse {
	services: HomeService[];
}

/** Wire-format fields for the LINE Thrift struct GetIncentiveStatusResponse. */
export interface GetIncentiveStatusResponse {
	paypayPoint: number;
	incentiveCode: string;
	subscribedFromViral: boolean;
}

/** Wire-format fields for the LINE Thrift struct GetInvitationTicketUrlRequest. */
export interface GetInvitationTicketUrlRequest {
	mid: string;
}

/** Wire-format fields for the LINE Thrift struct GetInvitationTicketUrlResponse. */
export interface GetInvitationTicketUrlResponse {
	invitationURL: string;
}

/** Wire-format fields for the LINE Thrift struct GetJoinableSquareChatsRequest. */
export interface GetJoinableSquareChatsRequest {
	squareMid: string;
	continuationToken: string;
	limit: number;
}

/** Wire-format fields for the LINE Thrift struct GetJoinableSquareChatsResponse. */
export interface GetJoinableSquareChatsResponse {
	squareChats: SquareChat[];
	continuationToken: string;
	totalSquareChatCount: number;
	squareChatStatuses: Record<string, SquareChatStatus>;
}

/** Wire-format fields for the LINE Thrift struct GetJoinedMembershipByBotMidRequest. */
export interface GetJoinedMembershipByBotMidRequest {
	botMid: string;
}

/** Wire-format fields for the LINE Thrift struct GetJoinedMembershipRequest. */
export interface GetJoinedMembershipRequest {
	uniqueKey: string;
}

/** Wire-format fields for the LINE Thrift struct GetJoinedSquareChatsRequest. */
export interface GetJoinedSquareChatsRequest {
	continuationToken: string;
	limit: number;
}

/** Wire-format fields for the LINE Thrift struct GetJoinedSquareChatsResponse. */
export interface GetJoinedSquareChatsResponse {
	chats: SquareChat[];
	chatMembers: Record<string, SquareChatMember>;
	statuses: Record<string, SquareChatStatus>;
	continuationToken: string;
}

/** Wire-format fields for the LINE Thrift struct GetJoinedSquaresRequest. */
export interface GetJoinedSquaresRequest {
	continuationToken: string;
	limit: number;
}

/** Wire-format fields for the LINE Thrift struct GetJoinedSquaresResponse. */
export interface GetJoinedSquaresResponse {
	squares: Square[];
	members: Record<string, SquareMember>;
	authorities: Record<string, SquareAuthority>;
	statuses: Record<string, SquareStatus>;
	continuationToken: string;
	noteStatuses: Record<string, NoteStatus>;
}

/** Wire-format fields for the LINE Thrift struct GetKeyBackupCertificatesV2Response. */
export interface GetKeyBackupCertificatesV2Response {
	urlHashList: string[];
}

/** Wire-format fields for the LINE Thrift struct GetLFLSuggestionResponse. */
export interface GetLFLSuggestionResponse {
	majorVersion: string;
	minorVersion: string;
	clusterLink: string;
}

/** Wire-format fields for the LINE Thrift struct GetLiveTalkInfoForNonMemberRequest. */
export interface GetLiveTalkInfoForNonMemberRequest {
	squareChatMid: string;
	sessionId: string;
	speakers: string[];
}

/** Wire-format fields for the LINE Thrift struct GetLiveTalkInfoForNonMemberResponse. */
export interface GetLiveTalkInfoForNonMemberResponse {
	chatName: string;
	chatImageObsHash: string;
	liveTalk: LiveTalk;
	speakers: LiveTalkSpeaker[];
	chatInvitationTicket: string;
}

/** Wire-format fields for the LINE Thrift struct GetLiveTalkInvitationUrlRequest. */
export interface GetLiveTalkInvitationUrlRequest {
	squareChatMid: string;
	sessionId: string;
}

/** Wire-format fields for the LINE Thrift struct GetLiveTalkInvitationUrlResponse. */
export interface GetLiveTalkInvitationUrlResponse {
	invitationUrl: string;
}

/** Wire-format fields for the LINE Thrift struct GetLiveTalkSpeakersForNonMemberRequest. */
export interface GetLiveTalkSpeakersForNonMemberRequest {
	squareChatMid: string;
	sessionId: string;
	speakers: string[];
}

/** Wire-format fields for the LINE Thrift struct GetLiveTalkSpeakersForNonMemberResponse. */
export interface GetLiveTalkSpeakersForNonMemberResponse {
	speakers: LiveTalkSpeaker[];
}

/** Wire-format fields for the LINE Thrift struct GetLoginActorContextRequest. */
export interface GetLoginActorContextRequest {
	sessionId: string;
}

/** Wire-format fields for the LINE Thrift struct GetLoginActorContextResponse. */
export interface GetLoginActorContextResponse {
	applicationType: string;
	ipAddress: string;
	location: string;
}

/** Wire-format fields for the LINE Thrift struct GetMappedProfileIdsRequest. */
export interface GetMappedProfileIdsRequest {
	targetUserMids: string[];
}

/** Wire-format fields for the LINE Thrift struct GetMappedProfileIdsResponse. */
export interface GetMappedProfileIdsResponse {
	mappings: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct I80_C26415o. */
export interface I80_C26415o {
	authSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct I80_C26416p. */
export interface I80_C26416p {
	maskedEmail: string;
}

/** Wire-format fields for the LINE Thrift struct GetMaskedEmailResponse. */
export interface GetMaskedEmailResponse {
	maskedEmail: string;
}

/** Wire-format fields for the LINE Thrift struct GetMessageReactionsRequest. */
export interface GetMessageReactionsRequest {
	squareChatMid: string;
	messageId: string;
	type: MessageReactionType;
	continuationToken: string;
	limit: number;
	threadMid: string;
}

/** Wire-format fields for the LINE Thrift struct GetMessageReactionsResponse. */
export interface GetMessageReactionsResponse {
	reactions: SquareMessageReaction[];
	status: SquareMessageReactionStatus;
	continuationToken: string;
}

/** Wire-format fields for the LINE Thrift struct GetModuleLayoutV4Request. */
export interface GetModuleLayoutV4Request {
	etag: string;
}

/** Wire-format fields for the LINE Thrift struct GetModulesRequestV2. */
export interface GetModulesRequestV2 {
	etag: string;
	deviceAdId: string;
}

/** Wire-format fields for the LINE Thrift struct GetModulesRequestV3. */
export interface GetModulesRequestV3 {
	etag: string;
	tabIdentifier: NZ0_EnumC12169g1;
	deviceAdId: string;
	agreedWithTargetingAdByMid: boolean;
}

/** Wire-format fields for the LINE Thrift struct GetModulesV4WithStatusRequest. */
export interface GetModulesV4WithStatusRequest {
	etag: string;
	subTabId: string;
	deviceAdId: string;
	agreedWithTargetingAdByMid: boolean;
	deviceId: string;
}

/** Wire-format fields for the LINE Thrift struct GetMusicSubscriptionStatusResponse. */
export interface GetMusicSubscriptionStatusResponse {
	validUntil: Int64;
	expired: boolean;
	isStickersPremiumEnabled: boolean;
}

/** Wire-format fields for the LINE Thrift struct GetMyAssetInformationV2Request. */
export interface GetMyAssetInformationV2Request {
	refresh: boolean;
}

/** Wire-format fields for the LINE Thrift struct GetMyAssetInformationV2Response. */
export interface GetMyAssetInformationV2Response {
	headerInfo: HeaderInfo;
	assetServiceInfos: AssetServiceInfo[];
	serviceDisclaimerInfo: ServiceDisclaimerInfo;
	pointInfo: PointInfo;
	linkRewardInfo: LinkRewardInfo;
	pocketMoneyInfo: PocketMoneyInfo;
	scoreInfo: ScoreInfo;
	timestamp: Int64;
}

/** Wire-format fields for the LINE Thrift struct GetMyChatappsRequest. */
export interface GetMyChatappsRequest {
	language: string;
	continuationToken: string;
}

/** Wire-format fields for the LINE Thrift struct GetMyChatappsResponse. */
export interface GetMyChatappsResponse {
	apps: MyChatapp[];
	continuationToken: string;
}

/** Wire-format fields for the LINE Thrift struct GetMyDashboardRequest. */
export interface GetMyDashboardRequest {
	tabIdentifier: NZ0_EnumC12169g1;
}

/** Wire-format fields for the LINE Thrift struct GetMyDashboardResponse. */
export interface GetMyDashboardResponse {
	responseStatus: NZ0_W0;
	messages: MyDashboardItem[];
	cacheTimeSec: number;
	cautionText: string;
}

/** Wire-format fields for the LINE Thrift struct GetNoteStatusRequest. */
export interface GetNoteStatusRequest {
	squareMid: string;
}

/** Wire-format fields for the LINE Thrift struct GetNoteStatusResponse. */
export interface GetNoteStatusResponse {
	squareMid: string;
	status: NoteStatus;
}

/** Wire-format fields for the LINE Thrift struct GetNotificationSettingsRequest. */
export interface GetNotificationSettingsRequest {
	chatMids: string[];
	syncReason: Pb1_V7;
}

/** Wire-format fields for the LINE Thrift struct GetNotificationSettingsResponse. */
export interface GetNotificationSettingsResponse {
	notificationSettingEntries: Record<string, NotificationSettingEntry>;
}

/** Wire-format fields for the LINE Thrift struct I80_C26417q. */
export interface I80_C26417q {
	authSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct GetPasswordHashingParametersForPwdRegRequest. */
export interface GetPasswordHashingParametersForPwdRegRequest {
	authSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct GetPasswordHashingParametersForPwdRegResponse. */
export interface GetPasswordHashingParametersForPwdRegResponse {
	params: PasswordHashingParameters;
	passwordValidationRule: PasswordValidationRule[];
}

/** Wire-format fields for the LINE Thrift struct I80_C26418r. */
export interface I80_C26418r {
	params: PasswordHashingParameters;
	passwordValidationRule: PasswordValidationRule[];
}

/** Wire-format fields for the LINE Thrift struct GetPasswordHashingParametersForPwdVerifRequest. */
export interface GetPasswordHashingParametersForPwdVerifRequest {
	authSessionId: string;
	accountIdentifier: AccountIdentifier;
}

/** Wire-format fields for the LINE Thrift struct I80_C26419s. */
export interface I80_C26419s {
	authSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct GetPasswordHashingParametersForPwdVerifResponse. */
export interface GetPasswordHashingParametersForPwdVerifResponse {
	isV1HashRequired: boolean;
	v1HashParams: V1PasswordHashingParameters;
	hashParams: PasswordHashingParameters;
}

/** Wire-format fields for the LINE Thrift struct I80_C26420t. */
export interface I80_C26420t {
	isV1HashRequired: boolean;
	v1HashParams: V1PasswordHashingParameters;
	hashParams: PasswordHashingParameters;
}

/** Wire-format fields for the LINE Thrift struct GetPasswordHashingParametersRequest. */
export interface GetPasswordHashingParametersRequest {
	sessionId: string;
}

/** Wire-format fields for the LINE Thrift struct GetPasswordHashingParametersResponse. */
export interface GetPasswordHashingParametersResponse {
	hmacKey: string;
	scryptParams: ScryptParams;
	passwordValidationRule: PasswordValidationRule[];
}

/** Wire-format fields for the LINE Thrift struct GetPhoneVerifMethodForRegistrationRequest. */
export interface GetPhoneVerifMethodForRegistrationRequest {
	authSessionId: string;
	device: Device;
	userPhoneNumber: UserPhoneNumber;
}

/** Wire-format fields for the LINE Thrift struct GetPhoneVerifMethodForRegistrationResponse. */
export interface GetPhoneVerifMethodForRegistrationResponse {
	availableMethods: number[];
	prettifiedPhoneNumber: string;
}

/** Wire-format fields for the LINE Thrift struct GetPhoneVerifMethodV2Request. */
export interface GetPhoneVerifMethodV2Request {
	authSessionId: string;
	device: Device;
	userPhoneNumber: UserPhoneNumber;
}

/** Wire-format fields for the LINE Thrift struct I80_C26421u. */
export interface I80_C26421u {
	authSessionId: string;
	userPhoneNumber: UserPhoneNumber;
}

/** Wire-format fields for the LINE Thrift struct I80_C26422v. */
export interface I80_C26422v {
	availableMethods: number[];
	prettifiedPhoneNumber: string;
}

/** Wire-format fields for the LINE Thrift struct GetPhoneVerifMethodV2Response. */
export interface GetPhoneVerifMethodV2Response {
	availableMethods: number[];
	prettifiedPhoneNumber: string;
}

/** Wire-format fields for the LINE Thrift struct GetPhotoboothBalanceResponse. */
export interface GetPhotoboothBalanceResponse {
	availableTickets: number;
	nextTicketAvailableAt: Int64;
}

/** Wire-format fields for the LINE Thrift struct GetPopularKeywordsResponse. */
export interface GetPopularKeywordsResponse {
	popularKeywords: PopularKeyword[];
	expiredAt: Int64;
}

/** Wire-format fields for the LINE Thrift struct GetPredefinedScenarioSetsRequest. */
export interface GetPredefinedScenarioSetsRequest {
	deviceIds: string[];
}

/** Wire-format fields for the LINE Thrift struct GetPredefinedScenarioSetsResponse. */
export interface GetPredefinedScenarioSetsResponse {
	scenarioSets: Record<string, ScenarioSet>;
}

/** Wire-format fields for the LINE Thrift struct GetPremiumContextForMigResponse. */
export interface GetPremiumContextForMigResponse {
	isPremiumActive: boolean;
	isPremiumBackupActive: boolean;
	premiumType: T70_L;
	availablePremiumTypes: number[];
}

/** Wire-format fields for the LINE Thrift struct GetPremiumDataRetentionResponse. */
export interface GetPremiumDataRetentionResponse {
	dataRetentions: DataRetention[];
	noSyncUntil: Int64;
}

/** Wire-format fields for the LINE Thrift struct GetPremiumStatusResponse. */
export interface GetPremiumStatusResponse {
	active: boolean;
	validUntil: Int64;
	updatedTime: Int64;
	freeTrialUsed: boolean;
	willExpire: boolean;
	newToYahooShopping: boolean;
	idLinked: boolean;
	onFreeTrial: boolean;
	duplicated: boolean;
	planType: fN0_p;
	noSyncUntil: Int64;
	productId: string;
	currency: string;
	price: string;
	status: fN0_H;
	invitedByFriend: boolean;
	canceledProviders: number[];
	nextPaymentTime: Int64;
}

/** Wire-format fields for the LINE Thrift struct GetPreviousMessagesV2Request. */
export interface GetPreviousMessagesV2Request {
	messageBoxId: string;
	endMessageId: MessageBoxV2MessageId;
	messagesCount: number;
	withReadCount: boolean;
	receivedOnly: boolean;
	lastOpRevision: Int64;
}

/** Wire-format fields for the LINE Thrift struct GetProductLatestVersionForUserRequest. */
export interface GetProductLatestVersionForUserRequest {
	productType: Ob1_O0;
	productId: string;
}

/** Wire-format fields for the LINE Thrift struct GetProductLatestVersionForUserResponse. */
export interface GetProductLatestVersionForUserResponse {
	latestVersion: Int64;
	latestVersionString: string;
}

/** Wire-format fields for the LINE Thrift struct GetProductRequest. */
export interface GetProductRequest {
	productType: Ob1_O0;
	productId: string;
	carrierCode: string;
	saveBrowsingHistory: boolean;
}

/** Wire-format fields for the LINE Thrift struct GetProductResponse. */
export interface GetProductResponse {
	productDetail: ProductDetail;
}

/** Wire-format fields for the LINE Thrift struct GetProfilesRequest. */
export interface GetProfilesRequest {
	syncReason: Pb1_V7;
}

/** Wire-format fields for the LINE Thrift struct GetProfilesResponse. */
export interface GetProfilesResponse {
	profiles: Profile[];
}

/** Wire-format fields for the LINE Thrift struct GetPublishedMembershipsRequest. */
export interface GetPublishedMembershipsRequest {
	basicSearchId: string;
}

/** Wire-format fields for the LINE Thrift struct GetQuickMenuResponse. */
export interface GetQuickMenuResponse {
	pointInfo: QuickMenuPointInfo;
	couponInfo: QuickMenuCouponInfo;
	myCardInfo: QuickMenuMyCardInfo;
}

/** Wire-format fields for the LINE Thrift struct GetRecommendationDetailResponse. */
export interface GetRecommendationDetailResponse {
	targetUserMid: string;
	recommendationOrNot: LN0_y0;
}

/** Wire-format fields for the LINE Thrift struct GetRecommendationDetailTarget. */
export interface GetRecommendationDetailTarget {
	targetUserMid: string;
}

/** Wire-format fields for the LINE Thrift struct GetRecommendationDetailsRequest. */
export interface GetRecommendationDetailsRequest {
	targetUsers: GetRecommendationDetailTarget[];
	syncReason: Pb1_V7;
}

/** Wire-format fields for the LINE Thrift struct GetRecommendationDetailsResponse. */
export interface GetRecommendationDetailsResponse {
	responses: GetRecommendationDetailResponse[];
}

/** Wire-format fields for the LINE Thrift struct GetRecommendationResponse. */
export interface GetRecommendationResponse {
	results: ProductSearchSummary[];
	continuationToken: string;
	totalSize: Int64;
}

/** Wire-format fields for the LINE Thrift struct GetRepairElementsRequest. */
export interface GetRepairElementsRequest {
	profile: boolean;
	settings: boolean;
	configurations: ConfigurationsParams;
	numLocalJoinedGroups: number;
	numLocalInvitedGroups: number;
	numLocalFriends: number;
	numLocalRecommendations: number;
	numLocalBlockedFriends: number;
	numLocalBlockedRecommendations: number;
	localGroupMembers: Record<string, RepairGroupMembers>;
	syncReason: Pb1_V7;
	localProfileMappings: Record<string, number>;
	contactCounts: any;
}

/** Wire-format fields for the LINE Thrift struct GetRepairElementsResponse. */
export interface GetRepairElementsResponse {
	profile: RepairTriggerProfileElement;
	settings: RepairTriggerSettingsElement;
	configurations: RepairTriggerConfigurationsElement;
	numJoinedGroups: RepairTriggerNumElement;
	numInvitedGroups: RepairTriggerNumElement;
	numFriends: RepairTriggerNumElement;
	numRecommendations: RepairTriggerNumElement;
	numBlockedFriends: RepairTriggerNumElement;
	numBlockedRecommendations: RepairTriggerNumElement;
	groupMembers: RepairTriggerGroupMembersElement;
	profileMappings: RepairTriggerProfileMappingListElement;
	contactCounts: any;
}

/** Wire-format fields for the LINE Thrift struct GetRequest. */
export interface GetRequest {
	keyName: string;
	ns: t80_h;
}

/** Wire-format fields for the LINE Thrift struct GetResourceFileReponse. */
export interface GetResourceFileReponse {
	tagClusterFileResponse: GetTagClusterFileResponse;
}

/** Wire-format fields for the LINE Thrift struct GetResourceFileRequest. */
export interface GetResourceFileRequest {
	tagClusterFileRequest: Ob1_C12642m0;
	staging: boolean;
}

/** Wire-format fields for the LINE Thrift struct GetResponse. */
export interface GetResponse {
	value: SettingValue;
}

/** Wire-format fields for the LINE Thrift struct GetResponseStatusRequest. */
export interface GetResponseStatusRequest {
	botMid: string;
}

/** Wire-format fields for the LINE Thrift struct GetResponseStatusResponse. */
export interface GetResponseStatusResponse {
	displayedResponseStatus: jf_EnumC27712a;
}

/** Wire-format fields for the LINE Thrift struct GetSCCRequest. */
export interface GetSCCRequest {
	basicSearchId: string;
}

/** Wire-format fields for the LINE Thrift struct I80_C26423w. */
export interface I80_C26423w {
	authSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct I80_C26424x. */
export interface I80_C26424x {
	encryptionKey: I80_y0;
}

/** Wire-format fields for the LINE Thrift struct GetSeasonalEffectsResponse. */
export interface GetSeasonalEffectsResponse {
	effects: HomeEffect[];
}

/** Wire-format fields for the LINE Thrift struct GetSecondAuthMethodResponse. */
export interface GetSecondAuthMethodResponse {
	secondAuthMethod: T70_e1;
}

/** Wire-format fields for the LINE Thrift struct GetServiceShortcutMenuResponse. */
export interface GetServiceShortcutMenuResponse {
	revision: string;
	refreshTimeSec: number;
	expandable: boolean;
	serviceShortcuts: ServiceShortcut[];
	menuDescription: string;
	numberOfItemsInRow: number;
}

/** Wire-format fields for the LINE Thrift struct GetSessionContentBeforeMigCompletionResponse. */
export interface GetSessionContentBeforeMigCompletionResponse {
	appTypeDifferentFromPrevDevice: boolean;
	e2eeKeyBackupServiceConfig: boolean;
	e2eeKeyBackupPeriodServiceConfig: number;
}

/** Wire-format fields for the LINE Thrift struct GetSmartChannelRecommendationsRequest. */
export interface GetSmartChannelRecommendationsRequest {
	maxResults: number;
	placement: string;
	testMode: boolean;
}

/** Wire-format fields for the LINE Thrift struct GetSmartChannelRecommendationsResponse. */
export interface GetSmartChannelRecommendationsResponse {
	smartChannelRecommendations: SmartChannelRecommendation[];
	minInterval: number;
	requestId: string;
}

/** Wire-format fields for the LINE Thrift struct GetSquareAuthoritiesRequest. */
export interface GetSquareAuthoritiesRequest {
	squareMids: string[];
}

/** Wire-format fields for the LINE Thrift struct GetSquareAuthoritiesResponse. */
export interface GetSquareAuthoritiesResponse {
	authorities: Record<string, SquareAuthority>;
}

/** Wire-format fields for the LINE Thrift struct GetSquareAuthorityRequest. */
export interface GetSquareAuthorityRequest {
	squareMid: string;
}

/** Wire-format fields for the LINE Thrift struct GetSquareAuthorityResponse. */
export interface GetSquareAuthorityResponse {
	authority: SquareAuthority;
}

/** Wire-format fields for the LINE Thrift struct GetSquareBotRequest. */
export interface GetSquareBotRequest {
	botMid: string;
}

/** Wire-format fields for the LINE Thrift struct GetSquareBotResponse. */
export interface GetSquareBotResponse {
	squareBot: SquareBot;
}

/** Wire-format fields for the LINE Thrift struct GetSquareCategoriesResponse. */
export interface GetSquareCategoriesResponse {
	categoryList: Category[];
}

/** Wire-format fields for the LINE Thrift struct GetSquareChatAnnouncementsRequest. */
export interface GetSquareChatAnnouncementsRequest {
	squareChatMid: string;
}

/** Wire-format fields for the LINE Thrift struct GetSquareChatAnnouncementsResponse. */
export interface GetSquareChatAnnouncementsResponse {
	announcements: SquareChatAnnouncement[];
}

/** Wire-format fields for the LINE Thrift struct GetSquareChatEmidRequest. */
export interface GetSquareChatEmidRequest {
	squareChatMid: string;
}

/** Wire-format fields for the LINE Thrift struct GetSquareChatEmidResponse. */
export interface GetSquareChatEmidResponse {
	squareChatEmid: string;
}

/** Wire-format fields for the LINE Thrift struct GetSquareChatFeatureSetRequest. */
export interface GetSquareChatFeatureSetRequest {
	squareChatMid: string;
}

/** Wire-format fields for the LINE Thrift struct GetSquareChatFeatureSetResponse. */
export interface GetSquareChatFeatureSetResponse {
	squareChatFeatureSet: SquareChatFeatureSet;
}

/** Wire-format fields for the LINE Thrift struct GetSquareChatMemberRequest. */
export interface GetSquareChatMemberRequest {
	squareMemberMid: string;
	squareChatMid: string;
}

/** Wire-format fields for the LINE Thrift struct GetSquareChatMemberResponse. */
export interface GetSquareChatMemberResponse {
	squareChatMember: SquareChatMember;
}

/** Wire-format fields for the LINE Thrift struct GetSquareChatMembersRequest. */
export interface GetSquareChatMembersRequest {
	squareChatMid: string;
	continuationToken: string;
	limit: number;
}

/** Wire-format fields for the LINE Thrift struct GetSquareChatMembersResponse. */
export interface GetSquareChatMembersResponse {
	squareChatMembers: SquareMember[];
	continuationToken: string;
	contentsAttributes: Record<string, number>;
}

/** Wire-format fields for the LINE Thrift struct GetSquareChatRequest. */
export interface GetSquareChatRequest {
	squareChatMid: string;
}

/** Wire-format fields for the LINE Thrift struct GetSquareChatResponse. */
export interface GetSquareChatResponse {
	squareChat: SquareChat;
	squareChatMember: SquareChatMember;
	squareChatStatus: SquareChatStatus;
}

/** Wire-format fields for the LINE Thrift struct GetSquareChatStatusRequest. */
export interface GetSquareChatStatusRequest {
	squareChatMid: string;
}

/** Wire-format fields for the LINE Thrift struct GetSquareChatStatusResponse. */
export interface GetSquareChatStatusResponse {
	chatStatus: SquareChatStatus;
}

/** Wire-format fields for the LINE Thrift struct GetSquareEmidRequest. */
export interface GetSquareEmidRequest {
	squareMid: string;
}

/** Wire-format fields for the LINE Thrift struct GetSquareEmidResponse. */
export interface GetSquareEmidResponse {
	squareEmid: string;
}

/** Wire-format fields for the LINE Thrift struct GetSquareFeatureSetRequest. */
export interface GetSquareFeatureSetRequest {
	squareMid: string;
}

/** Wire-format fields for the LINE Thrift struct GetSquareFeatureSetResponse. */
export interface GetSquareFeatureSetResponse {
	squareFeatureSet: SquareFeatureSet;
}

/** Wire-format fields for the LINE Thrift struct GetSquareInfoByChatMidRequest. */
export interface GetSquareInfoByChatMidRequest {
	squareChatMid: string;
}

/** Wire-format fields for the LINE Thrift struct GetSquareInfoByChatMidResponse. */
export interface GetSquareInfoByChatMidResponse {
	defaultChatMid: string;
	squareName: string;
	squareDesc: string;
}

/** Wire-format fields for the LINE Thrift struct GetSquareMemberRelationRequest. */
export interface GetSquareMemberRelationRequest {
	squareMid: string;
	targetSquareMemberMid: string;
}

/** Wire-format fields for the LINE Thrift struct GetSquareMemberRelationResponse. */
export interface GetSquareMemberRelationResponse {
	squareMid: string;
	targetSquareMemberMid: string;
	relation: SquareMemberRelation;
}

/** Wire-format fields for the LINE Thrift struct GetSquareMemberRelationsRequest. */
export interface GetSquareMemberRelationsRequest {
	state: SquareMemberRelationState;
	continuationToken: string;
	limit: number;
}

/** Wire-format fields for the LINE Thrift struct GetSquareMemberRelationsResponse. */
export interface GetSquareMemberRelationsResponse {
	squareMembers: SquareMember[];
	relations: Record<string, SquareMemberRelation>;
	continuationToken: string;
}

/** Wire-format fields for the LINE Thrift struct GetSquareMemberRequest. */
export interface GetSquareMemberRequest {
	squareMemberMid: string;
}

/** Wire-format fields for the LINE Thrift struct GetSquareMemberResponse. */
export interface GetSquareMemberResponse {
	squareMember: SquareMember;
	relation: SquareMemberRelation;
	oneOnOneChatMid: string;
	contentsAttribute: ContentsAttribute;
}

/** Wire-format fields for the LINE Thrift struct GetSquareMembersBySquareRequest. */
export interface GetSquareMembersBySquareRequest {
	squareMid: string;
	squareMemberMids: string[];
}

/** Wire-format fields for the LINE Thrift struct GetSquareMembersBySquareResponse. */
export interface GetSquareMembersBySquareResponse {
	members: SquareMember[];
	contentsAttributes: Record<string, number>;
}

/** Wire-format fields for the LINE Thrift struct GetSquareMembersRequest. */
export interface GetSquareMembersRequest {
	mids: string[];
}

/** Wire-format fields for the LINE Thrift struct GetSquareMembersResponse. */
export interface GetSquareMembersResponse {
	members: Record<string, SquareMember>;
}

/** Wire-format fields for the LINE Thrift struct GetSquareRequest. */
export interface GetSquareRequest {
	mid: string;
}

/** Wire-format fields for the LINE Thrift struct GetSquareResponse. */
export interface GetSquareResponse {
	square: Square;
	myMembership: SquareMember;
	squareAuthority: SquareAuthority;
	squareStatus: SquareStatus;
	squareFeatureSet: SquareFeatureSet;
	noteStatus: NoteStatus;
	extraInfo: SquareExtraInfo;
	paidSquareAdmin: SquareMember;
	squareSubscriptionProduct: SquareSubscriptionProduct;
}

/** Wire-format fields for the LINE Thrift struct GetSquareStatusRequest. */
export interface GetSquareStatusRequest {
	squareMid: string;
}

/** Wire-format fields for the LINE Thrift struct GetSquareStatusResponse. */
export interface GetSquareStatusResponse {
	squareStatus: SquareStatus;
}

/** Wire-format fields for the LINE Thrift struct GetSquareThreadMidRequest. */
export interface GetSquareThreadMidRequest {
	chatMid: string;
	messageId: string;
}

/** Wire-format fields for the LINE Thrift struct GetSquareThreadMidResponse. */
export interface GetSquareThreadMidResponse {
	threadMid: string;
}

/** Wire-format fields for the LINE Thrift struct GetSquareThreadRequest. */
export interface GetSquareThreadRequest {
	threadMid: string;
	includeRootMessage: boolean;
}

/** Wire-format fields for the LINE Thrift struct GetSquareThreadResponse. */
export interface GetSquareThreadResponse {
	squareThread: SquareThread;
	myThreadMember: SquareThreadMember;
	rootMessage: SquareMessage;
}

/** Wire-format fields for the LINE Thrift struct GetStudentInformationResponse. */
export interface GetStudentInformationResponse {
	studentInformation: StudentInformation;
	isValid: boolean;
}

/** Wire-format fields for the LINE Thrift struct GetSubscriptionPlansRequest. */
export interface GetSubscriptionPlansRequest {
	subscriptionService: any;
	storeCode: Ob1_K1;
}

/** Wire-format fields for the LINE Thrift struct GetSubscriptionPlansResponse. */
export interface GetSubscriptionPlansResponse {
	plans: SubscriptionPlan[];
}

/** Wire-format fields for the LINE Thrift struct GetSubscriptionStatusRequest. */
export interface GetSubscriptionStatusRequest {
	includeOtherOwnedSubscriptions: boolean;
}

/** Wire-format fields for the LINE Thrift struct GetSubscriptionStatusResponse. */
export interface GetSubscriptionStatusResponse {
	subscriptions: Record<number, SubscriptionStatus>;
	hasValidStudentInformation: boolean;
}

/** Wire-format fields for the LINE Thrift struct GetSuggestDictionarySettingResponse. */
export interface GetSuggestDictionarySettingResponse {
	results: SuggestDictionarySetting[];
}

/** Wire-format fields for the LINE Thrift struct GetSuggestResourcesV2Request. */
export interface GetSuggestResourcesV2Request {
	productType: Ob1_O0;
	productIds: string[];
}

/** Wire-format fields for the LINE Thrift struct GetSuggestResourcesV2Response. */
export interface GetSuggestResourcesV2Response {
	suggestResources: Record<string, SuggestResource>;
}

/** Wire-format fields for the LINE Thrift struct GetSuggestTrialRecommendationResponse. */
export interface GetSuggestTrialRecommendationResponse {
	recommendations: SuggestTrialRecommendation[];
	expiresAt: Int64;
	recommendationGrouping: string;
}

/** Wire-format fields for the LINE Thrift struct GetTagClusterFileResponse. */
export interface GetTagClusterFileResponse {
	path: string;
	updatedTimeMillis: Int64;
}

/** Wire-format fields for the LINE Thrift struct GetTaiwanBankBalanceRequest. */
export interface GetTaiwanBankBalanceRequest {
	accessToken: string;
	authorizationCode: string;
	codeVerifier: string;
}

/** Wire-format fields for the LINE Thrift struct GetTaiwanBankBalanceResponse. */
export interface GetTaiwanBankBalanceResponse {
	maintenaceText: string;
	lineBankPromotions: LineBankPromotion[];
	taiwanBankBalanceInfo: TaiwanBankBalanceInfo;
	lineBankShortcutInfo: LineBankShortcutInfo;
	loginParameters: TaiwanBankLoginParameters;
}

/** Wire-format fields for the LINE Thrift struct GetTargetProfileResponse. */
export interface GetTargetProfileResponse {
	targetUserMid: string;
	userType: LN0_X0;
	targetProfileDetail: TargetProfileDetail;
}

/** Wire-format fields for the LINE Thrift struct GetTargetProfileTarget. */
export interface GetTargetProfileTarget {
	targetUserMid: string;
}

/** Wire-format fields for the LINE Thrift struct GetTargetProfilesRequest. */
export interface GetTargetProfilesRequest {
	targetUsers: GetTargetProfileTarget[];
	syncReason: Pb1_V7;
}

/** Wire-format fields for the LINE Thrift struct GetTargetProfilesResponse. */
export interface GetTargetProfilesResponse {
	responses: GetTargetProfileResponse[];
}

/** Wire-format fields for the LINE Thrift struct GetTargetingPopupResponse. */
export interface GetTargetingPopupResponse {
	targetingPopups: PopupProperty[];
	intervalTimeSec: number;
}

/** Wire-format fields for the LINE Thrift struct GetThaiBankBalanceRequest. */
export interface GetThaiBankBalanceRequest {
	deviceId: string;
}

/** Wire-format fields for the LINE Thrift struct GetThaiBankBalanceResponse. */
export interface GetThaiBankBalanceResponse {
	maintenaceText: string;
	thaiBankBalanceInfo: ThaiBankBalanceInfo;
	lineBankPromotions: LineBankPromotion[];
	lineBankShortcutInfo: LineBankShortcutInfo;
}

/** Wire-format fields for the LINE Thrift struct GetTotalCoinBalanceRequest. */
export interface GetTotalCoinBalanceRequest {
	appStoreCode: jO0_EnumC27533B;
}

/** Wire-format fields for the LINE Thrift struct GetTotalCoinBalanceResponse. */
export interface GetTotalCoinBalanceResponse {
	totalBalance: string;
	paidCoinBalance: string;
	freeCoinBalance: string;
	rewardCoinBalance: string;
	expectedAutoExchangedCoinBalance: string;
}

/** Wire-format fields for the LINE Thrift struct GetUserCollectionsRequest. */
export interface GetUserCollectionsRequest {
	lastUpdatedTimeMillis: Int64;
	includeSummary: boolean;
	productType: Ob1_O0;
}

/** Wire-format fields for the LINE Thrift struct GetUserCollectionsResponse. */
export interface GetUserCollectionsResponse {
	collections: Collection[];
	updated: boolean;
}

/** Wire-format fields for the LINE Thrift struct GetUserProfileResponse. */
export interface GetUserProfileResponse {
	userProfile: UserProfile;
}

/** Wire-format fields for the LINE Thrift struct GetUserSettingsRequest. */
export interface GetUserSettingsRequest {
	requestedAttrs: any[];
}

/** Wire-format fields for the LINE Thrift struct GetUserSettingsResponse. */
export interface GetUserSettingsResponse {
	requestedAttrs: number[];
	userSettings: SquareUserSettings;
}

/** Wire-format fields for the LINE Thrift struct GetUserVectorRequest. */
export interface GetUserVectorRequest {
	majorVersion: string;
}

/** Wire-format fields for the LINE Thrift struct GetUserVectorResponse. */
export interface GetUserVectorResponse {
	userVector: number[];
	majorVersion: string;
	minorVersion: string;
}

/** Wire-format fields for the LINE Thrift struct GetUsersMappedByProfileRequest. */
export interface GetUsersMappedByProfileRequest {
	profileId: string;
	syncReason: Pb1_V7;
}

/** Wire-format fields for the LINE Thrift struct GetUsersMappedByProfileResponse. */
export interface GetUsersMappedByProfileResponse {
	mappedMids: string[];
}

/** Wire-format fields for the LINE Thrift struct GlobalEvent. */
export interface GlobalEvent {
	type: Pb1_EnumC13209v5;
	minDelayInMinutes: number;
	maxDelayInMinutes: number;
	createTimeMillis: Int64;
	maxDelayHardLimit: boolean;
}

/** Wire-format fields for the LINE Thrift struct GroupCall. */
export interface GroupCall {
	online: boolean;
	chatMid: string;
	hostMid: string;
	memberMids: string[];
	started: Int64;
	mediaType: Pb1_EnumC13237x5;
	protocol: Pb1_EnumC13251y5;
	maxAllowableMembers: number;
}

/** Wire-format fields for the LINE Thrift struct GroupCallRoute. */
export interface GroupCallRoute {
	token: string;
	cscf: CallHost;
	mix: CallHost;
	hostMid: string;
	capabilities: string[];
	proto: Pb1_EnumC13251y5;
	voipAddress: string;
	voipUdpPort: number;
	voipTcpPort: number;
	fromZone: string;
	commParam: string;
	polarisAddress: string;
	polarisUdpPort: number;
	polarisZone: string;
	orionAddress: string;
	voipAddress6: string;
	stnpk: string;
}

/** Wire-format fields for the LINE Thrift struct GroupCallUrl. */
export interface GroupCallUrl {
	urlId: string;
	title: string;
	createdTimeMillis: Int64;
}

/** Wire-format fields for the LINE Thrift struct GroupExtra. */
export interface GroupExtra {
	creator: string;
	preventedJoinByTicket: boolean;
	invitationTicket: string;
	memberMids: Record<string, Int64>;
	inviteeMids: Record<string, Int64>;
	addFriendDisabled: boolean;
	ticketDisabled: boolean;
	autoName: boolean;
	penalized: boolean;
}

/** Wire-format fields for the LINE Thrift struct HeaderContent. */
export interface HeaderContent {
	iconUrl: string;
	iconAltText: string;
	linkUrl: string;
	title: string;
	animationImageUrl: string;
	tooltipText: string;
}

/** Wire-format fields for the LINE Thrift struct HeaderInfo. */
export interface HeaderInfo {
	totalBalance: string;
	currencyProperty: CurrencyProperty;
}

/** Wire-format fields for the LINE Thrift struct HideSquareMemberContentsRequest. */
export interface HideSquareMemberContentsRequest {
	squareMemberMid: string;
}

/** Wire-format fields for the LINE Thrift struct HomeCategory. */
export interface HomeCategory {
	id: number;
	title: string;
	ids: number[];
}

/** Wire-format fields for the LINE Thrift struct HomeEffect. */
export interface HomeEffect {
	id: string;
	resourceUrl: string;
	checksum: string;
	startDate: Int64;
	endDate: Int64;
}

/** Wire-format fields for the LINE Thrift struct HomeService. */
export interface HomeService {
	id: number;
	title: string;
	serviceEntryUrl: string;
	storeUrl: string;
	iconUrl: string;
	pictogramIconUrl: string;
	badgeUpdatedTimeMillis: Int64;
	badgeType: Eg_EnumC8927a;
	serviceDescription: string;
	iconThemeDisabled: boolean;
}

/** Wire-format fields for the LINE Thrift struct HomeTabPlacement. */
export interface HomeTabPlacement {
	placementTemplateId: string;
	placementService: string;
	placementLogic: string;
	contents: string;
	crsPlacementImpressionTrackingUrl: string;
}

/** Wire-format fields for the LINE Thrift struct Icon. */
export interface Icon {
	darkModeUrl: string;
	lightModeUrl: string;
}

/** Wire-format fields for the LINE Thrift struct IconDisplayRule. */
export interface IconDisplayRule {
	rule: string;
	offset: number;
}

/** Wire-format fields for the LINE Thrift struct IdentifierConfirmationRequest. */
export interface IdentifierConfirmationRequest {
	metaData: Record<string, string>;
	forceRegistration: boolean;
	verificationCode: string;
}

/** Wire-format fields for the LINE Thrift struct IdentityCredentialRequest. */
export interface IdentityCredentialRequest {
	metaData: Record<string, string>;
	identityProvider: IdentityProvider;
	cipherKeyId: string;
	cipherText: string;
	confirmationRequest: IdentifierConfirmationRequest;
}

/** Wire-format fields for the LINE Thrift struct IdentityCredentialResponse. */
export interface IdentityCredentialResponse {
	metaData: Record<string, string>;
	responseType: Pb1_F5;
	confirmationVerifier: string;
	timeoutInSeconds: Int64;
}

/** Wire-format fields for the LINE Thrift struct Image. */
export interface Image {
	url: string;
	height: number;
	width: number;
}

/** Wire-format fields for the LINE Thrift struct ImageTextProperty. */
export interface ImageTextProperty {
	status: Ob1_EnumC12656r0;
	plainText: string;
	nameTextMaxCharacterCount: number;
	encryptedText: string;
}

/** Wire-format fields for the LINE Thrift struct InstantNews. */
export interface InstantNews {
	newsId: Int64;
	newsService: string;
	ttlMillis: Int64;
	category: string;
	categoryBgColor: string;
	categoryColor: string;
	title: string;
	url: string;
	image: string;
}

/** Wire-format fields for the LINE Thrift struct InviteFriendsRequest. */
export interface InviteFriendsRequest {
	campaignId: string;
	invitees: string[];
}

/** Wire-format fields for the LINE Thrift struct InviteFriendsResponse. */
export interface InviteFriendsResponse {
	result: fN0_EnumC24469a;
}

/** Wire-format fields for the LINE Thrift struct InviteIntoChatRequest. */
export interface InviteIntoChatRequest {
	reqSeq: number;
	chatMid: string;
	targetUserMids: string[];
}

/** Wire-format fields for the LINE Thrift struct InviteIntoSquareChatRequest. */
export interface InviteIntoSquareChatRequest {
	inviteeMids: string[];
	squareChatMid: string;
}

/** Wire-format fields for the LINE Thrift struct InviteIntoSquareChatResponse. */
export interface InviteIntoSquareChatResponse {
	inviteeMids: string[];
}

/** Wire-format fields for the LINE Thrift struct InviteToChangeRoleRequest. */
export interface InviteToChangeRoleRequest {
	squareChatMid: string;
	sessionId: string;
	targetMid: string;
	targetRole: LiveTalkRole;
}

/** Wire-format fields for the LINE Thrift struct InviteToListenRequest. */
export interface InviteToListenRequest {
	squareChatMid: string;
	sessionId: string;
	targetMid: string;
}

/** Wire-format fields for the LINE Thrift struct InviteToLiveTalkRequest. */
export interface InviteToLiveTalkRequest {
	squareChatMid: string;
	sessionId: string;
	invitees: string[];
}

/** Wire-format fields for the LINE Thrift struct InviteToSpeakRequest. */
export interface InviteToSpeakRequest {
	squareChatMid: string;
	sessionId: string;
	targetMid: string;
}

/** Wire-format fields for the LINE Thrift struct InviteToSpeakResponse. */
export interface InviteToSpeakResponse {
	inviteRequestId: string;
}

/** Wire-format fields for the LINE Thrift struct InviteToSquareRequest. */
export interface InviteToSquareRequest {
	squareMid: string;
	invitees: string[];
	squareChatMid: string;
}

/** Wire-format fields for the LINE Thrift struct IpassTokenProperty. */
export interface IpassTokenProperty {
	token: string;
	tokenIssuedTimestamp: string;
}

/** Wire-format fields for the LINE Thrift struct IsProductForCollectionsRequest. */
export interface IsProductForCollectionsRequest {
	productType: Ob1_O0;
	productId: string;
}

/** Wire-format fields for the LINE Thrift struct IsProductForCollectionsResponse. */
export interface IsProductForCollectionsResponse {
	isAvailable: boolean;
}

/** Wire-format fields for the LINE Thrift struct IsStickerAvailableForCombinationStickerRequest. */
export interface IsStickerAvailableForCombinationStickerRequest {
	packageId: string;
}

/** Wire-format fields for the LINE Thrift struct IsStickerAvailableForCombinationStickerResponse. */
export interface IsStickerAvailableForCombinationStickerResponse {
	availableForCombinationSticker: boolean;
}

/** Wire-format fields for the LINE Thrift struct IssueBirthdayGiftTokenRequest. */
export interface IssueBirthdayGiftTokenRequest {
	recipientUserMid: string;
}

/** Wire-format fields for the LINE Thrift struct IssueBirthdayGiftTokenResponse. */
export interface IssueBirthdayGiftTokenResponse {
	giftAssociationToken: string;
}

/** Wire-format fields for the LINE Thrift struct IssueV3TokenForPrimaryRequest. */
export interface IssueV3TokenForPrimaryRequest {
	udid: string;
	systemDisplayName: string;
	modelName: string;
}

/** Wire-format fields for the LINE Thrift struct IssueV3TokenForPrimaryResponse. */
export interface IssueV3TokenForPrimaryResponse {
	accessToken: string;
	refreshToken: string;
	durationUntilRefreshInSec: Int64;
	refreshApiRetryPolicy: RefreshApiRetryPolicy;
	loginSessionId: string;
	tokenIssueTimeEpochSec: Int64;
	mid: string;
}

/** Wire-format fields for the LINE Thrift struct IssueWebAuthDetailsForSecondAuthResponse. */
export interface IssueWebAuthDetailsForSecondAuthResponse {
	webAuthDetails: WebAuthDetails;
}

/** Wire-format fields for the LINE Thrift struct JoinChatByCallUrlRequest. */
export interface JoinChatByCallUrlRequest {
	urlId: string;
	reqSeq: number;
}

/** Wire-format fields for the LINE Thrift struct JoinChatByCallUrlResponse. */
export interface JoinChatByCallUrlResponse {
	chat: Chat;
}

/** Wire-format fields for the LINE Thrift struct JoinLiveTalkRequest. */
export interface JoinLiveTalkRequest {
	squareChatMid: string;
	sessionId: string;
	wantToSpeak: boolean;
	claimAdult: BooleanState;
}

/** Wire-format fields for the LINE Thrift struct JoinLiveTalkResponse. */
export interface JoinLiveTalkResponse {
	hostMemberMid: string;
	memberSessionId: string;
	token: string;
	proto: string;
	voipAddress: string;
	voipAddress6: string;
	voipUdpPort: number;
	voipTcpPort: number;
	fromZone: string;
	commParam: string;
	orionAddress: string;
	polarisAddress: string;
	polarisZone: string;
	polarisUdpPort: number;
	speaker: boolean;
}

/** Wire-format fields for the LINE Thrift struct JoinSquareChatRequest. */
export interface JoinSquareChatRequest {
	squareChatMid: string;
}

/** Wire-format fields for the LINE Thrift struct JoinSquareChatResponse. */
export interface JoinSquareChatResponse {
	squareChat: SquareChat;
	squareChatStatus: SquareChatStatus;
	squareChatMember: SquareChatMember;
}

/** Wire-format fields for the LINE Thrift struct JoinSquareRequest. */
export interface JoinSquareRequest {
	squareMid: string;
	member: SquareMember;
	squareChatMid: string;
	joinValue: SquareJoinMethodValue;
	claimAdult: BooleanState;
}

/** Wire-format fields for the LINE Thrift struct JoinSquareResponse. */
export interface JoinSquareResponse {
	square: Square;
	squareAuthority: SquareAuthority;
	squareStatus: SquareStatus;
	squareMember: SquareMember;
	squareFeatureSet: SquareFeatureSet;
	noteStatus: NoteStatus;
	squareChat: SquareChat;
	squareChatStatus: SquareChatStatus;
	squareChatMember: SquareChatMember;
}

/** Wire-format fields for the LINE Thrift struct JoinSquareThreadRequest. */
export interface JoinSquareThreadRequest {
	chatMid: string;
	threadMid: string;
}

/** Wire-format fields for the LINE Thrift struct JoinSquareThreadResponse. */
export interface JoinSquareThreadResponse {
	threadMember: SquareThreadMember;
}

/** Wire-format fields for the LINE Thrift struct JoinedMemberships. */
export interface JoinedMemberships {
	subscribing: MemberInfo[];
	expired: MemberInfo[];
}

/** Wire-format fields for the LINE Thrift struct KickOutLiveTalkParticipantsRequest. */
export interface KickOutLiveTalkParticipantsRequest {
	squareChatMid: string;
	sessionId: string;
	target: LiveTalkKickOutTarget;
}

/** Wire-format fields for the LINE Thrift struct KickoutFromGroupCallRequest. */
export interface KickoutFromGroupCallRequest {
	chatMid: string;
	targetMids: string[];
}

/** Wire-format fields for the LINE Thrift struct LFLClusterV2. */
export interface LFLClusterV2 {
	majorVersion: string;
	minorVersion: string;
	tags: Tag[];
	products: Product[];
}

/** Wire-format fields for the LINE Thrift struct LIFFMenuColor. */
export interface LIFFMenuColor {
	iconColor: number;
	statusBarColor: Qj_EnumC13585b;
	titleTextColor: number;
	titleSubtextColor: number;
	titleButtonColor: number;
	titleBackgroundColor: number;
	progressBarColor: number;
	progressBackgroundColor: number;
	titleButtonAreaBackgroundColor: number;
	titleButtonAreaBorderColor: number;
}

/** Wire-format fields for the LINE Thrift struct LIFFMenuColorSetting. */
export interface LIFFMenuColorSetting {
	lightModeColor: LIFFMenuColor;
	darkModeColor: LIFFMenuColor;
}

/** Wire-format fields for the LINE Thrift struct LN0_A. */
export interface LN0_A {
}

/** Wire-format fields for the LINE Thrift struct LN0_A0. */
export interface LN0_A0 {
}

/** Wire-format fields for the LINE Thrift struct LN0_B. */
export interface LN0_B {
}

/** Wire-format fields for the LINE Thrift struct LN0_B0. */
export interface LN0_B0 {
}

/** Wire-format fields for the LINE Thrift struct LN0_C0. */
export interface LN0_C0 {
}

/** Wire-format fields for the LINE Thrift struct LN0_C11270b. */
export interface LN0_C11270b {
}

/** Wire-format fields for the LINE Thrift struct LN0_C11274d. */
export interface LN0_C11274d {
	invalid: AddMetaInvalid;
	byPhone: AddMetaByPhone;
	bySearchId: AddMetaBySearchId;
	byUserTicket: AddMetaByUserTicket;
	groupMemberList: AddMetaGroupMemberList;
	timelineCPF: LN0_P;
	smartChannelCPF: LN0_L;
	openchatCPF: LN0_G;
	beaconBanner: LN0_C11282h;
	friendRecommendation: LN0_C11300q;
	homeRecommendation: LN0_C11307u;
	shareContact: AddMetaShareContact;
	strangerMessage: AddMetaStrangerMessage;
	strangerCall: AddMetaStrangerCall;
	mentionInChat: AddMetaMentionInChat;
	timeline: LN0_O;
	unifiedSearch: LN0_Q;
	lineLab: LN0_C11313x;
	lineToCall: LN0_A;
	groupVideo: AddMetaGroupVideoCall;
	friendRequest: LN0_r;
	liveViewer: LN0_C11315y;
	lineThings: LN0_C11316z;
	mediaCapture: LN0_B;
	avatarOASetting: LN0_C11280g;
	urlScheme: LN0_T;
	addressBook: LN0_C11276e;
	unifiedSearchOATab: LN0_S;
	profileUndefined: AddMetaProfileUndefined;
	DEPRECATED_oaChatHeader: LN0_F;
	chatMenu: LN0_C11294n;
	chatHeader: LN0_C11290l;
	homeTabCPF: LN0_C11309v;
	chatList: LN0_C11292m;
	chatNote: AddMetaChatNote;
	chatNoteMenu: AddMetaChatNoteMenu;
	walletTabCPF: LN0_U;
	oaCall: LN0_E;
	searchIdInUnifiedSearch: AddMetaSearchIdInUnifiedSearch;
	newsDigestADCPF: LN0_D;
	albumCPF: LN0_C11278f;
	premiumAgreement: LN0_H;
}

/** Wire-format fields for the LINE Thrift struct LN0_C11276e. */
export interface LN0_C11276e {
}

/** Wire-format fields for the LINE Thrift struct LN0_C11278f. */
export interface LN0_C11278f {
}

/** Wire-format fields for the LINE Thrift struct LN0_C11280g. */
export interface LN0_C11280g {
}

/** Wire-format fields for the LINE Thrift struct LN0_C11282h. */
export interface LN0_C11282h {
}

/** Wire-format fields for the LINE Thrift struct LN0_C11290l. */
export interface LN0_C11290l {
}

/** Wire-format fields for the LINE Thrift struct LN0_C11292m. */
export interface LN0_C11292m {
}

/** Wire-format fields for the LINE Thrift struct LN0_C11294n. */
export interface LN0_C11294n {
}

/** Wire-format fields for the LINE Thrift struct LN0_C11300q. */
export interface LN0_C11300q {
}

/** Wire-format fields for the LINE Thrift struct LN0_C11307u. */
export interface LN0_C11307u {
}

/** Wire-format fields for the LINE Thrift struct LN0_C11308u0. */
export interface LN0_C11308u0 {
}

/** Wire-format fields for the LINE Thrift struct LN0_C11309v. */
export interface LN0_C11309v {
}

/** Wire-format fields for the LINE Thrift struct LN0_C11310v0. */
export interface LN0_C11310v0 {
}

/** Wire-format fields for the LINE Thrift struct LN0_C11312w0. */
export interface LN0_C11312w0 {
}

/** Wire-format fields for the LINE Thrift struct LN0_C11313x. */
export interface LN0_C11313x {
}

/** Wire-format fields for the LINE Thrift struct LN0_C11315y. */
export interface LN0_C11315y {
}

/** Wire-format fields for the LINE Thrift struct LN0_C11316z. */
export interface LN0_C11316z {
}

/** Wire-format fields for the LINE Thrift struct LN0_D. */
export interface LN0_D {
}

/** Wire-format fields for the LINE Thrift struct LN0_E. */
export interface LN0_E {
}

/** Wire-format fields for the LINE Thrift struct LN0_F. */
export interface LN0_F {
}

/** Wire-format fields for the LINE Thrift struct LN0_G. */
export interface LN0_G {
}

/** Wire-format fields for the LINE Thrift struct LN0_H. */
export interface LN0_H {
}

/** Wire-format fields for the LINE Thrift struct LN0_L. */
export interface LN0_L {
}

/** Wire-format fields for the LINE Thrift struct LN0_O. */
export interface LN0_O {
}

/** Wire-format fields for the LINE Thrift struct LN0_P. */
export interface LN0_P {
}

/** Wire-format fields for the LINE Thrift struct LN0_Q. */
export interface LN0_Q {
}

/** Wire-format fields for the LINE Thrift struct LN0_S. */
export interface LN0_S {
}

/** Wire-format fields for the LINE Thrift struct LN0_T. */
export interface LN0_T {
}

/** Wire-format fields for the LINE Thrift struct LN0_U. */
export interface LN0_U {
}

/** Wire-format fields for the LINE Thrift struct LN0_V. */
export interface LN0_V {
	user: UserBlockDetail;
	bot: BotBlockDetail;
	notBlocked: LN0_C11308u0;
}

/** Wire-format fields for the LINE Thrift struct LN0_Z. */
export interface LN0_Z {
	user: UserFriendDetail;
	bot: BotFriendDetail;
	notFriend: LN0_C11310v0;
}

/** Wire-format fields for the LINE Thrift struct LN0_r. */
export interface LN0_r {
}

/** Wire-format fields for the LINE Thrift struct LN0_y0. */
export interface LN0_y0 {
	recommendationDetail: RecommendationDetail;
	notRecommended: LN0_C11312w0;
}

/** Wire-format fields for the LINE Thrift struct LN0_z0. */
export interface LN0_z0 {
	sharedChat: RecommendationReasonSharedChat;
	reverseFriendByUserId: LN0_C0;
	reverseFriendByQrCode: LN0_B0;
	reverseFriendByPhone: LN0_A0;
}

/** Wire-format fields for the LINE Thrift struct LatestProductByAuthorItem. */
export interface LatestProductByAuthorItem {
	productId: string;
	displayName: string;
	version: Int64;
	newFlag: boolean;
	productResourceType: Ob1_I0;
	popupLayer: Ob1_B0;
}

/** Wire-format fields for the LINE Thrift struct LatestProductsByAuthorRequest. */
export interface LatestProductsByAuthorRequest {
	productType: Ob1_O0;
	authorId: Int64;
	limit: number;
}

/** Wire-format fields for the LINE Thrift struct LatestProductsByAuthorResponse. */
export interface LatestProductsByAuthorResponse {
	authorId: Int64;
	author: string;
	items: LatestProductByAuthorItem[];
}

/** Wire-format fields for the LINE Thrift struct LeaveSquareChatRequest. */
export interface LeaveSquareChatRequest {
	squareChatMid: string;
	sayGoodbye: boolean;
	squareChatMemberRevision: Int64;
}

/** Wire-format fields for the LINE Thrift struct LeaveSquareRequest. */
export interface LeaveSquareRequest {
	squareMid: string;
}

/** Wire-format fields for the LINE Thrift struct LeaveSquareThreadRequest. */
export interface LeaveSquareThreadRequest {
	chatMid: string;
	threadMid: string;
}

/** Wire-format fields for the LINE Thrift struct LeaveSquareThreadResponse. */
export interface LeaveSquareThreadResponse {
	threadMember: SquareThreadMember;
}

/** Wire-format fields for the LINE Thrift struct LeftSquareMember. */
export interface LeftSquareMember {
	squareMemberMid: string;
	displayName: string;
	profileImageObsHash: string;
	updatedAt: Int64;
}

/** Wire-format fields for the LINE Thrift struct LiffAdvertisingId. */
export interface LiffAdvertisingId {
	advertisingId: string;
	tracking: boolean;
	att: Qj_EnumC13584a;
	skAdNetwork: SKAdNetwork;
}

/** Wire-format fields for the LINE Thrift struct LiffChatContext. */
export interface LiffChatContext {
	chatMid: string;
}

/** Wire-format fields for the LINE Thrift struct LiffDeviceSetting. */
export interface LiffDeviceSetting {
	videoAutoPlayAllowed: boolean;
	advertisingId: LiffAdvertisingId;
}

/** Wire-format fields for the LINE Thrift struct LiffErrorConsentRequired. */
export interface LiffErrorConsentRequired {
	channelId: string;
	consentUrl: string;
}

/** Wire-format fields for the LINE Thrift struct LiffErrorPermanentLinkInvalidRequest. */
export interface LiffErrorPermanentLinkInvalidRequest {
	liffId: string;
	fallbackUrl: string;
}

/** Wire-format fields for the LINE Thrift struct LiffFIDOExternalService. */
export interface LiffFIDOExternalService {
	rpId: string;
	rpApiBaseUrl: string;
}

/** Wire-format fields for the LINE Thrift struct LiffSquareChatContext. */
export interface LiffSquareChatContext {
	squareChatMid: string;
}

/** Wire-format fields for the LINE Thrift struct LiffView. */
export interface LiffView {
	type: string;
	url: string;
	titleTextColor: number;
	titleBackgroundColor: number;
	titleIconUrl: string;
	titleSubtextColor: number;
	titleButtonColor: number;
	progressBarColor: number;
	progressBackgroundColor: number;
	trustedDomain: boolean;
	suspendable: boolean;
	maxBrightness: boolean;
	titleButtonAreaBackgroundColor: number;
	titleButtonAreaBorderColor: number;
	suspendableV2: boolean;
	menuStyle: Qj_EnumC13606x;
	moduleMode: boolean;
	pinToHomeServiceId: number;
	menuColorSetting: LIFFMenuColorSetting;
	showPinInduction: boolean;
	appName: string;
	adaptableColorSchemes: number[];
	provider: Provider;
	basicAuthAllowed: boolean;
	siriDonationAllowed: boolean;
	transitionToNonLiffWithoutPopupAllowed: boolean;
	urlHistoryAllowed: boolean;
	shrinkHeaderDisabled: boolean;
	skipWebRTCPermissionPopupAllowed: boolean;
	useGmaSdkAllowed: boolean;
	useMinimizeButtonAllowed: boolean;
}

/** Wire-format fields for the LINE Thrift struct LiffViewRequest. */
export interface LiffViewRequest {
	liffId: string;
	context: Qj_C13595l;
	lang: string;
	deviceSetting: LiffDeviceSetting;
	msit: string;
	subsequentLiff: boolean;
	domain: string;
	interWindowSession: string;
	requestedUrl: string;
}

/** Wire-format fields for the LINE Thrift struct LiffViewResponse. */
export interface LiffViewResponse {
	view: LiffView;
	contextToken: string;
	accessToken: string;
	featureToken: string;
	features: number[];
	channelId: string;
	idToken: string;
	scopes: string[];
	launchOptions: number[];
	permanentLinkPattern: Qj_a0;
	subLiffView: SubLiffView;
	revisions: Record<number, number>;
	accessTokenExpiresIn: Int64;
	accessTokenExpiresInWithRoom: Int64;
	liffId: string;
	miniDomainAllowed: boolean;
	miniAppId: string;
	miniHistoryServiceId: number;
	addToHomeV2Allowed: boolean;
	addToHomeV2LineSchemeAllowed: boolean;
	fido: Qj_C13602t;
	omitLiffReferrer: boolean;
	providerSessionId: string;
	interWindowSession: string;
	verifiedMiniApp: boolean;
	inAppPurchaseAllowed: boolean;
	inappropriateLiffReportUrl: string;
	browserVisibilityNotificationAllowed: boolean;
	providerSessionIdSendingAllowed: boolean;
}

/** Wire-format fields for the LINE Thrift struct LiffViewWithoutUserContextRequest. */
export interface LiffViewWithoutUserContextRequest {
	liffId: string;
}

/** Wire-format fields for the LINE Thrift struct LiffWebLoginRequest. */
export interface LiffWebLoginRequest {
	hookedFullUrl: string;
	sessionString: string;
	context: Qj_C13595l;
	deviceSetting: LiffDeviceSetting;
}

/** Wire-format fields for the LINE Thrift struct LiffWebLoginResponse. */
export interface LiffWebLoginResponse {
	returnUrl: string;
	sessionString: string;
	liffId: string;
}

/** Wire-format fields for the LINE Thrift struct LineBankBalanceShortcut. */
export interface LineBankBalanceShortcut {
	iconPosition: number;
	iconUrl: string;
	iconText: string;
	iconAltText: string;
	iconType: NZ0_EnumC12154b1;
	linkUrl: string;
	tsTargetId: string;
	userGuidePopupInfo: ShortcutUserGuidePopupInfo;
}

/** Wire-format fields for the LINE Thrift struct LineBankPromotion. */
export interface LineBankPromotion {
	mainText: string;
	linkUrl: string;
	tsTargetId: string;
}

/** Wire-format fields for the LINE Thrift struct LineBankShortcutInfo. */
export interface LineBankShortcutInfo {
	mainShortcuts: LineBankBalanceShortcut[];
	subShortcuts: LineBankBalanceShortcut[];
}

/** Wire-format fields for the LINE Thrift struct LinePayInfo. */
export interface LinePayInfo {
	balanceAmount: string;
	currencyProperty: CurrencyProperty;
	payMemberStatus: NZ0_EnumC12195p0;
	applicationUrl: string;
	chargeUrl: string;
	payMemberGrade: NZ0_EnumC12192o0;
	country: string;
	referenceNumber: string;
	ipassTokenProperty: IpassTokenProperty;
	iconUrl: string;
	iconAltText: string;
	iconLinkUrl: string;
	suspendedText: string;
	responseStatus: NZ0_W0;
}

/** Wire-format fields for the LINE Thrift struct LinePayInfoV3. */
export interface LinePayInfoV3 {
	availableBalance: string;
	availableBalanceString: string;
	currencyProperty: CurrencyProperty;
	payMemberStatus: NZ0_EnumC12195p0;
	payMemberGrade: NZ0_EnumC12192o0;
	country: string;
	applicationUrl: string;
	iconAltText: string;
	iconLinkUrl: string;
	suspendedText: string;
	responseStatus: NZ0_W0;
}

/** Wire-format fields for the LINE Thrift struct LinePayPromotion. */
export interface LinePayPromotion {
	mainText: string;
	subText: string;
	buttonText: string;
	iconUrl: string;
	linkUrl: string;
	tsTargetId: string;
}

/** Wire-format fields for the LINE Thrift struct LinePointInfo. */
export interface LinePointInfo {
	balanceAmount: string;
	applicationUrl: string;
	iconUrl: string;
	displayText: string;
	responseStatus: NZ0_W0;
}

/** Wire-format fields for the LINE Thrift struct LinkRewardInfo. */
export interface LinkRewardInfo {
	assetServiceInfo: AssetServiceInfo;
	autoConversion: boolean;
	backgroundColorCode: string;
}

/** Wire-format fields for the LINE Thrift struct LiveTalk. */
export interface LiveTalk {
	squareChatMid: string;
	sessionId: string;
	title: string;
	type: LiveTalkType;
	speakerSetting: LiveTalkSpeakerSetting;
	allowRequestToSpeak: boolean;
	hostMemberMid: string;
	announcement: string;
	participantCount: number;
	revision: Int64;
	startedAt: Int64;
}

/** Wire-format fields for the LINE Thrift struct LiveTalkEvent. */
export interface LiveTalkEvent {
	type: LiveTalkEventType;
	payload: LiveTalkEventPayload;
	revision: Int64;
}

/** Wire-format fields for the LINE Thrift struct LiveTalkEventNotifiedUpdateLiveTalkAllowRequestToSpeak. */
export interface LiveTalkEventNotifiedUpdateLiveTalkAllowRequestToSpeak {
	allowRequestToSpeak: boolean;
}

/** Wire-format fields for the LINE Thrift struct LiveTalkEventNotifiedUpdateLiveTalkAnnouncement. */
export interface LiveTalkEventNotifiedUpdateLiveTalkAnnouncement {
	announcement: string;
}

/** Wire-format fields for the LINE Thrift struct LiveTalkEventNotifiedUpdateLiveTalkTitle. */
export interface LiveTalkEventNotifiedUpdateLiveTalkTitle {
	title: string;
}

/** Wire-format fields for the LINE Thrift struct LiveTalkEventNotifiedUpdateSquareMember. */
export interface LiveTalkEventNotifiedUpdateSquareMember {
	squareMemberMid: string;
	displayName: string;
	profileImageObsHash: string;
	role: SquareMemberRole;
}

/** Wire-format fields for the LINE Thrift struct LiveTalkEventNotifiedUpdateSquareMemberRole. */
export interface LiveTalkEventNotifiedUpdateSquareMemberRole {
	squareMemberMid: string;
	role: SquareMemberRole;
}

/** Wire-format fields for the LINE Thrift struct LiveTalkExtraInfo. */
export interface LiveTalkExtraInfo {
	saturnResponse: string;
}

/** Wire-format fields for the LINE Thrift struct LiveTalkParticipant. */
export interface LiveTalkParticipant {
	mid: string;
}

/** Wire-format fields for the LINE Thrift struct LiveTalkSpeaker. */
export interface LiveTalkSpeaker {
	displayName: string;
	profileImageObsHash: string;
	role: SquareMemberRole;
}

/** Wire-format fields for the LINE Thrift struct LiveTalkSubscriptionNotification. */
export interface LiveTalkSubscriptionNotification {
	squareChatMid: string;
	sessionId: string;
}

/** Wire-format fields for the LINE Thrift struct Locale. */
export interface Locale {
	language: string;
	country: string;
}

/** Wire-format fields for the LINE Thrift struct Location. */
export interface Location {
	title: string;
	address: string;
	latitude: number;
	longitude: number;
	phone: string;
	categoryId: string;
	provider: Pb1_D6;
	accuracy: GeolocationAccuracy;
	altitudeMeters: number;
}

/** Wire-format fields for the LINE Thrift struct LocationDebugInfo. */
export interface LocationDebugInfo {
	poiInfo: PoiInfo;
}

/** Wire-format fields for the LINE Thrift struct LookupAvailableEapRequest. */
export interface LookupAvailableEapRequest {
	authSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct LookupAvailableEapResponse. */
export interface LookupAvailableEapResponse {
	availableEap: number[];
}

/** Wire-format fields for the LINE Thrift struct LpPromotionProperty. */
export interface LpPromotionProperty {
	landingPageUrl: string;
	label: string;
	buttonLabel: string;
}

/** Wire-format fields for the LINE Thrift struct MainPopup. */
export interface MainPopup {
	imageObsHash: string;
	button: Button;
}

/** Wire-format fields for the LINE Thrift struct ManualRepairRequest. */
export interface ManualRepairRequest {
	syncToken: string;
	limit: number;
	continuationToken: string;
}

/** Wire-format fields for the LINE Thrift struct ManualRepairResponse. */
export interface ManualRepairResponse {
	events: SquareEvent[];
	syncToken: string;
	continuationToken: string;
}

/** Wire-format fields for the LINE Thrift struct MapProfileToUsersRequest. */
export interface MapProfileToUsersRequest {
	profileId: string;
	targetMids: string[];
}

/** Wire-format fields for the LINE Thrift struct MapProfileToUsersResponse. */
export interface MapProfileToUsersResponse {
	mappedMids: string[];
}

/** Wire-format fields for the LINE Thrift struct MarkAsReadRequest. */
export interface MarkAsReadRequest {
	squareChatMid: string;
	messageId: string;
	threadMid: string;
}

/** Wire-format fields for the LINE Thrift struct MarkChatsAsReadRequest. */
export interface MarkChatsAsReadRequest {
	chatMids: string[];
}

/** Wire-format fields for the LINE Thrift struct MarkThreadsAsReadRequest. */
export interface MarkThreadsAsReadRequest {
	chatMid: string;
}

/** Wire-format fields for the LINE Thrift struct MemberInfo. */
export interface MemberInfo {
	membership: Membership;
	memberNo: number;
	isJoining: boolean;
	isSubscribing: boolean;
	validUntil: Int64;
	billingItemName: string;
}

/** Wire-format fields for the LINE Thrift struct Membership. */
export interface Membership {
	membershipId: Int64;
	uniqueKey: string;
	title: string;
	membershipDescription: string;
	benefits: string;
	isInAppPurchase: boolean;
	paymentType: og_G;
	isPublished: boolean;
	isFullMember: boolean;
	price: string;
	currency: string;
	membershipStatus: og_E;
	bot: Bot;
	closeDate: Int64;
	membershipCardUrl: string;
	openchatUrl: string;
}

/** Wire-format fields for the LINE Thrift struct MentionableBot. */
export interface MentionableBot {
	mid: string;
	displayName: string;
	profileImageObsHash: string;
	squareMid: string;
}

/** Wire-format fields for the LINE Thrift struct MentionableSquareMember. */
export interface MentionableSquareMember {
	mid: string;
	displayName: string;
	profileImageObsHash: string;
	role: SquareMemberRole;
	squareMid: string;
}

/** Wire-format fields for the LINE Thrift struct Message. */
export interface Message {
	from: string;
	to: string;
	toType: MIDType;
	id: string;
	createdTime: Int64;
	deliveredTime: Int64;
	text: string;
	location: Location;
	hasContent: boolean;
	contentType: ContentType;
	contentPreview: string;
	contentMetadata: Record<string, string>;
	sessionId: number;
	chunks: (string | Buffer)[];
	relatedMessageId: string;
	messageRelationType: Pb1_EnumC13015h6;
	readCount: number;
	relatedMessageServiceCode: Pb1_E7;
	appExtensionType: Pb1_B;
	reactions: Reaction[];
	updatedTime: Int64;
}

/** Wire-format fields for the LINE Thrift struct MessageBoxList. */
export interface MessageBoxList {
	messageBoxes: ExtendedMessageBox[];
	hasNext: boolean;
}

/** Wire-format fields for the LINE Thrift struct MessageBoxListRequest. */
export interface MessageBoxListRequest {
	minChatId: string;
	maxChatId: string;
	activeOnly: boolean;
	messageBoxCountLimit: number;
	withUnreadCount: boolean;
	lastMessagesPerMessageBoxCount: number;
	unreadOnly: boolean;
	lastOpRevision: Int64;
}

/** Wire-format fields for the LINE Thrift struct MessageBoxV2MessageId. */
export interface MessageBoxV2MessageId {
	deliveredTime: Int64;
	messageId: Int64;
}

/** Wire-format fields for the LINE Thrift struct MessageSummary. */
export interface MessageSummary {
	summary: string[];
	keywords: string[];
	range: MessageSummaryRange;
	detailedSummary: string[];
}

/** Wire-format fields for the LINE Thrift struct MessageSummaryContent. */
export interface MessageSummaryContent {
	summary: string[];
	keywords: string[];
	range: MessageSummaryRange;
}

/** Wire-format fields for the LINE Thrift struct MessageSummaryRange. */
export interface MessageSummaryRange {
	from: Int64;
	to: Int64;
}

/** Wire-format fields for the LINE Thrift struct MessageVisibility. */
export interface MessageVisibility {
	showJoinMessage: boolean;
	showLeaveMessage: boolean;
	showKickoutMessage: boolean;
}

/** Wire-format fields for the LINE Thrift struct MigratePrimaryUsingQrCodeRequest. */
export interface MigratePrimaryUsingQrCodeRequest {
	sessionId: string;
	nonce: string;
	newDevice: any;
}

/** Wire-format fields for the LINE Thrift struct MigratePrimaryUsingQrCodeResponse. */
export interface MigratePrimaryUsingQrCodeResponse {
	mid: string;
	tokenV3IssueResult: TokenV3IssueResult;
	tokenV1IssueResult: TokenV1IssueResult;
	accountCountryCode: any;
	formattedPhoneNumbers: FormattedPhoneNumbers;
}

/** Wire-format fields for the LINE Thrift struct MigratePrimaryWithTokenV3Response. */
export interface MigratePrimaryWithTokenV3Response {
	authToken: string;
	tokenV3IssueResult: TokenV3IssueResult;
	countryCode: string;
	prettifiedFormatPhoneNumber: string;
	localFormatPhoneNumber: string;
	mid: string;
}

/** Wire-format fields for the LINE Thrift struct ModuleResponse. */
export interface ModuleResponse {
	moduleInstance: NZ0_C12206t0;
}

/** Wire-format fields for the LINE Thrift struct ModuleWithStatusResponse. */
export interface ModuleWithStatusResponse {
	moduleInstance: NZ0_C12221y0;
}

/** Wire-format fields for the LINE Thrift struct MyChatapp. */
export interface MyChatapp {
	app: Chatapp;
	category: zf_EnumC40715c;
	priority: Int64;
}

/** Wire-format fields for the LINE Thrift struct MyDashboardItem. */
export interface MyDashboardItem {
	id: string;
	messageText: string;
	icon: MyDashboardMessageIcon;
	linkUrl: string;
	exposedAt: Int64;
	expiredAt: Int64;
	order: number;
	targetWrsModelId: string;
	templateId: string;
	fullMessageText: string;
	templateCautionText: string;
}

/** Wire-format fields for the LINE Thrift struct MyDashboardMessageIcon. */
export interface MyDashboardMessageIcon {
	walletTabIconUrl: string;
	assetTabIconUrl: string;
	iconAltText: string;
}

/** Wire-format fields for the LINE Thrift struct NZ0_C12150a0. */
export interface NZ0_C12150a0 {
}

/** Wire-format fields for the LINE Thrift struct NZ0_C12152b. */
export interface NZ0_C12152b {
}

/** Wire-format fields for the LINE Thrift struct NZ0_C12155c. */
export interface NZ0_C12155c {
}

/** Wire-format fields for the LINE Thrift struct NZ0_C12206t0. */
export interface NZ0_C12206t0 {
	id: string;
	templateName: string;
	fields: Record<string, string>;
	elements: any[];
	etag: string;
	refreshTimeSec: number;
	name: string;
	recommendable: boolean;
	recommendedModelId: string;
	flexContent: string;
	categories: any[];
	headers: any[];
}

/** Wire-format fields for the LINE Thrift struct NZ0_C12208u. */
export interface NZ0_C12208u {
}

/** Wire-format fields for the LINE Thrift struct NZ0_C12209u0. */
export interface NZ0_C12209u0 {
	fixedModules: NZ0_C12206t0[];
	etag: string;
	refreshTimeSec: number;
	recommendedModules: NZ0_C12206t0[];
}

/** Wire-format fields for the LINE Thrift struct NZ0_C12212v0. */
export interface NZ0_C12212v0 {
	topTab: TopTab;
	subTabs: SubTab[];
	forceSelectedSubTabInfo: ForceSelectedSubTabInfo;
	refreshTimeSec: number;
	etag: string;
}

/** Wire-format fields for the LINE Thrift struct NZ0_C12214w. */
export interface NZ0_C12214w {
}

/** Wire-format fields for the LINE Thrift struct NZ0_C12221y0. */
export interface NZ0_C12221y0 {
	status: NZ0_EnumC12218x0;
	id: string;
	templateName: string;
	etag: string;
	refreshTimeSec: number;
	name: string;
	recommendable: boolean;
	recommendedModelId: string;
	fields: Record<string, string>;
	elements: any[];
	categories: any[];
	headers: any[];
}

/** Wire-format fields for the LINE Thrift struct NZ0_C12224z0. */
export interface NZ0_C12224z0 {
	etag: string;
	refreshTimeSec: number;
	fixedModules: NZ0_C12221y0[];
	recommendedModules: NZ0_C12221y0[];
}

/** Wire-format fields for the LINE Thrift struct NZ0_D. */
export interface NZ0_D {
	moduleLayoutV4: NZ0_C12212v0;
	notModified: NZ0_G0;
	notFound: NZ0_F0;
}

/** Wire-format fields for the LINE Thrift struct NZ0_E. */
export interface NZ0_E {
	id: string;
	etag: string;
	recommendedModelId: string;
	deviceAdId: string;
	agreedWithTargetingAdByMid: boolean;
	deviceId: string;
}

/** Wire-format fields for the LINE Thrift struct NZ0_F. */
export interface NZ0_F {
	moduleResponse: ModuleResponse;
	notModified: NZ0_G0;
	notFound: NZ0_F0;
}

/** Wire-format fields for the LINE Thrift struct NZ0_F0. */
export interface NZ0_F0 {
}

/** Wire-format fields for the LINE Thrift struct NZ0_G. */
export interface NZ0_G {
	id: string;
	etag: string;
	recommendedModelId: string;
	deviceAdId: string;
	agreedWithTargetingAdByMid: boolean;
	deviceId: string;
}

/** Wire-format fields for the LINE Thrift struct NZ0_G0. */
export interface NZ0_G0 {
}

/** Wire-format fields for the LINE Thrift struct NZ0_H. */
export interface NZ0_H {
	moduleResponse: ModuleWithStatusResponse;
	notModified: NZ0_G0;
	notFound: NZ0_F0;
}

/** Wire-format fields for the LINE Thrift struct NZ0_K. */
export interface NZ0_K {
	moduleAggregationResponse: NZ0_C12209u0;
	notModified: NZ0_G0;
}

/** Wire-format fields for the LINE Thrift struct NZ0_M. */
export interface NZ0_M {
	moduleAggregationResponse: NZ0_C12224z0;
	notModified: NZ0_G0;
}

/** Wire-format fields for the LINE Thrift struct NZ0_S. */
export interface NZ0_S {
}

/** Wire-format fields for the LINE Thrift struct NZ0_U. */
export interface NZ0_U {
}

/** Wire-format fields for the LINE Thrift struct NearbyEntry. */
export interface NearbyEntry {
	emid: string;
	distance: number;
	lastUpdatedInSec: number;
	property: Record<string, string>;
	profile: Profile;
}

/** Wire-format fields for the LINE Thrift struct NoBidCallback. */
export interface NoBidCallback {
	impEventUrl: string;
	vimpEventUrl: string;
	imp100pEventUrl: string;
}

/** Wire-format fields for the LINE Thrift struct NoteStatus. */
export interface NoteStatus {
	noteCount: number;
	latestCreatedAt: Int64;
}

/** Wire-format fields for the LINE Thrift struct NotificationSetting. */
export interface NotificationSetting {
	mute: boolean;
}

/** Wire-format fields for the LINE Thrift struct NotificationSettingEntry. */
export interface NotificationSettingEntry {
	notificationSetting: NotificationSetting;
}

/** Wire-format fields for the LINE Thrift struct NotifyChatAdEntryRequest. */
export interface NotifyChatAdEntryRequest {
	chatMid: string;
	scenarioId: string;
	sdata: string;
}

/** Wire-format fields for the LINE Thrift struct NotifyDeviceConnectionRequest. */
export interface NotifyDeviceConnectionRequest {
	deviceId: string;
	connectionId: string;
	connectionType: do0_EnumC23148f;
	code: do0_EnumC23147e;
	errorReason: string;
	startTime: Int64;
	endTime: Int64;
}

/** Wire-format fields for the LINE Thrift struct NotifyDeviceConnectionResponse. */
export interface NotifyDeviceConnectionResponse {
	latestOffset: Int64;
}

/** Wire-format fields for the LINE Thrift struct NotifyDeviceDisconnectionRequest. */
export interface NotifyDeviceDisconnectionRequest {
	deviceId: string;
	connectionId: string;
	disconnectedTime: Int64;
}

/** Wire-format fields for the LINE Thrift struct NotifyOATalkroomEventsRequest. */
export interface NotifyOATalkroomEventsRequest {
	events: OATalkroomEvent[];
}

/** Wire-format fields for the LINE Thrift struct NotifyScenarioExecutedRequest. */
export interface NotifyScenarioExecutedRequest {
	scenarioResults: do0_F[];
}

/** Wire-format fields for the LINE Thrift struct OATalkroomEvent. */
export interface OATalkroomEvent {
	eventId: string;
	type: kf_p;
	context: OATalkroomEventContext;
	content: kf_m;
}

/** Wire-format fields for the LINE Thrift struct OATalkroomEventContext. */
export interface OATalkroomEventContext {
	timestampMillis: Int64;
	botMid: string;
	userMid: string;
	os: kf_o;
	osVersion: string;
	appVersion: string;
	region: string;
}

/** Wire-format fields for the LINE Thrift struct OaAddFriendArea. */
export interface OaAddFriendArea {
	text: string;
}

/** Wire-format fields for the LINE Thrift struct Ob1_C12606a0. */
export interface Ob1_C12606a0 {
}

/** Wire-format fields for the LINE Thrift struct Ob1_C12608b. */
export interface Ob1_C12608b {
}

/** Wire-format fields for the LINE Thrift struct Ob1_C12618e0. */
export interface Ob1_C12618e0 {
	subscriptionService: any;
	continuationToken: string;
	limit: number;
	productType: Ob1_O0;
}

/** Wire-format fields for the LINE Thrift struct Ob1_C12621f0. */
export interface Ob1_C12621f0 {
	history: SubscriptionSlotHistory[];
	continuationToken: string;
	totalSize: Int64;
}

/** Wire-format fields for the LINE Thrift struct Ob1_C12630i0. */
export interface Ob1_C12630i0 {
}

/** Wire-format fields for the LINE Thrift struct Ob1_C12637k1. */
export interface Ob1_C12637k1 {
}

/** Wire-format fields for the LINE Thrift struct Ob1_C12642m0. */
export interface Ob1_C12642m0 {
}

/** Wire-format fields for the LINE Thrift struct Ob1_C12649o1. */
export interface Ob1_C12649o1 {
}

/** Wire-format fields for the LINE Thrift struct Ob1_C12660s1. */
export interface Ob1_C12660s1 {
}

/** Wire-format fields for the LINE Thrift struct Ob1_E. */
export interface Ob1_E {
	stickerSummary: any;
}

/** Wire-format fields for the LINE Thrift struct Ob1_G. */
export interface Ob1_G {
}

/** Wire-format fields for the LINE Thrift struct Ob1_H0. */
export interface Ob1_H0 {
	lpPromotionProperty: any;
}

/** Wire-format fields for the LINE Thrift struct Ob1_I0. */
export interface Ob1_I0 {
	stickerResourceType: number;
	themeResourceType: number;
	sticonResourceType: number;
}

/** Wire-format fields for the LINE Thrift struct Ob1_L. */
export interface Ob1_L {
	productTypes: Ob1_O0[];
	continuationToken: string;
	limit: number;
	shopFilter: ShopFilter;
}

/** Wire-format fields for the LINE Thrift struct Ob1_M. */
export interface Ob1_M {
	browsingHistory: BrowsingHistory[];
	continuationToken: string;
	totalSize: number;
}

/** Wire-format fields for the LINE Thrift struct Ob1_N. */
export interface Ob1_N {
}

/** Wire-format fields for the LINE Thrift struct Ob1_P0. */
export interface Ob1_P0 {
	stickerSummary: StickerSummary;
	themeSummary: ThemeSummary;
	sticonSummary: SticonSummary;
}

/** Wire-format fields for the LINE Thrift struct Ob1_U. */
export interface Ob1_U {
	productType: Ob1_O0;
	continuationToken: string;
	limit: number;
	subscriptionService: any;
	sortType: Ob1_V1;
}

/** Wire-format fields for the LINE Thrift struct Ob1_V. */
export interface Ob1_V {
	products: ProductSummary[];
	continuationToken: string;
	totalSize: Int64;
	maxSlotCount: number;
}

/** Wire-format fields for the LINE Thrift struct Ob1_W. */
export interface Ob1_W {
	continuationToken: string;
	limit: number;
	productType: Ob1_O0;
	recommendationType: Ob1_EnumC12631i1;
	productId: string;
	subtypes: number[];
	shouldShuffle: boolean;
	includeStickerIds: boolean;
	shopFilter: ShopFilter;
}

/** Wire-format fields for the LINE Thrift struct Ob1_W0. */
export interface Ob1_W0 {
	promotionBuddyInfo: PromotionBuddyInfo;
	promotionInstallInfo: PromotionInstallInfo;
	promotionMissionInfo: PromotionMissionInfo;
}

/** Wire-format fields for the LINE Thrift struct OkButton. */
export interface OkButton {
	text: string;
}

/** Wire-format fields for the LINE Thrift struct OpenSessionRequest. */
export interface OpenSessionRequest {
	metaData: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct OpenSessionResponse. */
export interface OpenSessionResponse {
	authSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct OperationResponse. */
export interface OperationResponse {
	operations: Pb1_C13154r6[];
	hasMoreOps: boolean;
	globalEvents: TGlobalEvents;
	individualEvents: TIndividualEvents;
}

/** Wire-format fields for the LINE Thrift struct OrderInfo. */
export interface OrderInfo {
	productId: string;
	orderId: string;
	confirmUrl: string;
	bot: Bot;
}

/** Wire-format fields for the LINE Thrift struct P70_k. */
export interface P70_k {
}

/** Wire-format fields for the LINE Thrift struct PaidCallDialing. */
export interface PaidCallDialing {
	type: PaidCallType;
	dialedNumber: string;
	serviceDomain: string;
	productType: Pb1_EnumC13196u6;
	productName: string;
	multipleProduct: boolean;
	callerIdStatus: Pb1_EnumC13238x6;
	balance: number;
	unit: string;
	rate: number;
	displayCode: string;
	calledNumber: string;
	calleeNationalNumber: string;
	calleeCallingCode: string;
	rateDivision: string;
	adMaxMin: number;
	adRemains: number;
	adSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct PaidCallResponse. */
export interface PaidCallResponse {
	host: CallHost;
	dialing: PaidCallDialing;
	token: string;
	spotItems: SpotItem[];
}

/** Wire-format fields for the LINE Thrift struct PartialFullSyncResponse. */
export interface PartialFullSyncResponse {
	targetCategories: Record<number, Int64>;
}

/** Wire-format fields for the LINE Thrift struct PasswordHashingParameters. */
export interface PasswordHashingParameters {
	hmacKey: string;
	scryptParams: ScryptParams;
}

/** Wire-format fields for the LINE Thrift struct PasswordValidationRule. */
export interface PasswordValidationRule {
	type: any;
	pattern: string[];
	clientNoticeMessage: string;
}

/** Wire-format fields for the LINE Thrift struct PaymentAuthenticationInfo. */
export interface PaymentAuthenticationInfo {
	authToken: string;
	confirmMessage: string;
}

/** Wire-format fields for the LINE Thrift struct PaymentEligibleFriendStatus. */
export interface PaymentEligibleFriendStatus {
	mid: string;
	status: r80_EnumC34367g;
}

/** Wire-format fields for the LINE Thrift struct PaymentLineCardInfo. */
export interface PaymentLineCardInfo {
	designCode: string;
	imageUrl: string;
}

/** Wire-format fields for the LINE Thrift struct PaymentLineCardIssueForm. */
export interface PaymentLineCardIssueForm {
	requiredTermsOfServiceBundle: r80_e0;
	availableLineCards: PaymentLineCardInfo[];
}

/** Wire-format fields for the LINE Thrift struct PaymentRequiredAgreementsInfo. */
export interface PaymentRequiredAgreementsInfo {
	title: string;
	desc: string;
	linkName: string;
	linkUrl: string;
	newAgreements: string[];
}

/** Wire-format fields for the LINE Thrift struct PaymentReservationResult. */
export interface PaymentReservationResult {
	orderId: string;
	confirmUrl: string;
	extras: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct PaymentTradeInfo. */
export interface PaymentTradeInfo {
	chargeRequestId: string;
	chargeRequestType: r80_g0;
	chargeRequestYmdt: Int64;
	tradeNumber: string;
	agencyNo: string;
	confirmNo: string;
	expireYmd: Int64;
	moneyAmount: DisplayMoney;
	completeYmdt: Int64;
	paymentProcessCorp: string;
	status: r80_h0;
	helpUrl: string;
	guideMessage: string;
}

/** Wire-format fields for the LINE Thrift struct Pb1_A4. */
export interface Pb1_A4 {
	mid: string;
	eMid: string;
}

/** Wire-format fields for the LINE Thrift struct Pb1_A6. */
export interface Pb1_A6 {
}

/** Wire-format fields for the LINE Thrift struct Pb1_B3. */
export interface Pb1_B3 {
}

/** Wire-format fields for the LINE Thrift struct Pb1_C12916a5. */
export interface Pb1_C12916a5 {
	wrappedNonce: string;
	kdfParameter1: string;
	kdfParameter2: string;
}

/** Wire-format fields for the LINE Thrift struct Pb1_C12938c. */
export interface Pb1_C12938c {
	message: AbuseReport;
	lineMeeting: AbuseReportLineMeeting;
}

/** Wire-format fields for the LINE Thrift struct Pb1_C12946c7. */
export interface Pb1_C12946c7 {
}

/** Wire-format fields for the LINE Thrift struct Pb1_C12953d0. */
export interface Pb1_C12953d0 {
	verifier: string;
	pinCode: string;
	errorCode: ErrorCode;
	publicKey: Pb1_C13097n4;
	encryptedKeyChain: string;
	hashKeyChain: string;
}

/** Wire-format fields for the LINE Thrift struct Pb1_C12980f. */
export interface Pb1_C12980f {
}

/** Wire-format fields for the LINE Thrift struct Pb1_C12996g1. */
export interface Pb1_C12996g1 {
}

/** Wire-format fields for the LINE Thrift struct Pb1_C13008h. */
export interface Pb1_C13008h {
}

/** Wire-format fields for the LINE Thrift struct Pb1_C13019ha. */
export interface Pb1_C13019ha {
}

/** Wire-format fields for the LINE Thrift struct Pb1_C13042j5. */
export interface Pb1_C13042j5 {
}

/** Wire-format fields for the LINE Thrift struct Pb1_C13070l5. */
export interface Pb1_C13070l5 {
}

/** Wire-format fields for the LINE Thrift struct Pb1_C13097n4. */
export interface Pb1_C13097n4 {
	version: number;
	keyId: number;
	keyData: string | Buffer;
	createdTime: Int64;
}

/** Wire-format fields for the LINE Thrift struct Pb1_C13113o6. */
export interface Pb1_C13113o6 {
	callRoute: CallRoute;
	paidCallResponse: PaidCallResponse;
}

/** Wire-format fields for the LINE Thrift struct Pb1_C13114o7. */
export interface Pb1_C13114o7 {
}

/** Wire-format fields for the LINE Thrift struct Pb1_C13126p5. */
export interface Pb1_C13126p5 {
}

/** Wire-format fields for the LINE Thrift struct Pb1_C13131pa. */
export interface Pb1_C13131pa {
}

/** Wire-format fields for the LINE Thrift struct Pb1_C13150r2. */
export interface Pb1_C13150r2 {
}

/** Wire-format fields for the LINE Thrift struct Pb1_C13154r6. */
export interface Pb1_C13154r6 {
	revision: Int64;
	createdTime: Int64;
	type: OpType;
	reqSeq: number;
	checksum: string;
	status: Pb1_EnumC13127p6;
	param1: string;
	param2: string;
	param3: string;
	message: Message;
}

/** Wire-format fields for the LINE Thrift struct Pb1_C13155r7. */
export interface Pb1_C13155r7 {
	restoreClaim: string;
}

/** Wire-format fields for the LINE Thrift struct Pb1_C13169s7. */
export interface Pb1_C13169s7 {
	recoveryKey: string;
	blobPayload: string;
}

/** Wire-format fields for the LINE Thrift struct Pb1_C13183t7. */
export interface Pb1_C13183t7 {
}

/** Wire-format fields for the LINE Thrift struct Pb1_C13190u0. */
export interface Pb1_C13190u0 {
	rich: BuddyRichMenuChatBarItem;
	widgetList: BuddyWidgetListCharBarItem;
	web: BuddyWebChatBarItem;
}

/** Wire-format fields for the LINE Thrift struct Pb1_C13202uc. */
export interface Pb1_C13202uc {
}

/** Wire-format fields for the LINE Thrift struct Pb1_C13208v4. */
export interface Pb1_C13208v4 {
	groupExtra: GroupExtra;
	peerExtra: Pb1_A6;
}

/** Wire-format fields for the LINE Thrift struct Pb1_C13254y8. */
export interface Pb1_C13254y8 {
}

/** Wire-format fields for the LINE Thrift struct Pb1_C13263z3. */
export interface Pb1_C13263z3 {
	blobHeader: string;
	blobPayload: string;
	reason: Pb1_A3;
}

/** Wire-format fields for the LINE Thrift struct Pb1_Ca. */
export interface Pb1_Ca {
}

/** Wire-format fields for the LINE Thrift struct Pb1_E3. */
export interface Pb1_E3 {
	blobHeader: string;
	payloadDataList: Pb1_X5[];
}

/** Wire-format fields for the LINE Thrift struct Pb1_Ea. */
export interface Pb1_Ea {
}

/** Wire-format fields for the LINE Thrift struct Pb1_F3. */
export interface Pb1_F3 {
}

/** Wire-format fields for the LINE Thrift struct Pb1_H3. */
export interface Pb1_H3 {
}

/** Wire-format fields for the LINE Thrift struct Pb1_I3. */
export interface Pb1_I3 {
}

/** Wire-format fields for the LINE Thrift struct Pb1_Ia. */
export interface Pb1_Ia {
}

/** Wire-format fields for the LINE Thrift struct Pb1_J5. */
export interface Pb1_J5 {
}

/** Wire-format fields for the LINE Thrift struct Pb1_K3. */
export interface Pb1_K3 {
}

/** Wire-format fields for the LINE Thrift struct Pb1_M3. */
export interface Pb1_M3 {
}

/** Wire-format fields for the LINE Thrift struct Pb1_O. */
export interface Pb1_O {
}

/** Wire-format fields for the LINE Thrift struct Pb1_O3. */
export interface Pb1_O3 {
}

/** Wire-format fields for the LINE Thrift struct Pb1_P9. */
export interface Pb1_P9 {
}

/** Wire-format fields for the LINE Thrift struct Pb1_Q8. */
export interface Pb1_Q8 {
}

/** Wire-format fields for the LINE Thrift struct Pb1_S5. */
export interface Pb1_S5 {
}

/** Wire-format fields for the LINE Thrift struct Pb1_Sb. */
export interface Pb1_Sb {
	reqSeq: number;
	encryptedKeyChain: string;
	hashKeyChain: string;
}

/** Wire-format fields for the LINE Thrift struct Pb1_U1. */
export interface Pb1_U1 {
}

/** Wire-format fields for the LINE Thrift struct Pb1_U3. */
export interface Pb1_U3 {
	keyVersion: number;
	groupKeyId: number;
	creator: string;
	creatorKeyId: number;
	receiver: string;
	receiverKeyId: number;
	encryptedSharedKey: string;
	allowedTypes: number[];
	specVersion: number;
}

/** Wire-format fields for the LINE Thrift struct Pb1_V3. */
export interface Pb1_V3 {
	version: number;
	keyId: number;
	publicKey: string;
	privateKey: string;
	createdTime: Int64;
}

/** Wire-format fields for the LINE Thrift struct Pb1_W4. */
export interface Pb1_W4 {
}

/** Wire-format fields for the LINE Thrift struct Pb1_W5. */
export interface Pb1_W5 {
	e2ee: E2EEMetadata;
	singleValue: SingleValueMetadata;
}

/** Wire-format fields for the LINE Thrift struct Pb1_W6. */
export interface Pb1_W6 {
	reqSeq: number;
	publicKey: Pb1_C13097n4;
	blobPayload: string;
}

/** Wire-format fields for the LINE Thrift struct Pb1_X. */
export interface Pb1_X {
	verifier: string;
	publicKey: Pb1_C13097n4;
	encryptedKeyChain: string;
	hashKeyChain: string;
	errorCode: ErrorCode;
}

/** Wire-format fields for the LINE Thrift struct Pb1_X5. */
export interface Pb1_X5 {
	metadata: Pb1_W5;
	blobPayload: string;
}

/** Wire-format fields for the LINE Thrift struct Pb1_X7. */
export interface Pb1_X7 {
	operationResponse: OperationResponse;
	fullSyncResponse: FullSyncResponse;
	partialFullSyncResponse: PartialFullSyncResponse;
}

/** Wire-format fields for the LINE Thrift struct Pb1_Y4. */
export interface Pb1_Y4 {
}

/** Wire-format fields for the LINE Thrift struct Pb1_Za. */
export interface Pb1_Za {
}

/** Wire-format fields for the LINE Thrift struct Pb1_Zc. */
export interface Pb1_Zc {
}

/** Wire-format fields for the LINE Thrift struct Pb1_ad. */
export interface Pb1_ad {
	title: string;
}

/** Wire-format fields for the LINE Thrift struct Pb1_cd. */
export interface Pb1_cd {
}

/** Wire-format fields for the LINE Thrift struct PendingAgreementsResponse. */
export interface PendingAgreementsResponse {
	pendingAgreements: number[];
}

/** Wire-format fields for the LINE Thrift struct PermitLoginRequest. */
export interface PermitLoginRequest {
	sessionId: string;
	metaData: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct PermitLoginResponse. */
export interface PermitLoginResponse {
	oneTimeToken: string;
}

/** Wire-format fields for the LINE Thrift struct PhoneVerificationResult. */
export interface PhoneVerificationResult {
	verificationResult: VerificationResult;
	accountMigrationCheckType: Pb1_EnumC13022i;
	recommendAddFriends: boolean;
}

/** Wire-format fields for the LINE Thrift struct PocketMoneyInfo. */
export interface PocketMoneyInfo {
	assetServiceInfo: AssetServiceInfo;
	displayType: NZ0_I0;
	productType: NZ0_K0;
	refinanceText: string;
}

/** Wire-format fields for the LINE Thrift struct PoiInfo. */
export interface PoiInfo {
	poiId: string;
	poiRealm: Pb1_F6;
}

/** Wire-format fields for the LINE Thrift struct PointInfo. */
export interface PointInfo {
	assetServiceInfo: AssetServiceInfo;
}

/** Wire-format fields for the LINE Thrift struct PopularKeyword. */
export interface PopularKeyword {
	value: string;
	highlighted: boolean;
	id: Int64;
}

/** Wire-format fields for the LINE Thrift struct Popup. */
export interface Popup {
	id: Int64;
	country: string;
	name: string;
	type: PopupType;
	content: PopupContent;
	activated: boolean;
	revision: Int64;
	startsAt: Int64;
	endsAt: Int64;
	createdAt: Int64;
}

/** Wire-format fields for the LINE Thrift struct PopupContent. */
export interface PopupContent {
	mainPopUp: MainPopup;
	chatroomPopup: ChatroomPopup;
}

/** Wire-format fields for the LINE Thrift struct PopupProperty. */
export interface PopupProperty {
	id: string;
	name: string;
	startDateTimeMillis: Int64;
	endDateTimeMillis: Int64;
	popupContents: PopupContent[];
	wrsCampaignId: string;
	optOut: boolean;
	layoutSize: NZ0_N0;
}

/** Wire-format fields for the LINE Thrift struct Price. */
export interface Price {
	currency: string;
	amount: string;
	priceString: string;
}

/** Wire-format fields for the LINE Thrift struct Priority. */
export interface Priority {
	value: Int64;
}

/** Wire-format fields for the LINE Thrift struct Product. */
export interface Product {
	id: string;
	productVersion: Int64;
	productDetails: AR0_o;
}

/** Wire-format fields for the LINE Thrift struct ProductDetail. */
export interface ProductDetail {
	id: string;
	billingItemId: string;
	type: string;
	subtype: Ob1_X1;
	billingCpId: string;
	name: string;
	author: string;
	details: string;
	copyright: string;
	notice: string;
	promotionInfo: PromotionInfo;
	latestVersion: Int64;
	latestVersionString: string;
	version: Int64;
	versionString: string;
	applicationVersionRange: ApplicationVersionRange;
	owned: boolean;
	grantedByDefault: boolean;
	validFor: number;
	validUntil: Int64;
	onSale: boolean;
	salesFlags: string[];
	availableForPresent: boolean;
	availableForMyself: boolean;
	priceTier: number;
	price: Price;
	priceInLineCoin: string;
	localizedPrice: Price;
	attributes: Record<string, string>;
	authorId: string;
	stickerResourceType: StickerResourceType;
	productProperty: jp_naver_line_shop_protocol_thrift_ProductProperty;
	productSalesState: Ob1_J0;
	installedTime: Int64;
	wishProperty: ProductWishProperty;
	subscriptionProperty: ProductSubscriptionProperty;
	productPromotionProperty: Ob1_H0;
	availableInCountry: boolean;
	editorsPickBanners: EditorsPickBannerForClient[];
	ableToBeGivenAsPresent: boolean;
	madeWithStickerMaker: boolean;
	customDownloadButtonLabel: string;
}

/** Wire-format fields for the LINE Thrift struct ProductList. */
export interface ProductList {
	productList: ProductDetail[];
	offset: number;
	totalSize: number;
	title: string;
}

/** Wire-format fields for the LINE Thrift struct ProductListByAuthorRequest. */
export interface ProductListByAuthorRequest {
	productType: Ob1_O0;
	authorId: string;
	offset: number;
	limit: number;
	shopFilter: ShopFilter;
	includeStickerIds: boolean;
	additionalProductTypes: number[];
	showcaseType: Ob1_EnumC12666u1;
}

/** Wire-format fields for the LINE Thrift struct ProductSearchSummary. */
export interface ProductSearchSummary {
	id: string;
	type: number;
	name: string;
	author: string;
	promotionInfo: any;
	version: Int64;
	newFlag: boolean;
	priceTier: number;
	priceInLineCoin: string;
	property: any;
	subType: number;
	onSale: boolean;
	availableForPresent: boolean;
	availableForPurchase: boolean;
	validDays: number;
	authorId: string;
	bargainFlag: boolean;
	copyright: string;
	availability: number;
	interactionEventParameter: string;
	editorsPickIds: string[];
	periodEnd: Int64;
}

/** Wire-format fields for the LINE Thrift struct ProductSubscriptionProperty. */
export interface ProductSubscriptionProperty {
	availableForSubscribe: boolean;
	subscriptionAvailability: Ob1_D0;
}

/** Wire-format fields for the LINE Thrift struct ProductSummary. */
export interface ProductSummary {
	id: string;
	name: string;
	latestVersion: Int64;
	applicationVersionRange: ApplicationVersionRange;
	grantedByDefault: boolean;
	attributes: Record<string, string>;
	productTypeSummary: Ob1_P0;
	validUntil: Int64;
	validFor: number;
	installedTime: Int64;
	availability: Ob1_D0;
	authorId: string;
	canAutoDownload: boolean;
	promotionInfo: PromotionInfo;
}

/** Wire-format fields for the LINE Thrift struct ProductSummaryForAutoSuggest. */
export interface ProductSummaryForAutoSuggest {
	id: string;
	version: Int64;
	name: string;
	stickerResourceType: StickerResourceType;
	suggestVersion: Int64;
	popupLayer: Ob1_B0;
	type: Ob1_O0;
	resourceType: Ob1_I0;
	stickerSize: Ob1_C1;
}

/** Wire-format fields for the LINE Thrift struct ProductSummaryList. */
export interface ProductSummaryList {
	productList: ProductSummary[];
	offset: number;
	totalSize: number;
}

/** Wire-format fields for the LINE Thrift struct ProductValidationRequest. */
export interface ProductValidationRequest {
	validationScheme: ProductValidationScheme;
	authCode: string;
}

/** Wire-format fields for the LINE Thrift struct ProductValidationResult. */
export interface ProductValidationResult {
	validated: boolean;
}

/** Wire-format fields for the LINE Thrift struct ProductValidationScheme. */
export interface ProductValidationScheme {
	key: string;
	offset: Int64;
	size: Int64;
}

/** Wire-format fields for the LINE Thrift struct ProductWishProperty. */
export interface ProductWishProperty {
	totalCount: Int64;
}

/** Wire-format fields for the LINE Thrift struct Profile. */
export interface Profile {
	mid: string;
	userid: string;
	phone: string;
	email: string;
	regionCode: string;
	displayName: string;
	phoneticName: string;
	pictureStatus: string;
	thumbnailUrl: string;
	statusMessage: string;
	allowSearchByUserid: boolean;
	allowSearchByEmail: boolean;
	picturePath: string;
	musicProfile: string;
	videoProfile: string;
	statusMessageContentMetadata: Record<string, string>;
	avatarProfile: AvatarProfile;
	nftProfile: boolean;
	pictureSource: Pb1_N6;
	profileId: string;
	profileType: Pb1_O6;
	createdTimeMillis: Int64;
}

/** Wire-format fields for the LINE Thrift struct ProfileContent. */
export interface ProfileContent {
	value: string;
	meta: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct ProfileRefererContent. */
export interface ProfileRefererContent {
	oatQueryParameters: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct PromotionBuddyDetail. */
export interface PromotionBuddyDetail {
	searchId: string;
	contactStatus: ContactStatus;
	name: string;
	pictureUrl: string;
	statusMessage: string;
	brandType: Ob1_EnumC12641m;
}

/** Wire-format fields for the LINE Thrift struct PromotionBuddyInfo. */
export interface PromotionBuddyInfo {
	buddyMid: string;
	promotionBuddyDetail: PromotionBuddyDetail;
	showBanner: boolean;
}

/** Wire-format fields for the LINE Thrift struct PromotionInfo. */
export interface PromotionInfo {
	promotionType: Ob1_EnumC12610b1;
	promotionDetail: Ob1_W0;
	buddyInfo: PromotionBuddyInfo;
}

/** Wire-format fields for the LINE Thrift struct PromotionInstallInfo. */
export interface PromotionInstallInfo {
	downloadUrl: string;
	customUrlSchema: string;
}

/** Wire-format fields for the LINE Thrift struct PromotionMissionInfo. */
export interface PromotionMissionInfo {
	promotionMissionType: Ob1_EnumC12607a1;
	missionCompleted: boolean;
	downloadUrl: string;
	customUrlSchema: string;
	oaMid: string;
}

/** Wire-format fields for the LINE Thrift struct Provider. */
export interface Provider {
	id: string;
	name: string;
	providerPageUrl: string;
	providerType: number;
}

/** Wire-format fields for the LINE Thrift struct PublicKeyCredentialCreationOptions. */
export interface PublicKeyCredentialCreationOptions {
	rp: PublicKeyCredentialRpEntity;
	user: PublicKeyCredentialUserEntity;
	challenge: string;
	pubKeyCredParams: PublicKeyCredentialParameters[];
	timeout: Int64;
	excludeCredentials: PublicKeyCredentialDescriptor[];
	authenticatorSelection: AuthenticatorSelectionCriteria;
	attestation: string;
	extensions: AuthenticationExtensionsClientInputs;
}

/** Wire-format fields for the LINE Thrift struct PublicKeyCredentialDescriptor. */
export interface PublicKeyCredentialDescriptor {
	type: string;
	id: string;
	transports: string[];
}

/** Wire-format fields for the LINE Thrift struct PublicKeyCredentialParameters. */
export interface PublicKeyCredentialParameters {
	type: string;
	alg: number;
}

/** Wire-format fields for the LINE Thrift struct PublicKeyCredentialRequestOptions. */
export interface PublicKeyCredentialRequestOptions {
	challenge: string;
	timeout: Int64;
	rpId: string;
	allowCredentials: PublicKeyCredentialDescriptor[];
	userVerification: string;
	extensions: AuthenticationExtensionsClientInputs;
}

/** Wire-format fields for the LINE Thrift struct PublicKeyCredentialRpEntity. */
export interface PublicKeyCredentialRpEntity {
	name: string;
	icon: string;
	id: string;
}

/** Wire-format fields for the LINE Thrift struct PublicKeyCredentialUserEntity. */
export interface PublicKeyCredentialUserEntity {
	name: string;
	icon: string;
	id: string;
	displayName: string;
}

/** Wire-format fields for the LINE Thrift struct PurchaseEnabledRequest. */
export interface PurchaseEnabledRequest {
	uniqueKey: string;
}

/** Wire-format fields for the LINE Thrift struct PurchaseOrder. */
export interface PurchaseOrder {
	shopId: string;
	productId: string;
	recipientMid: string;
	price: Price;
	enableLinePointAutoExchange: boolean;
	locale: Locale;
	presentAttributes: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct PurchaseOrderResponse. */
export interface PurchaseOrderResponse {
	orderId: string;
	attributes: Record<string, string>;
	billingConfirmUrl: string;
}

/** Wire-format fields for the LINE Thrift struct PurchaseRecord. */
export interface PurchaseRecord {
	productDetail: ProductDetail;
	purchasedTime: Int64;
	giver: string;
	recipient: string;
	purchasedPrice: Price;
}

/** Wire-format fields for the LINE Thrift struct PurchaseRecordList. */
export interface PurchaseRecordList {
	purchaseRecords: PurchaseRecord[];
	offset: number;
	totalSize: number;
}

/** Wire-format fields for the LINE Thrift struct PurchaseSubscriptionRequest. */
export interface PurchaseSubscriptionRequest {
	billingItemId: string;
	subscriptionService: number;
	storeCode: Ob1_K1;
	storeOrderId: string;
	outsideAppPurchase: boolean;
	unavailableItemPurchase: boolean;
}

/** Wire-format fields for the LINE Thrift struct PurchaseSubscriptionResponse. */
export interface PurchaseSubscriptionResponse {
	result: Ob1_M1;
	orderId: string;
	confirmUrl: string;
}

/** Wire-format fields for the LINE Thrift struct PushRecvReport. */
export interface PushRecvReport {
	pushTrackingId: string;
	recvTimestamp: Int64;
	battery: number;
	batteryMode: Pb1_EnumC13009h0;
	clientNetworkType: Pb1_EnumC12998g3;
	carrierCode: string;
	displayTimestamp: Int64;
}

/** Wire-format fields for the LINE Thrift struct PutE2eeKeyRequest. */
export interface PutE2eeKeyRequest {
	sessionId: string;
	e2eeKey: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct Q70_l. */
export interface Q70_l {
}

/** Wire-format fields for the LINE Thrift struct Q70_o. */
export interface Q70_o {
}

/** Wire-format fields for the LINE Thrift struct Qj_C13595l. */
export interface Qj_C13595l {
	none: any;
	chat: LiffChatContext;
	squareChat: LiffSquareChatContext;
}

/** Wire-format fields for the LINE Thrift struct Qj_C13599p. */
export interface Qj_C13599p {
	consentRequired: LiffErrorConsentRequired;
	permanentLinkInvalidRequest: LiffErrorPermanentLinkInvalidRequest;
}

/** Wire-format fields for the LINE Thrift struct Qj_C13602t. */
export interface Qj_C13602t {
	externalService: any;
}

/** Wire-format fields for the LINE Thrift struct Qj_C13607y. */
export interface Qj_C13607y {
}

/** Wire-format fields for the LINE Thrift struct QuickMenuCouponInfo. */
export interface QuickMenuCouponInfo {
	couponCount: string;
	mainText: string;
	linkUrl: string;
	iconUrl: string;
	targetId: string;
	targetName: string;
	responseStatus: NZ0_W0;
	darkModeIconUrl: string;
}

/** Wire-format fields for the LINE Thrift struct QuickMenuMyCardInfo. */
export interface QuickMenuMyCardInfo {
	myCardItems: QuickMenuMyCardItem[];
	responseStatus: NZ0_W0;
}

/** Wire-format fields for the LINE Thrift struct QuickMenuMyCardItem. */
export interface QuickMenuMyCardItem {
	itemType: NZ0_S0;
	mainText: string;
	linkUrl: string;
	iconUrl: string;
	targetId: string;
	targetName: string;
	darkModeIconUrl: string;
}

/** Wire-format fields for the LINE Thrift struct QuickMenuPointInfo. */
export interface QuickMenuPointInfo {
	balance: string;
	linkUrl: string;
	iconUrl: string;
	targetId: string;
	targetName: string;
	responseStatus: NZ0_W0;
}

/** Wire-format fields for the LINE Thrift struct R70_a. */
export interface R70_a {
}

/** Wire-format fields for the LINE Thrift struct R70_c. */
export interface R70_c {
}

/** Wire-format fields for the LINE Thrift struct R70_d. */
export interface R70_d {
}

/** Wire-format fields for the LINE Thrift struct R70_t. */
export interface R70_t {
}

/** Wire-format fields for the LINE Thrift struct RSAEncryptedLoginInfo. */
export interface RSAEncryptedLoginInfo {
	loginId: string;
	loginPassword: string;
}

/** Wire-format fields for the LINE Thrift struct RSAEncryptedPassword. */
export interface RSAEncryptedPassword {
	encrypted: string;
	keyName: string;
}

/** Wire-format fields for the LINE Thrift struct RSAKey. */
export interface RSAKey {
	keynm: string;
	nvalue: string;
	evalue: string;
	sessionKey: string;
}

/** Wire-format fields for the LINE Thrift struct ReactRequest. */
export interface ReactRequest {
	reqSeq: number;
	messageId: Int64;
	reactionType: ReactionType;
}

/** Wire-format fields for the LINE Thrift struct ReactToMessageRequest. */
export interface ReactToMessageRequest {
	reqSeq: number;
	squareChatMid: string;
	messageId: string;
	reactionType: MessageReactionType;
	threadMid: string;
}

/** Wire-format fields for the LINE Thrift struct ReactToMessageResponse. */
export interface ReactToMessageResponse {
	reaction: SquareMessageReaction;
	status: SquareMessageReactionStatus;
}

/** Wire-format fields for the LINE Thrift struct Reaction. */
export interface Reaction {
	fromUserMid: string;
	atMillis: Int64;
	reactionType: ReactionType;
}

/** Wire-format fields for the LINE Thrift struct ReactionType. */
export interface ReactionType {
	predefinedReactionType: MessageReactionType;
}

/** Wire-format fields for the LINE Thrift struct RecommendationDetail. */
export interface RecommendationDetail {
	createdTime: Int64;
	reasons: LN0_z0[];
	hidden: boolean;
}

/** Wire-format fields for the LINE Thrift struct RecommendationReasonSharedChat. */
export interface RecommendationReasonSharedChat {
	chatMid: string;
}

/** Wire-format fields for the LINE Thrift struct RefreshAccessTokenRequest. */
export interface RefreshAccessTokenRequest {
	refreshToken: string;
}

/** Wire-format fields for the LINE Thrift struct RefreshAccessTokenResponse. */
export interface RefreshAccessTokenResponse {
	accessToken: string;
	durationUntilRefreshInSec: Int64;
	retryPolicy: RetryPolicy;
	tokenIssueTimeEpochSec: Int64;
	refreshToken: string;
}

/** Wire-format fields for the LINE Thrift struct RefreshApiRetryPolicy. */
export interface RefreshApiRetryPolicy {
	initialDelayInMillis: Int64;
	maxDelayInMillis: Int64;
	multiplier: number;
	jitterRate: number;
}

/** Wire-format fields for the LINE Thrift struct RefreshSubscriptionsRequest. */
export interface RefreshSubscriptionsRequest {
	subscriptions: Int64[];
}

/** Wire-format fields for the LINE Thrift struct RefreshSubscriptionsResponse. */
export interface RefreshSubscriptionsResponse {
	ttlMillis: Int64;
	subscriptionStates: Record<number, SubscriptionState>;
}

/** Wire-format fields for the LINE Thrift struct RegPublicKeyCredential. */
export interface RegPublicKeyCredential {
	id: string;
	type: string;
	response: AuthenticatorAttestationResponse;
	extensionResults: AuthenticationExtensionsClientOutputs;
}

/** Wire-format fields for the LINE Thrift struct RegisterCampaignRewardRequest. */
export interface RegisterCampaignRewardRequest {
	campaignId: string;
}

/** Wire-format fields for the LINE Thrift struct RegisterCampaignRewardResponse. */
export interface RegisterCampaignRewardResponse {
	campaignStatus: NZ0_EnumC12188n;
	resultPopupProperty: ResultPopupProperty;
	errorMessage: string;
	registeredId: string;
	registeredDateTimeMillis: Int64;
	redirectUrlWithoutResultPopup: string;
}

/** Wire-format fields for the LINE Thrift struct RegisterE2EEPublicKeyV2Response. */
export interface RegisterE2EEPublicKeyV2Response {
	publicKey: Pb1_C13097n4;
	isMasterKeyConflict: boolean;
}

/** Wire-format fields for the LINE Thrift struct RegisterPrimaryCredentialRequest. */
export interface RegisterPrimaryCredentialRequest {
	sessionId: string;
	credential: any;
}

/** Wire-format fields for the LINE Thrift struct RegisterPrimaryWithTokenV3Response. */
export interface RegisterPrimaryWithTokenV3Response {
	authToken: string;
	tokenV3IssueResult: TokenV3IssueResult;
	mid: string;
}

/** Wire-format fields for the LINE Thrift struct I80_q0. */
export interface I80_q0 {
	authSessionId: string;
	encryptionKey: I80_y0;
}

/** Wire-format fields for the LINE Thrift struct RegularBadge. */
export interface RegularBadge {
	label: string;
	color: string;
}

/** Wire-format fields for the LINE Thrift struct ReissueChatTicketRequest. */
export interface ReissueChatTicketRequest {
	reqSeq: number;
	groupMid: string;
}

/** Wire-format fields for the LINE Thrift struct ReissueChatTicketResponse. */
export interface ReissueChatTicketResponse {
	ticketId: string;
}

/** Wire-format fields for the LINE Thrift struct RejectChatInvitationRequest. */
export interface RejectChatInvitationRequest {
	reqSeq: number;
	chatMid: string;
}

/** Wire-format fields for the LINE Thrift struct RejectSpeakersRequest. */
export interface RejectSpeakersRequest {
	squareChatMid: string;
	sessionId: string;
	targetMids: string[];
}

/** Wire-format fields for the LINE Thrift struct RejectSquareMembersRequest. */
export interface RejectSquareMembersRequest {
	squareMid: string;
	requestedMemberMids: string[];
}

/** Wire-format fields for the LINE Thrift struct RejectSquareMembersResponse. */
export interface RejectSquareMembersResponse {
	rejectedMembers: SquareMember[];
	status: SquareStatus;
}

/** Wire-format fields for the LINE Thrift struct RejectToSpeakRequest. */
export interface RejectToSpeakRequest {
	squareChatMid: string;
	sessionId: string;
	inviteRequestId: string;
}

/** Wire-format fields for the LINE Thrift struct RemoveFollowerRequest. */
export interface RemoveFollowerRequest {
	followMid: Pb1_A4;
}

/** Wire-format fields for the LINE Thrift struct RemoveFromFollowBlacklistRequest. */
export interface RemoveFromFollowBlacklistRequest {
	followMid: Pb1_A4;
}

/** Wire-format fields for the LINE Thrift struct RemoveItemFromCollectionRequest. */
export interface RemoveItemFromCollectionRequest {
	collectionId: string;
	productId: string;
	itemId: string;
}

/** Wire-format fields for the LINE Thrift struct RemoveLiveTalkSubscriptionRequest. */
export interface RemoveLiveTalkSubscriptionRequest {
	squareChatMid: string;
	sessionId: string;
}

/** Wire-format fields for the LINE Thrift struct RemoveProductFromSubscriptionSlotRequest. */
export interface RemoveProductFromSubscriptionSlotRequest {
	productType: Ob1_O0;
	productId: string;
	subscriptionService: number;
	productIds: string[];
}

/** Wire-format fields for the LINE Thrift struct RemoveProductFromSubscriptionSlotResponse. */
export interface RemoveProductFromSubscriptionSlotResponse {
	result: Ob1_U1;
}

/** Wire-format fields for the LINE Thrift struct RemoveSubscriptionsRequest. */
export interface RemoveSubscriptionsRequest {
	unsubscriptions: Int64[];
}

/** Wire-format fields for the LINE Thrift struct RepairGroupMembers. */
export interface RepairGroupMembers {
	numMembers: number;
	invalidGroup: boolean;
}

/** Wire-format fields for the LINE Thrift struct RepairProfileMappingMembers. */
export interface RepairProfileMappingMembers {
	matched: boolean;
	numMembers: number;
}

/** Wire-format fields for the LINE Thrift struct RepairTriggerConfigurationsElement. */
export interface RepairTriggerConfigurationsElement {
	serverConfigurations: Configurations;
	nextCallIntervalMinutes: number;
}

/** Wire-format fields for the LINE Thrift struct RepairTriggerGroupMembersElement. */
export interface RepairTriggerGroupMembersElement {
	matchedGroups: Record<string, RepairGroupMembers>;
	mismatchedGroups: Record<string, RepairGroupMembers>;
	nextCallIntervalMinutes: number;
}

/** Wire-format fields for the LINE Thrift struct RepairTriggerNumElement. */
export interface RepairTriggerNumElement {
	matched: boolean;
	numValue: number;
	nextCallIntervalMinutes: number;
}

/** Wire-format fields for the LINE Thrift struct RepairTriggerProfileElement. */
export interface RepairTriggerProfileElement {
	serverProfile: Profile;
	nextCallIntervalMinutes: number;
	serverMultiProfiles: Profile[];
}

/** Wire-format fields for the LINE Thrift struct RepairTriggerProfileMappingListElement. */
export interface RepairTriggerProfileMappingListElement {
	profileMappings: Record<string, RepairProfileMappingMembers>;
	nextCallIntervalMinutes: number;
}

/** Wire-format fields for the LINE Thrift struct RepairTriggerSettingsElement. */
export interface RepairTriggerSettingsElement {
	serverSettings: Settings;
	nextCallIntervalMinutes: number;
}

/** Wire-format fields for the LINE Thrift struct ReportAbuseExRequest. */
export interface ReportAbuseExRequest {
	abuseReportEntry: Pb1_C12938c;
}

/** Wire-format fields for the LINE Thrift struct ReportLiveTalkRequest. */
export interface ReportLiveTalkRequest {
	squareChatMid: string;
	sessionId: string;
	reportType: LiveTalkReportType;
}

/** Wire-format fields for the LINE Thrift struct ReportLiveTalkSpeakerRequest. */
export interface ReportLiveTalkSpeakerRequest {
	squareChatMid: string;
	sessionId: string;
	speakerMemberMid: string;
	reportType: LiveTalkReportType;
}

/** Wire-format fields for the LINE Thrift struct ReportMessageSummaryRequest. */
export interface ReportMessageSummaryRequest {
	chatEmid: string;
	messageSummaryRangeTo: Int64;
	reportType: MessageSummaryReportType;
}

/** Wire-format fields for the LINE Thrift struct ReportRefreshedAccessTokenRequest. */
export interface ReportRefreshedAccessTokenRequest {
	accessToken: string;
}

/** Wire-format fields for the LINE Thrift struct ReportSquareChatRequest. */
export interface ReportSquareChatRequest {
	squareMid: string;
	squareChatMid: string;
	reportType: ReportType;
	otherReason: string;
}

/** Wire-format fields for the LINE Thrift struct ReportSquareMemberRequest. */
export interface ReportSquareMemberRequest {
	squareMemberMid: string;
	reportType: ReportType;
	otherReason: string;
	squareChatMid: string;
	threadMid: string;
}

/** Wire-format fields for the LINE Thrift struct ReportSquareMessageRequest. */
export interface ReportSquareMessageRequest {
	squareMid: string;
	squareChatMid: string;
	squareMessageId: string;
	reportType: ReportType;
	otherReason: string;
	threadMid: string;
}

/** Wire-format fields for the LINE Thrift struct ReportSquareRequest. */
export interface ReportSquareRequest {
	squareMid: string;
	reportType: ReportType;
	otherReason: string;
}

/** Wire-format fields for the LINE Thrift struct ReqToSendPhonePinCodeRequest. */
export interface ReqToSendPhonePinCodeRequest {
	authSessionId: string;
	userPhoneNumber: UserPhoneNumber;
	verifMethod: T70_K;
}

/** Wire-format fields for the LINE Thrift struct I80_s0. */
export interface I80_s0 {
	authSessionId: string;
	userPhoneNumber: UserPhoneNumber;
	verifMethod: I80_EnumC26425y;
}

/** Wire-format fields for the LINE Thrift struct I80_t0. */
export interface I80_t0 {
	availableMethods: number[];
}

/** Wire-format fields for the LINE Thrift struct ReqToSendPhonePinCodeResponse. */
export interface ReqToSendPhonePinCodeResponse {
	availableMethods: number[];
}

/** Wire-format fields for the LINE Thrift struct RequestToListenRequest. */
export interface RequestToListenRequest {
	squareChatMid: string;
	sessionId: string;
}

/** Wire-format fields for the LINE Thrift struct I80_u0. */
export interface I80_u0 {
	authSessionId: string;
	email: string;
}

/** Wire-format fields for the LINE Thrift struct RequestToSendPasswordSetVerificationEmailResponse. */
export interface RequestToSendPasswordSetVerificationEmailResponse {
	timeoutMinutes: Int64;
}

/** Wire-format fields for the LINE Thrift struct RequestToSpeakRequest. */
export interface RequestToSpeakRequest {
	squareChatMid: string;
	sessionId: string;
}

/** Wire-format fields for the LINE Thrift struct RequestTokenResponse. */
export interface RequestTokenResponse {
	requestToken: string;
	returnUrl: string;
}

/** Wire-format fields for the LINE Thrift struct ReserveInfo. */
export interface ReserveInfo {
	purchaseEnabledStatus: og_I;
	orderInfo: OrderInfo;
}

/** Wire-format fields for the LINE Thrift struct ReserveRequest. */
export interface ReserveRequest {
	uniqueKey: string;
}

/** Wire-format fields for the LINE Thrift struct ReserveSubscriptionPurchaseRequest. */
export interface ReserveSubscriptionPurchaseRequest {
	billingItemId: string;
	storeCode: fN0_G;
	addOaFriend: boolean;
	entryPoint: string;
	campaignId: string;
	invitationId: string;
}

/** Wire-format fields for the LINE Thrift struct ReserveSubscriptionPurchaseResponse. */
export interface ReserveSubscriptionPurchaseResponse {
	result: fN0_F;
	orderId: string;
	confirmUrl: string;
}

/** Wire-format fields for the LINE Thrift struct I80_w0. */
export interface I80_w0 {
	authSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct I80_x0. */
export interface I80_x0 {
	mid: string;
	tokenV3IssueResult: TokenV3IssueResult;
	tokenV1IssueResult: TokenV1IssueResult;
	accountCountryCode: any;
	formattedPhoneNumbers: FormattedPhoneNumbers;
}

/** Wire-format fields for the LINE Thrift struct ResultPopupProperty. */
export interface ResultPopupProperty {
	iconUrl: string;
	text: string;
	closeButtonText: string;
	linkButtonText: string;
	linkButtonForwardUrl: string;
	eventButton: EventButton;
	oaAddfreindArea: OaAddFriendArea;
}

/** Wire-format fields for the LINE Thrift struct RetrieveRequestTokenWithDocomoV2Response. */
export interface RetrieveRequestTokenWithDocomoV2Response {
	loginRedirectUrl: string;
}

/** Wire-format fields for the LINE Thrift struct RetryPolicy. */
export interface RetryPolicy {
	initialDelayInMillis: Int64;
	maxDelayInMillis: Int64;
	multiplier: number;
	jitterRate: number;
}

/** Wire-format fields for the LINE Thrift struct RevokeTokensRequest. */
export interface RevokeTokensRequest {
	accessTokens: string[];
}

/** Wire-format fields for the LINE Thrift struct RichContent. */
export interface RichContent {
	callback: Callback;
	noBidCallback: NoBidCallback;
	ttl: Int64;
	muteSupported: boolean;
	voteSupported: boolean;
	priority: Priority;
	richFormatPayload: Uf_t;
}

/** Wire-format fields for the LINE Thrift struct RichImage. */
export interface RichImage {
	url: string;
}

/** Wire-format fields for the LINE Thrift struct RichItem. */
export interface RichItem {
	eyeCatchMessage: string;
	message: string;
	animationLayer: AnimationLayer;
	thumbnailLayer: ThumbnailLayer;
	linkUrl: string;
	fallbackUrl: string;
}

/** Wire-format fields for the LINE Thrift struct RichString. */
export interface RichString {
	content: string;
	meta: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct RichmenuCoordinates. */
export interface RichmenuCoordinates {
	x: number;
	y: number;
}

/** Wire-format fields for the LINE Thrift struct RichmenuEvent. */
export interface RichmenuEvent {
	type: kf_u;
	richmenuId: string;
	coordinates: RichmenuCoordinates;
	areaIndex: number;
	clickUrl: string;
	clickAction: kf_r;
}

/** Wire-format fields for the LINE Thrift struct RingbackTone. */
export interface RingbackTone {
	uuid: string;
	trackId: string;
	title: string;
	oid: string;
	tids: Record<string, string>;
	sid: string;
	artist: string;
	channelId: string;
}

/** Wire-format fields for the LINE Thrift struct Ringtone. */
export interface Ringtone {
	title: string;
	artist: string;
	oid: string;
	channelId: string;
}

/** Wire-format fields for the LINE Thrift struct Room. */
export interface Room {
	mid: string;
	createdTime: Int64;
	contacts: Contact[];
	notificationDisabled: boolean;
	memberMids: string[];
}

/** Wire-format fields for the LINE Thrift struct Rssi. */
export interface Rssi {
	value: number;
}

/** Wire-format fields for the LINE Thrift struct S70_b. */
export interface S70_b {
}

/** Wire-format fields for the LINE Thrift struct S70_k. */
export interface S70_k {
}

/** Wire-format fields for the LINE Thrift struct SCC. */
export interface SCC {
	businessName: string;
	tel: string;
	email: string;
	url: string;
	address: string;
	personName: string;
	memo: string;
}

/** Wire-format fields for the LINE Thrift struct SIMInfo. */
export interface SIMInfo {
	phoneNumber: string;
	countryCode: string;
}

/** Wire-format fields for the LINE Thrift struct SKAdNetwork. */
export interface SKAdNetwork {
	identifiers: string;
	version: string;
}

/** Wire-format fields for the LINE Thrift struct I80_y0. */
export interface I80_y0 {
	keyMaterial: string;
}

/** Wire-format fields for the LINE Thrift struct SaveStudentInformationRequest. */
export interface SaveStudentInformationRequest {
	studentInformation: StudentInformation;
}

/** Wire-format fields for the LINE Thrift struct Scenario. */
export interface Scenario {
	id: string;
	trigger: do0_I;
	actions: do0_C23141D[];
}

/** Wire-format fields for the LINE Thrift struct ScenarioSet. */
export interface ScenarioSet {
	scenarios: Scenario[];
	autoClose: boolean;
	suppressionInterval: Int64;
	revision: Int64;
	modifiedTime: Int64;
}

/** Wire-format fields for the LINE Thrift struct ScoreInfo. */
export interface ScoreInfo {
	assetServiceInfo: AssetServiceInfo;
}

/** Wire-format fields for the LINE Thrift struct ScryptParams. */
export interface ScryptParams {
	salt: string;
	nrp: string;
	dkLen: Int64;
}

/** Wire-format fields for the LINE Thrift struct SearchSquareChatMembersRequest. */
export interface SearchSquareChatMembersRequest {
	squareChatMid: string;
	searchOption: SquareChatMemberSearchOption;
	continuationToken: string;
	limit: number;
}

/** Wire-format fields for the LINE Thrift struct SearchSquareChatMembersResponse. */
export interface SearchSquareChatMembersResponse {
	members: SquareMember[];
	continuationToken: string;
	totalCount: number;
}

/** Wire-format fields for the LINE Thrift struct SearchSquareChatMentionablesRequest. */
export interface SearchSquareChatMentionablesRequest {
	squareChatMid: string;
	searchOption: SquareChatMentionableSearchOption;
	continuationToken: string;
	limit: number;
}

/** Wire-format fields for the LINE Thrift struct SearchSquareChatMentionablesResponse. */
export interface SearchSquareChatMentionablesResponse {
	mentionables: Mentionable[];
	continuationToken: string;
}

/** Wire-format fields for the LINE Thrift struct SearchSquareMembersRequest. */
export interface SearchSquareMembersRequest {
	squareMid: string;
	searchOption: SquareMemberSearchOption;
	continuationToken: string;
	limit: number;
}

/** Wire-format fields for the LINE Thrift struct SearchSquareMembersResponse. */
export interface SearchSquareMembersResponse {
	members: SquareMember[];
	revision: Int64;
	continuationToken: string;
	totalCount: number;
}

/** Wire-format fields for the LINE Thrift struct SearchSquaresRequest. */
export interface SearchSquaresRequest {
	query: string;
	continuationToken: string;
	limit: number;
}

/** Wire-format fields for the LINE Thrift struct SearchSquaresResponse. */
export interface SearchSquaresResponse {
	squares: Square[];
	squareStatuses: Record<string, SquareStatus>;
	myMemberships: Record<string, SquareMember>;
	continuationToken: string;
	noteStatuses: Record<string, NoteStatus>;
}

/** Wire-format fields for the LINE Thrift struct SecurityCenterResult. */
export interface SecurityCenterResult {
	uri: string;
	token: string;
	cookiePath: string;
	skip: boolean;
}

/** Wire-format fields for the LINE Thrift struct SendEncryptedE2EEKeyRequest. */
export interface SendEncryptedE2EEKeyRequest {
	sessionId: string;
	encryptedSecureChannelPayload: any;
}

/** Wire-format fields for the LINE Thrift struct SendMessageRequest. */
export interface SendMessageRequest {
	reqSeq: number;
	squareChatMid: string;
	squareMessage: SquareMessage;
}

/** Wire-format fields for the LINE Thrift struct SendMessageResponse. */
export interface SendMessageResponse {
	createdSquareMessage: SquareMessage;
}

/** Wire-format fields for the LINE Thrift struct SendPostbackRequest. */
export interface SendPostbackRequest {
	messageId: string;
	url: string;
	chatMID: string;
	originMID: string;
}

/** Wire-format fields for the LINE Thrift struct SendSquareThreadMessageRequest. */
export interface SendSquareThreadMessageRequest {
	reqSeq: number;
	chatMid: string;
	threadMid: string;
	threadMessage: SquareMessage;
}

/** Wire-format fields for the LINE Thrift struct SendSquareThreadMessageResponse. */
export interface SendSquareThreadMessageResponse {
	createdThreadMessage: SquareMessage;
}

/** Wire-format fields for the LINE Thrift struct ServiceDisclaimerInfo. */
export interface ServiceDisclaimerInfo {
	disclaimerText: string;
	popupTitle: string;
	popupText: string;
}

/** Wire-format fields for the LINE Thrift struct ServiceShortcut. */
export interface ServiceShortcut {
	id: string;
	name: string;
	serviceEntryUrl: string;
	pictogramIconUrl: string;
	storeUrl: string;
	badgeActiveUntilTimestamp: string;
	recommendedModelId: string;
	eventIcon: Icon;
	coloredPictogramIcon: Icon;
	customBadgeLabel: CustomBadgeLabel;
}

/** Wire-format fields for the LINE Thrift struct SetChatHiddenStatusRequest. */
export interface SetChatHiddenStatusRequest {
	reqSeq: number;
	chatMid: string;
	lastMessageId: Int64;
	hidden: boolean;
}

/** Wire-format fields for the LINE Thrift struct I80_z0. */
export interface I80_z0 {
	authSessionId: string;
	password: string;
}

/** Wire-format fields for the LINE Thrift struct SetHashedPasswordRequest. */
export interface SetHashedPasswordRequest {
	authSessionId: string;
	password: string;
}

/** Wire-format fields for the LINE Thrift struct SetPasswordRequest. */
export interface SetPasswordRequest {
	sessionId: string;
	hashedPassword: string;
}

/** Wire-format fields for the LINE Thrift struct SetRequest. */
export interface SetRequest {
	keyName: string;
	value: t80_p;
	clientTimestampMillis: Int64;
	ns: t80_h;
	transactionId: string;
	updateReason: UpdateReason;
}

/** Wire-format fields for the LINE Thrift struct SetResponse. */
export interface SetResponse {
	value: SettingValue;
	updateTransactionId: string;
}

/** Wire-format fields for the LINE Thrift struct SettingValue. */
export interface SettingValue {
	value: t80_p;
	updateTimeMillis: Int64;
	scope: t80_i;
	scopeKey: string;
}

/** Wire-format fields for the LINE Thrift struct Settings. */
export interface Settings {
	notificationEnable: boolean;
	notificationMuteExpiration: Int64;
	notificationNewMessage: boolean;
	notificationGroupInvitation: boolean;
	notificationShowMessage: boolean;
	notificationIncomingCall: boolean;
	notificationSoundMessage: string;
	notificationSoundGroup: string;
	notificationDisabledWithSub: boolean;
	notificationPayment: boolean;
	privacySyncContacts: boolean;
	privacySearchByPhoneNumber: boolean;
	privacySearchByUserid: boolean;
	privacySearchByEmail: boolean;
	privacyAllowSecondaryDeviceLogin: boolean;
	privacyProfileImagePostToMyhome: boolean;
	privacyReceiveMessagesFromNotFriend: boolean;
	privacyAgreeUseLineCoinToPaidCall: boolean;
	privacyAgreeUsePaidCall: boolean;
	privacyAllowFriendRequest: boolean;
	contactMyTicket: string;
	identityProvider: IdentityProvider;
	identityIdentifier: string;
	snsAccounts: Record<number, string>;
	phoneRegistration: boolean;
	emailConfirmationStatus: EmailConfirmationStatus;
	accountMigrationPincodeType: AccountMigrationPincodeType;
	enforcedInputAccountMigrationPincode: boolean;
	securityCenterSettingsType: AccountMigrationPincodeType;
	allowUnregistrationSecondaryDevice: boolean;
	pwlessPrimaryCredentialRegistration: boolean;
	preferenceLocale: string;
	customModes: Record<number, string>;
	e2eeEnable: boolean;
	hitokotoBackupRequested: boolean;
	privacyProfileMusicPostToMyhome: boolean;
	privacyAllowNearby: boolean;
	agreementNearbyTime: Int64;
	agreementSquareTime: Int64;
	notificationMention: boolean;
	botUseAgreementAcceptedAt: Int64;
	agreementShakeFunction: Int64;
	agreementMobileContactName: Int64;
	notificationThumbnail: boolean;
	agreementSoundToText: Int64;
	privacyPolicyVersion: string;
	agreementAdByWebAccess: Int64;
	agreementPhoneNumberMatching: Int64;
	agreementCommunicationInfo: Int64;
	privacySharePersonalInfoToFriends: Pb1_I6;
	agreementThingsWirelessCommunication: Int64;
	agreementGdpr: Int64;
	privacyStatusMessageHistory: Pb1_S7;
	agreementProvideLocation: Int64;
	agreementBeacon: Int64;
	privacyAllowProfileHistory: Pb1_M6;
	agreementContentsSuggest: Int64;
	agreementContentsSuggestDataCollection: Int64;
	privacyAgeResult: Pb1_gd;
	privacyAgeResultReceived: boolean;
	agreementOcrImageCollection: Int64;
	privacyAllowFollow: boolean;
	privacyShowFollowList: boolean;
	notificationBadgeTalkOnly: boolean;
	agreementIcna: Int64;
	notificationReaction: boolean;
	agreementMid: Int64;
	homeNotificationNewFriend: boolean;
	homeNotificationFavoriteFriendUpdate: boolean;
	homeNotificationGroupMemberUpdate: boolean;
	homeNotificationBirthday: boolean;
	eapAllowedToConnect: Record<number, boolean>;
	agreementLineOutUse: Int64;
	agreementLineOutProvideInfo: Int64;
	notificationShowProfileImage: boolean;
	agreementPdpa: Int64;
	agreementLocationVersion: string;
	zhdPageAllowedToShow: boolean;
	agreementSnowAiAvatar: Int64;
	eapOnlyAccountTargetCountry: boolean;
	agreementLypPremiumAlbum: Int64;
	agreementLypPremiumAlbumVersion: Int64;
	agreementAlbumUsageData: Int64;
	agreementAlbumUsageDataVersion: Int64;
	agreementLypPremiumBackup: Int64;
	agreementLypPremiumBackupVersion: Int64;
	agreementOaAiAssistant: Int64;
	agreementOaAiAssistantVersion: Int64;
	agreementLypPremiumMultiProfile: Int64;
	agreementLypPremiumMultiProfileVersion: Int64;
	agreementPremiumBackupPremiumType: string;
	agreementPdp: Int64;
	agreementPremiumAlbumPremiumType: string;
	homeNotificationNoteNoteLike: boolean;
	homeNotificationNoteComment: boolean;
	homeNotificationNoteCommentLike: boolean;
	homeNotificationNoteMention: boolean;
	agreementInAppPurchase: Int64;
	agreementInAppPurchaseVersion: Int64;
	homeNotificationAlbumLike: boolean;
	agreementTriggerMessage: Int64;
	agreementLypPremiumUnsend: Int64;
	agreementLypPremiumUnsendVersion: Int64;
	agreementLypPremiumMessageEdit: Int64;
	agreementLypPremiumMessageEditVersion: Int64;
	notificationNoteReaction: boolean;
	notificationNoteComment: boolean;
	notificationNoteCommentLike: boolean;
	notificationNoteMention: boolean;
	notificationAlbumLike: boolean;
	phoneNumberDeleteEnable: boolean;
}

/** Wire-format fields for the LINE Thrift struct ShareTargetPickerResultRequest. */
export interface ShareTargetPickerResultRequest {
	ott: string;
	liffId: string;
	resultCode: Qj_e0;
	resultDescription: string;
}

/** Wire-format fields for the LINE Thrift struct ShopFilter. */
export interface ShopFilter {
	productAvailabilities: number[];
	stickerSizes: number[];
	popupLayers: number[];
}

/** Wire-format fields for the LINE Thrift struct ShortcutUserGuidePopupInfo. */
export interface ShortcutUserGuidePopupInfo {
	popupTitle: string;
	popupText: string;
	revisionTimeMillis: Int64;
}

/** Wire-format fields for the LINE Thrift struct ShouldShowWelcomeStickerBannerResponse. */
export interface ShouldShowWelcomeStickerBannerResponse {
	shouldShowBanner: boolean;
}

/** Wire-format fields for the LINE Thrift struct I80_B0. */
export interface I80_B0 {
	countryCode: string;
	hni: string;
	carrierName: string;
}

/** Wire-format fields for the LINE Thrift struct SimCard. */
export interface SimCard {
	countryCode: string;
	hni: string;
	carrierName: string;
}

/** Wire-format fields for the LINE Thrift struct SingleValueMetadata. */
export interface SingleValueMetadata {
	type: any;
}

/** Wire-format fields for the LINE Thrift struct SleepAction. */
export interface SleepAction {
	sleepMillis: Int64;
}

/** Wire-format fields for the LINE Thrift struct SmartChannelRecommendation. */
export interface SmartChannelRecommendation {
	minDisplayDuration: number;
	title: string;
	descriptionText: string;
	labelText: string;
	imageUrl: string;
	bgColorCode: string;
	linkUrl: string;
	impEventUrl: string;
	clickEventUrl: string;
	muteEventUrl: string;
	upvoteEventUrl: string;
	downvoteEventUrl: string;
	template: SmartChannelRecommendationTemplate;
}

/** Wire-format fields for the LINE Thrift struct SmartChannelRecommendationTemplate. */
export interface SmartChannelRecommendationTemplate {
	type: string;
	bgColorName: string;
}

/** Wire-format fields for the LINE Thrift struct SocialLogin. */
export interface SocialLogin {
	type: T70_j1;
	accessToken: string;
	countryCode: string;
}

/** Wire-format fields for the LINE Thrift struct SpotItem. */
export interface SpotItem {
	name: string;
	phone: string;
	category: SpotCategory;
	mid: string;
	countryAreaCode: string;
	freePhoneCallable: boolean;
}

/** Wire-format fields for the LINE Thrift struct Square. */
export interface Square {
	mid: string;
	name: string;
	welcomeMessage: string;
	profileImageObsHash: string;
	desc: string;
	searchable: boolean;
	type: SquareType;
	categoryId: number;
	invitationURL: string;
	revision: Int64;
	ableToUseInvitationTicket: boolean;
	state: SquareState;
	emblems: SquareEmblem[];
	joinMethod: SquareJoinMethod;
	adultOnly: BooleanState;
	svcTags: string[];
	createdAt: Int64;
	paidSquare: boolean;
	benefitKeywords: string[];
	sneakPeekContents: string[];
	expireAt: Int64;
	provider: SquareProvider;
}

/** Wire-format fields for the LINE Thrift struct SquareAuthority. */
export interface SquareAuthority {
	squareMid: string;
	updateSquareProfile: SquareMemberRole;
	inviteNewMember: SquareMemberRole;
	approveJoinRequest: SquareMemberRole;
	createPost: SquareMemberRole;
	createOpenSquareChat: SquareMemberRole;
	deleteSquareChatOrPost: SquareMemberRole;
	removeSquareMember: SquareMemberRole;
	grantRole: SquareMemberRole;
	enableInvitationTicket: SquareMemberRole;
	revision: Int64;
	createSquareChatAnnouncement: SquareMemberRole;
	updateMaxChatMemberCount: SquareMemberRole;
	useReadonlyDefaultChat: SquareMemberRole;
	sendAllMention: SquareMemberRole;
}

/** Wire-format fields for the LINE Thrift struct SquareBot. */
export interface SquareBot {
	botMid: string;
	active: boolean;
	displayName: string;
	profileImageObsHash: string;
	iconType: number;
	lastModifiedAt: Int64;
	expiredIn: Int64;
}

/** Wire-format fields for the LINE Thrift struct SquareChat. */
export interface SquareChat {
	squareChatMid: string;
	squareMid: string;
	type: SquareChatType;
	name: string;
	chatImageObsHash: string;
	squareChatRevision: Int64;
	maxMemberCount: number;
	state: SquareChatState;
	invitationUrl: string;
	messageVisibility: MessageVisibility;
	ableToSearchMessage: BooleanState;
}

/** Wire-format fields for the LINE Thrift struct SquareChatAnnouncement. */
export interface SquareChatAnnouncement {
	announcementSeq: Int64;
	type: number;
	contents: SquareChatAnnouncementContents;
	createdAt: Int64;
	creator: string;
}

/** Wire-format fields for the LINE Thrift struct SquareChatFeature. */
export interface SquareChatFeature {
	controlState: SquareChatFeatureControlState;
	booleanValue: BooleanState;
}

/** Wire-format fields for the LINE Thrift struct SquareChatFeatureSet. */
export interface SquareChatFeatureSet {
	squareChatMid: string;
	revision: Int64;
	disableUpdateMaxChatMemberCount: SquareChatFeature;
	disableMarkAsReadEvent: SquareChatFeature;
}

/** Wire-format fields for the LINE Thrift struct SquareChatMember. */
export interface SquareChatMember {
	squareMemberMid: string;
	squareChatMid: string;
	revision: Int64;
	membershipState: SquareChatMembershipState;
	notificationForMessage: boolean;
	notificationForNewMember: boolean;
}

/** Wire-format fields for the LINE Thrift struct SquareChatMemberSearchOption. */
export interface SquareChatMemberSearchOption {
	displayName: string;
	includingMe: boolean;
}

/** Wire-format fields for the LINE Thrift struct SquareChatMentionableSearchOption. */
export interface SquareChatMentionableSearchOption {
	displayName: string;
}

/** Wire-format fields for the LINE Thrift struct SquareChatStatus. */
export interface SquareChatStatus {
	lastMessage: SquareMessage;
	senderDisplayName: string;
	otherStatus: SquareChatStatusWithoutMessage;
}

/** Wire-format fields for the LINE Thrift struct SquareChatStatusWithoutMessage. */
export interface SquareChatStatusWithoutMessage {
	memberCount: number;
	unreadMessageCount: number;
	markedAsReadMessageId: string;
	mentionedMessageId: string;
	notifiedMessageType: NotifiedMessageType;
	badges: number[];
}

/** Wire-format fields for the LINE Thrift struct SquareCleanScore. */
export interface SquareCleanScore {
	score: number;
}

/** Wire-format fields for the LINE Thrift struct SquareEvent. */
export interface SquareEvent {
	createdTime: Int64;
	type: SquareEventType;
	payload: SquareEventPayload;
	syncToken: string;
	eventStatus: SquareEventStatus;
}

/** Wire-format fields for the LINE Thrift struct SquareEventChatPopup. */
export interface SquareEventChatPopup {
	squareChatMid: string;
	popupId: Int64;
	flexJson: string;
	button: ButtonContent;
}

/** Wire-format fields for the LINE Thrift struct SquareEventMutateMessage. */
export interface SquareEventMutateMessage {
	squareChatMid: string;
	squareMessage: SquareMessage;
	reqSeq: number;
	senderDisplayName: string;
	threadMid: string;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotificationJoinRequest. */
export interface SquareEventNotificationJoinRequest {
	squareMid: string;
	squareName: string;
	requestMemberName: string;
	profileImageObsHash: string;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotificationLiveTalk. */
export interface SquareEventNotificationLiveTalk {
	squareChatMid: string;
	liveTalkInvitationTicket: string;
	squareChatName: string;
	chatImageObsHash: string;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotificationMemberUpdate. */
export interface SquareEventNotificationMemberUpdate {
	squareMid: string;
	squareName: string;
	profileImageObsHash: string;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotificationMessage. */
export interface SquareEventNotificationMessage {
	squareChatMid: string;
	squareMessage: SquareMessage;
	senderDisplayName: string;
	unreadCount: number;
	requiredToFetchChatEvents: boolean;
	mentionedMessageId: string;
	notifiedMessageType: NotifiedMessageType;
	reqSeq: number;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotificationMessageReaction. */
export interface SquareEventNotificationMessageReaction {
	squareChatMid: string;
	messageId: string;
	squareChatName: string;
	reactorName: string;
	thumbnailObsHash: string;
	messageText: string;
	type: MessageReactionType;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotificationNewChatMember. */
export interface SquareEventNotificationNewChatMember {
	squareChatMid: string;
	squareChatName: string;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotificationPost. */
export interface SquareEventNotificationPost {
	squareMid: string;
	notificationPostType: NotificationPostType;
	thumbnailObsHash: string;
	text: string;
	actionUri: string;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotificationPostAnnouncement. */
export interface SquareEventNotificationPostAnnouncement {
	squareMid: string;
	squareName: string;
	squareProfileImageObsHash: string;
	actionUri: string;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotificationSquareChatDelete. */
export interface SquareEventNotificationSquareChatDelete {
	squareChatMid: string;
	squareChatName: string;
	profileImageObsHash: string;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotificationSquareDelete. */
export interface SquareEventNotificationSquareDelete {
	squareMid: string;
	squareName: string;
	profileImageObsHash: string;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotificationThreadMessage. */
export interface SquareEventNotificationThreadMessage {
	threadMid: string;
	chatMid: string;
	squareMessage: SquareMessage;
	senderDisplayName: string;
	unreadCount: Int64;
	totalMessageCount: Int64;
	threadRootMessageId: string;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotificationThreadMessageReaction. */
export interface SquareEventNotificationThreadMessageReaction {
	threadMid: string;
	chatMid: string;
	messageId: string;
	squareChatName: string;
	reactorName: string;
	thumbnailObsHash: string;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedAddBot. */
export interface SquareEventNotifiedAddBot {
	squareChatMid: string;
	squareMember: SquareMember;
	botMid: string;
	botDisplayName: string;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedCreateSquareChatMember. */
export interface SquareEventNotifiedCreateSquareChatMember {
	chat: SquareChat;
	chatStatus: SquareChatStatus;
	chatMember: SquareChatMember;
	joinedAt: Int64;
	peerSquareMember: SquareMember;
	squareChatFeatureSet: SquareChatFeatureSet;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedCreateSquareMember. */
export interface SquareEventNotifiedCreateSquareMember {
	square: Square;
	squareAuthority: SquareAuthority;
	squareStatus: SquareStatus;
	squareMember: SquareMember;
	squareFeatureSet: SquareFeatureSet;
	noteStatus: NoteStatus;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedDeleteSquareChat. */
export interface SquareEventNotifiedDeleteSquareChat {
	squareChat: SquareChat;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedDestroyMessage. */
export interface SquareEventNotifiedDestroyMessage {
	squareChatMid: string;
	messageId: string;
	threadMid: string;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedInviteIntoSquareChat. */
export interface SquareEventNotifiedInviteIntoSquareChat {
	squareChatMid: string;
	invitees: SquareMember[];
	invitor: SquareMember;
	invitorRelation: SquareMemberRelation;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedJoinSquareChat. */
export interface SquareEventNotifiedJoinSquareChat {
	squareChatMid: string;
	joinedMember: SquareMember;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedKickoutFromSquare. */
export interface SquareEventNotifiedKickoutFromSquare {
	squareChatMid: string;
	kickees: SquareMember[];
	kicker: SquareMember;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedLeaveSquareChat. */
export interface SquareEventNotifiedLeaveSquareChat {
	squareChatMid: string;
	squareMemberMid: string;
	sayGoodbye: boolean;
	squareMember: SquareMember;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedMarkAsRead. */
export interface SquareEventNotifiedMarkAsRead {
	squareChatMid: string;
	sMemberMid: string;
	messageId: string;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedRemoveBot. */
export interface SquareEventNotifiedRemoveBot {
	squareChatMid: string;
	squareMember: SquareMember;
	botMid: string;
	botDisplayName: string;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedShutdownSquare. */
export interface SquareEventNotifiedShutdownSquare {
	squareChatMid: string;
	square: Square;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedSystemMessage. */
export interface SquareEventNotifiedSystemMessage {
	squareChatMid: string;
	text: string;
	messageKey: string;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedUpdateLiveTalk. */
export interface SquareEventNotifiedUpdateLiveTalk {
	squareChatMid: string;
	sessionId: string;
	liveTalkOnAir: boolean;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedUpdateLiveTalkInfo. */
export interface SquareEventNotifiedUpdateLiveTalkInfo {
	squareChatMid: string;
	liveTalk: LiveTalk;
	liveTalkOnAir: boolean;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedUpdateMessageStatus. */
export interface SquareEventNotifiedUpdateMessageStatus {
	squareChatMid: string;
	messageId: string;
	messageStatus: SquareMessageStatus;
	threadMid: string;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedUpdateReadonlyChat. */
export interface SquareEventNotifiedUpdateReadonlyChat {
	squareChatMid: string;
	readonly: boolean;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedUpdateSquare. */
export interface SquareEventNotifiedUpdateSquare {
	squareMid: string;
	square: Square;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedUpdateSquareAuthority. */
export interface SquareEventNotifiedUpdateSquareAuthority {
	squareMid: string;
	squareAuthority: SquareAuthority;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedUpdateSquareChat. */
export interface SquareEventNotifiedUpdateSquareChat {
	squareMid: string;
	squareChatMid: string;
	squareChat: SquareChat;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedUpdateSquareChatAnnouncement. */
export interface SquareEventNotifiedUpdateSquareChatAnnouncement {
	squareChatMid: string;
	announcementSeq: Int64;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedUpdateSquareChatFeatureSet. */
export interface SquareEventNotifiedUpdateSquareChatFeatureSet {
	squareChatFeatureSet: SquareChatFeatureSet;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedUpdateSquareChatMaxMemberCount. */
export interface SquareEventNotifiedUpdateSquareChatMaxMemberCount {
	squareChatMid: string;
	maxMemberCount: number;
	editor: SquareMember;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedUpdateSquareChatMember. */
export interface SquareEventNotifiedUpdateSquareChatMember {
	squareChatMid: string;
	squareChatMember: SquareChatMember;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedUpdateSquareChatProfileImage. */
export interface SquareEventNotifiedUpdateSquareChatProfileImage {
	squareChatMid: string;
	editor: SquareMember;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedUpdateSquareChatProfileName. */
export interface SquareEventNotifiedUpdateSquareChatProfileName {
	squareChatMid: string;
	editor: SquareMember;
	updatedChatName: string;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedUpdateSquareChatStatus. */
export interface SquareEventNotifiedUpdateSquareChatStatus {
	squareChatMid: string;
	statusWithoutMessage: SquareChatStatusWithoutMessage;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedUpdateSquareFeatureSet. */
export interface SquareEventNotifiedUpdateSquareFeatureSet {
	squareFeatureSet: SquareFeatureSet;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedUpdateSquareMember. */
export interface SquareEventNotifiedUpdateSquareMember {
	squareMid: string;
	squareMemberMid: string;
	squareMember: SquareMember;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedUpdateSquareMemberProfile. */
export interface SquareEventNotifiedUpdateSquareMemberProfile {
	squareChatMid: string;
	squareMember: SquareMember;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedUpdateSquareMemberRelation. */
export interface SquareEventNotifiedUpdateSquareMemberRelation {
	squareMid: string;
	myMemberMid: string;
	targetSquareMemberMid: string;
	squareMemberRelation: SquareMemberRelation;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedUpdateSquareNoteStatus. */
export interface SquareEventNotifiedUpdateSquareNoteStatus {
	squareMid: string;
	noteStatus: NoteStatus;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedUpdateSquareStatus. */
export interface SquareEventNotifiedUpdateSquareStatus {
	squareMid: string;
	squareStatus: SquareStatus;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedUpdateThread. */
export interface SquareEventNotifiedUpdateThread {
	squareThread: SquareThread;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedUpdateThreadMember. */
export interface SquareEventNotifiedUpdateThreadMember {
	threadMember: SquareThreadMember;
	squareThread: SquareThread;
	threadRootMessage: SquareMessage;
	totalMessageCount: Int64;
	lastMessage: SquareMessage;
	lastMessageSenderDisplayName: string;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedUpdateThreadRootMessage. */
export interface SquareEventNotifiedUpdateThreadRootMessage {
	squareThread: SquareThread;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedUpdateThreadRootMessageStatus. */
export interface SquareEventNotifiedUpdateThreadRootMessageStatus {
	chatMid: string;
	threadMid: string;
	threadRootMessageId: string;
	totalMessageCount: Int64;
	lastMessageAt: Int64;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedUpdateThreadStatus. */
export interface SquareEventNotifiedUpdateThreadStatus {
	threadMid: string;
	chatMid: string;
	unreadCount: Int64;
	markAsReadMessageId: string;
}

/** Wire-format fields for the LINE Thrift struct SquareEventReceiveMessage. */
export interface SquareEventReceiveMessage {
	squareChatMid: string;
	squareMessage: SquareMessage;
	senderDisplayName: string;
	messageReactionStatus: SquareMessageReactionStatus;
	senderRevision: Int64;
	squareMid: string;
	threadMid: string;
	threadTotalMessageCount: Int64;
	threadLastMessageAt: Int64;
	contentsAttribute: ContentsAttribute;
}

/** Wire-format fields for the LINE Thrift struct SquareEventSendMessage. */
export interface SquareEventSendMessage {
	squareChatMid: string;
	squareMessage: SquareMessage;
	reqSeq: number;
	senderDisplayName: string;
	messageReactionStatus: SquareMessageReactionStatus;
	threadMid: string;
	threadTotalMessageCount: Int64;
	threadLastMessageAt: Int64;
}

/** Wire-format fields for the LINE Thrift struct SquareExtraInfo. */
export interface SquareExtraInfo {
	country: string;
}

/** Wire-format fields for the LINE Thrift struct SquareFeature. */
export interface SquareFeature {
	controlState: SquareFeatureControlState;
	booleanValue: BooleanState;
}

/** Wire-format fields for the LINE Thrift struct SquareFeatureSet. */
export interface SquareFeatureSet {
	squareMid: string;
	revision: Int64;
	creatingSecretSquareChat: SquareFeature;
	invitingIntoOpenSquareChat: SquareFeature;
	creatingSquareChat: SquareFeature;
	readonlyDefaultChat: SquareFeature;
	showingAdvertisement: SquareFeature;
	delegateJoinToPlug: SquareFeature;
	delegateKickOutToPlug: SquareFeature;
	disableUpdateJoinMethod: SquareFeature;
	disableTransferAdmin: SquareFeature;
	creatingLiveTalk: SquareFeature;
	disableUpdateSearchable: SquareFeature;
	summarizingMessages: SquareFeature;
	creatingSquareThread: SquareFeature;
	enableSquareThread: SquareFeature;
	disableChangeRoleCoAdmin: SquareFeature;
}

/** Wire-format fields for the LINE Thrift struct SquareInfo. */
export interface SquareInfo {
	square: Square;
	squareStatus: SquareStatus;
	squareNoteStatus: NoteStatus;
}

/** Wire-format fields for the LINE Thrift struct SquareJoinMethod. */
export interface SquareJoinMethod {
	type: SquareJoinMethodType;
	value: SquareJoinMethodValue;
}

/** Wire-format fields for the LINE Thrift struct SquareJoinMethodValue. */
export interface SquareJoinMethodValue {
	approvalValue: ApprovalValue;
	codeValue: CodeValue;
}

/** Wire-format fields for the LINE Thrift struct SquareMember. */
export interface SquareMember {
	squareMemberMid: string;
	squareMid: string;
	displayName: string;
	profileImageObsHash: string;
	ableToReceiveMessage: boolean;
	membershipState: SquareMembershipState;
	role: SquareMemberRole;
	revision: Int64;
	preference: SquarePreference;
	joinMessage: string;
	createdAt: Int64;
	selfIntroduction: string;
	socialMediaAccountUrls: string[];
}

/** Wire-format fields for the LINE Thrift struct SquareMemberRelation. */
export interface SquareMemberRelation {
	state: SquareMemberRelationState;
	revision: Int64;
}

/** Wire-format fields for the LINE Thrift struct SquareMemberSearchOption. */
export interface SquareMemberSearchOption {
	membershipState: SquareMembershipState;
	memberRoles: SquareMemberRole[];
	displayName: string;
	ableToReceiveMessage: BooleanState;
	ableToReceiveFriendRequest: BooleanState;
	chatMidToExcludeMembers: string;
	includingMe: boolean;
	excludeBlockedMembers: boolean;
	includingMeOnlyMatch: boolean;
}

/** Wire-format fields for the LINE Thrift struct SquareMessage. */
export interface SquareMessage {
	message: Message;
	fromType: MIDType;
	squareMessageRevision: Int64;
	state: SquareMessageState;
	threadInfo: SquareMessageThreadInfo;
}

/** Wire-format fields for the LINE Thrift struct SquareMessageInfo. */
export interface SquareMessageInfo {
	message: SquareMessage;
	square: Square;
	chat: SquareChat;
	sender: SquareMember;
}

/** Wire-format fields for the LINE Thrift struct SquareMessageReaction. */
export interface SquareMessageReaction {
	type: MessageReactionType;
	reactor: SquareMember;
	createdAt: Int64;
	updatedAt: Int64;
}

/** Wire-format fields for the LINE Thrift struct SquareMessageReactionStatus. */
export interface SquareMessageReactionStatus {
	totalCount: number;
	countByReactionType: Record<number, number>;
	myReaction: SquareMessageReaction;
}

/** Wire-format fields for the LINE Thrift struct SquareMessageStatus. */
export interface SquareMessageStatus {
	squareChatMid: string;
	globalMessageId: string;
	type: number;
	contents: MessageStatusContents;
	publishedAt: Int64;
	squareChatThreadMid: string;
}

/** Wire-format fields for the LINE Thrift struct SquareMessageThreadInfo. */
export interface SquareMessageThreadInfo {
	chatThreadMid: string;
	threadRoot: boolean;
}

/** Wire-format fields for the LINE Thrift struct SquareMetadata. */
export interface SquareMetadata {
	mid: string;
	excluded: number[];
	revision: Int64;
	noAd: boolean;
	updatedAt: Int64;
}

/** Wire-format fields for the LINE Thrift struct SquarePreference. */
export interface SquarePreference {
	favoriteTimestamp: Int64;
	notiForNewJoinRequest: boolean;
}

/** Wire-format fields for the LINE Thrift struct SquareStatus. */
export interface SquareStatus {
	memberCount: number;
	joinRequestCount: number;
	lastJoinRequestAt: Int64;
	openChatCount: number;
}

/** Wire-format fields for the LINE Thrift struct SquareThread. */
export interface SquareThread {
	threadMid: string;
	chatMid: string;
	squareMid: string;
	messageId: string;
	state: SquareThreadState;
	expiresAt: Int64;
	readOnlyAt: Int64;
	revision: Int64;
}

/** Wire-format fields for the LINE Thrift struct SquareThreadMember. */
export interface SquareThreadMember {
	squareMemberMid: string;
	threadMid: string;
	chatMid: string;
	revision: Int64;
	membershipState: SquareThreadMembershipState;
}

/** Wire-format fields for the LINE Thrift struct SquareUserSettings. */
export interface SquareUserSettings {
	liveTalkNotification: BooleanState;
}

/** Wire-format fields for the LINE Thrift struct SquareVisibility. */
export interface SquareVisibility {
	common: boolean;
	search: boolean;
}

/** Wire-format fields for the LINE Thrift struct StartPhotoboothRequest. */
export interface StartPhotoboothRequest {
	chatMid: string;
}

/** Wire-format fields for the LINE Thrift struct StartPhotoboothResponse. */
export interface StartPhotoboothResponse {
	photoboothSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct I80_C0. */
export interface I80_C0 {
	authSessionId: string;
	modelName: string;
	deviceUid: string;
}

/** Wire-format fields for the LINE Thrift struct I80_D0. */
export interface I80_D0 {
	displayName: string;
	availableAuthFactors: number[];
}

/** Wire-format fields for the LINE Thrift struct Sticker. */
export interface Sticker {
	stickerId: string;
	resourceType: StickerResourceType;
	popupLayer: zR0_EnumC40578c;
}

/** Wire-format fields for the LINE Thrift struct StickerDisplayData. */
export interface StickerDisplayData {
	stickerHash: string;
	stickerResourceType: StickerResourceType;
	nameTextProperty: ImageTextProperty;
	popupLayer: Ob1_B0;
	stickerSize: Ob1_C1;
	productAvailability: Ob1_D0;
	height: number;
	width: number;
	version: Int64;
	availableForCombinationSticker: boolean;
}

/** Wire-format fields for the LINE Thrift struct StickerIdRange. */
export interface StickerIdRange {
	start: Int64;
	size: number;
}

/** Wire-format fields for the LINE Thrift struct StickerLayout. */
export interface StickerLayout {
	layoutInfo: StickerLayoutInfo;
	stickerInfo: StickerLayoutStickerInfo;
}

/** Wire-format fields for the LINE Thrift struct StickerLayoutInfo. */
export interface StickerLayoutInfo {
	width: number;
	height: number;
	rotation: number;
	x: number;
	y: number;
}

/** Wire-format fields for the LINE Thrift struct StickerLayoutStickerInfo. */
export interface StickerLayoutStickerInfo {
	stickerId: Int64;
	productId: Int64;
	stickerHash: string;
	stickerOptions: string;
	stickerVersion: Int64;
}

/** Wire-format fields for the LINE Thrift struct StickerProperty. */
export interface StickerProperty {
	hasAnimation: boolean;
	hasSound: boolean;
	hasPopup: boolean;
	stickerResourceType: StickerResourceType;
	stickerOptions: string;
	compactStickerOptions: number;
	stickerHash: string;
	stickerIds: string[];
	nameTextProperty: ImageTextProperty;
	availableForPhotoEdit: boolean;
	stickerDefaultTexts: Record<string, string>;
	stickerSize: Ob1_C1;
	popupLayer: Ob1_B0;
	cpdProduct: boolean;
	availableForCombinationSticker: boolean;
	combinationStickerProperty: any;
}

/** Wire-format fields for the LINE Thrift struct StickerSummary. */
export interface StickerSummary {
	stickerIdRanges: StickerIdRange[];
	suggestVersion: Int64;
	stickerHash: string;
	defaultDisplayOnKeyboard: boolean;
	stickerResourceType: StickerResourceType;
	nameTextProperty: ImageTextProperty;
	availableForPhotoEdit: boolean;
	popupLayer: Ob1_B0;
	stickerSize: Ob1_C1;
	availableForCombinationSticker: boolean;
}

/** Wire-format fields for the LINE Thrift struct SticonProperty. */
export interface SticonProperty {
	sticonIds: string[];
	availableForPhotoEdit: boolean;
	sticonResourceType: Ob1_F1;
	endPageMainImages: string[];
}

/** Wire-format fields for the LINE Thrift struct SticonSummary. */
export interface SticonSummary {
	suggestVersion: Int64;
	availableForPhotoEdit: boolean;
	sticonResourceType: Ob1_F1;
}

/** Wire-format fields for the LINE Thrift struct StopBundleSubscriptionRequest. */
export interface StopBundleSubscriptionRequest {
	subscriptionService: any;
	storeCode: Ob1_K1;
}

/** Wire-format fields for the LINE Thrift struct StopBundleSubscriptionResponse. */
export interface StopBundleSubscriptionResponse {
	result: Ob1_J1;
}

/** Wire-format fields for the LINE Thrift struct StopNotificationAction. */
export interface StopNotificationAction {
	serviceUuid: string;
	characteristicUuid: string;
}

/** Wire-format fields for the LINE Thrift struct StudentInformation. */
export interface StudentInformation {
	schoolName: string;
	graduationDate: string;
}

/** Wire-format fields for the LINE Thrift struct SubLiffView. */
export interface SubLiffView {
	presentationType: Qj_i0;
	url: string;
	maxBrightness: boolean;
	menuColorSetting: LIFFMenuColorSetting;
	closeButtonPosition: Qj_h0;
	closeButtonLabel: string;
	skipWebRTCPermissionPopupAllowed: boolean;
	provider: any;
}

/** Wire-format fields for the LINE Thrift struct SubTab. */
export interface SubTab {
	id: string;
	name: string;
	badgeInfo: BadgeInfo;
	tooltipInfo: TooltipInfo;
	modulesOrder: string[];
	wrsSubTabModelId: string;
}

/** Wire-format fields for the LINE Thrift struct SubWindowResultRequest. */
export interface SubWindowResultRequest {
	msit: string;
	mstVerifier: string;
}

/** Wire-format fields for the LINE Thrift struct SubscriptionNotification. */
export interface SubscriptionNotification {
	subscriptionId: Int64;
}

/** Wire-format fields for the LINE Thrift struct SubscriptionPlan. */
export interface SubscriptionPlan {
	billingItemId: string;
	subscriptionService: number;
	target: Ob1_P1;
	type: Ob1_R1;
	period: string;
	freeTrial: string;
	localizedName: string;
	price: Price;
	availability: Ob1_O1;
	cpId: string;
	nameKey: string;
	tier: Ob1_Q1;
}

/** Wire-format fields for the LINE Thrift struct SubscriptionSlotHistory. */
export interface SubscriptionSlotHistory {
	product: ProductSearchSummary;
	addedTime: Int64;
	removedTime: Int64;
}

/** Wire-format fields for the LINE Thrift struct SubscriptionState. */
export interface SubscriptionState {
	subscriptionId: Int64;
	ttlMillis: Int64;
}

/** Wire-format fields for the LINE Thrift struct SubscriptionStatus. */
export interface SubscriptionStatus {
	billingItemId: string;
	subscriptionService: any;
	period: string;
	localizedName: string;
	freeTrial: boolean;
	expired: boolean;
	validUntil: Int64;
	maxSlotCount: number;
	target: Ob1_P1;
	type: Ob1_R1;
	storeCode: Ob1_K1;
	nameKey: string;
	tier: Ob1_Q1;
	accountHold: boolean;
	maxSlotCountsByProductType: Record<number, number>;
	agreementAccepted: boolean;
	originalValidUntil: Int64;
}

/** Wire-format fields for the LINE Thrift struct SuggestDictionarySetting. */
export interface SuggestDictionarySetting {
	language: string;
	name: string;
	preload: boolean;
	suggestResource: SuggestResource;
	patch: Record<number, string>;
	suggestTagResource: SuggestResource;
	tagPatch: Record<number, string>;
	corpusResource: SuggestResource;
}

/** Wire-format fields for the LINE Thrift struct SuggestResource. */
export interface SuggestResource {
	dataUrl: string;
	version: Int64;
	updatedTime: Int64;
}

/** Wire-format fields for the LINE Thrift struct SuggestTag. */
export interface SuggestTag {
	tagId: string;
	weight: number;
}

/** Wire-format fields for the LINE Thrift struct SuggestTrialRecommendation. */
export interface SuggestTrialRecommendation {
	productId: string;
	productVersion: Int64;
	productName: string;
	resource: zR0_C40580e;
	tags: SuggestTag[];
}

/** Wire-format fields for the LINE Thrift struct SyncRequest. */
export interface SyncRequest {
	lastRevision: Int64;
	count: number;
	lastGlobalRevision: Int64;
	lastIndividualRevision: Int64;
	fullSyncRequestReason: Pb1_J4;
	lastPartialFullSyncs: Record<number, Int64>;
}

/** Wire-format fields for the LINE Thrift struct SyncSquareMembersRequest. */
export interface SyncSquareMembersRequest {
	squareMid: string;
	squareMembers: Record<string, Int64>;
}

/** Wire-format fields for the LINE Thrift struct SyncSquareMembersResponse. */
export interface SyncSquareMembersResponse {
	updatedSquareMembers: SquareMember[];
}

/** Wire-format fields for the LINE Thrift struct T70_C14398f. */
export interface T70_C14398f {
}

/** Wire-format fields for the LINE Thrift struct T70_g1. */
export interface T70_g1 {
}

/** Wire-format fields for the LINE Thrift struct T70_o1. */
export interface T70_o1 {
}

/** Wire-format fields for the LINE Thrift struct T70_s1. */
export interface T70_s1 {
}

/** Wire-format fields for the LINE Thrift struct TGlobalEvents. */
export interface TGlobalEvents {
	events: Record<number, GlobalEvent>;
	lastRevision: Int64;
}

/** Wire-format fields for the LINE Thrift struct TIndividualEvents. */
export interface TIndividualEvents {
	events: number[];
	lastRevision: Int64;
}

/** Wire-format fields for the LINE Thrift struct TMessageReadRange. */
export interface TMessageReadRange {
	chatId: string;
	ranges: Record<string, any>;
}

/** Wire-format fields for the LINE Thrift struct TMessageReadRangeEntry. */
export interface TMessageReadRangeEntry {
	startMessageId: Int64;
	endMessageId: Int64;
	startTime: Int64;
	endTime: Int64;
}

/** Wire-format fields for the LINE Thrift struct Tag. */
export interface Tag {
	tagId: string;
	candidates: Candidate[];
}

/** Wire-format fields for the LINE Thrift struct TaiwanBankAgreementRequiredPopupInfo. */
export interface TaiwanBankAgreementRequiredPopupInfo {
	popupTitle: string;
	popupContent: string;
}

/** Wire-format fields for the LINE Thrift struct TaiwanBankBalanceInfo. */
export interface TaiwanBankBalanceInfo {
	bankUser: boolean;
	balance: Int64;
	accessToken: string;
	accessTokenExpiresInSecond: number;
	balanceLinkUrl: string;
	balanceDisplay: boolean;
	agreedToShowBalance: boolean;
	agreementRequiredPopupInfo: TaiwanBankAgreementRequiredPopupInfo;
}

/** Wire-format fields for the LINE Thrift struct TaiwanBankLoginParameters. */
export interface TaiwanBankLoginParameters {
	loginScheme: string;
	type: string;
	action: string;
	scope: string;
	responseType: string;
	codeChallengeMethod: string;
	clientId: string;
}

/** Wire-format fields for the LINE Thrift struct TalkroomEnterReferer. */
export interface TalkroomEnterReferer {
	urlScheme: string;
	type: kf_x;
	content: kf_w;
}

/** Wire-format fields for the LINE Thrift struct TalkroomEvent. */
export interface TalkroomEvent {
	type: any;
	referer: TalkroomEnterReferer;
}

/** Wire-format fields for the LINE Thrift struct TargetProfileDetail. */
export interface TargetProfileDetail {
	snapshotTimeMillis: Int64;
	profileName: string;
	picturePath: string;
	statusMessage: RichString;
	musicProfile: string;
	videoProfile: string;
	avatarProfile: AvatarProfile;
	pictureSource: Pb1_N6;
	pictureStatus: string;
	profileId: string;
	hiddenFromList: boolean;
}

/** Wire-format fields for the LINE Thrift struct TermsAgreementExtraInfo. */
export interface TermsAgreementExtraInfo {
	termsType: number;
	termsVersion: number;
	lanUrl: string;
}

/** Wire-format fields for the LINE Thrift struct TextButton. */
export interface TextButton {
	text: string;
}

/** Wire-format fields for the LINE Thrift struct TextMessageAnnouncementContents. */
export interface TextMessageAnnouncementContents {
	messageId: string;
	text: string;
	senderSquareMemberMid: string;
	createdAt: Int64;
	senderMid: string;
}

/** Wire-format fields for the LINE Thrift struct ThaiBankBalanceInfo. */
export interface ThaiBankBalanceInfo {
	bankUser: boolean;
	balanceDisplay: boolean;
	balance: number;
	balanceLinkUrl: string;
}

/** Wire-format fields for the LINE Thrift struct ThemeProperty. */
export interface ThemeProperty {
	thumbnailUrl: string;
	themeResourceType: Ob1_c2;
}

/** Wire-format fields for the LINE Thrift struct ThemeSummary. */
export interface ThemeSummary {
	imagePath: string;
	version: Int64;
	versionString: string;
}

/** Wire-format fields for the LINE Thrift struct ThingsDevice. */
export interface ThingsDevice {
	deviceId: string;
	actionUri: string;
	botMid: string;
	productType: do0_EnumC23139B;
	providerName: string;
	profileImageLocation: string;
	channelIdList: string[];
	targetABCEngineVersion: number;
	serviceUuid: string;
	bondingRequired: boolean;
}

/** Wire-format fields for the LINE Thrift struct ThingsOperation. */
export interface ThingsOperation {
	deviceId: string;
	offset: Int64;
	action: do0_C23138A;
}

/** Wire-format fields for the LINE Thrift struct ThumbnailLayer. */
export interface ThumbnailLayer {
	frontThumbnailImage: RichImage;
	backgroundThumbnailImage: RichImage;
}

/** Wire-format fields for the LINE Thrift struct Ticket. */
export interface Ticket {
	id: string;
	expirationTime: Int64;
	maxUseCount: number;
}

/** Wire-format fields for the LINE Thrift struct TokenV1IssueResult. */
export interface TokenV1IssueResult {
	tokenSecret: string;
}

/** Wire-format fields for the LINE Thrift struct TokenV3IssueResult. */
export interface TokenV3IssueResult {
	accessToken: string;
	refreshToken: string;
	durationUntilRefreshInSec: Int64;
	refreshApiRetryPolicy: RefreshApiRetryPolicy;
	loginSessionId: string;
	tokenIssueTimeEpochSec: Int64;
}

/** Wire-format fields for the LINE Thrift struct Tooltip. */
export interface Tooltip {
	text: string;
	revisionTimeMillis: Int64;
}

/** Wire-format fields for the LINE Thrift struct TooltipInfo. */
export interface TooltipInfo {
	text: string;
	tooltipRevision: Int64;
}

/** Wire-format fields for the LINE Thrift struct TopTab. */
export interface TopTab {
	id: string;
	modulesOrder: string[];
}

/** Wire-format fields for the LINE Thrift struct TryAgainLaterExtraInfo. */
export interface TryAgainLaterExtraInfo {
	blockSecs: number;
}

/** Wire-format fields for the LINE Thrift struct U70_a. */
export interface U70_a {
}

/** Wire-format fields for the LINE Thrift struct U70_t. */
export interface U70_t {
}

/** Wire-format fields for the LINE Thrift struct U70_v. */
export interface U70_v {
}

/** Wire-format fields for the LINE Thrift struct UEN. */
export interface UEN {
	revision: Int64;
}

/** Wire-format fields for the LINE Thrift struct Uf_C14856C. */
export interface Uf_C14856C {
	uen: UEN;
	beacon: Beacon;
}

/** Wire-format fields for the LINE Thrift struct Uf_C14864f. */
export interface Uf_C14864f {
	regularBadge: RegularBadge;
	urgentBadge: UrgentBadge;
}

/** Wire-format fields for the LINE Thrift struct Uf_p. */
export interface Uf_p {
	ad: AD;
	content: Content;
	richContent: RichContent;
}

/** Wire-format fields for the LINE Thrift struct Uf_t. */
export interface Uf_t {
	typeA: RichItem;
	typeB: RichItem;
}

/** Wire-format fields for the LINE Thrift struct UnfollowRequest. */
export interface UnfollowRequest {
	followMid: Pb1_A4;
}

/** Wire-format fields for the LINE Thrift struct UnhideSquareMemberContentsRequest. */
export interface UnhideSquareMemberContentsRequest {
	squareMemberMid: string;
}

/** Wire-format fields for the LINE Thrift struct UnregisterAvailabilityInfo. */
export interface UnregisterAvailabilityInfo {
	result: r80_m0;
	message: string;
}

/** Wire-format fields for the LINE Thrift struct UnsendMessageRequest. */
export interface UnsendMessageRequest {
	squareChatMid: string;
	messageId: string;
	threadMid: string;
}

/** Wire-format fields for the LINE Thrift struct UnsendMessageResponse. */
export interface UnsendMessageResponse {
	unsentMessage: SquareMessage;
}

/** Wire-format fields for the LINE Thrift struct UpdateChatRequest. */
export interface UpdateChatRequest {
	reqSeq: number;
	chat: Chat;
	updatedAttribute: Pb1_O2;
}

/** Wire-format fields for the LINE Thrift struct UpdateGroupCallUrlRequest. */
export interface UpdateGroupCallUrlRequest {
	urlId: string;
	targetAttribute: Pb1_ad;
}

/** Wire-format fields for the LINE Thrift struct UpdateLiveTalkAttrsRequest. */
export interface UpdateLiveTalkAttrsRequest {
	updatedAttrs: LiveTalkAttribute[];
	liveTalk: LiveTalk;
}

/** Wire-format fields for the LINE Thrift struct UpdatePasswordRequest. */
export interface UpdatePasswordRequest {
	sessionId: string;
	hashedPassword: string;
}

/** Wire-format fields for the LINE Thrift struct UpdateProfileAttributesRequest. */
export interface UpdateProfileAttributesRequest {
	profileAttributes: Record<number, ProfileContent>;
}

/** Wire-format fields for the LINE Thrift struct UpdateReason. */
export interface UpdateReason {
	type: t80_r;
	detail: string;
}

/** Wire-format fields for the LINE Thrift struct UpdateSafetyStatusRequest. */
export interface UpdateSafetyStatusRequest {
	disasterId: string;
	safetyStatus: vh_m;
	message: string;
}

/** Wire-format fields for the LINE Thrift struct UpdateSquareAuthorityRequest. */
export interface UpdateSquareAuthorityRequest {
	updateAttributes: SquareAuthorityAttribute[];
	authority: SquareAuthority;
}

/** Wire-format fields for the LINE Thrift struct UpdateSquareAuthorityResponse. */
export interface UpdateSquareAuthorityResponse {
	updatdAttributes: number[];
	authority: SquareAuthority;
}

/** Wire-format fields for the LINE Thrift struct UpdateSquareChatMemberRequest. */
export interface UpdateSquareChatMemberRequest {
	updatedAttrs: SquareChatMemberAttribute[];
	chatMember: SquareChatMember;
}

/** Wire-format fields for the LINE Thrift struct UpdateSquareChatMemberResponse. */
export interface UpdateSquareChatMemberResponse {
	updatedChatMember: SquareChatMember;
}

/** Wire-format fields for the LINE Thrift struct UpdateSquareChatRequest. */
export interface UpdateSquareChatRequest {
	updatedAttrs: SquareChatAttribute[];
	squareChat: SquareChat;
}

/** Wire-format fields for the LINE Thrift struct UpdateSquareChatResponse. */
export interface UpdateSquareChatResponse {
	updatedAttrs: number[];
	squareChat: SquareChat;
}

/** Wire-format fields for the LINE Thrift struct UpdateSquareFeatureSetRequest. */
export interface UpdateSquareFeatureSetRequest {
	updateAttributes: SquareFeatureSetAttribute[];
	squareFeatureSet: SquareFeatureSet;
}

/** Wire-format fields for the LINE Thrift struct UpdateSquareFeatureSetResponse. */
export interface UpdateSquareFeatureSetResponse {
	updateAttributes: number[];
	squareFeatureSet: SquareFeatureSet;
}

/** Wire-format fields for the LINE Thrift struct UpdateSquareMemberRelationRequest. */
export interface UpdateSquareMemberRelationRequest {
	squareMid: string;
	targetSquareMemberMid: string;
	updatedAttrs: number[];
	relation: SquareMemberRelation;
}

/** Wire-format fields for the LINE Thrift struct UpdateSquareMemberRelationResponse. */
export interface UpdateSquareMemberRelationResponse {
	squareMid: string;
	targetSquareMemberMid: string;
	updatedAttrs: number[];
	relation: SquareMemberRelation;
}

/** Wire-format fields for the LINE Thrift struct UpdateSquareMemberRequest. */
export interface UpdateSquareMemberRequest {
	updatedAttrs: SquareMemberAttribute[];
	updatedPreferenceAttrs: SquarePreferenceAttribute[];
	squareMember: SquareMember;
}

/** Wire-format fields for the LINE Thrift struct UpdateSquareMemberResponse. */
export interface UpdateSquareMemberResponse {
	updatedAttrs: number[];
	squareMember: SquareMember;
	updatedPreferenceAttrs: number[];
}

/** Wire-format fields for the LINE Thrift struct UpdateSquareMembersRequest. */
export interface UpdateSquareMembersRequest {
	updatedAttrs: SquareMemberAttribute[];
	members: SquareMember[];
}

/** Wire-format fields for the LINE Thrift struct UpdateSquareMembersResponse. */
export interface UpdateSquareMembersResponse {
	updatedAttrs: number[];
	editor: SquareMember;
	members: Record<string, SquareMember>;
}

/** Wire-format fields for the LINE Thrift struct UpdateSquareRequest. */
export interface UpdateSquareRequest {
	updatedAttrs: SquareAttribute[];
	square: Square;
}

/** Wire-format fields for the LINE Thrift struct UpdateSquareResponse. */
export interface UpdateSquareResponse {
	updatedAttrs: number[];
	square: Square;
}

/** Wire-format fields for the LINE Thrift struct UpdateUserSettingsRequest. */
export interface UpdateUserSettingsRequest {
	updatedAttrs: any[];
	userSettings: SquareUserSettings;
}

/** Wire-format fields for the LINE Thrift struct UrgentBadge. */
export interface UrgentBadge {
	bgColor: string;
	label: string;
	color: string;
}

/** Wire-format fields for the LINE Thrift struct UrlButton. */
export interface UrlButton {
	text: string;
	url: string;
}

/** Wire-format fields for the LINE Thrift struct UsePhotoboothTicketRequest. */
export interface UsePhotoboothTicketRequest {
	chatMid: string;
	photoboothSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct UsePhotoboothTicketResponse. */
export interface UsePhotoboothTicketResponse {
	signedTicketJwt: string;
}

/** Wire-format fields for the LINE Thrift struct UserBlockDetail. */
export interface UserBlockDetail {
	deletedFromBlockList: boolean;
}

/** Wire-format fields for the LINE Thrift struct UserDevice. */
export interface UserDevice {
	device: ThingsDevice;
	deviceDisplayName: string;
}

/** Wire-format fields for the LINE Thrift struct UserFriendDetail. */
export interface UserFriendDetail {
	createdTime: Int64;
	overriddenName: string;
	favoriteTime: Int64;
	hidden: boolean;
	ringtone: string;
	ringbackTone: string;
}

/** Wire-format fields for the LINE Thrift struct UserPhoneNumber. */
export interface UserPhoneNumber {
	phoneNumber: string;
	countryCode: string;
}

/** Wire-format fields for the LINE Thrift struct UserProfile. */
export interface UserProfile {
	displayName: string;
	profileImageUrl: string;
}

/** Wire-format fields for the LINE Thrift struct UserRestrictionExtraInfo. */
export interface UserRestrictionExtraInfo {
	linkUrl: string;
}

/** Wire-format fields for the LINE Thrift struct V1PasswordHashingParameters. */
export interface V1PasswordHashingParameters {
	aesKey: string;
	salt: string;
}

/** Wire-format fields for the LINE Thrift struct VerificationSessionData. */
export interface VerificationSessionData {
	sessionId: string;
	method: VerificationMethod;
	callback: string;
	normalizedPhone: string;
	countryCode: string;
	nationalSignificantNumber: string;
	availableVerificationMethods: VerificationMethod[];
	callerIdMask: string;
}

/** Wire-format fields for the LINE Thrift struct VerifyAccountUsingHashedPwdRequest. */
export interface VerifyAccountUsingHashedPwdRequest {
	authSessionId: string;
	accountIdentifier: AccountIdentifier;
	v1HashedPassword: string;
	clientHashedPassword: string;
}

/** Wire-format fields for the LINE Thrift struct I80_E0. */
export interface I80_E0 {
	authSessionId: string;
	v1HashedPassword: string;
	clientHashedPassword: string;
}

/** Wire-format fields for the LINE Thrift struct VerifyAccountUsingHashedPwdResponse. */
export interface VerifyAccountUsingHashedPwdResponse {
	userProfile: UserProfile;
}

/** Wire-format fields for the LINE Thrift struct VerifyAssertionRequest. */
export interface VerifyAssertionRequest {
	sessionId: string;
	credentialId: string;
	assertionObject: string;
	clientDataJSON: string;
}

/** Wire-format fields for the LINE Thrift struct VerifyAttestationRequest. */
export interface VerifyAttestationRequest {
	sessionId: string;
	attestationObject: string;
	clientDataJSON: string;
}

/** Wire-format fields for the LINE Thrift struct VerifyEapLoginRequest. */
export interface VerifyEapLoginRequest {
	authSessionId: string;
	eapLogin: EapLogin;
}

/** Wire-format fields for the LINE Thrift struct I80_G0. */
export interface I80_G0 {
	authSessionId: string;
	eapLogin: EapLogin;
}

/** Wire-format fields for the LINE Thrift struct VerifyEapLoginResponse. */
export interface VerifyEapLoginResponse {
	accountExists: boolean;
}

/** Wire-format fields for the LINE Thrift struct I80_H0. */
export interface I80_H0 {
	userProfile: any;
}

/** Wire-format fields for the LINE Thrift struct VerifyPhonePinCodeRequest. */
export interface VerifyPhonePinCodeRequest {
	authSessionId: string;
	userPhoneNumber: UserPhoneNumber;
	pinCode: string;
}

/** Wire-format fields for the LINE Thrift struct I80_I0. */
export interface I80_I0 {
	authSessionId: string;
	userPhoneNumber: UserPhoneNumber;
	pinCode: string;
}

/** Wire-format fields for the LINE Thrift struct VerifyPhonePinCodeResponse. */
export interface VerifyPhonePinCodeResponse {
	accountExist: boolean;
	sameUdidFromAccount: boolean;
	allowedToRegister: boolean;
	userProfile: UserProfile;
}

/** Wire-format fields for the LINE Thrift struct I80_J0. */
export interface I80_J0 {
	userProfile: any;
}

/** Wire-format fields for the LINE Thrift struct VerifyPinCodeRequest. */
export interface VerifyPinCodeRequest {
	pinCode: string;
}

/** Wire-format fields for the LINE Thrift struct VerifyQrCodeRequest. */
export interface VerifyQrCodeRequest {
	authSessionId: string;
	metaData: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct VerifySocialLoginResponse. */
export interface VerifySocialLoginResponse {
	accountExist: boolean;
	userProfile: UserProfile;
	sameUdidFromAccount: boolean;
}

/** Wire-format fields for the LINE Thrift struct I80_K0. */
export interface I80_K0 {
	baseUrl: string;
	token: string;
}

/** Wire-format fields for the LINE Thrift struct WebAuthDetails. */
export interface WebAuthDetails {
	baseUrl: string;
	token: string;
}

/** Wire-format fields for the LINE Thrift struct WebLoginRequest. */
export interface WebLoginRequest {
	hookedFullUrl: string;
	sessionString: string;
	fromIAB: boolean;
	sourceApplication: string;
}

/** Wire-format fields for the LINE Thrift struct WebLoginResponse. */
export interface WebLoginResponse {
	returnUrl: string;
	optionalReturnUrl: string;
	redirectConfirmationPageUrl: string;
}

/** Wire-format fields for the LINE Thrift struct WifiSignal. */
export interface WifiSignal {
	ssid: string;
	bssid: string;
	wifiStandard: string;
	frequency: number;
	lastSeenTimestamp: Int64;
	rssi: number;
}

/** Wire-format fields for the LINE Thrift struct Z70_a. */
export interface Z70_a {
	recoveryKey: string;
	backupBlobPayload: string;
}

/** Wire-format fields for the LINE Thrift struct ZQ0_b. */
export interface ZQ0_b {
}

/** Wire-format fields for the LINE Thrift struct acceptChatInvitationByTicket_args. */
export interface acceptChatInvitationByTicket_args {
	request: AcceptChatInvitationByTicketRequest;
}

/** Wire-format fields for the LINE Thrift struct acceptChatInvitationByTicket_result. */
export interface acceptChatInvitationByTicket_result {
	success: Pb1_C12980f;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct acceptChatInvitation_args. */
export interface acceptChatInvitation_args {
	request: AcceptChatInvitationRequest;
}

/** Wire-format fields for the LINE Thrift struct acceptChatInvitation_result. */
export interface acceptChatInvitation_result {
	success: Pb1_C13008h;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_acceptSpeakers_result. */
export interface SquareService_acceptSpeakers_result {
	success: AcceptSpeakersResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_acceptToChangeRole_result. */
export interface SquareService_acceptToChangeRole_result {
	success: AcceptToChangeRoleResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_acceptToListen_result. */
export interface SquareService_acceptToListen_result {
	success: AcceptToListenResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_acceptToSpeak_result. */
export interface SquareService_acceptToSpeak_result {
	success: AcceptToSpeakResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_acquireLiveTalk_result. */
export interface SquareService_acquireLiveTalk_result {
	success: AcquireLiveTalkResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_cancelToSpeak_result. */
export interface SquareService_cancelToSpeak_result {
	success: CancelToSpeakResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_fetchLiveTalkEvents_result. */
export interface SquareService_fetchLiveTalkEvents_result {
	success: FetchLiveTalkEventsResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_findLiveTalkByInvitationTicket_result. */
export interface SquareService_findLiveTalkByInvitationTicket_result {
	success: FindLiveTalkByInvitationTicketResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_forceEndLiveTalk_result. */
export interface SquareService_forceEndLiveTalk_result {
	success: ForceEndLiveTalkResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getLiveTalkInfoForNonMember_result. */
export interface SquareService_getLiveTalkInfoForNonMember_result {
	success: GetLiveTalkInfoForNonMemberResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getLiveTalkInvitationUrl_result. */
export interface SquareService_getLiveTalkInvitationUrl_result {
	success: GetLiveTalkInvitationUrlResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getLiveTalkSpeakersForNonMember_result. */
export interface SquareService_getLiveTalkSpeakersForNonMember_result {
	success: GetLiveTalkSpeakersForNonMemberResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareInfoByChatMid_result. */
export interface SquareService_getSquareInfoByChatMid_result {
	success: GetSquareInfoByChatMidResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_inviteToChangeRole_result. */
export interface SquareService_inviteToChangeRole_result {
	success: InviteToChangeRoleResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_inviteToListen_result. */
export interface SquareService_inviteToListen_result {
	success: InviteToListenResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_inviteToLiveTalk_result. */
export interface SquareService_inviteToLiveTalk_result {
	success: InviteToLiveTalkResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_inviteToSpeak_result. */
export interface SquareService_inviteToSpeak_result {
	success: InviteToSpeakResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_joinLiveTalk_result. */
export interface SquareService_joinLiveTalk_result {
	success: JoinLiveTalkResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_kickOutLiveTalkParticipants_result. */
export interface SquareService_kickOutLiveTalkParticipants_result {
	success: KickOutLiveTalkParticipantsResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_rejectSpeakers_result. */
export interface SquareService_rejectSpeakers_result {
	success: RejectSpeakersResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_rejectToSpeak_result. */
export interface SquareService_rejectToSpeak_result {
	success: RejectToSpeakResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_removeLiveTalkSubscription_result. */
export interface SquareService_removeLiveTalkSubscription_result {
	success: RemoveLiveTalkSubscriptionResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_reportLiveTalk_result. */
export interface SquareService_reportLiveTalk_result {
	success: ReportLiveTalkResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_reportLiveTalkSpeaker_result. */
export interface SquareService_reportLiveTalkSpeaker_result {
	success: ReportLiveTalkSpeakerResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_requestToListen_result. */
export interface SquareService_requestToListen_result {
	success: RequestToListenResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_requestToSpeak_result. */
export interface SquareService_requestToSpeak_result {
	success: RequestToSpeakResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_updateLiveTalkAttrs_result. */
export interface SquareService_updateLiveTalkAttrs_result {
	success: UpdateLiveTalkAttrsResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_acceptSpeakers_args. */
export interface SquareService_acceptSpeakers_args {
	request: AcceptSpeakersRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_acceptToChangeRole_args. */
export interface SquareService_acceptToChangeRole_args {
	request: AcceptToChangeRoleRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_acceptToListen_args. */
export interface SquareService_acceptToListen_args {
	request: AcceptToListenRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_acceptToSpeak_args. */
export interface SquareService_acceptToSpeak_args {
	request: AcceptToSpeakRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_acquireLiveTalk_args. */
export interface SquareService_acquireLiveTalk_args {
	request: AcquireLiveTalkRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_cancelToSpeak_args. */
export interface SquareService_cancelToSpeak_args {
	request: CancelToSpeakRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_fetchLiveTalkEvents_args. */
export interface SquareService_fetchLiveTalkEvents_args {
	request: FetchLiveTalkEventsRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_findLiveTalkByInvitationTicket_args. */
export interface SquareService_findLiveTalkByInvitationTicket_args {
	request: FindLiveTalkByInvitationTicketRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_forceEndLiveTalk_args. */
export interface SquareService_forceEndLiveTalk_args {
	request: ForceEndLiveTalkRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getLiveTalkInfoForNonMember_args. */
export interface SquareService_getLiveTalkInfoForNonMember_args {
	request: GetLiveTalkInfoForNonMemberRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getLiveTalkInvitationUrl_args. */
export interface SquareService_getLiveTalkInvitationUrl_args {
	request: GetLiveTalkInvitationUrlRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getLiveTalkSpeakersForNonMember_args. */
export interface SquareService_getLiveTalkSpeakersForNonMember_args {
	request: GetLiveTalkSpeakersForNonMemberRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareInfoByChatMid_args. */
export interface SquareService_getSquareInfoByChatMid_args {
	request: GetSquareInfoByChatMidRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_inviteToChangeRole_args. */
export interface SquareService_inviteToChangeRole_args {
	request: InviteToChangeRoleRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_inviteToListen_args. */
export interface SquareService_inviteToListen_args {
	request: InviteToListenRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_inviteToLiveTalk_args. */
export interface SquareService_inviteToLiveTalk_args {
	request: InviteToLiveTalkRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_inviteToSpeak_args. */
export interface SquareService_inviteToSpeak_args {
	request: InviteToSpeakRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_joinLiveTalk_args. */
export interface SquareService_joinLiveTalk_args {
	request: JoinLiveTalkRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_kickOutLiveTalkParticipants_args. */
export interface SquareService_kickOutLiveTalkParticipants_args {
	request: KickOutLiveTalkParticipantsRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_rejectSpeakers_args. */
export interface SquareService_rejectSpeakers_args {
	request: RejectSpeakersRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_rejectToSpeak_args. */
export interface SquareService_rejectToSpeak_args {
	request: RejectToSpeakRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_removeLiveTalkSubscription_args. */
export interface SquareService_removeLiveTalkSubscription_args {
	request: RemoveLiveTalkSubscriptionRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_reportLiveTalk_args. */
export interface SquareService_reportLiveTalk_args {
	request: ReportLiveTalkRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_reportLiveTalkSpeaker_args. */
export interface SquareService_reportLiveTalkSpeaker_args {
	request: ReportLiveTalkSpeakerRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_requestToListen_args. */
export interface SquareService_requestToListen_args {
	request: RequestToListenRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_requestToSpeak_args. */
export interface SquareService_requestToSpeak_args {
	request: RequestToSpeakRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_updateLiveTalkAttrs_args. */
export interface SquareService_updateLiveTalkAttrs_args {
	request: UpdateLiveTalkAttrsRequest;
}

/** Wire-format fields for the LINE Thrift struct acquireCallRoute_args. */
export interface acquireCallRoute_args {
	to: string;
	callType: Pb1_D4;
	fromEnvInfo: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct acquireCallRoute_result. */
export interface acquireCallRoute_result {
	success: CallRoute;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct acquireEncryptedAccessToken_args. */
export interface acquireEncryptedAccessToken_args {
	featureType: Pb1_EnumC13222w4;
}

/** Wire-format fields for the LINE Thrift struct acquireEncryptedAccessToken_result. */
export interface acquireEncryptedAccessToken_result {
	success: string;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct acquireGroupCallRoute_args. */
export interface acquireGroupCallRoute_args {
	chatMid: string;
	mediaType: Pb1_EnumC13237x5;
	isInitialHost: boolean;
	capabilities: string[];
}

/** Wire-format fields for the LINE Thrift struct acquireGroupCallRoute_result. */
export interface acquireGroupCallRoute_result {
	success: GroupCallRoute;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct acquireOACallRoute_args. */
export interface acquireOACallRoute_args {
	request: AcquireOACallRouteRequest;
}

/** Wire-format fields for the LINE Thrift struct acquireOACallRoute_result. */
export interface acquireOACallRoute_result {
	success: AcquireOACallRouteResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct acquirePaidCallRoute_args. */
export interface acquirePaidCallRoute_args {
	productId: string;
	dialedNumber: string;
	language: string;
	recipientMid: string;
	disableCallerId: boolean;
	referer: string;
	adSessionId: string;
	shopId: string;
	price: any;
	enableLinePointAutoExchange: boolean;
	locale: Locale;
	presentAttributes: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct acquirePaidCallRoute_result. */
export interface acquirePaidCallRoute_result {
	success: PaidCallResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct activateSubscription_args. */
export interface activateSubscription_args {
	request: ActivateSubscriptionRequest;
}

/** Wire-format fields for the LINE Thrift struct activateSubscription_result. */
export interface activateSubscription_result {
	e: MembershipException;
}

/** Wire-format fields for the LINE Thrift struct adTypeOptOutClickEvent_args. */
export interface adTypeOptOutClickEvent_args {
	request: AdTypeOptOutClickEventRequest;
	kickoutFromGroupCallRequest: KickoutFromGroupCallRequest;
}

/** Wire-format fields for the LINE Thrift struct adTypeOptOutClickEvent_result. */
export interface adTypeOptOutClickEvent_result {
	success: NZ0_C12152b;
	e: WalletException;
}

/** Wire-format fields for the LINE Thrift struct addFriendByMid_args. */
export interface addFriendByMid_args {
	request: AddFriendByMidRequest;
}

/** Wire-format fields for the LINE Thrift struct addFriendByMid_result. */
export interface addFriendByMid_result {
	success: LN0_C11270b;
	be: RejectedException;
	ce: ServerFailureException;
	te: TalkException;
}

/** Wire-format fields for the LINE Thrift struct addItemToCollection_args. */
export interface addItemToCollection_args {
	request: AddItemToCollectionRequest;
}

/** Wire-format fields for the LINE Thrift struct addItemToCollection_result. */
export interface addItemToCollection_result {
	success: Ob1_C12608b;
	e: CollectionException;
}

/** Wire-format fields for the LINE Thrift struct addOaFriend_args. */
export interface addOaFriend_args {
	request: NZ0_C12155c;
	dialedNumber: string;
	language: string;
	referer: string;
}

/** Wire-format fields for the LINE Thrift struct addOaFriend_result. */
export interface addOaFriend_result {
	success: AddOaFriendResponse;
	e: WalletException;
}

/** Wire-format fields for the LINE Thrift struct addProductToSubscriptionSlot_args. */
export interface addProductToSubscriptionSlot_args {
	req: AddProductToSubscriptionSlotRequest;
}

/** Wire-format fields for the LINE Thrift struct addProductToSubscriptionSlot_result. */
export interface addProductToSubscriptionSlot_result {
	success: AddProductToSubscriptionSlotResponse;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct addThemeToSubscriptionSlot_args. */
export interface addThemeToSubscriptionSlot_args {
	req: AddThemeToSubscriptionSlotRequest;
}

/** Wire-format fields for the LINE Thrift struct addThemeToSubscriptionSlot_result. */
export interface addThemeToSubscriptionSlot_result {
	success: AddThemeToSubscriptionSlotResponse;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct addToFollowBlacklist_args. */
export interface addToFollowBlacklist_args {
	addToFollowBlacklistRequest: AddToFollowBlacklistRequest;
}

/** Wire-format fields for the LINE Thrift struct addToFollowBlacklist_result. */
export interface addToFollowBlacklist_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_agreeToTerms_result. */
export interface SquareService_agreeToTerms_result {
	success: AgreeToTermsResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_approveSquareMembers_result. */
export interface SquareService_approveSquareMembers_result {
	success: ApproveSquareMembersResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_checkJoinCode_result. */
export interface SquareService_checkJoinCode_result {
	success: CheckJoinCodeResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_createSquareChatAnnouncement_result. */
export interface SquareService_createSquareChatAnnouncement_result {
	success: CreateSquareChatAnnouncementResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_createSquareChat_result. */
export interface SquareService_createSquareChat_result {
	success: CreateSquareChatResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_createSquare_result. */
export interface SquareService_createSquare_result {
	success: CreateSquareResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_deleteSquareChatAnnouncement_result. */
export interface SquareService_deleteSquareChatAnnouncement_result {
	success: DeleteSquareChatAnnouncementResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_deleteSquareChat_result. */
export interface SquareService_deleteSquareChat_result {
	success: DeleteSquareChatResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_deleteSquare_result. */
export interface SquareService_deleteSquare_result {
	success: DeleteSquareResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_destroyMessage_result. */
export interface SquareService_destroyMessage_result {
	success: DestroyMessageResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_destroyMessages_result. */
export interface SquareService_destroyMessages_result {
	success: DestroyMessagesResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_fetchMyEvents_result. */
export interface SquareService_fetchMyEvents_result {
	success: FetchMyEventsResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_fetchSquareChatEvents_result. */
export interface SquareService_fetchSquareChatEvents_result {
	success: FetchSquareChatEventsResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_findSquareByEmid_result. */
export interface SquareService_findSquareByEmid_result {
	success: FindSquareByEmidResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_findSquareByInvitationTicket_result. */
export interface SquareService_findSquareByInvitationTicket_result {
	success: FindSquareByInvitationTicketResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_findSquareByInvitationTicketV2_result. */
export interface SquareService_findSquareByInvitationTicketV2_result {
	success: FindSquareByInvitationTicketV2Response;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getGoogleAdOptions_result. */
export interface SquareService_getGoogleAdOptions_result {
	success: GetGoogleAdOptionsResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getInvitationTicketUrl_result. */
export interface SquareService_getInvitationTicketUrl_result {
	success: GetInvitationTicketUrlResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getJoinableSquareChats_result. */
export interface SquareService_getJoinableSquareChats_result {
	success: GetJoinableSquareChatsResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getJoinedSquareChats_result. */
export interface SquareService_getJoinedSquareChats_result {
	success: GetJoinedSquareChatsResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getJoinedSquares_result. */
export interface SquareService_getJoinedSquares_result {
	success: GetJoinedSquaresResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getMessageReactions_result. */
export interface SquareService_getMessageReactions_result {
	success: GetMessageReactionsResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getNoteStatus_result. */
export interface SquareService_getNoteStatus_result {
	success: GetNoteStatusResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getPopularKeywords_result. */
export interface SquareService_getPopularKeywords_result {
	success: GetPopularKeywordsResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareAuthorities_result. */
export interface SquareService_getSquareAuthorities_result {
	success: GetSquareAuthoritiesResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareAuthority_result. */
export interface SquareService_getSquareAuthority_result {
	success: GetSquareAuthorityResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getCategories_result. */
export interface SquareService_getCategories_result {
	success: GetSquareCategoriesResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareChatAnnouncements_result. */
export interface SquareService_getSquareChatAnnouncements_result {
	success: GetSquareChatAnnouncementsResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareChatEmid_result. */
export interface SquareService_getSquareChatEmid_result {
	success: GetSquareChatEmidResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareChatFeatureSet_result. */
export interface SquareService_getSquareChatFeatureSet_result {
	success: GetSquareChatFeatureSetResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareChatMember_result. */
export interface SquareService_getSquareChatMember_result {
	success: GetSquareChatMemberResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareChatMembers_result. */
export interface SquareService_getSquareChatMembers_result {
	success: GetSquareChatMembersResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareChat_result. */
export interface SquareService_getSquareChat_result {
	success: GetSquareChatResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareChatStatus_result. */
export interface SquareService_getSquareChatStatus_result {
	success: GetSquareChatStatusResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareEmid_result. */
export interface SquareService_getSquareEmid_result {
	success: GetSquareEmidResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareFeatureSet_result. */
export interface SquareService_getSquareFeatureSet_result {
	success: GetSquareFeatureSetResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareMemberRelation_result. */
export interface SquareService_getSquareMemberRelation_result {
	success: GetSquareMemberRelationResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareMemberRelations_result. */
export interface SquareService_getSquareMemberRelations_result {
	success: GetSquareMemberRelationsResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareMember_result. */
export interface SquareService_getSquareMember_result {
	success: GetSquareMemberResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareMembersBySquare_result. */
export interface SquareService_getSquareMembersBySquare_result {
	success: GetSquareMembersBySquareResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareMembers_result. */
export interface SquareService_getSquareMembers_result {
	success: GetSquareMembersResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquare_result. */
export interface SquareService_getSquare_result {
	success: GetSquareResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareStatus_result. */
export interface SquareService_getSquareStatus_result {
	success: GetSquareStatusResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareThreadMid_result. */
export interface SquareService_getSquareThreadMid_result {
	success: GetSquareThreadMidResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareThread_result. */
export interface SquareService_getSquareThread_result {
	success: GetSquareThreadResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getUserSettings_result. */
export interface SquareService_getUserSettings_result {
	success: GetUserSettingsResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_hideSquareMemberContents_result. */
export interface SquareService_hideSquareMemberContents_result {
	success: HideSquareMemberContentsResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_inviteIntoSquareChat_result. */
export interface SquareService_inviteIntoSquareChat_result {
	success: InviteIntoSquareChatResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_inviteToSquare_result. */
export interface SquareService_inviteToSquare_result {
	success: InviteToSquareResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_joinSquareChat_result. */
export interface SquareService_joinSquareChat_result {
	success: JoinSquareChatResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_joinSquare_result. */
export interface SquareService_joinSquare_result {
	success: JoinSquareResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_joinSquareThread_result. */
export interface SquareService_joinSquareThread_result {
	success: JoinSquareThreadResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_leaveSquareChat_result. */
export interface SquareService_leaveSquareChat_result {
	success: LeaveSquareChatResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_leaveSquare_result. */
export interface SquareService_leaveSquare_result {
	success: LeaveSquareResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_leaveSquareThread_result. */
export interface SquareService_leaveSquareThread_result {
	success: LeaveSquareThreadResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_manualRepair_result. */
export interface SquareService_manualRepair_result {
	success: ManualRepairResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_markAsRead_result. */
export interface SquareService_markAsRead_result {
	success: MarkAsReadResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_markChatsAsRead_result. */
export interface SquareService_markChatsAsRead_result {
	success: MarkChatsAsReadResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_markThreadsAsRead_result. */
export interface SquareService_markThreadsAsRead_result {
	success: MarkThreadsAsReadResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_reactToMessage_result. */
export interface SquareService_reactToMessage_result {
	success: ReactToMessageResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_refreshSubscriptions_result. */
export interface SquareService_refreshSubscriptions_result {
	success: RefreshSubscriptionsResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_rejectSquareMembers_result. */
export interface SquareService_rejectSquareMembers_result {
	success: RejectSquareMembersResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_removeSubscriptions_result. */
export interface SquareService_removeSubscriptions_result {
	success: RemoveSubscriptionsResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_reportMessageSummary_result. */
export interface SquareService_reportMessageSummary_result {
	success: ReportMessageSummaryResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_reportSquareChat_result. */
export interface SquareService_reportSquareChat_result {
	success: ReportSquareChatResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_reportSquareMember_result. */
export interface SquareService_reportSquareMember_result {
	success: ReportSquareMemberResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_reportSquareMessage_result. */
export interface SquareService_reportSquareMessage_result {
	success: ReportSquareMessageResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_reportSquare_result. */
export interface SquareService_reportSquare_result {
	success: ReportSquareResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_searchSquareChatMembers_result. */
export interface SquareService_searchSquareChatMembers_result {
	success: SearchSquareChatMembersResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_searchSquareChatMentionables_result. */
export interface SquareService_searchSquareChatMentionables_result {
	success: SearchSquareChatMentionablesResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_searchSquareMembers_result. */
export interface SquareService_searchSquareMembers_result {
	success: SearchSquareMembersResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_searchSquares_result. */
export interface SquareService_searchSquares_result {
	success: SearchSquaresResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_sendMessage_result. */
export interface SquareService_sendMessage_result {
	success: SendMessageResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_sendSquareThreadMessage_result. */
export interface SquareService_sendSquareThreadMessage_result {
	success: SendSquareThreadMessageResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_syncSquareMembers_result. */
export interface SquareService_syncSquareMembers_result {
	success: SyncSquareMembersResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_unhideSquareMemberContents_result. */
export interface SquareService_unhideSquareMemberContents_result {
	success: UnhideSquareMemberContentsResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_unsendMessage_result. */
export interface SquareService_unsendMessage_result {
	success: UnsendMessageResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_updateSquareAuthority_result. */
export interface SquareService_updateSquareAuthority_result {
	success: UpdateSquareAuthorityResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_updateSquareChatMember_result. */
export interface SquareService_updateSquareChatMember_result {
	success: UpdateSquareChatMemberResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_updateSquareChat_result. */
export interface SquareService_updateSquareChat_result {
	success: UpdateSquareChatResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_updateSquareFeatureSet_result. */
export interface SquareService_updateSquareFeatureSet_result {
	success: UpdateSquareFeatureSetResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_updateSquareMemberRelation_result. */
export interface SquareService_updateSquareMemberRelation_result {
	success: UpdateSquareMemberRelationResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_updateSquareMember_result. */
export interface SquareService_updateSquareMember_result {
	success: UpdateSquareMemberResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_updateSquareMembers_result. */
export interface SquareService_updateSquareMembers_result {
	success: UpdateSquareMembersResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_updateSquare_result. */
export interface SquareService_updateSquare_result {
	success: UpdateSquareResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_updateUserSettings_result. */
export interface SquareService_updateUserSettings_result {
	success: UpdateUserSettingsResponse;
	e: SquareException;
}

/** Wire-format fields for the LINE Thrift struct SquareService_agreeToTerms_args. */
export interface SquareService_agreeToTerms_args {
	request: AgreeToTermsRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_approveSquareMembers_args. */
export interface SquareService_approveSquareMembers_args {
	request: ApproveSquareMembersRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_checkJoinCode_args. */
export interface SquareService_checkJoinCode_args {
	request: CheckJoinCodeRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_createSquareChatAnnouncement_args. */
export interface SquareService_createSquareChatAnnouncement_args {
	createSquareChatAnnouncementRequest: CreateSquareChatAnnouncementRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_createSquareChat_args. */
export interface SquareService_createSquareChat_args {
	request: CreateSquareChatRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_createSquare_args. */
export interface SquareService_createSquare_args {
	request: CreateSquareRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_deleteSquareChatAnnouncement_args. */
export interface SquareService_deleteSquareChatAnnouncement_args {
	deleteSquareChatAnnouncementRequest: DeleteSquareChatAnnouncementRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_deleteSquareChat_args. */
export interface SquareService_deleteSquareChat_args {
	request: DeleteSquareChatRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_deleteSquare_args. */
export interface SquareService_deleteSquare_args {
	request: DeleteSquareRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_destroyMessage_args. */
export interface SquareService_destroyMessage_args {
	request: DestroyMessageRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_destroyMessages_args. */
export interface SquareService_destroyMessages_args {
	request: DestroyMessagesRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_fetchMyEvents_args. */
export interface SquareService_fetchMyEvents_args {
	request: FetchMyEventsRequest;
	success: FetchMyEventsResponse;
}

/** Wire-format fields for the LINE Thrift struct SquareService_fetchSquareChatEvents_args. */
export interface SquareService_fetchSquareChatEvents_args {
	request: FetchSquareChatEventsRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_findSquareByEmid_args. */
export interface SquareService_findSquareByEmid_args {
	findSquareByEmidRequest: FindSquareByEmidRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_findSquareByInvitationTicket_args. */
export interface SquareService_findSquareByInvitationTicket_args {
	request: FindSquareByInvitationTicketRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_findSquareByInvitationTicketV2_args. */
export interface SquareService_findSquareByInvitationTicketV2_args {
	request: FindSquareByInvitationTicketV2Request;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getGoogleAdOptions_args. */
export interface SquareService_getGoogleAdOptions_args {
	request: GetGoogleAdOptionsRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getInvitationTicketUrl_args. */
export interface SquareService_getInvitationTicketUrl_args {
	request: GetInvitationTicketUrlRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getJoinableSquareChats_args. */
export interface SquareService_getJoinableSquareChats_args {
	request: GetJoinableSquareChatsRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getJoinedSquareChats_args. */
export interface SquareService_getJoinedSquareChats_args {
	request: GetJoinedSquareChatsRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getJoinedSquares_args. */
export interface SquareService_getJoinedSquares_args {
	request: GetJoinedSquaresRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getMessageReactions_args. */
export interface SquareService_getMessageReactions_args {
	request: GetMessageReactionsRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getNoteStatus_args. */
export interface SquareService_getNoteStatus_args {
	request: GetNoteStatusRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getPopularKeywords_args. */
export interface SquareService_getPopularKeywords_args {
	request: GetPopularKeywordsRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareAuthorities_args. */
export interface SquareService_getSquareAuthorities_args {
	request: GetSquareAuthoritiesRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareAuthority_args. */
export interface SquareService_getSquareAuthority_args {
	request: GetSquareAuthorityRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getCategories_args. */
export interface SquareService_getCategories_args {
	request: GetSquareCategoriesRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareChatAnnouncements_args. */
export interface SquareService_getSquareChatAnnouncements_args {
	getSquareChatAnnouncementsRequest: GetSquareChatAnnouncementsRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareChatEmid_args. */
export interface SquareService_getSquareChatEmid_args {
	request: GetSquareChatEmidRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareChatFeatureSet_args. */
export interface SquareService_getSquareChatFeatureSet_args {
	request: GetSquareChatFeatureSetRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareChatMember_args. */
export interface SquareService_getSquareChatMember_args {
	request: GetSquareChatMemberRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareChatMembers_args. */
export interface SquareService_getSquareChatMembers_args {
	request: GetSquareChatMembersRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareChat_args. */
export interface SquareService_getSquareChat_args {
	request: GetSquareChatRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareChatStatus_args. */
export interface SquareService_getSquareChatStatus_args {
	request: GetSquareChatStatusRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareEmid_args. */
export interface SquareService_getSquareEmid_args {
	request: GetSquareEmidRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareFeatureSet_args. */
export interface SquareService_getSquareFeatureSet_args {
	request: GetSquareFeatureSetRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareMemberRelation_args. */
export interface SquareService_getSquareMemberRelation_args {
	request: GetSquareMemberRelationRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareMemberRelations_args. */
export interface SquareService_getSquareMemberRelations_args {
	request: GetSquareMemberRelationsRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareMember_args. */
export interface SquareService_getSquareMember_args {
	request: GetSquareMemberRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareMembersBySquare_args. */
export interface SquareService_getSquareMembersBySquare_args {
	request: GetSquareMembersBySquareRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareMembers_args. */
export interface SquareService_getSquareMembers_args {
	request: GetSquareMembersRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquare_args. */
export interface SquareService_getSquare_args {
	request: GetSquareRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareStatus_args. */
export interface SquareService_getSquareStatus_args {
	request: GetSquareStatusRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareThreadMid_args. */
export interface SquareService_getSquareThreadMid_args {
	request: GetSquareThreadMidRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getSquareThread_args. */
export interface SquareService_getSquareThread_args {
	request: GetSquareThreadRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_getUserSettings_args. */
export interface SquareService_getUserSettings_args {
	request: GetUserSettingsRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_hideSquareMemberContents_args. */
export interface SquareService_hideSquareMemberContents_args {
	request: HideSquareMemberContentsRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_inviteIntoSquareChat_args. */
export interface SquareService_inviteIntoSquareChat_args {
	request: InviteIntoSquareChatRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_inviteToSquare_args. */
export interface SquareService_inviteToSquare_args {
	request: InviteToSquareRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_joinSquareChat_args. */
export interface SquareService_joinSquareChat_args {
	request: JoinSquareChatRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_joinSquare_args. */
export interface SquareService_joinSquare_args {
	request: JoinSquareRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_joinSquareThread_args. */
export interface SquareService_joinSquareThread_args {
	request: JoinSquareThreadRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_leaveSquareChat_args. */
export interface SquareService_leaveSquareChat_args {
	request: LeaveSquareChatRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_leaveSquare_args. */
export interface SquareService_leaveSquare_args {
	request: LeaveSquareRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_leaveSquareThread_args. */
export interface SquareService_leaveSquareThread_args {
	request: LeaveSquareThreadRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_manualRepair_args. */
export interface SquareService_manualRepair_args {
	request: ManualRepairRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_markAsRead_args. */
export interface SquareService_markAsRead_args {
	request: MarkAsReadRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_markChatsAsRead_args. */
export interface SquareService_markChatsAsRead_args {
	request: MarkChatsAsReadRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_markThreadsAsRead_args. */
export interface SquareService_markThreadsAsRead_args {
	request: MarkThreadsAsReadRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_reactToMessage_args. */
export interface SquareService_reactToMessage_args {
	request: ReactToMessageRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_refreshSubscriptions_args. */
export interface SquareService_refreshSubscriptions_args {
	request: RefreshSubscriptionsRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_rejectSquareMembers_args. */
export interface SquareService_rejectSquareMembers_args {
	request: RejectSquareMembersRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_removeSubscriptions_args. */
export interface SquareService_removeSubscriptions_args {
	request: RemoveSubscriptionsRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_reportMessageSummary_args. */
export interface SquareService_reportMessageSummary_args {
	request: ReportMessageSummaryRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_reportSquareChat_args. */
export interface SquareService_reportSquareChat_args {
	request: ReportSquareChatRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_reportSquareMember_args. */
export interface SquareService_reportSquareMember_args {
	request: ReportSquareMemberRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_reportSquareMessage_args. */
export interface SquareService_reportSquareMessage_args {
	request: ReportSquareMessageRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_reportSquare_args. */
export interface SquareService_reportSquare_args {
	request: ReportSquareRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_searchSquareChatMembers_args. */
export interface SquareService_searchSquareChatMembers_args {
	request: SearchSquareChatMembersRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_searchSquareChatMentionables_args. */
export interface SquareService_searchSquareChatMentionables_args {
	request: SearchSquareChatMentionablesRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_searchSquareMembers_args. */
export interface SquareService_searchSquareMembers_args {
	request: SearchSquareMembersRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_searchSquares_args. */
export interface SquareService_searchSquares_args {
	request: SearchSquaresRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_sendMessage_args. */
export interface SquareService_sendMessage_args {
	request: SendMessageRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_sendSquareThreadMessage_args. */
export interface SquareService_sendSquareThreadMessage_args {
	request: SendSquareThreadMessageRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_syncSquareMembers_args. */
export interface SquareService_syncSquareMembers_args {
	request: SyncSquareMembersRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_unhideSquareMemberContents_args. */
export interface SquareService_unhideSquareMemberContents_args {
	request: UnhideSquareMemberContentsRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_unsendMessage_args. */
export interface SquareService_unsendMessage_args {
	request: UnsendMessageRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_updateSquareAuthority_args. */
export interface SquareService_updateSquareAuthority_args {
	request: UpdateSquareAuthorityRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_updateSquareChatMember_args. */
export interface SquareService_updateSquareChatMember_args {
	request: UpdateSquareChatMemberRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_updateSquareChat_args. */
export interface SquareService_updateSquareChat_args {
	request: UpdateSquareChatRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_updateSquareFeatureSet_args. */
export interface SquareService_updateSquareFeatureSet_args {
	request: UpdateSquareFeatureSetRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_updateSquareMemberRelation_args. */
export interface SquareService_updateSquareMemberRelation_args {
	request: UpdateSquareMemberRelationRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_updateSquareMember_args. */
export interface SquareService_updateSquareMember_args {
	request: UpdateSquareMemberRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_updateSquareMembers_args. */
export interface SquareService_updateSquareMembers_args {
	request: UpdateSquareMembersRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_updateSquare_args. */
export interface SquareService_updateSquare_args {
	request: UpdateSquareRequest;
}

/** Wire-format fields for the LINE Thrift struct SquareService_updateUserSettings_args. */
export interface SquareService_updateUserSettings_args {
	request: UpdateUserSettingsRequest;
}

/** Wire-format fields for the LINE Thrift struct approveChannelAndIssueChannelToken_args. */
export interface approveChannelAndIssueChannelToken_args {
	channelId: string;
}

/** Wire-format fields for the LINE Thrift struct approveChannelAndIssueChannelToken_result. */
export interface approveChannelAndIssueChannelToken_result {
	success: ChannelToken;
	e: ChannelException;
}

/** Wire-format fields for the LINE Thrift struct authenticateUsingBankAccountEx_args. */
export interface authenticateUsingBankAccountEx_args {
	type: r80_EnumC34362b;
	bankId: string;
	bankBranchId: string;
	realAccountNo: string;
	accountProductCode: r80_EnumC34361a;
	authToken: string;
}

/** Wire-format fields for the LINE Thrift struct authenticateUsingBankAccountEx_result. */
export interface authenticateUsingBankAccountEx_result {
	success: PaymentAuthenticationInfo;
	e: PaymentException;
}

/** Wire-format fields for the LINE Thrift struct authenticateWithPaak_args. */
export interface authenticateWithPaak_args {
	request: AuthenticateWithPaakRequest;
}

/** Wire-format fields for the LINE Thrift struct authenticateWithPaak_result. */
export interface authenticateWithPaak_result {
	success: o80_C32273b;
	e: SecondaryPwlessLoginException;
}

/** Wire-format fields for the LINE Thrift struct blockContact_args. */
export interface blockContact_args {
	reqSeq: number;
	id: string;
}

/** Wire-format fields for the LINE Thrift struct blockContact_result. */
export interface blockContact_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct blockRecommendation_args. */
export interface blockRecommendation_args {
	reqSeq: number;
	targetMid: string;
}

/** Wire-format fields for the LINE Thrift struct blockRecommendation_result. */
export interface blockRecommendation_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct bulkFollow_args. */
export interface bulkFollow_args {
	bulkFollowRequest: BulkFollowRequest;
}

/** Wire-format fields for the LINE Thrift struct bulkFollow_result. */
export interface bulkFollow_result {
	success: Pb1_C12996g1;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct bulkGetSetting_args. */
export interface bulkGetSetting_args {
	request: BulkGetRequest;
}

/** Wire-format fields for the LINE Thrift struct bulkGetSetting_result. */
export interface bulkGetSetting_result {
	success: any;
	e: SettingsException;
}

/** Wire-format fields for the LINE Thrift struct bulkSetSetting_args. */
export interface bulkSetSetting_args {
	request: any;
}

/** Wire-format fields for the LINE Thrift struct bulkSetSetting_result. */
export interface bulkSetSetting_result {
	success: any;
	e: SettingsException;
}

/** Wire-format fields for the LINE Thrift struct buyMustbuyProduct_args. */
export interface buyMustbuyProduct_args {
	request: BuyMustbuyRequest;
}

/** Wire-format fields for the LINE Thrift struct buyMustbuyProduct_result. */
export interface buyMustbuyProduct_result {
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct canCreateCombinationSticker_args. */
export interface canCreateCombinationSticker_args {
	request: CanCreateCombinationStickerRequest;
}

/** Wire-format fields for the LINE Thrift struct canCreateCombinationSticker_result. */
export interface canCreateCombinationSticker_result {
	success: CanCreateCombinationStickerResponse;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct canReceivePresent_args. */
export interface canReceivePresent_args {
	shopId: string;
	consentRequired: any;
	permanentLinkInvalidRequest: any;
	idFederationRequired: any;
}

/** Wire-format fields for the LINE Thrift struct canReceivePresent_result. */
export interface canReceivePresent_result {
	liffId: string;
	fallbackUrl: string;
}

/** Wire-format fields for the LINE Thrift struct cancelChatInvitation_args. */
export interface cancelChatInvitation_args {
	request: CancelChatInvitationRequest;
}

/** Wire-format fields for the LINE Thrift struct cancelChatInvitation_result. */
export interface cancelChatInvitation_result {
	success: Pb1_U1;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct cancelPaakAuth_args. */
export interface cancelPaakAuth_args {
	request: CancelPaakAuthRequest;
}

/** Wire-format fields for the LINE Thrift struct cancelPaakAuth_result. */
export interface cancelPaakAuth_result {
	success: o80_d;
	e: SecondaryPwlessLoginException;
}

/** Wire-format fields for the LINE Thrift struct cancelPaakAuthentication_args. */
export interface cancelPaakAuthentication_args {
	request: CancelPaakAuthenticationRequest;
}

/** Wire-format fields for the LINE Thrift struct cancelPaakAuthentication_result. */
export interface cancelPaakAuthentication_result {
	success: n80_d;
	cpae: ChannelPaakAuthnException;
	tae: TokenAuthException;
}

/** Wire-format fields for the LINE Thrift struct cancelPinCode_args. */
export interface cancelPinCode_args {
	request: CancelPinCodeRequest;
}

/** Wire-format fields for the LINE Thrift struct cancelPinCode_result. */
export interface cancelPinCode_result {
	success: q80_C33650b;
	e: SecondaryQrCodeException;
}

/** Wire-format fields for the LINE Thrift struct cancelReaction_args. */
export interface cancelReaction_args {
	cancelReactionRequest: CancelReactionRequest;
}

/** Wire-format fields for the LINE Thrift struct cancelReaction_result. */
export interface cancelReaction_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct changeSubscription_args. */
export interface changeSubscription_args {
	req: any;
}

/** Wire-format fields for the LINE Thrift struct changeSubscription_result. */
export interface changeSubscription_result {
	success: ChangeSubscriptionResponse;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct changeVerificationMethod_args. */
export interface changeVerificationMethod_args {
	sessionId: string;
	method: VerificationMethod;
}

/** Wire-format fields for the LINE Thrift struct changeVerificationMethod_result. */
export interface changeVerificationMethod_result {
	success: VerificationSessionData;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct checkCanUnregisterEx_args. */
export interface checkCanUnregisterEx_args {
	type: r80_n0;
}

/** Wire-format fields for the LINE Thrift struct checkCanUnregisterEx_result. */
export interface checkCanUnregisterEx_result {
	success: UnregisterAvailabilityInfo;
	e: PaymentException;
}

/** Wire-format fields for the LINE Thrift struct I80_C26370F. */
export interface I80_C26370F {
	request: I80_C26396d;
}

/** Wire-format fields for the LINE Thrift struct checkEmailAssigned_args. */
export interface checkEmailAssigned_args {
	authSessionId: string;
	accountIdentifier: AccountIdentifier;
}

/** Wire-format fields for the LINE Thrift struct checkEmailAssigned_result. */
export interface checkEmailAssigned_result {
	success: CheckEmailAssignedResponse;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct I80_C26371G. */
export interface I80_C26371G {
	success: I80_C26398e;
	e: I80_C26390a;
}

/** Wire-format fields for the LINE Thrift struct checkIfEncryptedE2EEKeyReceived_args. */
export interface checkIfEncryptedE2EEKeyReceived_args {
	request: CheckIfEncryptedE2EEKeyReceivedRequest;
}

/** Wire-format fields for the LINE Thrift struct checkIfEncryptedE2EEKeyReceived_result. */
export interface checkIfEncryptedE2EEKeyReceived_result {
	success: CheckIfEncryptedE2EEKeyReceivedResponse;
	e: PrimaryQrCodeMigrationException;
}

/** Wire-format fields for the LINE Thrift struct I80_C26372H. */
export interface I80_C26372H {
	request: I80_C26400f;
}

/** Wire-format fields for the LINE Thrift struct checkIfPasswordSetVerificationEmailVerified_args. */
export interface checkIfPasswordSetVerificationEmailVerified_args {
	authSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct checkIfPasswordSetVerificationEmailVerified_result. */
export interface checkIfPasswordSetVerificationEmailVerified_result {
	success: T70_C14398f;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct I80_C26373I. */
export interface I80_C26373I {
	success: I80_C26402g;
	e: I80_C26390a;
}

/** Wire-format fields for the LINE Thrift struct checkIfPhonePinCodeMsgVerified_args. */
export interface checkIfPhonePinCodeMsgVerified_args {
	request: CheckIfPhonePinCodeMsgVerifiedRequest;
}

/** Wire-format fields for the LINE Thrift struct checkIfPhonePinCodeMsgVerified_result. */
export interface checkIfPhonePinCodeMsgVerified_result {
	success: CheckIfPhonePinCodeMsgVerifiedResponse;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct checkOperationTimeEx_args. */
export interface checkOperationTimeEx_args {
	type: r80_EnumC34368h;
	lpAccountNo: string;
	channelType: r80_EnumC34371k;
}

/** Wire-format fields for the LINE Thrift struct checkOperationTimeEx_result. */
export interface checkOperationTimeEx_result {
	success: CheckOperationResult;
	e: PaymentException;
}

/** Wire-format fields for the LINE Thrift struct checkUserAgeAfterApprovalWithDocomoV2_args. */
export interface checkUserAgeAfterApprovalWithDocomoV2_args {
	request: CheckUserAgeAfterApprovalWithDocomoV2Request;
}

/** Wire-format fields for the LINE Thrift struct checkUserAgeAfterApprovalWithDocomoV2_result. */
export interface checkUserAgeAfterApprovalWithDocomoV2_result {
	success: CheckUserAgeAfterApprovalWithDocomoV2Response;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct checkUserAgeWithDocomoV2_args. */
export interface checkUserAgeWithDocomoV2_args {
	request: CheckUserAgeWithDocomoV2Request;
}

/** Wire-format fields for the LINE Thrift struct checkUserAgeWithDocomoV2_result. */
export interface checkUserAgeWithDocomoV2_result {
	success: CheckUserAgeWithDocomoV2Response;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct checkUserAge_args. */
export interface checkUserAge_args {
	carrier: CarrierCode;
	sessionId: string;
	verifier: string;
	standardAge: number;
}

/** Wire-format fields for the LINE Thrift struct checkUserAge_result. */
export interface checkUserAge_result {
	success: Pb1_gd;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct clearRingbackTone_result. */
export interface clearRingbackTone_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct clearRingtone_args. */
export interface clearRingtone_args {
	oid: string;
}

/** Wire-format fields for the LINE Thrift struct clearRingtone_result. */
export interface clearRingtone_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct AcceptSpeakersResponse. */
export interface AcceptSpeakersResponse {
}

/** Wire-format fields for the LINE Thrift struct AcceptToChangeRoleResponse. */
export interface AcceptToChangeRoleResponse {
}

/** Wire-format fields for the LINE Thrift struct AcceptToListenResponse. */
export interface AcceptToListenResponse {
}

/** Wire-format fields for the LINE Thrift struct AcceptToSpeakResponse. */
export interface AcceptToSpeakResponse {
}

/** Wire-format fields for the LINE Thrift struct AgreeToTermsResponse. */
export interface AgreeToTermsResponse {
}

/** Wire-format fields for the LINE Thrift struct AllNonMemberLiveTalkParticipants. */
export interface AllNonMemberLiveTalkParticipants {
}

/** Wire-format fields for the LINE Thrift struct CancelToSpeakResponse. */
export interface CancelToSpeakResponse {
}

/** Wire-format fields for the LINE Thrift struct DeleteSquareChatAnnouncementResponse. */
export interface DeleteSquareChatAnnouncementResponse {
}

/** Wire-format fields for the LINE Thrift struct DeleteSquareChatResponse. */
export interface DeleteSquareChatResponse {
}

/** Wire-format fields for the LINE Thrift struct DeleteSquareResponse. */
export interface DeleteSquareResponse {
}

/** Wire-format fields for the LINE Thrift struct DestroyMessageResponse. */
export interface DestroyMessageResponse {
}

/** Wire-format fields for the LINE Thrift struct DestroyMessagesResponse. */
export interface DestroyMessagesResponse {
}

/** Wire-format fields for the LINE Thrift struct ForceEndLiveTalkResponse. */
export interface ForceEndLiveTalkResponse {
}

/** Wire-format fields for the LINE Thrift struct GetPopularKeywordsRequest. */
export interface GetPopularKeywordsRequest {
}

/** Wire-format fields for the LINE Thrift struct GetSquareCategoriesRequest. */
export interface GetSquareCategoriesRequest {
}

/** Wire-format fields for the LINE Thrift struct HideSquareMemberContentsResponse. */
export interface HideSquareMemberContentsResponse {
}

/** Wire-format fields for the LINE Thrift struct InviteToChangeRoleResponse. */
export interface InviteToChangeRoleResponse {
}

/** Wire-format fields for the LINE Thrift struct InviteToListenResponse. */
export interface InviteToListenResponse {
}

/** Wire-format fields for the LINE Thrift struct InviteToLiveTalkResponse. */
export interface InviteToLiveTalkResponse {
}

/** Wire-format fields for the LINE Thrift struct InviteToSquareResponse. */
export interface InviteToSquareResponse {
}

/** Wire-format fields for the LINE Thrift struct KickOutLiveTalkParticipantsResponse. */
export interface KickOutLiveTalkParticipantsResponse {
}

/** Wire-format fields for the LINE Thrift struct LeaveSquareChatResponse. */
export interface LeaveSquareChatResponse {
}

/** Wire-format fields for the LINE Thrift struct LeaveSquareResponse. */
export interface LeaveSquareResponse {
}

/** Wire-format fields for the LINE Thrift struct LiveTalkEventPayload. */
export interface LiveTalkEventPayload {
	notifiedUpdateLiveTalkTitle: LiveTalkEventNotifiedUpdateLiveTalkTitle;
	notifiedUpdateLiveTalkAnnouncement:
		LiveTalkEventNotifiedUpdateLiveTalkAnnouncement;
	notifiedUpdateSquareMemberRole: LiveTalkEventNotifiedUpdateSquareMemberRole;
	notifiedUpdateLiveTalkAllowRequestToSpeak:
		LiveTalkEventNotifiedUpdateLiveTalkAllowRequestToSpeak;
	notifiedUpdateSquareMember: LiveTalkEventNotifiedUpdateSquareMember;
}

/** Wire-format fields for the LINE Thrift struct LiveTalkKickOutTarget. */
export interface LiveTalkKickOutTarget {
	liveTalkParticipant: LiveTalkParticipant;
	allNonMemberLiveTalkParticipants: AllNonMemberLiveTalkParticipants;
}

/** Wire-format fields for the LINE Thrift struct MarkAsReadResponse. */
export interface MarkAsReadResponse {
}

/** Wire-format fields for the LINE Thrift struct MarkChatsAsReadResponse. */
export interface MarkChatsAsReadResponse {
}

/** Wire-format fields for the LINE Thrift struct MarkThreadsAsReadResponse. */
export interface MarkThreadsAsReadResponse {
}

/** Wire-format fields for the LINE Thrift struct RejectSpeakersResponse. */
export interface RejectSpeakersResponse {
}

/** Wire-format fields for the LINE Thrift struct RejectToSpeakResponse. */
export interface RejectToSpeakResponse {
}

/** Wire-format fields for the LINE Thrift struct RemoveLiveTalkSubscriptionResponse. */
export interface RemoveLiveTalkSubscriptionResponse {
}

/** Wire-format fields for the LINE Thrift struct RemoveSubscriptionsResponse. */
export interface RemoveSubscriptionsResponse {
}

/** Wire-format fields for the LINE Thrift struct ReportLiveTalkResponse. */
export interface ReportLiveTalkResponse {
}

/** Wire-format fields for the LINE Thrift struct ReportLiveTalkSpeakerResponse. */
export interface ReportLiveTalkSpeakerResponse {
}

/** Wire-format fields for the LINE Thrift struct ReportMessageSummaryResponse. */
export interface ReportMessageSummaryResponse {
}

/** Wire-format fields for the LINE Thrift struct ReportSquareChatResponse. */
export interface ReportSquareChatResponse {
}

/** Wire-format fields for the LINE Thrift struct ReportSquareMemberResponse. */
export interface ReportSquareMemberResponse {
}

/** Wire-format fields for the LINE Thrift struct ReportSquareMessageResponse. */
export interface ReportSquareMessageResponse {
}

/** Wire-format fields for the LINE Thrift struct ReportSquareResponse. */
export interface ReportSquareResponse {
}

/** Wire-format fields for the LINE Thrift struct RequestToListenResponse. */
export interface RequestToListenResponse {
}

/** Wire-format fields for the LINE Thrift struct RequestToSpeakResponse. */
export interface RequestToSpeakResponse {
}

/** Wire-format fields for the LINE Thrift struct SquareEventPayload. */
export interface SquareEventPayload {
	receiveMessage: SquareEventReceiveMessage;
	sendMessage: SquareEventSendMessage;
	notifiedJoinSquareChat: SquareEventNotifiedJoinSquareChat;
	notifiedInviteIntoSquareChat: SquareEventNotifiedInviteIntoSquareChat;
	notifiedLeaveSquareChat: SquareEventNotifiedLeaveSquareChat;
	notifiedDestroyMessage: SquareEventNotifiedDestroyMessage;
	notifiedMarkAsRead: SquareEventNotifiedMarkAsRead;
	notifiedUpdateSquareMemberProfile:
		SquareEventNotifiedUpdateSquareMemberProfile;
	notifiedUpdateSquare: SquareEventNotifiedUpdateSquare;
	notifiedUpdateSquareMember: SquareEventNotifiedUpdateSquareMember;
	notifiedUpdateSquareChat: SquareEventNotifiedUpdateSquareChat;
	notifiedUpdateSquareChatMember: SquareEventNotifiedUpdateSquareChatMember;
	notifiedUpdateSquareAuthority: SquareEventNotifiedUpdateSquareAuthority;
	notifiedUpdateSquareStatus: SquareEventNotifiedUpdateSquareStatus;
	notifiedUpdateSquareChatStatus: SquareEventNotifiedUpdateSquareChatStatus;
	notifiedCreateSquareMember: SquareEventNotifiedCreateSquareMember;
	notifiedCreateSquareChatMember: SquareEventNotifiedCreateSquareChatMember;
	notifiedUpdateSquareMemberRelation:
		SquareEventNotifiedUpdateSquareMemberRelation;
	notifiedShutdownSquare: SquareEventNotifiedShutdownSquare;
	notifiedKickoutFromSquare: SquareEventNotifiedKickoutFromSquare;
	notifiedDeleteSquareChat: SquareEventNotifiedDeleteSquareChat;
	notificationJoinRequest: SquareEventNotificationJoinRequest;
	notificationJoined: SquareEventNotificationMemberUpdate;
	notificationPromoteCoadmin: SquareEventNotificationMemberUpdate;
	notificationPromoteAdmin: SquareEventNotificationMemberUpdate;
	notificationDemoteMember: SquareEventNotificationMemberUpdate;
	notificationKickedOut: SquareEventNotificationMemberUpdate;
	notificationSquareDelete: SquareEventNotificationSquareDelete;
	notificationSquareChatDelete: SquareEventNotificationSquareChatDelete;
	notificationMessage: SquareEventNotificationMessage;
	notifiedUpdateSquareChatProfileName:
		SquareEventNotifiedUpdateSquareChatProfileName;
	notifiedUpdateSquareChatProfileImage:
		SquareEventNotifiedUpdateSquareChatProfileImage;
	notifiedUpdateSquareFeatureSet: SquareEventNotifiedUpdateSquareFeatureSet;
	notifiedAddBot: SquareEventNotifiedAddBot;
	notifiedRemoveBot: SquareEventNotifiedRemoveBot;
	notifiedUpdateSquareNoteStatus: SquareEventNotifiedUpdateSquareNoteStatus;
	notifiedUpdateSquareChatAnnouncement:
		SquareEventNotifiedUpdateSquareChatAnnouncement;
	notifiedUpdateSquareChatMaxMemberCount:
		SquareEventNotifiedUpdateSquareChatMaxMemberCount;
	notificationPostAnnouncement: SquareEventNotificationPostAnnouncement;
	notificationPost: SquareEventNotificationPost;
	mutateMessage: SquareEventMutateMessage;
	notificationNewChatMember: SquareEventNotificationNewChatMember;
	notifiedUpdateReadonlyChat: SquareEventNotifiedUpdateReadonlyChat;
	notifiedUpdateMessageStatus: SquareEventNotifiedUpdateMessageStatus;
	notificationMessageReaction: SquareEventNotificationMessageReaction;
	chatPopup: SquareEventChatPopup;
	notifiedSystemMessage: SquareEventNotifiedSystemMessage;
	notifiedUpdateSquareChatFeatureSet:
		SquareEventNotifiedUpdateSquareChatFeatureSet;
	notifiedUpdateLiveTalkInfo: SquareEventNotifiedUpdateLiveTalkInfo;
	notifiedUpdateLiveTalk: SquareEventNotifiedUpdateLiveTalk;
	notificationLiveTalk: SquareEventNotificationLiveTalk;
	notificationThreadMessage: SquareEventNotificationThreadMessage;
	notificationThreadMessageReaction:
		SquareEventNotificationThreadMessageReaction;
	notifiedUpdateThread: SquareEventNotifiedUpdateThread;
	notifiedUpdateThreadStatus: SquareEventNotifiedUpdateThreadStatus;
	notifiedUpdateThreadMember: SquareEventNotifiedUpdateThreadMember;
	notifiedUpdateThreadRootMessage: SquareEventNotifiedUpdateThreadRootMessage;
	notifiedUpdateThreadRootMessageStatus:
		SquareEventNotifiedUpdateThreadRootMessageStatus;
	notifiedCreateSquareSubscription: any;
	notifiedUpdateSquareSubscription: any;
}

/** Wire-format fields for the LINE Thrift struct UnhideSquareMemberContentsResponse. */
export interface UnhideSquareMemberContentsResponse {
}

/** Wire-format fields for the LINE Thrift struct UpdateLiveTalkAttrsResponse. */
export interface UpdateLiveTalkAttrsResponse {
}

/** Wire-format fields for the LINE Thrift struct UpdateUserSettingsResponse. */
export interface UpdateUserSettingsResponse {
}

/** Wire-format fields for the LINE Thrift struct ButtonBGColor. */
export interface ButtonBGColor {
	custom: CustomColor;
	defaultGradient: DefaultGradientColor;
}

/** Wire-format fields for the LINE Thrift struct ButtonContent. */
export interface ButtonContent {
	urlButton: UrlButton;
	textButton: TextButton;
	okButton: OkButton;
}

/** Wire-format fields for the LINE Thrift struct DefaultGradientColor. */
export interface DefaultGradientColor {
}

/** Wire-format fields for the LINE Thrift struct ErrorExtraInfo. */
export interface ErrorExtraInfo {
	preconditionFailedExtraInfo: number;
	userRestrictionInfo: UserRestrictionExtraInfo;
	tryAgainLaterExtraInfo: TryAgainLaterExtraInfo;
	liveTalkExtraInfo: LiveTalkExtraInfo;
	termsAgreementExtraInfo: TermsAgreementExtraInfo;
}

/** Wire-format fields for the LINE Thrift struct Mentionable. */
export interface Mentionable {
	squareMember: MentionableSquareMember;
	bot: MentionableBot;
}

/** Wire-format fields for the LINE Thrift struct MessageStatusContents. */
export interface MessageStatusContents {
	messageReactionStatus: any;
}

/** Wire-format fields for the LINE Thrift struct SquareActivityScore. */
export interface SquareActivityScore {
	cleanScore: any;
}

/** Wire-format fields for the LINE Thrift struct SquareChatAnnouncementContents. */
export interface SquareChatAnnouncementContents {
	textMessageAnnouncementContents: TextMessageAnnouncementContents;
}

/** Wire-format fields for the LINE Thrift struct TargetChats. */
export interface TargetChats {
	mids: string[];
	categories: string[];
	channelId: number;
}

/** Wire-format fields for the LINE Thrift struct TargetUsers. */
export interface TargetUsers {
	mids: string[];
}

/** Wire-format fields for the LINE Thrift struct TermsAgreement. */
export interface TermsAgreement {
	aiQnABot: any;
	paidSquareSubscription: any;
	paidSquareCreation: any;
}

/** Wire-format fields for the LINE Thrift struct confirmIdentifier_args. */
export interface confirmIdentifier_args {
	authSessionId: string;
	request: IdentityCredentialRequest;
}

/** Wire-format fields for the LINE Thrift struct confirmIdentifier_result. */
export interface confirmIdentifier_result {
	success: IdentityCredentialResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct connectEapAccount_args. */
export interface connectEapAccount_args {
	request: ConnectEapAccountRequest;
}

/** Wire-format fields for the LINE Thrift struct connectEapAccount_result. */
export interface connectEapAccount_result {
	success: Q70_l;
	e: AccountEapConnectException;
}

/** Wire-format fields for the LINE Thrift struct createChatRoomAnnouncement_args. */
export interface createChatRoomAnnouncement_args {
	reqSeq: number;
	chatRoomMid: string;
	type: Pb1_X2;
	contents: ChatRoomAnnouncementContents;
}

/** Wire-format fields for the LINE Thrift struct createChatRoomAnnouncement_result. */
export interface createChatRoomAnnouncement_result {
	success: ChatRoomAnnouncement;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct createChat_args. */
export interface createChat_args {
	request: CreateChatRequest;
}

/** Wire-format fields for the LINE Thrift struct createChat_result. */
export interface createChat_result {
	success: CreateChatResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct createCollectionForUser_args. */
export interface createCollectionForUser_args {
	request: any;
}

/** Wire-format fields for the LINE Thrift struct createCollectionForUser_result. */
export interface createCollectionForUser_result {
	success: any;
	e: CollectionException;
}

/** Wire-format fields for the LINE Thrift struct createCombinationSticker_args. */
export interface createCombinationSticker_args {
	request: any;
}

/** Wire-format fields for the LINE Thrift struct createCombinationSticker_result. */
export interface createCombinationSticker_result {
	success: any;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct createE2EEKeyBackupEnforced_args. */
export interface createE2EEKeyBackupEnforced_args {
	request: Pb1_C13263z3;
}

/** Wire-format fields for the LINE Thrift struct createE2EEKeyBackupEnforced_result. */
export interface createE2EEKeyBackupEnforced_result {
	success: Pb1_B3;
	e: E2EEKeyBackupException;
}

/** Wire-format fields for the LINE Thrift struct createGroupCallUrl_args. */
export interface createGroupCallUrl_args {
	request: CreateGroupCallUrlRequest;
}

/** Wire-format fields for the LINE Thrift struct createGroupCallUrl_result. */
export interface createGroupCallUrl_result {
	success: CreateGroupCallUrlResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct createLifetimeKeyBackup_args. */
export interface createLifetimeKeyBackup_args {
	request: Pb1_E3;
}

/** Wire-format fields for the LINE Thrift struct createLifetimeKeyBackup_result. */
export interface createLifetimeKeyBackup_result {
	success: Pb1_F3;
	e: E2EEKeyBackupException;
}

/** Wire-format fields for the LINE Thrift struct createMultiProfile_args. */
export interface createMultiProfile_args {
	request: CreateMultiProfileRequest;
}

/** Wire-format fields for the LINE Thrift struct createMultiProfile_result. */
export interface createMultiProfile_result {
	success: CreateMultiProfileResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct createRoomV2_args. */
export interface createRoomV2_args {
	reqSeq: number;
	contactIds: string[];
}

/** Wire-format fields for the LINE Thrift struct createRoomV2_result. */
export interface createRoomV2_result {
	success: Room;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct createSession_args. */
export interface createSession_args {
	request: h80_C25643c;
}

/** Wire-format fields for the LINE Thrift struct I80_C26365A. */
export interface I80_C26365A {
	request: I80_C26404h;
}

/** Wire-format fields for the LINE Thrift struct createSession_result. */
export interface createSession_result {
	success: CreateSessionResponse;
	pqme: PrimaryQrCodeMigrationException;
	tae: TokenAuthException;
}

/** Wire-format fields for the LINE Thrift struct I80_C26366B. */
export interface I80_C26366B {
	success: I80_C26406i;
	e: I80_C26390a;
	tae: TokenAuthException;
}

/** Wire-format fields for the LINE Thrift struct decryptFollowEMid_args. */
export interface decryptFollowEMid_args {
	eMid: string;
}

/** Wire-format fields for the LINE Thrift struct decryptFollowEMid_result. */
export interface decryptFollowEMid_result {
	success: string;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct deleteE2EEKeyBackup_args. */
export interface deleteE2EEKeyBackup_args {
	request: Pb1_H3;
}

/** Wire-format fields for the LINE Thrift struct deleteE2EEKeyBackup_result. */
export interface deleteE2EEKeyBackup_result {
	success: Pb1_I3;
	e: E2EEKeyBackupException;
}

/** Wire-format fields for the LINE Thrift struct deleteGroupCallUrl_args. */
export interface deleteGroupCallUrl_args {
	request: DeleteGroupCallUrlRequest;
}

/** Wire-format fields for the LINE Thrift struct deleteGroupCallUrl_result. */
export interface deleteGroupCallUrl_result {
	success: Pb1_K3;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct deleteMultiProfile_args. */
export interface deleteMultiProfile_args {
	request: DeleteMultiProfileRequest;
}

/** Wire-format fields for the LINE Thrift struct deleteMultiProfile_result. */
export interface deleteMultiProfile_result {
	success: gN0_C25147d;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct deleteOtherFromChat_args. */
export interface deleteOtherFromChat_args {
	request: DeleteOtherFromChatRequest;
}

/** Wire-format fields for the LINE Thrift struct deleteOtherFromChat_result. */
export interface deleteOtherFromChat_result {
	success: Pb1_M3;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct deletePrimaryCredential_args. */
export interface deletePrimaryCredential_args {
	request: R70_c;
}

/** Wire-format fields for the LINE Thrift struct deletePrimaryCredential_result. */
export interface deletePrimaryCredential_result {
	success: R70_d;
	e: PwlessCredentialException;
}

/** Wire-format fields for the LINE Thrift struct deleteSafetyStatus_args. */
export interface deleteSafetyStatus_args {
	req: DeleteSafetyStatusRequest;
}

/** Wire-format fields for the LINE Thrift struct deleteSafetyStatus_result. */
export interface deleteSafetyStatus_result {
	e: any;
}

/** Wire-format fields for the LINE Thrift struct deleteSelfFromChat_args. */
export interface deleteSelfFromChat_args {
	request: DeleteSelfFromChatRequest;
}

/** Wire-format fields for the LINE Thrift struct deleteSelfFromChat_result. */
export interface deleteSelfFromChat_result {
	success: Pb1_O3;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct determineMediaMessageFlow_args. */
export interface determineMediaMessageFlow_args {
	request: DetermineMediaMessageFlowRequest;
}

/** Wire-format fields for the LINE Thrift struct determineMediaMessageFlow_result. */
export interface determineMediaMessageFlow_result {
	success: DetermineMediaMessageFlowResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct disableNearby_result. */
export interface disableNearby_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct disconnectEapAccount_args. */
export interface disconnectEapAccount_args {
	request: DisconnectEapAccountRequest;
}

/** Wire-format fields for the LINE Thrift struct disconnectEapAccount_result. */
export interface disconnectEapAccount_result {
	success: Q70_o;
	e: AccountEapConnectException;
}

/** Wire-format fields for the LINE Thrift struct do0_C23138A. */
export interface do0_C23138A {
	connectDevice: ConnectDeviceOperation;
	executeOnetimeScenario: ExecuteOnetimeScenarioOperation;
}

/** Wire-format fields for the LINE Thrift struct do0_C23141D. */
export interface do0_C23141D {
	gattRead: GattReadAction;
	gattWrite: do0_C23158p;
	sleep: SleepAction;
	disconnect: do0_C23153k;
	stopNotification: StopNotificationAction;
}

/** Wire-format fields for the LINE Thrift struct do0_C23142E. */
export interface do0_C23142E {
	voidResult: do0_m0;
	binaryResult: do0_C23143a;
}

/** Wire-format fields for the LINE Thrift struct do0_C23143a. */
export interface do0_C23143a {
	bytes: string;
}

/** Wire-format fields for the LINE Thrift struct do0_C23152j. */
export interface do0_C23152j {
}

/** Wire-format fields for the LINE Thrift struct do0_C23153k. */
export interface do0_C23153k {
}

/** Wire-format fields for the LINE Thrift struct do0_C23158p. */
export interface do0_C23158p {
	serviceUuid: string;
	characteristicUuid: string;
	data: string;
}

/** Wire-format fields for the LINE Thrift struct do0_C23161t. */
export interface do0_C23161t {
}

/** Wire-format fields for the LINE Thrift struct do0_C23165x. */
export interface do0_C23165x {
}

/** Wire-format fields for the LINE Thrift struct do0_C23167z. */
export interface do0_C23167z {
}

/** Wire-format fields for the LINE Thrift struct do0_F. */
export interface do0_F {
	scenarioId: string;
	deviceId: string;
	revision: Int64;
	startTime: Int64;
	endTime: Int64;
	code: do0_G;
	errorReason: string;
	bleNotificationPayload: string;
	actionResults: do0_C23142E[];
	connectionId: string;
}

/** Wire-format fields for the LINE Thrift struct do0_I. */
export interface do0_I {
	immediate: do0_C23161t;
	bleNotificationReceived: BleNotificationReceivedTrigger;
}

/** Wire-format fields for the LINE Thrift struct do0_V. */
export interface do0_V {
}

/** Wire-format fields for the LINE Thrift struct do0_X. */
export interface do0_X {
}

/** Wire-format fields for the LINE Thrift struct do0_m0. */
export interface do0_m0 {
}

/** Wire-format fields for the LINE Thrift struct editItemsInCollection_args. */
export interface editItemsInCollection_args {
	request: any;
}

/** Wire-format fields for the LINE Thrift struct editItemsInCollection_result. */
export interface editItemsInCollection_result {
	success: any;
	e: CollectionException;
}

/** Wire-format fields for the LINE Thrift struct enablePointForOneTimeKey_args. */
export interface enablePointForOneTimeKey_args {
	usePoint: boolean;
}

/** Wire-format fields for the LINE Thrift struct enablePointForOneTimeKey_result. */
export interface enablePointForOneTimeKey_result {
	e: PaymentException;
}

/** Wire-format fields for the LINE Thrift struct establishE2EESession_args. */
export interface establishE2EESession_args {
	squareBot: any;
}

/** Wire-format fields for the LINE Thrift struct establishE2EESession_result. */
export interface establishE2EESession_result {
	success: any;
	botMid: string;
	active: boolean;
	displayName: string;
	profileImageObsHash: string;
	iconType: number;
	lastModifiedAt: Int64;
	expiredIn: Int64;
}

/** Wire-format fields for the LINE Thrift struct existPinCode_args. */
export interface existPinCode_args {
	request: S70_b;
}

/** Wire-format fields for the LINE Thrift struct existPinCode_result. */
export interface existPinCode_result {
	success: ExistPinCodeResponse;
	e: SecondAuthFactorPinCodeException;
}

/** Wire-format fields for the LINE Thrift struct fN0_C24471c. */
export interface fN0_C24471c {
}

/** Wire-format fields for the LINE Thrift struct fN0_C24473e. */
export interface fN0_C24473e {
}

/** Wire-format fields for the LINE Thrift struct fN0_C24475g. */
export interface fN0_C24475g {
}

/** Wire-format fields for the LINE Thrift struct fN0_C24476h. */
export interface fN0_C24476h {
}

/** Wire-format fields for the LINE Thrift struct fetchOperations_args. */
export interface fetchOperations_args {
	request: FetchOperationsRequest;
}

/** Wire-format fields for the LINE Thrift struct fetchOperations_result. */
export interface fetchOperations_result {
	success: FetchOperationsResponse;
	e: ThingsException;
}

/** Wire-format fields for the LINE Thrift struct fetchPhonePinCodeMsg_args. */
export interface fetchPhonePinCodeMsg_args {
	request: FetchPhonePinCodeMsgRequest;
}

/** Wire-format fields for the LINE Thrift struct fetchPhonePinCodeMsg_result. */
export interface fetchPhonePinCodeMsg_result {
	success: FetchPhonePinCodeMsgResponse;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct findAndAddContactByMetaTag_result. */
export interface findAndAddContactByMetaTag_result {
	success: Contact;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct findAndAddContactsByMid_result. */
export interface findAndAddContactsByMid_result {
	success: Record<string, Contact>;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct findAndAddContactsByPhone_result. */
export interface findAndAddContactsByPhone_result {
	success: Record<string, Contact>;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct findAndAddContactsByUserid_result. */
export interface findAndAddContactsByUserid_result {
	success: Record<string, Contact>;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct findBuddyContactsByQuery_args. */
export interface findBuddyContactsByQuery_args {
	language: string;
	country: string;
	query: string;
	fromIndex: number;
	count: number;
	requestSource: Pb1_F0;
}

/** Wire-format fields for the LINE Thrift struct findBuddyContactsByQuery_result. */
export interface findBuddyContactsByQuery_result {
	success: BuddySearchResult[];
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct findChatByTicket_args. */
export interface findChatByTicket_args {
	request: FindChatByTicketRequest;
}

/** Wire-format fields for the LINE Thrift struct findChatByTicket_result. */
export interface findChatByTicket_result {
	success: FindChatByTicketResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct findContactByUserTicket_args. */
export interface findContactByUserTicket_args {
	ticketIdWithTag: string;
}

/** Wire-format fields for the LINE Thrift struct findContactByUserTicket_result. */
export interface findContactByUserTicket_result {
	success: Contact;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct findContactByUserid_args. */
export interface findContactByUserid_args {
	searchId: string;
}

/** Wire-format fields for the LINE Thrift struct findContactByUserid_result. */
export interface findContactByUserid_result {
	success: Contact;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct findContactsByPhone_args. */
export interface findContactsByPhone_args {
	phones: string[];
}

/** Wire-format fields for the LINE Thrift struct findContactsByPhone_result. */
export interface findContactsByPhone_result {
	success: Record<string, Contact>;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct finishUpdateVerification_args. */
export interface finishUpdateVerification_args {
	sessionId: string;
}

/** Wire-format fields for the LINE Thrift struct finishUpdateVerification_result. */
export interface finishUpdateVerification_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct follow_args. */
export interface follow_args {
	followRequest: FollowRequest;
}

/** Wire-format fields for the LINE Thrift struct follow_result. */
export interface follow_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct gN0_C25143G. */
export interface gN0_C25143G {
}

/** Wire-format fields for the LINE Thrift struct gN0_C25147d. */
export interface gN0_C25147d {
}

/** Wire-format fields for the LINE Thrift struct generateUserTicket_args. */
export interface generateUserTicket_args {
	expirationTime: Int64;
	maxUseCount: number;
}

/** Wire-format fields for the LINE Thrift struct generateUserTicket_result. */
export interface generateUserTicket_result {
	success: Ticket;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getAccessToken_args. */
export interface getAccessToken_args {
	request: GetAccessTokenRequest;
}

/** Wire-format fields for the LINE Thrift struct getAccessToken_result. */
export interface getAccessToken_result {
	success: GetAccessTokenResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getAccountBalanceAsync_args. */
export interface getAccountBalanceAsync_args {
	requestToken: string;
	accountId: string;
}

/** Wire-format fields for the LINE Thrift struct getAccountBalanceAsync_result. */
export interface getAccountBalanceAsync_result {
	e: PaymentException;
}

/** Wire-format fields for the LINE Thrift struct I80_C26374J. */
export interface I80_C26374J {
	request: I80_C26410k;
}

/** Wire-format fields for the LINE Thrift struct getAcctVerifMethod_args. */
export interface getAcctVerifMethod_args {
	authSessionId: string;
	accountIdentifier: AccountIdentifier;
}

/** Wire-format fields for the LINE Thrift struct getAcctVerifMethod_result. */
export interface getAcctVerifMethod_result {
	success: GetAcctVerifMethodResponse;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct I80_C26375K. */
export interface I80_C26375K {
	success: I80_C26412l;
	e: I80_C26390a;
}

/** Wire-format fields for the LINE Thrift struct getAllChatMids_args. */
export interface getAllChatMids_args {
	request: GetAllChatMidsRequest;
	syncReason: Pb1_V7;
}

/** Wire-format fields for the LINE Thrift struct getAllChatMids_result. */
export interface getAllChatMids_result {
	success: GetAllChatMidsResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getAllContactIds_args. */
export interface getAllContactIds_args {
	syncReason: Pb1_V7;
}

/** Wire-format fields for the LINE Thrift struct getAllContactIds_result. */
export interface getAllContactIds_result {
	success: string[];
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getAllowedRegistrationMethod_args. */
export interface getAllowedRegistrationMethod_args {
	authSessionId: string;
	countryCode: string;
}

/** Wire-format fields for the LINE Thrift struct getAllowedRegistrationMethod_result. */
export interface getAllowedRegistrationMethod_result {
	success: GetAllowedRegistrationMethodResponse;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct getAnalyticsInfo_result. */
export interface getAnalyticsInfo_result {
	success: AnalyticsInfo;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getApprovedChannels_args. */
export interface getApprovedChannels_args {
	lastSynced: Int64;
	locale: string;
}

/** Wire-format fields for the LINE Thrift struct getApprovedChannels_result. */
export interface getApprovedChannels_result {
	success: ApprovedChannelInfos;
	e: ChannelException;
}

/** Wire-format fields for the LINE Thrift struct getAssertionChallenge_args. */
export interface getAssertionChallenge_args {
	request: m80_l;
}

/** Wire-format fields for the LINE Thrift struct getAssertionChallenge_result. */
export interface getAssertionChallenge_result {
	success: GetAssertionChallengeResponse;
	deviceAttestationException: m80_b;
	attestationRequiredException: m80_C30146a;
}

/** Wire-format fields for the LINE Thrift struct getAttestationChallenge_args. */
export interface getAttestationChallenge_args {
	request: m80_n;
}

/** Wire-format fields for the LINE Thrift struct getAttestationChallenge_result. */
export interface getAttestationChallenge_result {
	success: GetAttestationChallengeResponse;
	deviceAttestationException: m80_b;
}

/** Wire-format fields for the LINE Thrift struct getAuthRSAKey_args. */
export interface getAuthRSAKey_args {
	authSessionId: string;
	identityProvider: IdentityProvider;
}

/** Wire-format fields for the LINE Thrift struct getAuthRSAKey_result. */
export interface getAuthRSAKey_result {
	success: RSAKey;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getAuthorsLatestProducts_args. */
export interface getAuthorsLatestProducts_args {
	latestProductsByAuthorRequest: LatestProductsByAuthorRequest;
}

/** Wire-format fields for the LINE Thrift struct getAuthorsLatestProducts_result. */
export interface getAuthorsLatestProducts_result {
	success: LatestProductsByAuthorResponse;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct getAutoSuggestionShowcase_args. */
export interface getAutoSuggestionShowcase_args {
	autoSuggestionShowcaseRequest: AutoSuggestionShowcaseRequest;
}

/** Wire-format fields for the LINE Thrift struct getAutoSuggestionShowcase_result. */
export interface getAutoSuggestionShowcase_result {
	success: AutoSuggestionShowcaseResponse;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct getBalanceSummaryV2_args. */
export interface getBalanceSummaryV2_args {
	request: any;
}

/** Wire-format fields for the LINE Thrift struct getBalanceSummaryV2_result. */
export interface getBalanceSummaryV2_result {
	success: GetBalanceSummaryResponseV2;
	e: WalletException;
}

/** Wire-format fields for the LINE Thrift struct getBalanceSummaryV4WithPayV3_args. */
export interface getBalanceSummaryV4WithPayV3_args {
	reqSeq: number;
	chatMid: string;
	targetUserMids: string[];
}

/** Wire-format fields for the LINE Thrift struct getBalanceSummaryV4WithPayV3_result. */
export interface getBalanceSummaryV4WithPayV3_result {
	success: GetBalanceSummaryV4WithPayV3Response;
	width: number;
	height: number;
	rotation: number;
	x: number;
	y: number;
}

/** Wire-format fields for the LINE Thrift struct getBalance_args. */
export interface getBalance_args {
	request: ZQ0_b;
}

/** Wire-format fields for the LINE Thrift struct getBalance_result. */
export interface getBalance_result {
	success: GetBalanceResponse;
	e: PointException;
}

/** Wire-format fields for the LINE Thrift struct getBankBranches_args. */
export interface getBankBranches_args {
	financialCorpId: string;
	query: string;
	startNum: number;
	count: number;
}

/** Wire-format fields for the LINE Thrift struct getBankBranches_result. */
export interface getBankBranches_result {
	success: BankBranchInfo[];
	e: PaymentException;
}

/** Wire-format fields for the LINE Thrift struct getBanners_args. */
export interface getBanners_args {
	request: BannerRequest;
}

/** Wire-format fields for the LINE Thrift struct getBanners_result. */
export interface getBanners_result {
	success: BannerResponse;
}

/** Wire-format fields for the LINE Thrift struct getBirthdayEffect_args. */
export interface getBirthdayEffect_args {
	req: Eh_C8933a;
}

/** Wire-format fields for the LINE Thrift struct getBirthdayEffect_result. */
export interface getBirthdayEffect_result {
	success: GetBirthdayEffectResponse;
	e: any;
}

/** Wire-format fields for the LINE Thrift struct getBleDevice_args. */
export interface getBleDevice_args {
	request: GetBleDeviceRequest;
}

/** Wire-format fields for the LINE Thrift struct getBleDevice_result. */
export interface getBleDevice_result {
	success: ThingsDevice;
	e: ThingsException;
}

/** Wire-format fields for the LINE Thrift struct getBleProducts_result. */
export interface getBleProducts_result {
	success: BleProduct[];
	e: ThingsException;
}

/** Wire-format fields for the LINE Thrift struct getBlockedContactIds_args. */
export interface getBlockedContactIds_args {
	syncReason: Pb1_V7;
}

/** Wire-format fields for the LINE Thrift struct getBlockedContactIds_result. */
export interface getBlockedContactIds_result {
	success: string[];
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getBlockedRecommendationIds_args. */
export interface getBlockedRecommendationIds_args {
	syncReason: Pb1_V7;
}

/** Wire-format fields for the LINE Thrift struct getBlockedRecommendationIds_result. */
export interface getBlockedRecommendationIds_result {
	success: string[];
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getBrowsingHistory_args. */
export interface getBrowsingHistory_args {
	getBrowsingHistoryRequest: any;
}

/** Wire-format fields for the LINE Thrift struct getBrowsingHistory_result. */
export interface getBrowsingHistory_result {
	success: any;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct getBuddyChatBarV2_args. */
export interface getBuddyChatBarV2_args {
	request: GetBuddyChatBarRequest;
}

/** Wire-format fields for the LINE Thrift struct getBuddyChatBarV2_result. */
export interface getBuddyChatBarV2_result {
	success: BuddyChatBar;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getBuddyDetailWithPersonal_args. */
export interface getBuddyDetailWithPersonal_args {
	buddyMid: string;
	attributeSet: Pb1_D0[];
}

/** Wire-format fields for the LINE Thrift struct getBuddyDetailWithPersonal_result. */
export interface getBuddyDetailWithPersonal_result {
	success: BuddyDetailWithPersonal;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getBuddyDetail_args. */
export interface getBuddyDetail_args {
	buddyMid: string;
}

/** Wire-format fields for the LINE Thrift struct getBuddyDetail_result. */
export interface getBuddyDetail_result {
	success: BuddyDetail;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getBuddyLive_args. */
export interface getBuddyLive_args {
	request: GetBuddyLiveRequest;
}

/** Wire-format fields for the LINE Thrift struct getBuddyLive_result. */
export interface getBuddyLive_result {
	success: GetBuddyLiveResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getBuddyOnAir_args. */
export interface getBuddyOnAir_args {
	limit: number;
	productType: number;
	authorId: string;
	offset: number;
	shopFilter: acceptChatInvitationByTicket_result;
	includeStickerIds: boolean;
	additionalProductTypes: string[];
	showcaseType: number;
}

/** Wire-format fields for the LINE Thrift struct getBuddyOnAir_result. */
export interface getBuddyOnAir_result {
	success: BuddyOnAir;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getBuddyStatusBarV2_args. */
export interface getBuddyStatusBarV2_args {
	request: GetBuddyStatusBarV2Request;
}

/** Wire-format fields for the LINE Thrift struct getBuddyStatusBarV2_result. */
export interface getBuddyStatusBarV2_result {
	success: BuddyStatusBar;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getCallStatus_args. */
export interface getCallStatus_args {
	request: GetCallStatusRequest;
}

/** Wire-format fields for the LINE Thrift struct getCallStatus_result. */
export interface getCallStatus_result {
	success: GetCallStatusResponse;
	e: OaChatException;
}

/** Wire-format fields for the LINE Thrift struct getCampaign_args. */
export interface getCampaign_args {
	request: GetCampaignRequest;
}

/** Wire-format fields for the LINE Thrift struct getCampaign_result. */
export interface getCampaign_result {
	success: GetCampaignResponse;
	host: string;
	removed: boolean;
}

/** Wire-format fields for the LINE Thrift struct getChallengeForPaakAuth_args. */
export interface getChallengeForPaakAuth_args {
	request: GetChallengeForPaakAuthRequest;
}

/** Wire-format fields for the LINE Thrift struct getChallengeForPaakAuth_result. */
export interface getChallengeForPaakAuth_result {
	success: GetChallengeForPaakAuthResponse;
	e: SecondaryPwlessLoginException;
}

/** Wire-format fields for the LINE Thrift struct getChallengeForPrimaryReg_args. */
export interface getChallengeForPrimaryReg_args {
	request: GetChallengeForPrimaryRegRequest;
}

/** Wire-format fields for the LINE Thrift struct getChallengeForPrimaryReg_result. */
export interface getChallengeForPrimaryReg_result {
	success: GetChallengeForPrimaryRegResponse;
	e: PwlessCredentialException;
}

/** Wire-format fields for the LINE Thrift struct getChannelContext_args. */
export interface getChannelContext_args {
	request: GetChannelContextRequest;
}

/** Wire-format fields for the LINE Thrift struct getChannelContext_result. */
export interface getChannelContext_result {
	success: GetChannelContextResponse;
	cpae: ChannelPaakAuthnException;
	tae: TokenAuthException;
}

/** Wire-format fields for the LINE Thrift struct getChannelInfo_args. */
export interface getChannelInfo_args {
	channelId: string;
	locale: string;
}

/** Wire-format fields for the LINE Thrift struct getChannelInfo_result. */
export interface getChannelInfo_result {
	success: ChannelInfo;
	e: ChannelException;
}

/** Wire-format fields for the LINE Thrift struct getChannelNotificationSettings_args. */
export interface getChannelNotificationSettings_args {
	e: any;
	success: string[];
}

/** Wire-format fields for the LINE Thrift struct getChannelNotificationSettings_result. */
export interface getChannelNotificationSettings_result {
	success: ChannelNotificationSetting[];
	e: ChannelException;
}

/** Wire-format fields for the LINE Thrift struct getChannelSettings_result. */
export interface getChannelSettings_result {
	success: ChannelSettings;
	e: ChannelException;
}

/** Wire-format fields for the LINE Thrift struct getChatEffectMetaList_args. */
export interface getChatEffectMetaList_args {
	categories: Pb1_Q2[];
}

/** Wire-format fields for the LINE Thrift struct getChatEffectMetaList_result. */
export interface getChatEffectMetaList_result {
	success: ChatEffectMeta[];
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getChatRoomAnnouncementsBulk_args. */
export interface getChatRoomAnnouncementsBulk_args {
	chatRoomMids: string[];
	syncReason: Pb1_V7;
}

/** Wire-format fields for the LINE Thrift struct getChatRoomAnnouncementsBulk_result. */
export interface getChatRoomAnnouncementsBulk_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getChatRoomAnnouncements_args. */
export interface getChatRoomAnnouncements_args {
	chatRoomMid: string;
}

/** Wire-format fields for the LINE Thrift struct getChatRoomAnnouncements_result. */
export interface getChatRoomAnnouncements_result {
	success: ChatRoomAnnouncement[];
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getChatRoomBGMs_args. */
export interface getChatRoomBGMs_args {
	chatRoomMids: string[];
	syncReason: Pb1_V7;
}

/** Wire-format fields for the LINE Thrift struct getChatRoomBGMs_result. */
export interface getChatRoomBGMs_result {
	success: Record<string, ChatRoomBGM>;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getChatapp_args. */
export interface getChatapp_args {
	favorite: boolean;
}

/** Wire-format fields for the LINE Thrift struct getChatapp_result. */
export interface getChatapp_result {
	success: GetChatappResponse;
	hwid: string;
	secureMessage: string;
	applicationType: number;
	applicationVersion: string;
	userSessionId: string;
	actionId: Int64;
	screen: string;
	bannerStartedAt: Int64;
	bannerShownFor: Int64;
}

/** Wire-format fields for the LINE Thrift struct getChats_args. */
export interface getChats_args {
	request: GetChatsRequest;
	syncReason: Pb1_V7;
}

/** Wire-format fields for the LINE Thrift struct getChats_result. */
export interface getChats_result {
	success: GetChatsResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getCoinProducts_args. */
export interface getCoinProducts_args {
	request: GetCoinProductsRequest;
}

/** Wire-format fields for the LINE Thrift struct getCoinProducts_result. */
export interface getCoinProducts_result {
	success: GetCoinProductsResponse;
	e: CoinException;
}

/** Wire-format fields for the LINE Thrift struct getCoinPurchaseHistory_args. */
export interface getCoinPurchaseHistory_args {
	request: GetCoinHistoryRequest;
}

/** Wire-format fields for the LINE Thrift struct getCoinPurchaseHistory_result. */
export interface getCoinPurchaseHistory_result {
	success: GetCoinHistoryResponse;
	e: CoinException;
}

/** Wire-format fields for the LINE Thrift struct getCoinUseAndRefundHistory_args. */
export interface getCoinUseAndRefundHistory_args {
	request: GetCoinHistoryRequest;
}

/** Wire-format fields for the LINE Thrift struct getCoinUseAndRefundHistory_result. */
export interface getCoinUseAndRefundHistory_result {
	success: GetCoinHistoryResponse;
	e: CoinException;
}

/** Wire-format fields for the LINE Thrift struct getCommonDomains_args. */
export interface getCommonDomains_args {
	lastSynced: Int64;
}

/** Wire-format fields for the LINE Thrift struct getCommonDomains_result. */
export interface getCommonDomains_result {
	success: ChannelDomains;
	e: ChannelException;
}

/** Wire-format fields for the LINE Thrift struct getConfigurations_args. */
export interface getConfigurations_args {
	revision: Int64;
	regionOfUsim: string;
	regionOfTelephone: string;
	regionOfLocale: string;
	carrier: string;
	syncReason: Pb1_V7;
	success: Configurations;
	e: ChannelException;
}

/** Wire-format fields for the LINE Thrift struct getConfigurations_result. */
export interface getConfigurations_result {
	success: Configurations;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getContactCalendarEvents_args. */
export interface getContactCalendarEvents_args {
	request: GetContactCalendarEventsRequest;
}

/** Wire-format fields for the LINE Thrift struct getContactCalendarEvents_result. */
export interface getContactCalendarEvents_result {
	success: GetContactCalendarEventsResponse;
	re: RejectedException;
	sfe: ServerFailureException;
	te: TalkException;
	ere: ExcessiveRequestItemException;
}

/** Wire-format fields for the LINE Thrift struct getContact_result. */
export interface getContact_result {
	success: Contact;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getContactsV3_args. */
export interface getContactsV3_args {
	request: GetContactsV3Request;
}

/** Wire-format fields for the LINE Thrift struct getContactsV3_result. */
export interface getContactsV3_result {
	success: GetContactsV3Response;
	be: RejectedException;
	ce: ServerFailureException;
	te: TalkException;
	ere: ExcessiveRequestItemException;
}

/** Wire-format fields for the LINE Thrift struct getContacts_result. */
export interface getContacts_result {
	success: Contact[];
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getCountries_args. */
export interface getCountries_args {
	countryGroup: Pb1_EnumC13221w3;
}

/** Wire-format fields for the LINE Thrift struct getCountries_result. */
export interface getCountries_result {
	success: string[];
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct I80_C26376L. */
export interface I80_C26376L {
	request: I80_C26413m;
}

/** Wire-format fields for the LINE Thrift struct getCountryInfo_args. */
export interface getCountryInfo_args {
	authSessionId: string;
	simCard: SimCard;
}

/** Wire-format fields for the LINE Thrift struct getCountryInfo_result. */
export interface getCountryInfo_result {
	success: GetCountryInfoResponse;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct I80_C26377M. */
export interface I80_C26377M {
	success: I80_C26414n;
	e: I80_C26390a;
}

/** Wire-format fields for the LINE Thrift struct getCountryWithRequestIp_result. */
export interface getCountryWithRequestIp_result {
	success: string;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getDataRetention_args. */
export interface getDataRetention_args {
	req: fN0_C24473e;
}

/** Wire-format fields for the LINE Thrift struct getDataRetention_result. */
export interface getDataRetention_result {
	success: GetPremiumDataRetentionResponse;
	e: PremiumException;
}

/** Wire-format fields for the LINE Thrift struct getDestinationUrl_args. */
export interface getDestinationUrl_args {
	request: DestinationLIFFRequest;
}

/** Wire-format fields for the LINE Thrift struct getDestinationUrl_result. */
export interface getDestinationUrl_result {
	success: DestinationLIFFResponse;
	liffException: LiffException;
}

/** Wire-format fields for the LINE Thrift struct getDisasterCases_args. */
export interface getDisasterCases_args {
	req: vh_C37633d;
}

/** Wire-format fields for the LINE Thrift struct getDisasterCases_result. */
export interface getDisasterCases_result {
	success: GetDisasterCasesResponse;
	e: any;
}

/** Wire-format fields for the LINE Thrift struct getE2EEGroupSharedKey_args. */
export interface getE2EEGroupSharedKey_args {
	keyVersion: number;
	chatMid: string;
	groupKeyId: number;
}

/** Wire-format fields for the LINE Thrift struct getE2EEGroupSharedKey_result. */
export interface getE2EEGroupSharedKey_result {
	success: Pb1_U3;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getE2EEKeyBackupCertificates_args. */
export interface getE2EEKeyBackupCertificates_args {
	request: Pb1_W4;
}

/** Wire-format fields for the LINE Thrift struct getE2EEKeyBackupCertificates_result. */
export interface getE2EEKeyBackupCertificates_result {
	success: GetE2EEKeyBackupCertificatesResponse;
	e: E2EEKeyBackupException;
}

/** Wire-format fields for the LINE Thrift struct getE2EEKeyBackupInfo_args. */
export interface getE2EEKeyBackupInfo_args {
	request: Pb1_Y4;
}

/** Wire-format fields for the LINE Thrift struct getE2EEKeyBackupInfo_result. */
export interface getE2EEKeyBackupInfo_result {
	success: GetE2EEKeyBackupInfoResponse;
	e: E2EEKeyBackupException;
}

/** Wire-format fields for the LINE Thrift struct getE2EEPublicKey_args. */
export interface getE2EEPublicKey_args {
	mid: string;
	keyVersion: number;
	keyId: number;
}

/** Wire-format fields for the LINE Thrift struct getE2EEPublicKey_result. */
export interface getE2EEPublicKey_result {
	success: Pb1_C13097n4;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getE2EEPublicKeys_result. */
export interface getE2EEPublicKeys_result {
	success: Pb1_C13097n4[];
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getEncryptedIdentityV3_result. */
export interface getEncryptedIdentityV3_result {
	success: Pb1_C12916a5;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getExchangeKey_args. */
export interface getExchangeKey_args {
	request: GetExchangeKeyRequest;
}

/** Wire-format fields for the LINE Thrift struct getExchangeKey_result. */
export interface getExchangeKey_result {
	success: GetExchangeKeyResponse;
	e: SecondaryPwlessLoginException;
}

/** Wire-format fields for the LINE Thrift struct getExtendedProfile_args. */
export interface getExtendedProfile_args {
	syncReason: Pb1_V7;
}

/** Wire-format fields for the LINE Thrift struct getExtendedProfile_result. */
export interface getExtendedProfile_result {
	success: ExtendedProfile;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getFollowBlacklist_args. */
export interface getFollowBlacklist_args {
	getFollowBlacklistRequest: GetFollowBlacklistRequest;
}

/** Wire-format fields for the LINE Thrift struct getFollowBlacklist_result. */
export interface getFollowBlacklist_result {
	success: GetFollowBlacklistResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getFollowers_args. */
export interface getFollowers_args {
	getFollowersRequest: GetFollowersRequest;
}

/** Wire-format fields for the LINE Thrift struct getFollowers_result. */
export interface getFollowers_result {
	success: GetFollowersResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getFollowings_args. */
export interface getFollowings_args {
	getFollowingsRequest: GetFollowingsRequest;
}

/** Wire-format fields for the LINE Thrift struct getFollowings_result. */
export interface getFollowings_result {
	success: GetFollowingsResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getFontMetas_args. */
export interface getFontMetas_args {
	request: GetFontMetasRequest;
}

/** Wire-format fields for the LINE Thrift struct getFontMetas_result. */
export interface getFontMetas_result {
	success: GetFontMetasResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getFriendDetails_args. */
export interface getFriendDetails_args {
	request: GetFriendDetailsRequest;
}

/** Wire-format fields for the LINE Thrift struct getFriendDetails_result. */
export interface getFriendDetails_result {
	success: GetFriendDetailsResponse;
	re: RejectedException;
	sfe: ServerFailureException;
	te: TalkException;
	ere: ExcessiveRequestItemException;
}

/** Wire-format fields for the LINE Thrift struct getFriendRequests_args. */
export interface getFriendRequests_args {
	direction: Pb1_F4;
	lastSeenSeqId: Int64;
}

/** Wire-format fields for the LINE Thrift struct getFriendRequests_result. */
export interface getFriendRequests_result {
	success: FriendRequest[];
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getGnbBadgeStatus_args. */
export interface getGnbBadgeStatus_args {
	channelDomains: any[];
	revision: Int64;
}

/** Wire-format fields for the LINE Thrift struct getGnbBadgeStatus_result. */
export interface getGnbBadgeStatus_result {
	success: GetGnbBadgeStatusResponse;
	e: WalletException;
	sticonIds: any[];
	availableForPhotoEdit: boolean;
	sticonResourceType: number;
	endPageMainImages: string[];
}

/** Wire-format fields for the LINE Thrift struct getGroupCallUrlInfo_args. */
export interface getGroupCallUrlInfo_args {
	request: GetGroupCallUrlInfoRequest;
}

/** Wire-format fields for the LINE Thrift struct getGroupCallUrlInfo_result. */
export interface getGroupCallUrlInfo_result {
	success: GetGroupCallUrlInfoResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getGroupCallUrls_args. */
export interface getGroupCallUrls_args {
	request: Pb1_C13042j5;
}

/** Wire-format fields for the LINE Thrift struct getGroupCallUrls_result. */
export interface getGroupCallUrls_result {
	success: GetGroupCallUrlsResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getGroupCall_args. */
export interface getGroupCall_args {
	chatMid: string;
}

/** Wire-format fields for the LINE Thrift struct getGroupCall_result. */
export interface getGroupCall_result {
	success: GroupCall;
	studentInformation: any;
}

/** Wire-format fields for the LINE Thrift struct getHomeFlexContent_args. */
export interface getHomeFlexContent_args {
	request: GetHomeFlexContentRequest;
}

/** Wire-format fields for the LINE Thrift struct getHomeFlexContent_result. */
export interface getHomeFlexContent_result {
	success: GetHomeFlexContentResponse;
	e: any;
}

/** Wire-format fields for the LINE Thrift struct getHomeServiceList_args. */
export interface getHomeServiceList_args {
	request: Eg_C8928b;
}

/** Wire-format fields for the LINE Thrift struct getHomeServiceList_result. */
export interface getHomeServiceList_result {
	success: GetHomeServiceListResponse;
	e: any;
}

/** Wire-format fields for the LINE Thrift struct getHomeServices_args. */
export interface getHomeServices_args {
	request: GetHomeServicesRequest;
}

/** Wire-format fields for the LINE Thrift struct getHomeServices_result. */
export interface getHomeServices_result {
	success: GetHomeServicesResponse;
	e: any;
}

/** Wire-format fields for the LINE Thrift struct getIncentiveStatus_args. */
export interface getIncentiveStatus_args {
	req: fN0_C24471c;
}

/** Wire-format fields for the LINE Thrift struct getIncentiveStatus_result. */
export interface getIncentiveStatus_result {
	success: GetIncentiveStatusResponse;
	e: PremiumException;
}

/** Wire-format fields for the LINE Thrift struct getInstantNews_args. */
export interface getInstantNews_args {
	region: string;
	location: Location;
}

/** Wire-format fields for the LINE Thrift struct getInstantNews_result. */
export interface getInstantNews_result {
	success: InstantNews[];
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getJoinedMembershipByBotMid_args. */
export interface getJoinedMembershipByBotMid_args {
	request: GetJoinedMembershipByBotMidRequest;
}

/** Wire-format fields for the LINE Thrift struct getJoinedMembershipByBotMid_result. */
export interface getJoinedMembershipByBotMid_result {
	success: MemberInfo;
	e: MembershipException;
}

/** Wire-format fields for the LINE Thrift struct getJoinedMembership_args. */
export interface getJoinedMembership_args {
	request: GetJoinedMembershipRequest;
}

/** Wire-format fields for the LINE Thrift struct getJoinedMembership_result. */
export interface getJoinedMembership_result {
	success: MemberInfo;
	e: MembershipException;
}

/** Wire-format fields for the LINE Thrift struct getJoinedMemberships_result. */
export interface getJoinedMemberships_result {
	success: JoinedMemberships;
	e: MembershipException;
}

/** Wire-format fields for the LINE Thrift struct getKeyBackupCertificatesV2_args. */
export interface getKeyBackupCertificatesV2_args {
	request: Pb1_C13070l5;
}

/** Wire-format fields for the LINE Thrift struct getKeyBackupCertificatesV2_result. */
export interface getKeyBackupCertificatesV2_result {
	success: GetKeyBackupCertificatesV2Response;
	e: E2EEKeyBackupException;
}

/** Wire-format fields for the LINE Thrift struct getLFLSuggestion_args. */
export interface getLFLSuggestion_args {
	hwid: string;
	secureMessage: string;
	applicationType: number;
	applicationVersion: string;
	userSessionId: string;
	actionId: Int64;
	screen: string;
	bannerTappedAt: Int64;
	beaconTermAgreed: boolean;
}

/** Wire-format fields for the LINE Thrift struct getLFLSuggestion_result. */
export interface getLFLSuggestion_result {
	success: GetLFLSuggestionResponse;
	e: LFLPremiumException;
}

/** Wire-format fields for the LINE Thrift struct getLastE2EEGroupSharedKey_args. */
export interface getLastE2EEGroupSharedKey_args {
	keyVersion: number;
	chatMid: string;
}

/** Wire-format fields for the LINE Thrift struct getLastE2EEGroupSharedKey_result. */
export interface getLastE2EEGroupSharedKey_result {
	success: Pb1_U3;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getLastE2EEPublicKeys_args. */
export interface getLastE2EEPublicKeys_args {
	chatMid: string;
}

/** Wire-format fields for the LINE Thrift struct getLastE2EEPublicKeys_result. */
export interface getLastE2EEPublicKeys_result {
	success: Record<string, Pb1_C13097n4>;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getLastOpRevision_result. */
export interface getLastOpRevision_result {
	success: Int64;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getLiffViewWithoutUserContext_args. */
export interface getLiffViewWithoutUserContext_args {
	request: LiffViewWithoutUserContextRequest;
}

/** Wire-format fields for the LINE Thrift struct getLiffViewWithoutUserContext_result. */
export interface getLiffViewWithoutUserContext_result {
	success: LiffViewResponse;
	liffException: LiffException;
	talkException: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getLineCardIssueForm_args. */
export interface getLineCardIssueForm_args {
	resolutionType: r80_EnumC34372l;
}

/** Wire-format fields for the LINE Thrift struct getLineCardIssueForm_result. */
export interface getLineCardIssueForm_result {
	success: PaymentLineCardIssueForm;
	e: PaymentException;
}

/** Wire-format fields for the LINE Thrift struct getLinkedDevices_result. */
export interface getLinkedDevices_result {
	success: UserDevice[];
	e: ThingsException;
}

/** Wire-format fields for the LINE Thrift struct getLoginActorContext_args. */
export interface getLoginActorContext_args {
	request: GetLoginActorContextRequest;
}

/** Wire-format fields for the LINE Thrift struct getLoginActorContext_result. */
export interface getLoginActorContext_result {
	success: GetLoginActorContextResponse;
	e: SecondaryQrCodeException;
}

/** Wire-format fields for the LINE Thrift struct getMappedProfileIds_args. */
export interface getMappedProfileIds_args {
	request: GetMappedProfileIdsRequest;
}

/** Wire-format fields for the LINE Thrift struct getMappedProfileIds_result. */
export interface getMappedProfileIds_result {
	success: GetMappedProfileIdsResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct I80_C26378N. */
export interface I80_C26378N {
	request: I80_C26415o;
}

/** Wire-format fields for the LINE Thrift struct getMaskedEmail_args. */
export interface getMaskedEmail_args {
	authSessionId: string;
	accountIdentifier: AccountIdentifier;
}

/** Wire-format fields for the LINE Thrift struct getMaskedEmail_result. */
export interface getMaskedEmail_result {
	success: GetMaskedEmailResponse;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct I80_C26379O. */
export interface I80_C26379O {
	success: I80_C26416p;
	e: I80_C26390a;
}

/** Wire-format fields for the LINE Thrift struct getMessageBoxes_args. */
export interface getMessageBoxes_args {
	messageBoxListRequest: MessageBoxListRequest;
	syncReason: Pb1_V7;
}

/** Wire-format fields for the LINE Thrift struct getMessageBoxes_result. */
export interface getMessageBoxes_result {
	success: MessageBoxList;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getMessageReadRange_args. */
export interface getMessageReadRange_args {
	chatIds: string[];
	syncReason: Pb1_V7;
}

/** Wire-format fields for the LINE Thrift struct getMessageReadRange_result. */
export interface getMessageReadRange_result {
	success: TMessageReadRange[];
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getModuleLayoutV4_args. */
export interface getModuleLayoutV4_args {
	code: number;
	reason: string;
	parameterMap: Record<string, string>;
}

/** Wire-format fields for the LINE Thrift struct getModuleLayoutV4_result. */
export interface getModuleLayoutV4_result {
	success: NZ0_D;
	suggestVersion: Int64;
	availableForPhotoEdit: boolean;
	sticonResourceType: number;
}

/** Wire-format fields for the LINE Thrift struct getModuleWithStatus_args. */
export interface getModuleWithStatus_args {
	subscriptionService: number;
	storeCode: number;
}

/** Wire-format fields for the LINE Thrift struct getModuleWithStatus_result. */
export interface getModuleWithStatus_result {
	success: NZ0_H;
	channelId: string;
	name: string;
	entryPageUrl: string;
	descriptionText: string;
	provider: ChannelProvider;
	publicType: number;
	iconImage: string;
	permissions: string[];
	iconThumbnailImage: string;
	channelConfigurations: string[];
	lcsAllApiUsable: boolean;
	allowedPermissions: string[];
	channelDomains: string[];
	updatedTimestamp: Int64;
	featureLicenses: string[];
}

/** Wire-format fields for the LINE Thrift struct getModule_args. */
export interface getModule_args {
	request: NZ0_E;
}

/** Wire-format fields for the LINE Thrift struct getModule_result. */
export interface getModule_result {
	success: NZ0_F;
	e: WalletException;
}

/** Wire-format fields for the LINE Thrift struct getModulesV2_args. */
export interface getModulesV2_args {
	request: GetModulesRequestV2;
}

/** Wire-format fields for the LINE Thrift struct getModulesV2_result. */
export interface getModulesV2_result {
	success: NZ0_K;
	e: WalletException;
}

/** Wire-format fields for the LINE Thrift struct getModulesV3_args. */
export interface getModulesV3_args {
	request: GetModulesRequestV3;
}

/** Wire-format fields for the LINE Thrift struct getModulesV3_result. */
export interface getModulesV3_result {
	success: NZ0_K;
	e: WalletException;
}

/** Wire-format fields for the LINE Thrift struct getModulesV4WithStatus_args. */
export interface getModulesV4WithStatus_args {
	channelId: string;
}

/** Wire-format fields for the LINE Thrift struct getModulesV4WithStatus_result. */
export interface getModulesV4WithStatus_result {
	success: NZ0_M;
	e: WalletException;
}

/** Wire-format fields for the LINE Thrift struct getMusicSubscriptionStatus_args. */
export interface getMusicSubscriptionStatus_args {
	request: any;
}

/** Wire-format fields for the LINE Thrift struct getMusicSubscriptionStatus_result. */
export interface getMusicSubscriptionStatus_result {
	success: any;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct getMyAssetInformationV2_args. */
export interface getMyAssetInformationV2_args {
	request: GetMyAssetInformationV2Request;
}

/** Wire-format fields for the LINE Thrift struct getMyAssetInformationV2_result. */
export interface getMyAssetInformationV2_result {
	success: GetMyAssetInformationV2Response;
	e: WalletException;
}

/** Wire-format fields for the LINE Thrift struct getMyChatapps_args. */
export interface getMyChatapps_args {
	e: any;
}

/** Wire-format fields for the LINE Thrift struct getMyChatapps_result. */
export interface getMyChatapps_result {
	success: GetMyChatappsResponse;
	e: ChatappException;
}

/** Wire-format fields for the LINE Thrift struct getMyDashboard_args. */
export interface getMyDashboard_args {
	request: GetMyDashboardRequest;
	channelId: string;
	locale: string;
}

/** Wire-format fields for the LINE Thrift struct getMyDashboard_result. */
export interface getMyDashboard_result {
	success: GetMyDashboardResponse;
	e: WalletException;
}

/** Wire-format fields for the LINE Thrift struct getNewlyReleasedBuddyIds_args. */
export interface getNewlyReleasedBuddyIds_args {
	country: string;
}

/** Wire-format fields for the LINE Thrift struct getNewlyReleasedBuddyIds_result. */
export interface getNewlyReleasedBuddyIds_result {
	success: Record<string, Int64>;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getNotificationSettings_args. */
export interface getNotificationSettings_args {
	request: GetNotificationSettingsRequest;
}

/** Wire-format fields for the LINE Thrift struct getNotificationSettings_result. */
export interface getNotificationSettings_result {
	success: GetNotificationSettingsResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getOwnedProductSummaries_args. */
export interface getOwnedProductSummaries_args {
	shopId: string;
	offset: number;
	limit: number;
	locale: Locale;
	request: LiffViewWithoutUserContextRequest;
}

/** Wire-format fields for the LINE Thrift struct getOwnedProductSummaries_result. */
export interface getOwnedProductSummaries_result {
	success: any;
	liffException: any;
	talkException: ChannelException;
}

/** Wire-format fields for the LINE Thrift struct getPasswordHashingParameter_args. */
export interface getPasswordHashingParameter_args {
	request: GetPasswordHashingParametersRequest;
}

/** Wire-format fields for the LINE Thrift struct getPasswordHashingParameter_result. */
export interface getPasswordHashingParameter_result {
	success: GetPasswordHashingParametersResponse;
	pue: PasswordUpdateException;
	tae: TokenAuthException;
}

/** Wire-format fields for the LINE Thrift struct getPasswordHashingParametersForPwdReg_args. */
export interface getPasswordHashingParametersForPwdReg_args {
	request: GetPasswordHashingParametersForPwdRegRequest;
}

/** Wire-format fields for the LINE Thrift struct I80_C26380P. */
export interface I80_C26380P {
	request: I80_C26417q;
}

/** Wire-format fields for the LINE Thrift struct getPasswordHashingParametersForPwdReg_result. */
export interface getPasswordHashingParametersForPwdReg_result {
	success: GetPasswordHashingParametersForPwdRegResponse;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct I80_C26381Q. */
export interface I80_C26381Q {
	success: I80_C26418r;
	e: I80_C26390a;
}

/** Wire-format fields for the LINE Thrift struct getPasswordHashingParametersForPwdVerif_args. */
export interface getPasswordHashingParametersForPwdVerif_args {
	request: GetPasswordHashingParametersForPwdVerifRequest;
}

/** Wire-format fields for the LINE Thrift struct I80_C26382S. */
export interface I80_C26382S {
	request: I80_C26419s;
}

/** Wire-format fields for the LINE Thrift struct getPasswordHashingParametersForPwdVerif_result. */
export interface getPasswordHashingParametersForPwdVerif_result {
	success: GetPasswordHashingParametersForPwdVerifResponse;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct I80_C26383T. */
export interface I80_C26383T {
	success: I80_C26420t;
	e: I80_C26390a;
}

/** Wire-format fields for the LINE Thrift struct getPaymentUrlByKey_args. */
export interface getPaymentUrlByKey_args {
	key: string;
}

/** Wire-format fields for the LINE Thrift struct getPaymentUrlByKey_result. */
export interface getPaymentUrlByKey_result {
	success: string;
	e: PaymentException;
}

/** Wire-format fields for the LINE Thrift struct getPendingAgreements_result. */
export interface getPendingAgreements_result {
	success: PendingAgreementsResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getPhoneVerifMethodForRegistration_args. */
export interface getPhoneVerifMethodForRegistration_args {
	request: GetPhoneVerifMethodForRegistrationRequest;
}

/** Wire-format fields for the LINE Thrift struct getPhoneVerifMethodForRegistration_result. */
export interface getPhoneVerifMethodForRegistration_result {
	success: GetPhoneVerifMethodForRegistrationResponse;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct getPhoneVerifMethodV2_args. */
export interface getPhoneVerifMethodV2_args {
	request: GetPhoneVerifMethodV2Request;
}

/** Wire-format fields for the LINE Thrift struct I80_C26384U. */
export interface I80_C26384U {
	request: I80_C26421u;
}

/** Wire-format fields for the LINE Thrift struct getPhoneVerifMethodV2_result. */
export interface getPhoneVerifMethodV2_result {
	success: GetPhoneVerifMethodV2Response;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct I80_C26385V. */
export interface I80_C26385V {
	success: I80_C26422v;
	e: I80_C26390a;
}

/** Wire-format fields for the LINE Thrift struct getPhotoboothBalance_args. */
export interface getPhotoboothBalance_args {
	request: Pb1_C13126p5;
}

/** Wire-format fields for the LINE Thrift struct getPhotoboothBalance_result. */
export interface getPhotoboothBalance_result {
	success: GetPhotoboothBalanceResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getPredefinedScenarioSets_args. */
export interface getPredefinedScenarioSets_args {
	request: GetPredefinedScenarioSetsRequest;
}

/** Wire-format fields for the LINE Thrift struct getPredefinedScenarioSets_result. */
export interface getPredefinedScenarioSets_result {
	success: GetPredefinedScenarioSetsResponse;
	e: ThingsException;
}

/** Wire-format fields for the LINE Thrift struct getPrefetchableBanners_args. */
export interface getPrefetchableBanners_args {
	request: BannerRequest;
}

/** Wire-format fields for the LINE Thrift struct getPrefetchableBanners_result. */
export interface getPrefetchableBanners_result {
	success: BannerResponse;
}

/** Wire-format fields for the LINE Thrift struct getPremiumStatusForUpgrade_args. */
export interface getPremiumStatusForUpgrade_args {
	req: fN0_C24475g;
}

/** Wire-format fields for the LINE Thrift struct getPremiumStatusForUpgrade_result. */
export interface getPremiumStatusForUpgrade_result {
	success: GetPremiumStatusResponse;
	e: PremiumException;
}

/** Wire-format fields for the LINE Thrift struct getPremiumStatus_args. */
export interface getPremiumStatus_args {
	req: fN0_C24476h;
}

/** Wire-format fields for the LINE Thrift struct getPremiumStatus_result. */
export interface getPremiumStatus_result {
	success: GetPremiumStatusResponse;
	e: PremiumException;
}

/** Wire-format fields for the LINE Thrift struct getPreviousMessagesV2WithRequest_args. */
export interface getPreviousMessagesV2WithRequest_args {
	request: GetPreviousMessagesV2Request;
	syncReason: Pb1_V7;
}

/** Wire-format fields for the LINE Thrift struct getPreviousMessagesV2WithRequest_result. */
export interface getPreviousMessagesV2WithRequest_result {
	success: Message[];
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getRecentMessagesV2_args. */
export interface getRecentMessagesV2_args {
	messageBoxId: string;
	messagesCount: number;
}

/** Wire-format fields for the LINE Thrift struct getRecentMessagesV2_result. */
export interface getRecentMessagesV2_result {
	success: Message[];
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getProductByVersion_args. */
export interface getProductByVersion_args {
	shopId: string;
	productId: string;
	productVersion: Int64;
	locale: Locale;
	request: any;
}

/** Wire-format fields for the LINE Thrift struct getProductByVersion_result. */
export interface getProductByVersion_result {
	success: any;
	miniAppListException: any;
	liffException: LiffException;
	talkException: ChannelException;
}

/** Wire-format fields for the LINE Thrift struct getProductLatestVersionForUser_args. */
export interface getProductLatestVersionForUser_args {
	request: any;
}

/** Wire-format fields for the LINE Thrift struct getProductLatestVersionForUser_result. */
export interface getProductLatestVersionForUser_result {
	success: any;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct getProductSummariesInSubscriptionSlots_args. */
export interface getProductSummariesInSubscriptionSlots_args {
	req: any;
}

/** Wire-format fields for the LINE Thrift struct getProductSummariesInSubscriptionSlots_result. */
export interface getProductSummariesInSubscriptionSlots_result {
	success: any;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct getProductV2_args. */
export interface getProductV2_args {
	request: any;
}

/** Wire-format fields for the LINE Thrift struct getProductV2_result. */
export interface getProductV2_result {
	success: any;
	liffException: any;
	channelException: Uf_EnumC14873o;
	talkException: ChannelException;
}

/** Wire-format fields for the LINE Thrift struct getProductValidationScheme_args. */
export interface getProductValidationScheme_args {
	shopId: string;
	productId: string;
	productVersion: Int64;
}

/** Wire-format fields for the LINE Thrift struct getProductValidationScheme_result. */
export interface getProductValidationScheme_result {
	success: any;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct getProductsByAuthor_args. */
export interface getProductsByAuthor_args {
	productListByAuthorRequest: any;
}

/** Wire-format fields for the LINE Thrift struct getProductsByAuthor_result. */
export interface getProductsByAuthor_result {
	success: any;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct getProfile_args. */
export interface getProfile_args {
	syncReason: Pb1_V7;
}

/** Wire-format fields for the LINE Thrift struct getProfile_result. */
export interface getProfile_result {
	success: Profile;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getPromotedBuddyContacts_args. */
export interface getPromotedBuddyContacts_args {
	language: string;
	country: string;
	success: string[];
	e: ChannelException;
}

/** Wire-format fields for the LINE Thrift struct getPromotedBuddyContacts_result. */
export interface getPromotedBuddyContacts_result {
	success: Contact[];
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getPublishedMemberships_args. */
export interface getPublishedMemberships_args {
	request: GetPublishedMembershipsRequest;
}

/** Wire-format fields for the LINE Thrift struct getPublishedMemberships_result. */
export interface getPublishedMemberships_result {
	success: Membership[];
	e: MembershipException;
}

/** Wire-format fields for the LINE Thrift struct getPurchaseEnabledStatus_args. */
export interface getPurchaseEnabledStatus_args {
	request: PurchaseEnabledRequest;
}

/** Wire-format fields for the LINE Thrift struct getPurchaseEnabledStatus_result. */
export interface getPurchaseEnabledStatus_result {
	success: og_I;
	e: MembershipException;
}

/** Wire-format fields for the LINE Thrift struct getPurchasedProducts_args. */
export interface getPurchasedProducts_args {
	shopId: string;
	offset: number;
	limit: number;
	locale: Locale;
	request: any;
}

/** Wire-format fields for the LINE Thrift struct getPurchasedProducts_result. */
export interface getPurchasedProducts_result {
	success: PurchaseRecordList;
	liffException: any;
	talkException: ChannelException;
}

/** Wire-format fields for the LINE Thrift struct getQuickMenu_args. */
export interface getQuickMenu_args {
	lastSynced: Int64;
}

/** Wire-format fields for the LINE Thrift struct getQuickMenu_result. */
export interface getQuickMenu_result {
	success: GetQuickMenuResponse;
	e: WalletException;
}

/** Wire-format fields for the LINE Thrift struct getRSAKeyInfo_result. */
export interface getRSAKeyInfo_result {
	success: RSAKey;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getReceivedPresents_args. */
export interface getReceivedPresents_args {
	shopId: string;
	offset: number;
	limit: number;
	locale: Locale;
	request: any;
}

/** Wire-format fields for the LINE Thrift struct getReceivedPresents_result. */
export interface getReceivedPresents_result {
	success: PurchaseRecordList;
	favoriteDataException: any;
	liffException: LiffException;
	talkException: ChannelException;
}

/** Wire-format fields for the LINE Thrift struct getRecentFriendRequests_args. */
export interface getRecentFriendRequests_args {
	e: any;
	success: FriendRequestsInfo;
}

/** Wire-format fields for the LINE Thrift struct getRecentFriendRequests_result. */
export interface getRecentFriendRequests_result {
	success: FriendRequestsInfo;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getRecommendationDetails_args. */
export interface getRecommendationDetails_args {
	request: GetRecommendationDetailsRequest;
}

/** Wire-format fields for the LINE Thrift struct getRecommendationDetails_result. */
export interface getRecommendationDetails_result {
	success: GetRecommendationDetailsResponse;
	re: RejectedException;
	sfe: ServerFailureException;
	te: TalkException;
	ere: ExcessiveRequestItemException;
}

/** Wire-format fields for the LINE Thrift struct getRecommendationIds_args. */
export interface getRecommendationIds_args {
	syncReason: Pb1_V7;
}

/** Wire-format fields for the LINE Thrift struct getRecommendationIds_result. */
export interface getRecommendationIds_result {
	success: string[];
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getRecommendationList_args. */
export interface getRecommendationList_args {
	getRecommendationRequest: any;
	request: any;
}

/** Wire-format fields for the LINE Thrift struct getRecommendationList_result. */
export interface getRecommendationList_result {
	success: GetSuggestTrialRecommendationResponse;
	liffException: any;
	talkException: ChannelException;
}

/** Wire-format fields for the LINE Thrift struct getRepairElements_args. */
export interface getRepairElements_args {
	e: any;
	success: GetRepairElementsResponse;
}

/** Wire-format fields for the LINE Thrift struct getRepairElements_result. */
export interface getRepairElements_result {
	success: GetRepairElementsResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getRequiredAgreements_result. */
export interface getRequiredAgreements_result {
	success: PaymentRequiredAgreementsInfo;
	e: PaymentException;
}

/** Wire-format fields for the LINE Thrift struct getResourceFile_args. */
export interface getResourceFile_args {
	req: any;
}

/** Wire-format fields for the LINE Thrift struct getResourceFile_result. */
export interface getResourceFile_result {
	success: any;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct getResponseStatus_args. */
export interface getResponseStatus_args {
	request: GetResponseStatusRequest;
}

/** Wire-format fields for the LINE Thrift struct getResponseStatus_result. */
export interface getResponseStatus_result {
	success: GetResponseStatusResponse;
	e: OaChatException;
}

/** Wire-format fields for the LINE Thrift struct getReturnUrlWithRequestTokenForAutoLogin_args. */
export interface getReturnUrlWithRequestTokenForAutoLogin_args {
	webLoginRequest: WebLoginRequest;
}

/** Wire-format fields for the LINE Thrift struct getReturnUrlWithRequestTokenForAutoLogin_result. */
export interface getReturnUrlWithRequestTokenForAutoLogin_result {
	success: WebLoginResponse;
	e: ChannelException;
}

/** Wire-format fields for the LINE Thrift struct getReturnUrlWithRequestTokenForMultiLiffLogin_args. */
export interface getReturnUrlWithRequestTokenForMultiLiffLogin_args {
	request: LiffWebLoginRequest;
}

/** Wire-format fields for the LINE Thrift struct getReturnUrlWithRequestTokenForMultiLiffLogin_result. */
export interface getReturnUrlWithRequestTokenForMultiLiffLogin_result {
	success: LiffWebLoginResponse;
	liffException: LiffException;
	channelException: LiffChannelException;
	talkException: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getRingbackTone_result. */
export interface getRingbackTone_result {
	success: RingbackTone;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getRingtone_result. */
export interface getRingtone_result {
	success: Ringtone;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getRoomsV2_args. */
export interface getRoomsV2_args {
	roomIds: string[];
}

/** Wire-format fields for the LINE Thrift struct getRoomsV2_result. */
export interface getRoomsV2_result {
	success: Room[];
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getSCC_args. */
export interface getSCC_args {
	request: GetSCCRequest;
}

/** Wire-format fields for the LINE Thrift struct getSCC_result. */
export interface getSCC_result {
	success: SCC;
	e: MembershipException;
}

/** Wire-format fields for the LINE Thrift struct I80_C26386W. */
export interface I80_C26386W {
	request: I80_C26423w;
}

/** Wire-format fields for the LINE Thrift struct I80_C26387X. */
export interface I80_C26387X {
	success: I80_C26424x;
	e: I80_C26390a;
}

/** Wire-format fields for the LINE Thrift struct getSeasonalEffects_args. */
export interface getSeasonalEffects_args {
	req: Eh_C8935c;
}

/** Wire-format fields for the LINE Thrift struct getSeasonalEffects_result. */
export interface getSeasonalEffects_result {
	success: GetSeasonalEffectsResponse;
	e: any;
}

/** Wire-format fields for the LINE Thrift struct getSecondAuthMethod_args. */
export interface getSecondAuthMethod_args {
	authSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct getSecondAuthMethod_result. */
export interface getSecondAuthMethod_result {
	success: GetSecondAuthMethodResponse;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct getSentPresents_args. */
export interface getSentPresents_args {
	shopId: string;
	offset: number;
	limit: number;
	locale: Locale;
	squareChatMid: string;
}

/** Wire-format fields for the LINE Thrift struct getSentPresents_result. */
export interface getSentPresents_result {
	success: PurchaseRecordList;
	type: string;
	url: string;
	titleTextColor: number;
	titleBackgroundColor: number;
	titleIconUrl: string;
	titleSubtextColor: number;
	titleButtonColor: number;
	progressBarColor: number;
	progressBackgroundColor: number;
	trustedDomain: boolean;
	suspendable: boolean;
	maxBrightness: boolean;
	titleButtonAreaBackgroundColor: number;
	titleButtonAreaBorderColor: number;
	suspendableV2: boolean;
	menuStyle: number;
	moduleMode: boolean;
	pinToHomeServiceId: number;
	menuColorSetting: any;
	showPinInduction: boolean;
	appName: string;
	adaptableColorSchemes: string[];
	provider: any;
	basicAuthAllowed: boolean;
	siriDonationAllowed: boolean;
	transitionToNonLiffWithoutPopupAllowed: boolean;
	urlHistoryAllowed: boolean;
	shrinkHeaderDisabled: boolean;
	skipWebRTCPermissionPopupAllowed: boolean;
	useGmaSdkAllowed: boolean;
	useMinimizeButtonAllowed: boolean;
	singleTabOnly: boolean;
	useFavoriteAllowed: boolean;
	discoverMiniAllowed: boolean;
}

/** Wire-format fields for the LINE Thrift struct getServerTime_result. */
export interface getServerTime_result {
	success: Int64;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getServiceShortcutMenu_args. */
export interface getServiceShortcutMenu_args {
	request: NZ0_U;
	webLoginRequest: WebLoginRequest;
}

/** Wire-format fields for the LINE Thrift struct getServiceShortcutMenu_result. */
export interface getServiceShortcutMenu_result {
	success: GetServiceShortcutMenuResponse;
	e: WalletException;
}

/** Wire-format fields for the LINE Thrift struct getSessionContentBeforeMigCompletion_args. */
export interface getSessionContentBeforeMigCompletion_args {
	authSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct getSessionContentBeforeMigCompletion_result. */
export interface getSessionContentBeforeMigCompletion_result {
	success: GetSessionContentBeforeMigCompletionResponse;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct getSettingsAttributes2_args. */
export interface getSettingsAttributes2_args {
	attributesToRetrieve: SettingsAttributeEx[];
}

/** Wire-format fields for the LINE Thrift struct getSettingsAttributes2_result. */
export interface getSettingsAttributes2_result {
	success: Settings;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getSettingsAttributes_result. */
export interface getSettingsAttributes_result {
	success: Settings;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getSettings_args. */
export interface getSettings_args {
	syncReason: Pb1_V7;
}

/** Wire-format fields for the LINE Thrift struct getSettings_result. */
export interface getSettings_result {
	success: Settings;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getSmartChannelRecommendations_args. */
export interface getSmartChannelRecommendations_args {
	request: GetSmartChannelRecommendationsRequest;
}

/** Wire-format fields for the LINE Thrift struct getSmartChannelRecommendations_result. */
export interface getSmartChannelRecommendations_result {
	success: GetSmartChannelRecommendationsResponse;
	e: WalletException;
}

/** Wire-format fields for the LINE Thrift struct getSquareBot_args. */
export interface getSquareBot_args {
	req: GetSquareBotRequest;
}

/** Wire-format fields for the LINE Thrift struct getSquareBot_result. */
export interface getSquareBot_result {
	success: GetSquareBotResponse;
	e: BotException;
}

/** Wire-format fields for the LINE Thrift struct getStudentInformation_args. */
export interface getStudentInformation_args {
	req: Ob1_C12606a0;
}

/** Wire-format fields for the LINE Thrift struct getStudentInformation_result. */
export interface getStudentInformation_result {
	success: GetStudentInformationResponse;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct getSubscriptionPlans_args. */
export interface getSubscriptionPlans_args {
	req: GetSubscriptionPlansRequest;
}

/** Wire-format fields for the LINE Thrift struct getSubscriptionPlans_result. */
export interface getSubscriptionPlans_result {
	success: GetSubscriptionPlansResponse;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct getSubscriptionSlotHistory_args. */
export interface getSubscriptionSlotHistory_args {
	req: Ob1_C12618e0;
}

/** Wire-format fields for the LINE Thrift struct getSubscriptionSlotHistory_result. */
export interface getSubscriptionSlotHistory_result {
	success: Ob1_C12621f0;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct getSubscriptionStatus_args. */
export interface getSubscriptionStatus_args {
	req: GetSubscriptionStatusRequest;
}

/** Wire-format fields for the LINE Thrift struct getSubscriptionStatus_result. */
export interface getSubscriptionStatus_result {
	success: GetSubscriptionStatusResponse;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct getSuggestDictionarySetting_args. */
export interface getSuggestDictionarySetting_args {
	req: Ob1_C12630i0;
}

/** Wire-format fields for the LINE Thrift struct getSuggestDictionarySetting_result. */
export interface getSuggestDictionarySetting_result {
	success: GetSuggestDictionarySettingResponse;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct getSuggestResourcesV2_args. */
export interface getSuggestResourcesV2_args {
	req: GetSuggestResourcesV2Request;
}

/** Wire-format fields for the LINE Thrift struct getSuggestResourcesV2_result. */
export interface getSuggestResourcesV2_result {
	success: GetSuggestResourcesV2Response;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct getTaiwanBankBalance_args. */
export interface getTaiwanBankBalance_args {
	channelIds: any[];
}

/** Wire-format fields for the LINE Thrift struct getTaiwanBankBalance_result. */
export interface getTaiwanBankBalance_result {
	success: string[];
	e: WalletException;
}

/** Wire-format fields for the LINE Thrift struct getTargetProfiles_args. */
export interface getTargetProfiles_args {
	request: GetTargetProfilesRequest;
}

/** Wire-format fields for the LINE Thrift struct getTargetProfiles_result. */
export interface getTargetProfiles_result {
	success: GetTargetProfilesResponse;
	re: RejectedException;
	sfe: ServerFailureException;
	te: TalkException;
	ere: ExcessiveRequestItemException;
}

/** Wire-format fields for the LINE Thrift struct getTargetingPopup_args. */
export interface getTargetingPopup_args {
	request: NZ0_C12150a0;
	webLoginRequest: WebLoginRequest;
}

/** Wire-format fields for the LINE Thrift struct getTargetingPopup_result. */
export interface getTargetingPopup_result {
	success: GetTargetingPopupResponse;
	e: WalletException;
}

/** Wire-format fields for the LINE Thrift struct getThaiBankBalance_args. */
export interface getThaiBankBalance_args {
	channelId: string;
}

/** Wire-format fields for the LINE Thrift struct getThaiBankBalance_result. */
export interface getThaiBankBalance_result {
	success: GetThaiBankBalanceResponse;
	e: WalletException;
}

/** Wire-format fields for the LINE Thrift struct getTotalCoinBalance_args. */
export interface getTotalCoinBalance_args {
	request: GetTotalCoinBalanceRequest;
}

/** Wire-format fields for the LINE Thrift struct getTotalCoinBalance_result. */
export interface getTotalCoinBalance_result {
	success: GetTotalCoinBalanceResponse;
	e: CoinException;
}

/** Wire-format fields for the LINE Thrift struct getUpdatedChannelIds_args. */
export interface getUpdatedChannelIds_args {
	channelIds: ChannelIdWithLastUpdated[];
}

/** Wire-format fields for the LINE Thrift struct getUpdatedChannelIds_result. */
export interface getUpdatedChannelIds_result {
	success: string[];
	e: ChannelException;
}

/** Wire-format fields for the LINE Thrift struct getUserCollections_args. */
export interface getUserCollections_args {
	request: GetUserCollectionsRequest;
}

/** Wire-format fields for the LINE Thrift struct getUserCollections_result. */
export interface getUserCollections_result {
	success: GetUserCollectionsResponse;
	e: CollectionException;
}

/** Wire-format fields for the LINE Thrift struct getUserProfile_args. */
export interface getUserProfile_args {
	authSessionId: string;
	accountIdentifier: AccountIdentifier;
}

/** Wire-format fields for the LINE Thrift struct getUserProfile_result. */
export interface getUserProfile_result {
	success: GetUserProfileResponse;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct getUserVector_args. */
export interface getUserVector_args {
	hwid: string;
	secureMessage: string;
	applicationType: number;
	applicationVersion: string;
	lang: string;
	region: string;
	modelName: string;
}

/** Wire-format fields for the LINE Thrift struct getUserVector_result. */
export interface getUserVector_result {
	success: GetUserVectorResponse;
	e: LFLPremiumException;
}

/** Wire-format fields for the LINE Thrift struct getUsersMappedByProfile_args. */
export interface getUsersMappedByProfile_args {
	request: GetUsersMappedByProfileRequest;
}

/** Wire-format fields for the LINE Thrift struct getUsersMappedByProfile_result. */
export interface getUsersMappedByProfile_result {
	success: GetUsersMappedByProfileResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getWebLoginDisallowedUrlForMultiLiffLogin_args. */
export interface getWebLoginDisallowedUrlForMultiLiffLogin_args {
	request: LiffWebLoginRequest;
}

/** Wire-format fields for the LINE Thrift struct getWebLoginDisallowedUrlForMultiLiffLogin_result. */
export interface getWebLoginDisallowedUrlForMultiLiffLogin_result {
	success: LiffWebLoginResponse;
	liffException: LiffException;
	channelException: LiffChannelException;
	talkException: TalkException;
}

/** Wire-format fields for the LINE Thrift struct getWebLoginDisallowedUrl_args. */
export interface getWebLoginDisallowedUrl_args {
	webLoginRequest: WebLoginRequest;
}

/** Wire-format fields for the LINE Thrift struct getWebLoginDisallowedUrl_result. */
export interface getWebLoginDisallowedUrl_result {
	success: WebLoginResponse;
	e: ChannelException;
}

/** Wire-format fields for the LINE Thrift struct h80_C25643c. */
export interface h80_C25643c {
}

/** Wire-format fields for the LINE Thrift struct h80_t. */
export interface h80_t {
	newDevicePublicKey: string;
	encryptedQrIdentifier: string;
}

/** Wire-format fields for the LINE Thrift struct h80_v. */
export interface h80_v {
}

/** Wire-format fields for the LINE Thrift struct I80_A0. */
export interface I80_A0 {
}

/** Wire-format fields for the LINE Thrift struct I80_C26398e. */
export interface I80_C26398e {
}

/** Wire-format fields for the LINE Thrift struct I80_C26404h. */
export interface I80_C26404h {
}

/** Wire-format fields for the LINE Thrift struct I80_F0. */
export interface I80_F0 {
}

/** Wire-format fields for the LINE Thrift struct I80_r0. */
export interface I80_r0 {
}

/** Wire-format fields for the LINE Thrift struct I80_v0. */
export interface I80_v0 {
}

/** Wire-format fields for the LINE Thrift struct inviteFriends_args. */
export interface inviteFriends_args {
	request: InviteFriendsRequest;
}

/** Wire-format fields for the LINE Thrift struct inviteFriends_result. */
export interface inviteFriends_result {
	success: InviteFriendsResponse;
	e: PremiumException;
}

/** Wire-format fields for the LINE Thrift struct inviteIntoChat_args. */
export interface inviteIntoChat_args {
	request: InviteIntoChatRequest;
}

/** Wire-format fields for the LINE Thrift struct inviteIntoChat_result. */
export interface inviteIntoChat_result {
	success: Pb1_J5;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct inviteIntoGroupCall_args. */
export interface inviteIntoGroupCall_args {
	chatMid: string;
	memberMids: string[];
	mediaType: Pb1_EnumC13237x5;
}

/** Wire-format fields for the LINE Thrift struct inviteIntoGroupCall_result. */
export interface inviteIntoGroupCall_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct inviteIntoRoom_args. */
export interface inviteIntoRoom_args {
	reqSeq: number;
	roomId: string;
	contactIds: string[];
}

/** Wire-format fields for the LINE Thrift struct inviteIntoRoom_result. */
export interface inviteIntoRoom_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct isProductForCollections_args. */
export interface isProductForCollections_args {
	request: IsProductForCollectionsRequest;
}

/** Wire-format fields for the LINE Thrift struct isProductForCollections_result. */
export interface isProductForCollections_result {
	success: IsProductForCollectionsResponse;
	e: CollectionException;
}

/** Wire-format fields for the LINE Thrift struct isStickerAvailableForCombinationSticker_args. */
export interface isStickerAvailableForCombinationSticker_args {
	request: IsStickerAvailableForCombinationStickerRequest;
}

/** Wire-format fields for the LINE Thrift struct isStickerAvailableForCombinationSticker_result. */
export interface isStickerAvailableForCombinationSticker_result {
	success: IsStickerAvailableForCombinationStickerResponse;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct isUseridAvailable_args. */
export interface isUseridAvailable_args {
	searchId: string;
}

/** Wire-format fields for the LINE Thrift struct isUseridAvailable_result. */
export interface isUseridAvailable_result {
	success: boolean;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct issueChannelToken_args. */
export interface issueChannelToken_args {
	channelId: string;
}

/** Wire-format fields for the LINE Thrift struct issueChannelToken_result. */
export interface issueChannelToken_result {
	success: ChannelToken;
	e: ChannelException;
}

/** Wire-format fields for the LINE Thrift struct issueLiffView_args. */
export interface issueLiffView_args {
	request: LiffViewRequest;
}

/** Wire-format fields for the LINE Thrift struct issueLiffView_result. */
export interface issueLiffView_result {
	success: LiffViewResponse;
	liffException: LiffException;
	talkException: TalkException;
}

/** Wire-format fields for the LINE Thrift struct issueNonce_result. */
export interface issueNonce_result {
	success: string;
	e: PaymentException;
}

/** Wire-format fields for the LINE Thrift struct issueRequestTokenWithAuthScheme_args. */
export interface issueRequestTokenWithAuthScheme_args {
	channelId: string;
	otpId: string;
	authScheme: string[];
	returnUrl: string;
}

/** Wire-format fields for the LINE Thrift struct issueRequestTokenWithAuthScheme_result. */
export interface issueRequestTokenWithAuthScheme_result {
	success: RequestTokenResponse;
	e: ChannelException;
}

/** Wire-format fields for the LINE Thrift struct issueSubLiffView_args. */
export interface issueSubLiffView_args {
	request: LiffViewRequest;
}

/** Wire-format fields for the LINE Thrift struct issueSubLiffView_result. */
export interface issueSubLiffView_result {
	success: LiffViewResponse;
	liffException: LiffException;
	talkException: TalkException;
}

/** Wire-format fields for the LINE Thrift struct issueTokenForAccountMigrationSettings_args. */
export interface issueTokenForAccountMigrationSettings_args {
	enforce: boolean;
}

/** Wire-format fields for the LINE Thrift struct issueTokenForAccountMigrationSettings_result. */
export interface issueTokenForAccountMigrationSettings_result {
	success: SecurityCenterResult;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct issueToken_args. */
export interface issueToken_args {
	request: IssueBirthdayGiftTokenRequest;
}

/** Wire-format fields for the LINE Thrift struct issueToken_result. */
export interface issueToken_result {
	success: IssueBirthdayGiftTokenResponse;
	e: any;
}

/** Wire-format fields for the LINE Thrift struct issueV3TokenForPrimary_args. */
export interface issueV3TokenForPrimary_args {
	request: IssueV3TokenForPrimaryRequest;
}

/** Wire-format fields for the LINE Thrift struct issueV3TokenForPrimary_result. */
export interface issueV3TokenForPrimary_result {
	success: IssueV3TokenForPrimaryResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct issueWebAuthDetailsForSecondAuth_args. */
export interface issueWebAuthDetailsForSecondAuth_args {
	authSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct issueWebAuthDetailsForSecondAuth_result. */
export interface issueWebAuthDetailsForSecondAuth_result {
	success: IssueWebAuthDetailsForSecondAuthResponse;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct joinChatByCallUrl_args. */
export interface joinChatByCallUrl_args {
	request: JoinChatByCallUrlRequest;
}

/** Wire-format fields for the LINE Thrift struct joinChatByCallUrl_result. */
export interface joinChatByCallUrl_result {
	success: JoinChatByCallUrlResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct jp_naver_line_shop_protocol_thrift_ProductProperty. */
export interface jp_naver_line_shop_protocol_thrift_ProductProperty {
}

/** Wire-format fields for the LINE Thrift struct kf_i. */
export interface kf_i {
}

/** Wire-format fields for the LINE Thrift struct kf_k. */
export interface kf_k {
}

/** Wire-format fields for the LINE Thrift struct kf_m. */
export interface kf_m {
	richmenu: RichmenuEvent;
	talkroom: TalkroomEvent;
}

/** Wire-format fields for the LINE Thrift struct kf_w. */
export interface kf_w {
	profileRefererContent: any;
}

/** Wire-format fields for the LINE Thrift struct kickoutFromGroupCall_args. */
export interface kickoutFromGroupCall_args {
	kickoutFromGroupCallRequest: KickoutFromGroupCallRequest;
}

/** Wire-format fields for the LINE Thrift struct kickoutFromGroupCall_result. */
export interface kickoutFromGroupCall_result {
	success: Pb1_S5;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct leaveRoom_args. */
export interface leaveRoom_args {
	reqSeq: number;
	roomId: string;
}

/** Wire-format fields for the LINE Thrift struct leaveRoom_result. */
export interface leaveRoom_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct linkDevice_args. */
export interface linkDevice_args {
	request: DeviceLinkRequest;
}

/** Wire-format fields for the LINE Thrift struct linkDevice_result. */
export interface linkDevice_result {
	success: DeviceLinkResponse;
	e: ThingsException;
}

/** Wire-format fields for the LINE Thrift struct logoutV2_result. */
export interface logoutV2_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct lookupAvailableEap_args. */
export interface lookupAvailableEap_args {
	request: LookupAvailableEapRequest;
}

/** Wire-format fields for the LINE Thrift struct lookupAvailableEap_result. */
export interface lookupAvailableEap_result {
	success: LookupAvailableEapResponse;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct lookupPaidCall_args. */
export interface lookupPaidCall_args {
	dialedNumber: string;
	language: string;
	referer: string;
}

/** Wire-format fields for the LINE Thrift struct lookupPaidCall_result. */
export interface lookupPaidCall_result {
	success: PaidCallResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct m80_l. */
export interface m80_l {
}

/** Wire-format fields for the LINE Thrift struct m80_n. */
export interface m80_n {
}

/** Wire-format fields for the LINE Thrift struct m80_q. */
export interface m80_q {
}

/** Wire-format fields for the LINE Thrift struct m80_s. */
export interface m80_s {
}

/** Wire-format fields for the LINE Thrift struct mapProfileToUsers_args. */
export interface mapProfileToUsers_args {
	request: MapProfileToUsersRequest;
}

/** Wire-format fields for the LINE Thrift struct mapProfileToUsers_result. */
export interface mapProfileToUsers_result {
	success: MapProfileToUsersResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct migratePrimaryUsingEapAccountWithTokenV3_args. */
export interface migratePrimaryUsingEapAccountWithTokenV3_args {
	authSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct migratePrimaryUsingEapAccountWithTokenV3_result. */
export interface migratePrimaryUsingEapAccountWithTokenV3_result {
	success: MigratePrimaryWithTokenV3Response;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct migratePrimaryUsingPhoneWithTokenV3_args. */
export interface migratePrimaryUsingPhoneWithTokenV3_args {
	authSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct migratePrimaryUsingPhoneWithTokenV3_result. */
export interface migratePrimaryUsingPhoneWithTokenV3_result {
	success: MigratePrimaryWithTokenV3Response;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct migratePrimaryUsingQrCode_args. */
export interface migratePrimaryUsingQrCode_args {
	request: MigratePrimaryUsingQrCodeRequest;
}

/** Wire-format fields for the LINE Thrift struct migratePrimaryUsingQrCode_result. */
export interface migratePrimaryUsingQrCode_result {
	success: MigratePrimaryUsingQrCodeResponse;
	e: PrimaryQrCodeMigrationException;
}

/** Wire-format fields for the LINE Thrift struct n80_C31222b. */
export interface n80_C31222b {
}

/** Wire-format fields for the LINE Thrift struct n80_d. */
export interface n80_d {
}

/** Wire-format fields for the LINE Thrift struct negotiateE2EEPublicKey_args. */
export interface negotiateE2EEPublicKey_args {
	mid: string;
}

/** Wire-format fields for the LINE Thrift struct negotiateE2EEPublicKey_result. */
export interface negotiateE2EEPublicKey_result {
	success: E2EENegotiationResult;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct noop_args. */
export interface noop_args {
}

/** Wire-format fields for the LINE Thrift struct noop_result. */
export interface noop_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct notifyBannerShowing_result. */
export interface notifyBannerShowing_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct notifyBannerTapped_result. */
export interface notifyBannerTapped_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct notifyBeaconDetected_result. */
export interface notifyBeaconDetected_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct notifyChatAdEntry_args. */
export interface notifyChatAdEntry_args {
	request: NotifyChatAdEntryRequest;
}

/** Wire-format fields for the LINE Thrift struct notifyChatAdEntry_result. */
export interface notifyChatAdEntry_result {
	success: kf_i;
	e: BotExternalException;
}

/** Wire-format fields for the LINE Thrift struct notifyDeviceConnection_args. */
export interface notifyDeviceConnection_args {
	request: NotifyDeviceConnectionRequest;
}

/** Wire-format fields for the LINE Thrift struct notifyDeviceConnection_result. */
export interface notifyDeviceConnection_result {
	success: NotifyDeviceConnectionResponse;
	e: ThingsException;
}

/** Wire-format fields for the LINE Thrift struct notifyDeviceDisconnection_args. */
export interface notifyDeviceDisconnection_args {
	request: NotifyDeviceDisconnectionRequest;
}

/** Wire-format fields for the LINE Thrift struct notifyDeviceDisconnection_result. */
export interface notifyDeviceDisconnection_result {
	success: do0_C23165x;
	e: ThingsException;
}

/** Wire-format fields for the LINE Thrift struct notifyInstalled_args. */
export interface notifyInstalled_args {
	udidHash: string;
	applicationTypeWithExtensions: string;
}

/** Wire-format fields for the LINE Thrift struct notifyInstalled_result. */
export interface notifyInstalled_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct notifyOATalkroomEvents_args. */
export interface notifyOATalkroomEvents_args {
	request: NotifyOATalkroomEventsRequest;
}

/** Wire-format fields for the LINE Thrift struct notifyOATalkroomEvents_result. */
export interface notifyOATalkroomEvents_result {
	success: kf_k;
	e: BotExternalException;
}

/** Wire-format fields for the LINE Thrift struct notifyProductEvent_args. */
export interface notifyProductEvent_args {
	shopId: string;
	productId: string;
	productVersion: Int64;
	productEvent: Int64;
}

/** Wire-format fields for the LINE Thrift struct notifyProductEvent_result. */
export interface notifyProductEvent_result {
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct notifyRegistrationComplete_args. */
export interface notifyRegistrationComplete_args {
	udidHash: string;
	applicationTypeWithExtensions: string;
}

/** Wire-format fields for the LINE Thrift struct notifyRegistrationComplete_result. */
export interface notifyRegistrationComplete_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct notifyScenarioExecuted_args. */
export interface notifyScenarioExecuted_args {
	request: NotifyScenarioExecutedRequest;
}

/** Wire-format fields for the LINE Thrift struct notifyScenarioExecuted_result. */
export interface notifyScenarioExecuted_result {
	success: do0_C23167z;
	e: ThingsException;
}

/** Wire-format fields for the LINE Thrift struct notifySleep_result. */
export interface notifySleep_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct notifyUpdated_args. */
export interface notifyUpdated_args {
	lastRev: Int64;
	deviceInfo: DeviceInfo;
	udidHash: string;
	oldUdidHash: string;
}

/** Wire-format fields for the LINE Thrift struct notifyUpdated_result. */
export interface notifyUpdated_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct o80_C32273b. */
export interface o80_C32273b {
}

/** Wire-format fields for the LINE Thrift struct o80_d. */
export interface o80_d {
}

/** Wire-format fields for the LINE Thrift struct o80_m. */
export interface o80_m {
}

/** Wire-format fields for the LINE Thrift struct og_u. */
export interface og_u {
}

/** Wire-format fields for the LINE Thrift struct openAuthSession_args. */
export interface openAuthSession_args {
	request: AuthSessionRequest;
}

/** Wire-format fields for the LINE Thrift struct openAuthSession_result. */
export interface openAuthSession_result {
	success: string;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct openProximityMatch_result. */
export interface openProximityMatch_result {
	success: string;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct openSession_args. */
export interface openSession_args {
	request: OpenSessionRequest;
}

/** Wire-format fields for the LINE Thrift struct openSession_result. */
export interface openSession_result {
	success: string;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct permitLogin_args. */
export interface permitLogin_args {
	request: PermitLoginRequest;
}

/** Wire-format fields for the LINE Thrift struct permitLogin_result. */
export interface permitLogin_result {
	success: PermitLoginResponse;
	sle: SeamlessLoginException;
	tae: TokenAuthException;
}

/** Wire-format fields for the LINE Thrift struct placePurchaseOrderForFreeProduct_args. */
export interface placePurchaseOrderForFreeProduct_args {
	purchaseOrder: PurchaseOrder;
}

/** Wire-format fields for the LINE Thrift struct placePurchaseOrderForFreeProduct_result. */
export interface placePurchaseOrderForFreeProduct_result {
	success: PurchaseOrderResponse;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct placePurchaseOrderWithLineCoin_args. */
export interface placePurchaseOrderWithLineCoin_args {
	purchaseOrder: PurchaseOrder;
}

/** Wire-format fields for the LINE Thrift struct placePurchaseOrderWithLineCoin_result. */
export interface placePurchaseOrderWithLineCoin_result {
	success: PurchaseOrderResponse;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct postPopupButtonEvents_args. */
export interface postPopupButtonEvents_args {
	buttonId: string;
	checkboxes: Record<string, boolean>;
}

/** Wire-format fields for the LINE Thrift struct postPopupButtonEvents_result. */
export interface postPopupButtonEvents_result {
	e: PaymentException;
}

/** Wire-format fields for the LINE Thrift struct purchaseSubscription_args. */
export interface purchaseSubscription_args {
	req: PurchaseSubscriptionRequest;
}

/** Wire-format fields for the LINE Thrift struct purchaseSubscription_result. */
export interface purchaseSubscription_result {
	success: PurchaseSubscriptionResponse;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct putE2eeKey_args. */
export interface putE2eeKey_args {
	request: PutE2eeKeyRequest;
}

/** Wire-format fields for the LINE Thrift struct putE2eeKey_result. */
export interface putE2eeKey_result {
	success: o80_m;
	e: SecondaryPwlessLoginException;
}

/** Wire-format fields for the LINE Thrift struct q80_C33650b. */
export interface q80_C33650b {
}

/** Wire-format fields for the LINE Thrift struct q80_q. */
export interface q80_q {
}

/** Wire-format fields for the LINE Thrift struct q80_s. */
export interface q80_s {
}

/** Wire-format fields for the LINE Thrift struct qm_C34110c. */
export interface qm_C34110c {
	inFriends: string;
	notInFriends: string;
	termsAgreed: boolean;
}

/** Wire-format fields for the LINE Thrift struct qm_C34115h. */
export interface qm_C34115h {
	hwid: string;
	secureMessage: string;
	applicationType: ApplicationType;
	applicationVersion: string;
	userSessionId: string;
	actionId: Int64;
	screen: string;
	bannerStartedAt: Int64;
	bannerShownFor: Int64;
}

/** Wire-format fields for the LINE Thrift struct qm_j. */
export interface qm_j {
	hwid: string;
	secureMessage: string;
	applicationType: ApplicationType;
	applicationVersion: string;
	userSessionId: string;
	actionId: Int64;
	screen: string;
	bannerTappedAt: Int64;
	beaconTermAgreed: boolean;
}

/** Wire-format fields for the LINE Thrift struct qm_l. */
export interface qm_l {
	hwid: string;
	secureMessage: string;
	applicationType: ApplicationType;
	applicationVersion: string;
	lang: string;
	region: string;
	modelName: string;
}

/** Wire-format fields for the LINE Thrift struct qm_o. */
export interface qm_o {
	hwid: string;
	secureMessage: string;
	notificationType: qm_EnumC34112e;
	rssi: Rssi;
}

/** Wire-format fields for the LINE Thrift struct queryBeaconActions_result. */
export interface queryBeaconActions_result {
	success: BeaconQueryResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct r80_C34358N. */
export interface r80_C34358N {
}

/** Wire-format fields for the LINE Thrift struct r80_C34360P. */
export interface r80_C34360P {
}

/** Wire-format fields for the LINE Thrift struct react_args. */
export interface react_args {
	reactRequest: ReactRequest;
}

/** Wire-format fields for the LINE Thrift struct react_result. */
export interface react_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct refresh_args. */
export interface refresh_args {
	request: RefreshAccessTokenRequest;
}

/** Wire-format fields for the LINE Thrift struct refresh_result. */
export interface refresh_result {
	success: RefreshAccessTokenResponse;
	accessTokenRefreshException: AccessTokenRefreshException;
}

/** Wire-format fields for the LINE Thrift struct registerBarcodeAsync_args. */
export interface registerBarcodeAsync_args {
	requestToken: string;
	barcodeRequestId: string;
	barcode: string;
	password: RSAEncryptedPassword;
}

/** Wire-format fields for the LINE Thrift struct registerBarcodeAsync_result. */
export interface registerBarcodeAsync_result {
	e: PaymentException;
}

/** Wire-format fields for the LINE Thrift struct registerCampaignReward_args. */
export interface registerCampaignReward_args {
	setting: any[];
}

/** Wire-format fields for the LINE Thrift struct registerCampaignReward_result. */
export interface registerCampaignReward_result {
	success: RegisterCampaignRewardResponse;
	e: WalletException;
}

/** Wire-format fields for the LINE Thrift struct registerE2EEGroupKey_args. */
export interface registerE2EEGroupKey_args {
	keyVersion: number;
	chatMid: string;
	members: string[];
	keyIds: number[];
	encryptedSharedKeys: (string | Buffer)[];
}

/** Wire-format fields for the LINE Thrift struct registerE2EEGroupKey_result. */
export interface registerE2EEGroupKey_result {
	success: Pb1_U3;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct registerE2EEPublicKeyV2_args. */
export interface registerE2EEPublicKeyV2_args {
	request: Pb1_W6;
}

/** Wire-format fields for the LINE Thrift struct registerE2EEPublicKeyV2_result. */
export interface registerE2EEPublicKeyV2_result {
	success: RegisterE2EEPublicKeyV2Response;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct registerE2EEPublicKey_args. */
export interface registerE2EEPublicKey_args {
	e: any;
	publicKey: Pb1_C13097n4;
	success: Pb1_C13097n4;
}

/** Wire-format fields for the LINE Thrift struct registerE2EEPublicKey_result. */
export interface registerE2EEPublicKey_result {
	success: Pb1_C13097n4;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct registerPrimaryCredential_args. */
export interface registerPrimaryCredential_args {
	request: RegisterPrimaryCredentialRequest;
}

/** Wire-format fields for the LINE Thrift struct registerPrimaryCredential_result. */
export interface registerPrimaryCredential_result {
	success: R70_t;
	e: PwlessCredentialException;
}

/** Wire-format fields for the LINE Thrift struct registerPrimaryUsingEapAccount_args. */
export interface registerPrimaryUsingEapAccount_args {
	authSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct registerPrimaryUsingEapAccount_result. */
export interface registerPrimaryUsingEapAccount_result {
	success: RegisterPrimaryWithTokenV3Response;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct registerPrimaryUsingPhoneWithTokenV3_args. */
export interface registerPrimaryUsingPhoneWithTokenV3_args {
	authSessionId: string;
}

/** Wire-format fields for the LINE Thrift struct registerPrimaryUsingPhoneWithTokenV3_result. */
export interface registerPrimaryUsingPhoneWithTokenV3_result {
	success: RegisterPrimaryWithTokenV3Response;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct I80_C26367C. */
export interface I80_C26367C {
	request: I80_q0;
}

/** Wire-format fields for the LINE Thrift struct I80_C26368D. */
export interface I80_C26368D {
	success: I80_r0;
	e: I80_C26390a;
	tae: TokenAuthException;
}

/** Wire-format fields for the LINE Thrift struct registerUserid_args. */
export interface registerUserid_args {
	reqSeq: number;
	searchId: string;
}

/** Wire-format fields for the LINE Thrift struct registerUserid_result. */
export interface registerUserid_result {
	success: boolean;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct reissueChatTicket_args. */
export interface reissueChatTicket_args {
	request: ReissueChatTicketRequest;
}

/** Wire-format fields for the LINE Thrift struct reissueChatTicket_result. */
export interface reissueChatTicket_result {
	success: ReissueChatTicketResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct rejectChatInvitation_args. */
export interface rejectChatInvitation_args {
	request: RejectChatInvitationRequest;
}

/** Wire-format fields for the LINE Thrift struct rejectChatInvitation_result. */
export interface rejectChatInvitation_result {
	success: Pb1_C12946c7;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct removeAllMessages_result. */
export interface removeAllMessages_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct removeChatRoomAnnouncement_args. */
export interface removeChatRoomAnnouncement_args {
	reqSeq: number;
	chatRoomMid: string;
	announcementSeq: Int64;
}

/** Wire-format fields for the LINE Thrift struct removeChatRoomAnnouncement_result. */
export interface removeChatRoomAnnouncement_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct removeFollower_args. */
export interface removeFollower_args {
	removeFollowerRequest: RemoveFollowerRequest;
}

/** Wire-format fields for the LINE Thrift struct removeFollower_result. */
export interface removeFollower_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct removeFriendRequest_args. */
export interface removeFriendRequest_args {
	direction: Pb1_F4;
	midOrEMid: string;
}

/** Wire-format fields for the LINE Thrift struct removeFriendRequest_result. */
export interface removeFriendRequest_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct removeFromFollowBlacklist_args. */
export interface removeFromFollowBlacklist_args {
	removeFromFollowBlacklistRequest: RemoveFromFollowBlacklistRequest;
}

/** Wire-format fields for the LINE Thrift struct removeFromFollowBlacklist_result. */
export interface removeFromFollowBlacklist_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct removeIdentifier_args. */
export interface removeIdentifier_args {
	authSessionId: string;
	request: IdentityCredentialRequest;
}

/** Wire-format fields for the LINE Thrift struct removeIdentifier_result. */
export interface removeIdentifier_result {
	success: IdentityCredentialResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct removeItemFromCollection_args. */
export interface removeItemFromCollection_args {
	request: RemoveItemFromCollectionRequest;
}

/** Wire-format fields for the LINE Thrift struct removeItemFromCollection_result. */
export interface removeItemFromCollection_result {
	success: Ob1_C12637k1;
	e: CollectionException;
}

/** Wire-format fields for the LINE Thrift struct removeLinePayAccount_args. */
export interface removeLinePayAccount_args {
	accountId: string;
}

/** Wire-format fields for the LINE Thrift struct removeLinePayAccount_result. */
export interface removeLinePayAccount_result {
	e: PaymentException;
}

/** Wire-format fields for the LINE Thrift struct removeProductFromSubscriptionSlot_args. */
export interface removeProductFromSubscriptionSlot_args {
	req: RemoveProductFromSubscriptionSlotRequest;
}

/** Wire-format fields for the LINE Thrift struct removeProductFromSubscriptionSlot_result. */
export interface removeProductFromSubscriptionSlot_result {
	success: RemoveProductFromSubscriptionSlotResponse;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct reportAbuseEx_args. */
export interface reportAbuseEx_args {
	request: ReportAbuseExRequest;
}

/** Wire-format fields for the LINE Thrift struct reportAbuseEx_result. */
export interface reportAbuseEx_result {
	success: Pb1_C13114o7;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct reportDeviceState_args. */
export interface reportDeviceState_args {
	booleanState: Record<number, boolean>;
	stringState: Record<number, string>;
}

/** Wire-format fields for the LINE Thrift struct reportDeviceState_result. */
export interface reportDeviceState_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct reportLocation_args. */
export interface reportLocation_args {
	location: Geolocation;
	trigger: Pb1_EnumC12917a6;
	networkStatus: ClientNetworkStatus;
	measuredAt: Int64;
	clientCurrentTimestamp: Int64;
	debugInfo: LocationDebugInfo;
	appState: number;
}

/** Wire-format fields for the LINE Thrift struct reportLocation_result. */
export interface reportLocation_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct reportNetworkStatus_args. */
export interface reportNetworkStatus_args {
	trigger: Pb1_EnumC12917a6;
	networkStatus: ClientNetworkStatus;
	measuredAt: Int64;
	scanCompletionTimestamp: Int64;
}

/** Wire-format fields for the LINE Thrift struct reportNetworkStatus_result. */
export interface reportNetworkStatus_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct reportProfile_args. */
export interface reportProfile_args {
	syncOpRevision: Int64;
	profile: Profile;
}

/** Wire-format fields for the LINE Thrift struct reportProfile_result. */
export interface reportProfile_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct reportPushRecvReports_args. */
export interface reportPushRecvReports_args {
	reqSeq: number;
	pushRecvReports: PushRecvReport[];
}

/** Wire-format fields for the LINE Thrift struct reportPushRecvReports_result. */
export interface reportPushRecvReports_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct reportRefreshedAccessToken_args. */
export interface reportRefreshedAccessToken_args {
	request: ReportRefreshedAccessTokenRequest;
}

/** Wire-format fields for the LINE Thrift struct reportRefreshedAccessToken_result. */
export interface reportRefreshedAccessToken_result {
	success: P70_k;
	accessTokenRefreshException: AccessTokenRefreshException;
}

/** Wire-format fields for the LINE Thrift struct reportSettings_args. */
export interface reportSettings_args {
	syncOpRevision: Int64;
	settings: Settings;
}

/** Wire-format fields for the LINE Thrift struct reportSettings_result. */
export interface reportSettings_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct requestCleanupUserProvidedData_args. */
export interface requestCleanupUserProvidedData_args {
	dataTypes: Pb1_od[];
}

/** Wire-format fields for the LINE Thrift struct requestCleanupUserProvidedData_result. */
export interface requestCleanupUserProvidedData_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct I80_C26388Y. */
export interface I80_C26388Y {
	request: I80_u0;
}

/** Wire-format fields for the LINE Thrift struct requestToSendPasswordSetVerificationEmail_args. */
export interface requestToSendPasswordSetVerificationEmail_args {
	authSessionId: string;
	email: string;
	accountIdentifier: AccountIdentifier;
}

/** Wire-format fields for the LINE Thrift struct requestToSendPasswordSetVerificationEmail_result. */
export interface requestToSendPasswordSetVerificationEmail_result {
	success: RequestToSendPasswordSetVerificationEmailResponse;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct I80_C26389Z. */
export interface I80_C26389Z {
	success: I80_v0;
	e: I80_C26390a;
}

/** Wire-format fields for the LINE Thrift struct requestToSendPhonePinCode_args. */
export interface requestToSendPhonePinCode_args {
	request: ReqToSendPhonePinCodeRequest;
}

/** Wire-format fields for the LINE Thrift struct I80_C26391a0. */
export interface I80_C26391a0 {
	request: I80_s0;
}

/** Wire-format fields for the LINE Thrift struct requestToSendPhonePinCode_result. */
export interface requestToSendPhonePinCode_result {
	success: ReqToSendPhonePinCodeResponse;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct I80_C26393b0. */
export interface I80_C26393b0 {
	success: I80_t0;
	e: I80_C26390a;
}

/** Wire-format fields for the LINE Thrift struct requestTradeNumber_args. */
export interface requestTradeNumber_args {
	requestToken: string;
	requestType: r80_g0;
	amount: string;
	name: string;
}

/** Wire-format fields for the LINE Thrift struct requestTradeNumber_result. */
export interface requestTradeNumber_result {
	success: PaymentTradeInfo;
	e: PaymentException;
}

/** Wire-format fields for the LINE Thrift struct resendIdentifierConfirmation_args. */
export interface resendIdentifierConfirmation_args {
	authSessionId: string;
	request: IdentityCredentialRequest;
}

/** Wire-format fields for the LINE Thrift struct resendIdentifierConfirmation_result. */
export interface resendIdentifierConfirmation_result {
	success: IdentityCredentialResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct resendPinCode_args. */
export interface resendPinCode_args {
	sessionId: string;
}

/** Wire-format fields for the LINE Thrift struct resendPinCode_result. */
export interface resendPinCode_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct reserveCoinPurchase_args. */
export interface reserveCoinPurchase_args {
	request: CoinPurchaseReservation;
}

/** Wire-format fields for the LINE Thrift struct reserveCoinPurchase_result. */
export interface reserveCoinPurchase_result {
	success: PaymentReservationResult;
	e: CoinException;
}

/** Wire-format fields for the LINE Thrift struct reserveSubscriptionPurchase_args. */
export interface reserveSubscriptionPurchase_args {
	request: ReserveSubscriptionPurchaseRequest;
}

/** Wire-format fields for the LINE Thrift struct reserveSubscriptionPurchase_result. */
export interface reserveSubscriptionPurchase_result {
	success: ReserveSubscriptionPurchaseResponse;
	e: PremiumException;
}

/** Wire-format fields for the LINE Thrift struct reserve_args. */
export interface reserve_args {
	request: ReserveRequest;
}

/** Wire-format fields for the LINE Thrift struct reserve_result. */
export interface reserve_result {
	success: ReserveInfo;
	e: MembershipException;
}

/** Wire-format fields for the LINE Thrift struct respondE2EEKeyExchange_result. */
export interface respondE2EEKeyExchange_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct respondE2EELoginRequest_args. */
export interface respondE2EELoginRequest_args {
	verifier: string;
	publicKey: Pb1_C13097n4;
	encryptedKeyChain: string;
	hashKeyChain: string;
	errorCode: number;
}

/** Wire-format fields for the LINE Thrift struct respondE2EELoginRequest_result. */
export interface respondE2EELoginRequest_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct restoreE2EEKeyBackup_args. */
export interface restoreE2EEKeyBackup_args {
	request: Pb1_C13155r7;
}

/** Wire-format fields for the LINE Thrift struct restoreE2EEKeyBackup_result. */
export interface restoreE2EEKeyBackup_result {
	success: Pb1_C13169s7;
	e: E2EEKeyBackupException;
}

/** Wire-format fields for the LINE Thrift struct I80_C26395c0. */
export interface I80_C26395c0 {
	request: I80_w0;
}

/** Wire-format fields for the LINE Thrift struct I80_C26397d0. */
export interface I80_C26397d0 {
	success: I80_x0;
	e: I80_C26390a;
}

/** Wire-format fields for the LINE Thrift struct I80_C26399e0. */
export interface I80_C26399e0 {
	request: I80_w0;
}

/** Wire-format fields for the LINE Thrift struct I80_C26401f0. */
export interface I80_C26401f0 {
	success: I80_x0;
	e: I80_C26390a;
}

/** Wire-format fields for the LINE Thrift struct retrieveRequestTokenWithDocomoV2_args. */
export interface retrieveRequestTokenWithDocomoV2_args {
	request: Pb1_C13183t7;
}

/** Wire-format fields for the LINE Thrift struct retrieveRequestTokenWithDocomoV2_result. */
export interface retrieveRequestTokenWithDocomoV2_result {
	success: RetrieveRequestTokenWithDocomoV2Response;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct retrieveRequestToken_args. */
export interface retrieveRequestToken_args {
	carrier: CarrierCode;
}

/** Wire-format fields for the LINE Thrift struct retrieveRequestToken_result. */
export interface retrieveRequestToken_result {
	success: AgeCheckRequestResult;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct revokeTokens_args. */
export interface revokeTokens_args {
	request: RevokeTokensRequest;
}

/** Wire-format fields for the LINE Thrift struct revokeTokens_result. */
export interface revokeTokens_result {
	liffException: LiffException;
	talkException: TalkException;
}

/** Wire-format fields for the LINE Thrift struct saveStudentInformation_args. */
export interface saveStudentInformation_args {
	req: SaveStudentInformationRequest;
}

/** Wire-format fields for the LINE Thrift struct saveStudentInformation_result. */
export interface saveStudentInformation_result {
	success: Ob1_C12649o1;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct sendChatChecked_args. */
export interface sendChatChecked_args {
	seq: number;
	chatMid: string;
	lastMessageId: string;
	sessionId: number;
}

/** Wire-format fields for the LINE Thrift struct sendChatChecked_result. */
export interface sendChatChecked_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct sendChatRemoved_args. */
export interface sendChatRemoved_args {
	seq: number;
	chatMid: string;
	lastMessageId: string;
	sessionId: number;
}

/** Wire-format fields for the LINE Thrift struct sendChatRemoved_result. */
export interface sendChatRemoved_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct sendEncryptedE2EEKey_args. */
export interface sendEncryptedE2EEKey_args {
	request: SendEncryptedE2EEKeyRequest;
}

/** Wire-format fields for the LINE Thrift struct sendEncryptedE2EEKey_result. */
export interface sendEncryptedE2EEKey_result {
	success: h80_v;
	pqme: PrimaryQrCodeMigrationException;
	tae: TokenAuthException;
}

/** Wire-format fields for the LINE Thrift struct sendMessage_args. */
export interface sendMessage_args {
	seq: number;
	message: Message;
}

/** Wire-format fields for the LINE Thrift struct sendMessage_result. */
export interface sendMessage_result {
	success: Message;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct sendPostback_args. */
export interface sendPostback_args {
	request: SendPostbackRequest;
}

/** Wire-format fields for the LINE Thrift struct sendPostback_result. */
export interface sendPostback_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct setChatHiddenStatus_args. */
export interface setChatHiddenStatus_args {
	setChatHiddenStatusRequest: SetChatHiddenStatusRequest;
}

/** Wire-format fields for the LINE Thrift struct setChatHiddenStatus_result. */
export interface setChatHiddenStatus_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct setHashedPassword_args. */
export interface setHashedPassword_args {
	request: SetHashedPasswordRequest;
}

/** Wire-format fields for the LINE Thrift struct I80_C26403g0. */
export interface I80_C26403g0 {
	request: I80_z0;
}

/** Wire-format fields for the LINE Thrift struct setHashedPassword_result. */
export interface setHashedPassword_result {
	success: T70_g1;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct I80_C26405h0. */
export interface I80_C26405h0 {
	success: I80_A0;
	e: I80_C26390a;
}

/** Wire-format fields for the LINE Thrift struct setIdentifier_args. */
export interface setIdentifier_args {
	authSessionId: string;
	request: IdentityCredentialRequest;
}

/** Wire-format fields for the LINE Thrift struct setIdentifier_result. */
export interface setIdentifier_result {
	success: IdentityCredentialResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct setNotificationsEnabled_args. */
export interface setNotificationsEnabled_args {
	reqSeq: number;
	type: MIDType;
	target: string;
	enablement: boolean;
}

/** Wire-format fields for the LINE Thrift struct setNotificationsEnabled_result. */
export interface setNotificationsEnabled_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct setPassword_args. */
export interface setPassword_args {
	request: SetPasswordRequest;
}

/** Wire-format fields for the LINE Thrift struct setPassword_result. */
export interface setPassword_result {
	success: U70_t;
	pue: PasswordUpdateException;
	tae: TokenAuthException;
}

/** Wire-format fields for the LINE Thrift struct shouldShowWelcomeStickerBanner_args. */
export interface shouldShowWelcomeStickerBanner_args {
	request: Ob1_C12660s1;
}

/** Wire-format fields for the LINE Thrift struct shouldShowWelcomeStickerBanner_result. */
export interface shouldShowWelcomeStickerBanner_result {
	success: ShouldShowWelcomeStickerBannerResponse;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct startPhotobooth_args. */
export interface startPhotobooth_args {
	request: StartPhotoboothRequest;
}

/** Wire-format fields for the LINE Thrift struct startPhotobooth_result. */
export interface startPhotobooth_result {
	success: StartPhotoboothResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct I80_C26407i0. */
export interface I80_C26407i0 {
	request: I80_C0;
}

/** Wire-format fields for the LINE Thrift struct I80_C26409j0. */
export interface I80_C26409j0 {
	success: I80_D0;
	e: I80_C26390a;
}

/** Wire-format fields for the LINE Thrift struct startUpdateVerification_args. */
export interface startUpdateVerification_args {
	region: string;
	carrier: CarrierCode;
	phone: string;
	udidHash: string;
	deviceInfo: DeviceInfo;
	networkCode: string;
	locale: string;
	simInfo: SIMInfo;
}

/** Wire-format fields for the LINE Thrift struct startUpdateVerification_result. */
export interface startUpdateVerification_result {
	success: VerificationSessionData;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct stopBundleSubscription_args. */
export interface stopBundleSubscription_args {
	request: StopBundleSubscriptionRequest;
}

/** Wire-format fields for the LINE Thrift struct stopBundleSubscription_result. */
export interface stopBundleSubscription_result {
	success: StopBundleSubscriptionResponse;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct storeShareTargetPickerResult_args. */
export interface storeShareTargetPickerResult_args {
	request: ShareTargetPickerResultRequest;
}

/** Wire-format fields for the LINE Thrift struct storeShareTargetPickerResult_result. */
export interface storeShareTargetPickerResult_result {
	liffException: LiffException;
	talkException: TalkException;
}

/** Wire-format fields for the LINE Thrift struct storeSubWindowResult_args. */
export interface storeSubWindowResult_args {
	request: SubWindowResultRequest;
}

/** Wire-format fields for the LINE Thrift struct storeSubWindowResult_result. */
export interface storeSubWindowResult_result {
	liffException: LiffException;
	talkException: TalkException;
}

/** Wire-format fields for the LINE Thrift struct syncContacts_args. */
export interface syncContacts_args {
	reqSeq: number;
	localContacts: ContactModification[];
}

/** Wire-format fields for the LINE Thrift struct syncContacts_result. */
export interface syncContacts_result {
	success: Record<string, ContactRegistration>;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct sync_args. */
export interface sync_args {
	request: SyncRequest;
}

/** Wire-format fields for the LINE Thrift struct sync_result. */
export interface sync_result {
	success: Pb1_X7;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct t80_g. */
export interface t80_g {
	response: GetResponse;
	error: SettingsException;
}

/** Wire-format fields for the LINE Thrift struct t80_l. */
export interface t80_l {
	response: SetResponse;
	error: SettingsException;
}

/** Wire-format fields for the LINE Thrift struct t80_p. */
export interface t80_p {
	booleanValue: boolean;
	i64Value: Int64;
	stringValue: string;
	stringListValue: any[];
	i64ListValue: any[];
	rawJsonStringValue: string;
	i8Value: number;
	i16Value: number;
	i32Value: number;
	doubleValue: number;
	i8ListValue: any[];
	i16ListValue: any[];
	i32ListValue: any[];
}

/** Wire-format fields for the LINE Thrift struct tryFriendRequest_args. */
export interface tryFriendRequest_args {
	midOrEMid: string;
	method: Pb1_G4;
	friendRequestParams: string;
}

/** Wire-format fields for the LINE Thrift struct tryFriendRequest_result. */
export interface tryFriendRequest_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct unblockContact_args. */
export interface unblockContact_args {
	reqSeq: number;
	id: string;
	reference: string;
}

/** Wire-format fields for the LINE Thrift struct unblockContact_result. */
export interface unblockContact_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct unblockRecommendation_args. */
export interface unblockRecommendation_args {
	reqSeq: number;
	targetMid: string;
}

/** Wire-format fields for the LINE Thrift struct unblockRecommendation_result. */
export interface unblockRecommendation_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct unfollow_args. */
export interface unfollow_args {
	unfollowRequest: UnfollowRequest;
}

/** Wire-format fields for the LINE Thrift struct unfollow_result. */
export interface unfollow_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct unlinkDevice_args. */
export interface unlinkDevice_args {
	request: DeviceUnlinkRequest;
}

/** Wire-format fields for the LINE Thrift struct unlinkDevice_result. */
export interface unlinkDevice_result {
	success: do0_C23152j;
	e: ThingsException;
}

/** Wire-format fields for the LINE Thrift struct unregisterUserAndDevice_result. */
export interface unregisterUserAndDevice_result {
	success: string;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct unsendMessage_args. */
export interface unsendMessage_args {
	seq: number;
	messageId: string;
}

/** Wire-format fields for the LINE Thrift struct unsendMessage_result. */
export interface unsendMessage_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct updateAndGetNearby_args. */
export interface updateAndGetNearby_args {
	latitude: number;
	longitude: number;
	accuracy: GeolocationAccuracy;
	networkStatus: ClientNetworkStatus;
	altitudeMeters: number;
	velocityMetersPerSecond: number;
	bearingDegrees: number;
	measuredAtTimestamp: Int64;
	clientCurrentTimestamp: Int64;
}

/** Wire-format fields for the LINE Thrift struct updateAndGetNearby_result. */
export interface updateAndGetNearby_result {
	success: NearbyEntry[];
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct updateChannelNotificationSetting_args. */
export interface updateChannelNotificationSetting_args {
	setting: ChannelNotificationSetting[];
}

/** Wire-format fields for the LINE Thrift struct updateChannelNotificationSetting_result. */
export interface updateChannelNotificationSetting_result {
	e: ChannelException;
}

/** Wire-format fields for the LINE Thrift struct updateChannelSettings_args. */
export interface updateChannelSettings_args {
	channelSettings: ChannelSettings;
}

/** Wire-format fields for the LINE Thrift struct updateChannelSettings_result. */
export interface updateChannelSettings_result {
	success: boolean;
	e: ChannelException;
}

/** Wire-format fields for the LINE Thrift struct updateChatRoomBGM_args. */
export interface updateChatRoomBGM_args {
	reqSeq: number;
	chatRoomMid: string;
	chatRoomBGMInfo: string;
}

/** Wire-format fields for the LINE Thrift struct updateChatRoomBGM_result. */
export interface updateChatRoomBGM_result {
	success: ChatRoomBGM;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct updateChat_args. */
export interface updateChat_args {
	request: UpdateChatRequest;
}

/** Wire-format fields for the LINE Thrift struct updateChat_result. */
export interface updateChat_result {
	success: Pb1_Zc;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct updateContactSetting_args. */
export interface updateContactSetting_args {
	reqSeq: number;
	mid: string;
	flag: ContactSetting;
	value: string;
}

/** Wire-format fields for the LINE Thrift struct updateContactSetting_result. */
export interface updateContactSetting_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct updateExtendedProfileAttribute_args. */
export interface updateExtendedProfileAttribute_args {
	reqSeq: number;
	attr: number;
	extendedProfile: ExtendedProfile;
}

/** Wire-format fields for the LINE Thrift struct updateExtendedProfileAttribute_result. */
export interface updateExtendedProfileAttribute_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct updateGroupCallUrl_args. */
export interface updateGroupCallUrl_args {
	request: UpdateGroupCallUrlRequest;
}

/** Wire-format fields for the LINE Thrift struct updateGroupCallUrl_result. */
export interface updateGroupCallUrl_result {
	success: Pb1_cd;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct updateIdentifier_args. */
export interface updateIdentifier_args {
	authSessionId: string;
	request: IdentityCredentialRequest;
}

/** Wire-format fields for the LINE Thrift struct updateIdentifier_result. */
export interface updateIdentifier_result {
	success: IdentityCredentialResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct updateNotificationToken_args. */
export interface updateNotificationToken_args {
	token: string;
	type: NotificationType;
}

/** Wire-format fields for the LINE Thrift struct updateNotificationToken_result. */
export interface updateNotificationToken_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct updatePassword_args. */
export interface updatePassword_args {
	request: UpdatePasswordRequest;
}

/** Wire-format fields for the LINE Thrift struct updatePassword_result. */
export interface updatePassword_result {
	success: U70_v;
	pue: PasswordUpdateException;
	tae: TokenAuthException;
}

/** Wire-format fields for the LINE Thrift struct updateProfileAttribute_result. */
export interface updateProfileAttribute_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct updateProfileAttributes_args. */
export interface updateProfileAttributes_args {
	reqSeq: number;
	request: UpdateProfileAttributesRequest;
}

/** Wire-format fields for the LINE Thrift struct updateProfileAttributes_result. */
export interface updateProfileAttributes_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct updateSafetyStatus_args. */
export interface updateSafetyStatus_args {
	req: UpdateSafetyStatusRequest;
}

/** Wire-format fields for the LINE Thrift struct updateSafetyStatus_result. */
export interface updateSafetyStatus_result {
	e: any;
}

/** Wire-format fields for the LINE Thrift struct updateSettingsAttribute_result. */
export interface updateSettingsAttribute_result {
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct updateSettingsAttributes2_args. */
export interface updateSettingsAttributes2_args {
	reqSeq: number;
	settings: Settings;
	attributesToUpdate: SettingsAttributeEx[];
}

/** Wire-format fields for the LINE Thrift struct updateSettingsAttributes2_result. */
export interface updateSettingsAttributes2_result {
	success: number[];
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct updateUserGeneralSettings_args. */
export interface updateUserGeneralSettings_args {
	settings: Record<number, string>;
}

/** Wire-format fields for the LINE Thrift struct updateUserGeneralSettings_result. */
export interface updateUserGeneralSettings_result {
	e: PaymentException;
}

/** Wire-format fields for the LINE Thrift struct usePhotoboothTicket_args. */
export interface usePhotoboothTicket_args {
	request: UsePhotoboothTicketRequest;
}

/** Wire-format fields for the LINE Thrift struct usePhotoboothTicket_result. */
export interface usePhotoboothTicket_result {
	success: UsePhotoboothTicketResponse;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct validateEligibleFriends_args. */
export interface validateEligibleFriends_args {
	friends: string[];
	type: r80_EnumC34376p;
}

/** Wire-format fields for the LINE Thrift struct validateEligibleFriends_result. */
export interface validateEligibleFriends_result {
	success: PaymentEligibleFriendStatus[];
	e: PaymentException;
}

/** Wire-format fields for the LINE Thrift struct validateProduct_args. */
export interface validateProduct_args {
	shopId: string;
	productId: string;
	productVersion: Int64;
	validationReq: any;
}

/** Wire-format fields for the LINE Thrift struct validateProduct_result. */
export interface validateProduct_result {
	success: any;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct validateProfile_args. */
export interface validateProfile_args {
	authSessionId: string;
	displayName: string;
}

/** Wire-format fields for the LINE Thrift struct validateProfile_result. */
export interface validateProfile_result {
	success: T70_o1;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct verifyAccountUsingHashedPwd_args. */
export interface verifyAccountUsingHashedPwd_args {
	request: VerifyAccountUsingHashedPwdRequest;
}

/** Wire-format fields for the LINE Thrift struct I80_C26411k0. */
export interface I80_C26411k0 {
	request: I80_E0;
}

/** Wire-format fields for the LINE Thrift struct verifyAccountUsingHashedPwd_result. */
export interface verifyAccountUsingHashedPwd_result {
	success: VerifyAccountUsingHashedPwdResponse;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct I80_l0. */
export interface I80_l0 {
	success: I80_F0;
	e: I80_C26390a;
}

/** Wire-format fields for the LINE Thrift struct verifyAssertion_args. */
export interface verifyAssertion_args {
	request: VerifyAssertionRequest;
}

/** Wire-format fields for the LINE Thrift struct verifyAssertion_result. */
export interface verifyAssertion_result {
	success: m80_q;
	deviceAttestationException: m80_b;
}

/** Wire-format fields for the LINE Thrift struct verifyAttestation_args. */
export interface verifyAttestation_args {
	request: VerifyAttestationRequest;
}

/** Wire-format fields for the LINE Thrift struct verifyAttestation_result. */
export interface verifyAttestation_result {
	success: m80_s;
	deviceAttestationException: m80_b;
}

/** Wire-format fields for the LINE Thrift struct verifyBirthdayGiftAssociationToken_args. */
export interface verifyBirthdayGiftAssociationToken_args {
	req: BirthdayGiftAssociationVerifyRequest;
}

/** Wire-format fields for the LINE Thrift struct verifyBirthdayGiftAssociationToken_result. */
export interface verifyBirthdayGiftAssociationToken_result {
	success: BirthdayGiftAssociationVerifyResponse;
	e: ShopException;
}

/** Wire-format fields for the LINE Thrift struct verifyEapAccountForRegistration_args. */
export interface verifyEapAccountForRegistration_args {
	authSessionId: string;
	device: Device;
	socialLogin: SocialLogin;
}

/** Wire-format fields for the LINE Thrift struct verifyEapAccountForRegistration_result. */
export interface verifyEapAccountForRegistration_result {
	success: T70_s1;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct verifyEapLogin_args. */
export interface verifyEapLogin_args {
	request: VerifyEapLoginRequest;
}

/** Wire-format fields for the LINE Thrift struct I80_m0. */
export interface I80_m0 {
	request: I80_G0;
}

/** Wire-format fields for the LINE Thrift struct verifyEapLogin_result. */
export interface verifyEapLogin_result {
	success: VerifyEapLoginResponse;
	e: AccountEapConnectException;
}

/** Wire-format fields for the LINE Thrift struct I80_n0. */
export interface I80_n0 {
	success: I80_H0;
	e: I80_C26390a;
}

/** Wire-format fields for the LINE Thrift struct verifyPhoneNumber_args. */
export interface verifyPhoneNumber_args {
	sessionId: string;
	pinCode: string;
	udidHash: string;
	migrationPincodeSessionId: string;
	oldUdidHash: string;
}

/** Wire-format fields for the LINE Thrift struct verifyPhoneNumber_result. */
export interface verifyPhoneNumber_result {
	success: PhoneVerificationResult;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct verifyPhonePinCode_args. */
export interface verifyPhonePinCode_args {
	request: VerifyPhonePinCodeRequest;
}

/** Wire-format fields for the LINE Thrift struct I80_o0. */
export interface I80_o0 {
	request: I80_I0;
}

/** Wire-format fields for the LINE Thrift struct verifyPhonePinCode_result. */
export interface verifyPhonePinCode_result {
	success: VerifyPhonePinCodeResponse;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct I80_p0. */
export interface I80_p0 {
	success: I80_J0;
	e: I80_C26390a;
}

/** Wire-format fields for the LINE Thrift struct verifyPinCode_args. */
export interface verifyPinCode_args {
	request: VerifyPinCodeRequest;
}

/** Wire-format fields for the LINE Thrift struct verifyPinCode_result. */
export interface verifyPinCode_result {
	success: q80_q;
	e: SecondaryQrCodeException;
}

/** Wire-format fields for the LINE Thrift struct verifyQrCode_args. */
export interface verifyQrCode_args {
	request: VerifyQrCodeRequest;
}

/** Wire-format fields for the LINE Thrift struct verifyQrCode_result. */
export interface verifyQrCode_result {
	success: q80_s;
	e: SecondaryQrCodeException;
}

/** Wire-format fields for the LINE Thrift struct verifyQrcodeWithE2EE_result. */
export interface verifyQrcodeWithE2EE_result {
	success: string;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct verifyQrcode_args. */
export interface verifyQrcode_args {
	verifier: string;
	pinCode: string;
}

/** Wire-format fields for the LINE Thrift struct verifyQrcode_result. */
export interface verifyQrcode_result {
	success: string;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct verifySocialLogin_args. */
export interface verifySocialLogin_args {
	authSessionId: string;
	device: Device;
	socialLogin: SocialLogin;
}

/** Wire-format fields for the LINE Thrift struct verifySocialLogin_result. */
export interface verifySocialLogin_result {
	success: VerifySocialLoginResponse;
	e: AuthException;
}

/** Wire-format fields for the LINE Thrift struct vh_C37633d. */
export interface vh_C37633d {
}

/** Wire-format fields for the LINE Thrift struct wakeUpLongPolling_args. */
export interface wakeUpLongPolling_args {
	clientRevision: Int64;
}

/** Wire-format fields for the LINE Thrift struct wakeUpLongPolling_result. */
export interface wakeUpLongPolling_result {
	success: boolean;
	e: TalkException;
}

/** Wire-format fields for the LINE Thrift struct zR0_C40576a. */
export interface zR0_C40576a {
}

/** Wire-format fields for the LINE Thrift struct zR0_C40580e. */
export interface zR0_C40580e {
	sticker: any;
}

/** Wire-format fields for the LINE Thrift struct GetContactsV2Response. */
export interface GetContactsV2Response {
	contacts: Record<string, ContactEntry>;
}

/** Wire-format fields for the LINE Thrift struct ContactEntry. */
export interface ContactEntry {
	userStatus: any;
	snapshotTimeMillis: Int64;
	contact: Contact;
	calendarEvents: ContactCalendarEvents;
}

/** LINE Thrift enum LoginResultType; values are protocol-level identifiers. */
export type LoginResultType =
	| 1
	| "SUCCESS"
	| 2
	| "REQUIRE_QRCODE"
	| 3
	| "REQUIRE_DEVICE_CONFIRM"
	| 4
	| "REQUIRE_SMS_CONFIRM";

/** Wire-format fields for the LINE Thrift struct LoginResult. */
export interface LoginResult {
	authToken: string;
	certificate: string;
	verifier: string;
	pinCode: string;
	type: LoginResultType;
	lastPrimaryBindTime: Int64;
	displayMessage: string;
	sessionForSMSConfirm: VerificationSessionData;
	tokenV3IssueResult: TokenV3IssueResult;
	mid: string;
}

/** LINE Thrift enum F61_EnumC10204a0; values are protocol-level identifiers. */
export type F61_EnumC10204a0 = 0 | "ALL" | 1 | "BLOCK" | 2 | "NOT_BLOCK";

/** Wire-format fields for the LINE Thrift struct getUserFriendIds_args. */
export interface getUserFriendIds_args {
	request: GetUserFriendIdsRequest;
}

/** Wire-format fields for the LINE Thrift struct getUserFriendIds_result. */
export interface getUserFriendIds_result {
	success: GetUserFriendIdsResponse;
	re: RejectedException;
	sfe: ServerFailureException;
	te: TalkException;
}

/** Wire-format fields for the LINE Thrift struct GetUserFriendIdsRequest. */
export interface GetUserFriendIdsRequest {
	userPageToken: string;
	blockStatus: F61_EnumC10204a0;
}

/** Wire-format fields for the LINE Thrift struct GetUserFriendIdsResponse. */
export interface GetUserFriendIdsResponse {
	userFriendMids: string[];
	nextUserPageToken: string;
}

/** LINE Thrift enum ForbiddenWordsGroup; values are protocol-level identifiers. */
export type ForbiddenWordsGroup =
	| 1
	| "SQUARE_NAME"
	| 2
	| "SQUARE_DESCRIPTION"
	| 3
	| "MEMBER_NAME";

/** LINE Thrift enum LMPCode; values are protocol-level identifiers. */
export type LMPCode =
	| 1
	| "PR01"
	| 2
	| "PR02"
	| 3
	| "PR03"
	| 4
	| "PR04"
	| 5
	| "PR05"
	| 6
	| "PR06"
	| 7
	| "PR07"
	| 8
	| "PR08"
	| 12
	| "PR12"
	| 13
	| "PR13"
	| 14
	| "PR14"
	| 15
	| "PR15"
	| 16
	| "PR16"
	| 17
	| "PR17"
	| 18
	| "PR18"
	| 60
	| "PR60"
	| 61
	| "PR61"
	| 88
	| "PR88"
	| 99
	| "PR99"
	| 100
	| "PRAUTO00"
	| 101
	| "PRAUTO01"
	| 199
	| "PRAUTO99"
	| 500
	| "NOT_PENALIZED";

/** Wire-format fields for the LINE Thrift struct PaidSquareCreationTermsAgreement. */
export interface PaidSquareCreationTermsAgreement {
	agreedToAdminPermissionNonTransferable: boolean;
	agreedToSettlementPolicy: boolean;
	agreedToPolicyViolationConsequence: boolean;
}

/** Wire-format fields for the LINE Thrift struct PaidSquareForm. */
export interface PaidSquareForm {
	id: string;
	square: Square;
	adminMember: SquareMember;
	subscriptionProduct: SquareSubscriptionProduct;
	state: number;
	revision: Int64;
	createdAt: Int64;
	updatedAt: Int64;
	country: string;
}

/** LINE Thrift enum PaidSquareFormState; values are protocol-level identifiers. */
export type PaidSquareFormState =
	| 1
	| "UNDER_REVIEW"
	| 2
	| "APPROVED"
	| 3
	| "REJECTED"
	| 4
	| "REGISTRATION_COMPLETE"
	| 5
	| "REGISTRATION_FAILED";

/** Wire-format fields for the LINE Thrift struct PaidSquareSubscriptionTermsAgreement. */
export interface PaidSquareSubscriptionTermsAgreement {
	squareMid: string;
	agreedToSubscriptionAndRecurringPayments: boolean;
	agreedToTermsAndPrecautions: boolean;
}

/** Wire-format fields for the LINE Thrift struct ProductProperty. */
export interface ProductProperty {
	stickerProperty: any;
	themeProperty: any;
	sticonProperty: any;
}

/** Wire-format fields for the LINE Thrift struct RequestDeletePaidSquareResponse. */
export interface RequestDeletePaidSquareResponse {
	square: Square;
}

/** Wire-format fields for the LINE Thrift struct SneakPeekContent. */
export interface SneakPeekContent {
	title: string;
	desc: string;
	imageObsHashes: string[];
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedCreateSquareSubscription. */
export interface SquareEventNotifiedCreateSquareSubscription {
	squareMid: string;
	squareSubscription: SquareSubscription;
}

/** Wire-format fields for the LINE Thrift struct SquareEventNotifiedUpdateSquareSubscription. */
export interface SquareEventNotifiedUpdateSquareSubscription {
	squareMid: string;
	squareSubscription: SquareSubscription;
}

/** Wire-format fields for the LINE Thrift struct SquareOAShopData. */
export interface SquareOAShopData {
	url: string;
	title: string;
}

/** Wire-format fields for the LINE Thrift struct SquareProvider. */
export interface SquareProvider {
	type: number;
	data: SquareProviderData;
}

/** Wire-format fields for the LINE Thrift struct SquareProviderData. */
export interface SquareProviderData {
	squareOAShopData: any;
}

/** Wire-format fields for the LINE Thrift struct SquareSubscription. */
export interface SquareSubscription {
	id: string;
	squareMid: string;
	status: number;
	freeTrial: boolean;
	startedAt: Int64;
	expiredAt: Int64;
	revision: Int64;
}

/** Wire-format fields for the LINE Thrift struct SquareSubscriptionFeeOption. */
export interface SquareSubscriptionFeeOption {
	price: number;
	currency: string;
}

/** Wire-format fields for the LINE Thrift struct SquareSubscriptionProduct. */
export interface SquareSubscriptionProduct {
	id: string;
	squareMid: string;
	subscriptionFee: number;
	currency: string;
	freeTrial: boolean;
}

/** LINE Thrift enum SquareSubscriptionProductRegistrationStatus; values are protocol-level identifiers. */
export type SquareSubscriptionProductRegistrationStatus =
	| 1
	| "IN_REVIEW"
	| 2
	| "APPROVED"
	| 3
	| "REJECTED"
	| 4
	| "PENDING";

/** LINE Thrift enum SquareSubscriptionStatus; values are protocol-level identifiers. */
export type SquareSubscriptionStatus =
	| 1
	| "ACTIVE"
	| 2
	| "CANCELLED"
	| 3
	| "ON_HOLD"
	| 4
	| "EXPIRED"
	| 5
	| "REVOKED";

/** LINE Thrift enum TermsType; values are protocol-level identifiers. */
export type TermsType =
	| 1
	| "AI_QNA_BOT"
	| 2
	| "PAID_SQUARE_SUBSCRIPTION"
	| 3
	| "PAID_SQUARE_CREATION";

/** Wire-format fields for the LINE Thrift struct ValidateTextsRequest. */
export interface ValidateTextsRequest {
	group: number;
	targetTexts: string[];
}

/** Wire-format fields for the LINE Thrift struct ValidateTextsResponse. */
export interface ValidateTextsResponse {
	success: boolean;
	errorMessage: string;
}
